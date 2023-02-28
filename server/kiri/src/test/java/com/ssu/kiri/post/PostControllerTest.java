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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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
        Post post = createPostOne();
        List<MultipartFile> list = createMockMultipartFiles();
        List<ImageResDto> imageResDtoList = imageService.addFile(list);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        SaveResPost savedPost = postService.savePost(post, imageIdList);
        Long savedPostId = savedPost.getPost_id();


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


    // "카테고리별 게시글 조회: null, null, null" => 결과 8개 정상적으로 다 나옴
    // "카테고리별 게시글 조회: 지역, null, null" => 결과 8개 정상적으로 다 나옴
    // "카테고리별 게시글 조회: 학교, null, null" => 결과 8개 정상적으로 다 나옴

    // "카테고리별 게시글 조회: 지역, 전체, null" => 결과 8개 정상적으로 다 나옴
    // "카테고리별 게시글 조회: 학교, 전체, null" => 결과 8개 정상적으로 다 나옴
    //
    // "카테고리별 게시글 조회: 지역, 서울, null" => 결과 6개 정상적으로 다 나옴
    // "카테고리별 게시글 조회: 학교, 숭실대학교, null" => 결과 4개 정상적으로 다 나옴

    // "카테고리별 게시글 조회: 지역, null, [강연,축제]" => 결과 4개 정상적으로 다 나옴
    // "카테고리별 게시글 조회: 학교, null, [강연,축제]" => 결과 4개 정상적으로 다 나옴
    // "카테고리별 게시글 조회: null, null, [강연,축제]" => 결과 4개 정상적으로 다 나옴

    // "카테고리별 게시글 조회: 지역, 서울, [강연,대회]" => 결과 2개 정상적으로 다 나옴
    // "카테고리별 게시글 조회: 학교, 숭실대학교, [강연,대회]" => 결과 2개 정상적으로 다 나옴
    // "카테고리별 게시글 조회: 학교, 중앙대학교, [강연,대회]" => 결과 0개 정상적으로 [] 나옴


    @WithAccount("creamyyyy")
    @DisplayName("카테고리별 게시글 조회: division, category, eventList")
    @Test
    public void classifyPosts() throws Exception {
        //given
        createAndSavePostList();

        MultiValueMap<String, String> info = new LinkedMultiValueMap<>();

//        info.add("division", "지역");
//        info.add("category", "서울");

//        info.add("division", "학교");
//        info.add("category", "숭실대학교");
//        info.add("category", "중앙대학교");

        info.add("division", "지역");
        info.add("category", "전체");

//        info.add("division", "학교");
//        info.add("category", "전체");




        // when
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .get("/posts") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .param("division","지역")
//                                .param("division","학교")
                                .params(info)
//                                .param("eventList", new String[]{"강연", "대회"})
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                )
                .andExpect(status().isOk())
                .andDo(print());


    }


    private void createAndSavePostList() throws Exception {
        for(int i=1; i<3; i++) {
            Post post1 = createBasicPost("title" + i, "content" + i, "강연", "서울", "숭실대학교", "숭실대");
            List<MultipartFile> updateBeforeList = createMockMultipartFile1();
            List<ImageResDto> imageResDtoList = imageService.addFile(updateBeforeList);
            List<Long> imageIdList = imageResDtoList.stream()
                    .map(img -> img.getImage_id())
                    .collect(Collectors.toList());
            SaveResPost savedPost = postService.savePost(post1, imageIdList);

        }
        for(int i=3; i<5; i++) {
            Post post2 = createBasicPost("title" + i, "content" + i, "전시", "서울", "숭실대학교", "숭실대");
            SaveResPost saveResPost = postService.savePost(post2, null);
        }

        for(int i=5; i<7; i++) {
            Post post3 = createBasicPost("title" + i, "content" + i, "축제", "서울", "중앙대학교", "중앙대");
            List<MultipartFile> updateBeforeList = createMockMultipartFile1();
            List<ImageResDto> imageResDtoList = imageService.addFile(updateBeforeList);
            List<Long> imageIdList = imageResDtoList.stream()
                    .map(img -> img.getImage_id())
                    .collect(Collectors.toList());
            SaveResPost savedPost = postService.savePost(post3, imageIdList);
        }

        for(int i=7; i<9; i++) {
            Post post2 = createBasicPost("title" + i, "content" + i, "대회", "대전", "대전대학교", "대전대");
            SaveResPost saveResPost = postService.savePost(post2, null);
        }

    }

    private Post createBasicPost(String title, String content, String event, String local, String school, String organizer) {
        return Post.builder()
                .title(title)
                .content(content)
                .event(event)
                .local(local)
                .school(school)
                .organizer(organizer)
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
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
        savePost.setEvent("강연");
        savePost.setLocal("서울");
        savePost.setSchool("숭실대학교");
        savePost.setOrganizer("하마");
        savePost.setStartPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        savePost.setFinishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        savePost.setEmail("creamyyyy@aaa.com");

        return savePost;
    }

    private Post createPostOne() {
        return Post.builder()
                .title("혜안")
                .content("혜안져스 라이어 게임")
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
                .event("전시")
                .local("부산")
                .school("숭실대학교")
                .organizer("주최자는 내가 차지한다.")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }

    @WithAccount("creamyyy")
    @DisplayName("제목 기준으로 검색 기능 테스트")
    @Test
    public void searchPostTest() throws Exception {
        //given
        for(int i=5; i<10; i++) {
            Post post2 = createBasicPost("title" + i, "content" + i, "축제", "부산", "부산대학교", "부산대");
            SaveResPost saveResPost = postService.savePost(post2, null);
        }

        Post post3 = createBasicPost("무서운 이야기", "content", "강연", "부산", "부산대학교", "부산대");
        SaveResPost saveResPost = postService.savePost(post3, null);

        Post post4 = createBasicPost("재밌는 이야기", "content", "전시", "부산", "부산대학교", "부산대");
        SaveResPost savedPost = postService.savePost(post4, null);

        //when
        //then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .get("/posts/search") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .param("relation","le")
//
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                )
                .andExpect(status().isOk())
                .andDo(print());

    }

}