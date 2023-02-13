package com.ssu.kiri.post;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.image.ImageRepository;
import com.ssu.kiri.image.ImageService;
import com.ssu.kiri.image.dto.ImageResDto;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.dto.request.SavePost;
import com.ssu.kiri.post.dto.response.SaveResPost;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Import({TestConfig.class})
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
class PostControllerTest {

    static {
        System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
    }

    @Autowired
    private WebApplicationContext ctx;
    private ObjectMapper objectMapper = new ObjectMapper();
    private MockMvc mockMvc;
    @Autowired PostController postController;
    @Autowired PostService postService;
    @Autowired PostRepository postRepository;
    @Autowired MemberRepository memberRepository;
    @Autowired ImageRepository imageRepository;
    @Autowired ImageService imageService;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
                .addFilters(new CharacterEncodingFilter("UTF-8", true))  // 한글 깨짐 처리
//                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }


    @AfterEach
    void afterEach() {
        imageRepository.deleteAll();
        postRepository.deleteAll();
        memberRepository.deleteAll();
    }


    @WithAccount("creamyyyy")
    @DisplayName("게시글 상세보기")
    @Test
    public void detailPost() throws Exception {
        //given
        // creamyyy 가 post 등록.
        Post post2 = Post.builder()
                .title("가을이 오면")
                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
                .category("지역")
                .event("축제")
                .local("서울")
                .school("숭실대학교")
                .place("진리관")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .link("a.com")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();

        List<Long> imageIdList = new ArrayList<>();
        imageIdList.add(1L);

        // 기존 post 저장
        SaveResPost savedPost = postService.savePost(post2, imageIdList);

        Long savedPostId = savedPost.getPost_id();
        System.out.println("savedPostId = " + savedPostId);



        // when
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .get("/posts/read/{post-id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                )
                .andExpect(status().isOk())
                .andDo(print());


    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글 등록 : 이미지가 있을 경우")
    @Test
    public void savePost() throws Exception {
        //given
        SavePost savePost = createSavePost();

        // 이미지 객체 생성, 이미지 등록 후 id 리스트만 얻어오기.
        List<MultipartFile> list = createMockMultipartFiles();
        List<ImageResDto> imageResDtoList = imageService.addFile(list);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        savePost.setImageIdList(imageIdList);
        System.out.println("savePost.getImageIdList() = " + savePost.getImageIdList());

        //when & then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/api/posts") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(savePost))
                                .characterEncoding("UTF-8")
                )
                .andDo(print())
                .andExpect(status().isOk());
//                .andDo(print());

    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글 등록 : 이미지가 없는 경우")
    @Test
    public void savePostWithoutImage() throws Exception {
        //given
        SavePost savePost = createSavePost();
        System.out.println("savePost.getImageIdList() = " + savePost.getImageIdList());

        //when & then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/api/posts") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(savePost))
                                .characterEncoding("UTF-8")
                )
//                .andDo(print())
                .andExpect(status().isOk())
                .andDo(print());

    }



    @WithAccount("creamyyyy")
    @DisplayName("게시글 수정 : 이미지 존재O -> 이미지 존재O")
    @Test
    public void updatePost() throws Exception {
        //given

        // 게시글 저장
        Post post = createPostOne();
        List<MultipartFile> updateBeforeList = createMockMultipartFile1();
        List<ImageResDto> imageResDtoList = imageService.addFile(updateBeforeList);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        SaveResPost savedPost = postService.savePost(post, imageIdList);
        Long savedPostId = savedPost.getPost_id();



        // 업데이트 할 Post 내용
        SavePost savePost = createSavePost();
        List<MultipartFile> updateAfterList = createMockMultipartFile2();
        List<ImageResDto> imageResDtoList2 = imageService.addFile(updateAfterList);
        List<Long> imageIdList2 = imageResDtoList2.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());
        savePost.setImageIdList(imageIdList2);

        //when
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/api/posts/{post-id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(savePost))
                                .characterEncoding("UTF-8")
                )
                .andExpect(status().isOk())
                .andDo(print());

