package com.ssu.kiri.scrap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.post.PostService;
import com.ssu.kiri.post.dto.response.SaveResPost;
import com.ssu.kiri.scrap.dto.ScrapReqAdd;
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
class ScrapControllerTest {

    @Autowired
    private WebApplicationContext ctx;
    private ObjectMapper objectMapper = new ObjectMapper();
    private MockMvc mockMvc;
    @Autowired PostRepository postRepository;
    @Autowired MemberRepository memberRepository;
    @Autowired ScrapRepository scrapRepository;
    @Autowired PostService postService;
    @Autowired ScrapService scrapService;


    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
                .addFilters(new CharacterEncodingFilter("UTF-8", true))  // 한글 깨짐 처리
//                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @AfterEach
    void afterEach() {
        scrapRepository.deleteAll();
        postRepository.deleteAll();
        memberRepository.deleteAll();
    }

    @WithAccount("creamyyyy")
    @DisplayName("좋아요 누르기")
    @Test
    public void addScrapTest() throws Exception {
        //given

        // creamyyy 가 post 등록.
        Post post = Post.builder()
                .title("가을이 오면")
                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
                .event("축제")
                .local("서울")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();

        List<Long> imageIdList = new ArrayList<>();
        imageIdList.add(1L);

        // 기존 post 저장
        SaveResPost savedPost = postService.savePost(post, imageIdList);

        Long savedPostId = savedPost.getPost_id();
        System.out.println("savedPostId = " + savedPostId);

        // 좋아요 시 필요한 시간들 DTO(실행 시작 시간, 실행 끝난 시간)
        ScrapReqAdd request = new ScrapReqAdd();
        request.setStartScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        request.setEndScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));


        //when & then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/extra/{id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andDo(print());

    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글 좋아요 취소 테스트")
    @Test
    public void deleteScrap() throws Exception {
        //given

        // creamyyy 가 post 등록.
        Post post = Post.builder()
                .title("가을이 오면")
                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
                .event("축제")
                .local("서울")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();

        List<Long> imageIdList = new ArrayList<>();
        imageIdList.add(1L);

        // 기존 post 저장
        SaveResPost savedPost = postService.savePost(post, imageIdList);

        Long savedPostId = savedPost.getPost_id();
        System.out.println("savedPostId = " + savedPostId);

        // 좋아요 시 필요한 시간들 DTO(실행 시작 시간, 실행 끝난 시간)
        ScrapReqAdd request = new ScrapReqAdd();
        request.setStartScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        request.setEndScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        boolean isScrap = scrapService.addScrap(savedPostId, request);

        //when & then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/calenders/extra/{id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                )
                .andExpect(status().isOk())
                .andDo(print());

    }





}