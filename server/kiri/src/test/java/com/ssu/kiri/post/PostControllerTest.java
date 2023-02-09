package com.ssu.kiri.post;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssu.kiri.config.TestConfig;
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
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Import({TestConfig.class})
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
class PostControllerTest {


    @Autowired
    private WebApplicationContext ctx;
    private ObjectMapper objectMapper = new ObjectMapper();
    private MockMvc mockMvc;
    @Autowired PostController postController;
    @Autowired PostService postService;
    @Autowired PostRepository postRepository;
    @Autowired MemberRepository memberRepository;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
                .addFilters(new CharacterEncodingFilter("UTF-8", true))  // 한글 깨짐 처리
//                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @AfterEach
    void afterEach() {
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
    @DisplayName("게시글 등록")
    @Test
    public void savePost() throws Exception {
        //given
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

        System.out.println("savePost.getStartPostTime() = " + savePost.getStartPostTime());
        System.out.println("savePost.getFinishPostTime() = " + savePost.getFinishPostTime());

        //when & then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/api/posts") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(savePost))
                )
                .andExpect(status().isOk())
                .andDo(print());

    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글 수정")
    @Test
    public void updatePost() throws Exception {
        //given
        // creamyyy 가 post 등록.
        Post post2 = Post.builder()
                .title("가을이 오면")
                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
                .category("지역 축제")
                .category("지역")
                .event("축제")
                .local("서울")
                .school("숭실대학교")
                .place("진리관")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();

        List<Long> imageIdList = new ArrayList<>();
        imageIdList.add(1L);

        // 기존 post 저장
        SaveResPost savedPost = postService.savePost(post2, imageIdList);
        Long savedPostId = savedPost.getPost_id();

        // 업데이트 할 Post 내용
        SavePost savePost = new SavePost();
        savePost.setTitle("우주하마");
        savePost.setContent("자세가 곧 스킬인 게임");
        savePost.setCategory("지역");
        savePost.setEvent("강연");
        savePost.setLocal("서울");
        savePost.setSchool("숭실대학교");
        savePost.setOrganizer("하마");
        savePost.setStartPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        savePost.setFinishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));


        //when
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/api/posts/{post-id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(savePost))
                )
                .andExpect(status().isOk())
                .andDo(print());

        //then

    }


    @WithAccount("creamyyyy")
    @DisplayName("게시글 삭제")
    @Test
    public void deletePost() throws Exception {
        //given
        // creamyyy 가 post 등록.
        Post post2 = Post.builder()
                .title("가을이 오면")
                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
                .category("지역 축제")
                .category("지역")
                .event("축제")
                .local("서울")
                .school("숭실대학교")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();

        List<Long> imageIdList = new ArrayList<>();
        imageIdList.add(1L);

        // 기존 post 저장
        SaveResPost savedPost = postService.savePost(post2, imageIdList);
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


}