        //then

    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글 수정 : 이미지 존재O , 이미지는 수정 X")
    @Test
    public void updatePostOX() throws Exception {
        //given

        // 게시글 저장
        Post post = createPostOne();
        List<MultipartFile> updateBeforeList = createMockMultipartFile1();
        List<ImageResDto> imageResDtoList = imageService.addFile(updateBeforeList);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        SaveResPost savedPost = postService.savePost(post, imageIdList);
        Long savedPostId = savedPost.getPost_id();



        // 업데이트 할 Post 내용
        SavePost savePost = createSavePost();


        //when & then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/api/posts/{post-id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(savePost))
                                .characterEncoding("UTF-8")
                )
                .andExpect(status().isOk())
                .andDo(print());

    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글을 수정 : 게시글에 이미지가 있었는데 삭제해서 이미지가 없는채로 저장하고 싶은 경우")
    @Test
    public void updatePostOXX() throws Exception {
        //given

        // 게시글 저장
        Post post = createPostOne();
        List<MultipartFile> updateBeforeList = createMockMultipartFile1();
        List<ImageResDto> imageResDtoList = imageService.addFile(updateBeforeList);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        SaveResPost savedPost = postService.savePost(post, imageIdList);
        Long savedPostId = savedPost.getPost_id();



        // 업데이트 할 Post 내용
        imageService.deleteUpdateImage(1L);
        SavePost savePost = createSavePost();


        //when & then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/api/posts/{post-id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(savePost))
                                .characterEncoding("UTF-8")
                )
                .andExpect(status().isOk())
                .andDo(print());

    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글 수정 : 이미지 존재X -> 이미지 존재O")
    @Test
    public void updatePostXO() throws Exception {
        //given

        // 게시글 저장
        Post post = createPostOne();
        SaveResPost savedPost = postService.savePost(post, null);
        Long savedPostId = savedPost.getPost_id();


        // 업데이트 할 Post 내용
        SavePost savePost = createSavePost();
        List<MultipartFile> updateAfterList = createMockMultipartFile2();
        List<ImageResDto> imageResDtoList2 = imageService.addFile(updateAfterList);
        List<Long> imageIdList2 = imageResDtoList2.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());
        savePost.setImageIdList(imageIdList2);


        //when & then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/api/posts/{post-id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(savePost))
                                .characterEncoding("UTF-8")
                )
                .andExpect(status().isOk())
                .andDo(print());

    }


    @WithAccount("creamyyyy")
    @DisplayName("게시글 삭제")
    @Test
    public void deletePost() throws Exception {
        //given
        // 게시글 등록
        Post post = createPostOne();
        List<MultipartFile> list = createMockMultipartFiles();
        List<ImageResDto> imageResDtoList = imageService.addFile(list);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        SaveResPost savedPost = postService.savePost(post, imageIdList);
        Long savedPostId = savedPost.getPost_id();

        //when
        //then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .delete("/api/posts/{post-id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                )
                .andExpect(status().isNoContent())
                .andDo(print());

    }

    private List<MultipartFile> createMockMultipartFiles() {
        MockMultipartFile image1 = new MockMultipartFile(
                "files",
                "test2.jpg",
                "image/jpg",
                "test2.jpg".getBytes());

        MockMultipartFile image2 = new MockMultipartFile(
                "files",
                "test.png",
                "image/png",
                "test.png".getBytes());

        List<MultipartFile> list = new ArrayList<>();
        list.add(image1);
        list.add(image2);

        return list;
    }
    private List<MultipartFile> createMockMultipartFile1() {
        MockMultipartFile image1 = new MockMultipartFile(
                "files",
                "test2.jpg",
                "image/jpg",
                "test2.jpg".getBytes());

        List<MultipartFile> list = new ArrayList<>();
        list.add(image1);

        return list;
    }

    private List<MultipartFile> createMockMultipartFile2() {

        MockMultipartFile image2 = new MockMultipartFile(
                "files",
                "test.png",
                "image/png",
                "test.png".getBytes());

        List<MultipartFile> list = new ArrayList<>();
        list.add(image2);

        return list;
    }


    private SavePost createSavePost() {
        SavePost savePost = new SavePost();
        savePost.setTitle("우주하마");
        savePost.setContent("자세가 곧 스킬인 게임");
        savePost.setCategory("지역 축제");
        savePost.setEvent("강연");
        savePost.setLocal("서울");
        savePost.setSchool("숭실대학교");
        savePost.setOrganizer("하마");
        savePost.setStartPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        savePost.setFinishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return savePost;
    }

    private Post createPostOne() {
        return Post.builder()
                .title("혜안")
                .content("혜안져스 라이어 게임")
                .category("지역")
                .event("축제")
                .local("서울")
                .school("숭실대학교")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }

    private Post createPostTwo() {
        return Post.builder()
                .title("수탉")
                .content("dead by daylight")
                .category("지역")
                .event("전시")
                .local("부산")
                .school("숭실대학교")
                .organizer("주최자는 내가 차지한다.")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }


}