package com.ssu.kiri.scrap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.post.PostService;
import com.ssu.kiri.post.dto.request.SavePost;
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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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

//    @WithAccount("creamyyyy")
//    @DisplayName("좋아요 누르기")
//    @Test
//    public void addScrapTest() throws Exception {
//        //given
//
//        // creamyyy 가 post 등록.
////        Post post = Post.builder()
////                .title("가을이 오면")
////                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
////                .event("축제")
////                .local("서울")
////                .organizer("주최자는 나야 둘이 될 수 없어")
////                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
////                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
////                .build();
//
//        SavePost savePost = createSavePost();
//
//        List<Long> imageIdList = new ArrayList<>();
//        imageIdList.add(1L);
//
//        // 기존 post 저장
//        SaveResPost savedPost = postService.savePost(savePost, imageIdList);
//
//        Long savedPostId = savedPost.getPost_id();
//        System.out.println("savedPostId = " + savedPostId);
//
//        // 좋아요 시 필요한 시간들 DTO(실행 시작 시간, 실행 끝난 시간)
//        ScrapReqAdd request = new ScrapReqAdd();
//        request.setStartScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//        request.setEndScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//
//
//        //when & then
//        this.mockMvc.perform(
//                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
//                                .post("/extra/{id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
//                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(objectMapper.registerModule(new JavaTimeModule()).writeValueAsString(request))
//                )
//                .andExpect(status().isOk())
//                .andDo(print());
//
//    }

//    @WithAccount("creamyyyy")
//    @DisplayName("게시글 좋아요 취소 테스트")
//    @Test
//    public void deleteScrap() throws Exception {
//        //given
//
//        // creamyyy 가 post 등록.
////        Post post = Post.builder()
////                .title("가을이 오면")
////                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
////                .event("축제")
////                .local("서울")
////                .organizer("주최자는 나야 둘이 될 수 없어")
////                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
////                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
////                .build();
//
//        SavePost savePost = createSavePost();
//
//        List<Long> imageIdList = new ArrayList<>();
//        imageIdList.add(1L);
//
//        // 기존 post 저장
//        SaveResPost savedPost = postService.savePost(savePost, imageIdList);
//
//        Long savedPostId = savedPost.getPost_id();
//        System.out.println("savedPostId = " + savedPostId);
//
//        // 좋아요 시 필요한 시간들 DTO(실행 시작 시간, 실행 끝난 시간)
//        ScrapReqAdd request = new ScrapReqAdd();
//        request.setStartScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//        request.setEndScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//
//        boolean isScrap = scrapService.addScrap(savedPostId, request);
//
//        //when & then
//        this.mockMvc.perform(
//                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
//                                .post("/calenders/extra/{id}", savedPostId) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
//                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
//                )
//                .andExpect(status().isOk())
//                .andDo(print());
//
//    }


    @WithAccount("creamyyyy")
    @DisplayName("스크랩한 게시글 날짜별로 가져오기")
    @Test
    public void getScrap() throws Exception {
        //given
        List<Long> postIdList = createAndSavePostList();
        List<ScrapReqAdd> scrapReq = createScrapReq();
        int iter = 0;

        for (Long id : postIdList) {
            scrapService.addScrap(id, scrapReq.get(iter++));
        }

        MultiValueMap<String, String> info = new LinkedMultiValueMap<>();

        // 결과: post_id = 1
//        info.add("year", "2022");
//        info.add("month", "11");

        // 결과: post_id = 1
//        info.add("year", "2022");
//        info.add("month", "12");

        // 결과: post_id = 1,2,3,6,7
//        info.add("year", "2023");
//        info.add("month", "1");

        // 결과: post_id = 1,2,3,4,5,6,8
//        info.add("year", "2023");
//        info.add("month", "2");

        // 결과: post_id = 1,4,5,6,8
//        info.add("year", "2023");
//        info.add("month", "3");

        // 결과: post_id = 8
//        info.add("year", "2024");
//        info.add("month", "1");

        // 결과: post_id = 없음
//        info.add("year", "2024");
//        info.add("month", "8");





        //when
        //then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .get("/calendar") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
//                                .params(info)
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                )
                .andExpect(status().isOk())
                .andDo(print());

    }

    private List<ScrapReqAdd> createScrapReq() {
        List<ScrapReqAdd> list = new ArrayList<>();

        // 시작: 이번달, 끝: 이번달
        ScrapReqAdd reqAdd1 = createScrapReqAdd(2022, 2023, 11, 3, 5, 10);
        list.add(reqAdd1);

        // 시작: 이전달, 끝: 이번달
        ScrapReqAdd reqAdd2 = createScrapReqAdd(2023, 2023, 1, 2, 5, 10);
        list.add(reqAdd2);
        list.add(reqAdd2);

        // 시작: 이번달, 끝: 다음달
        ScrapReqAdd reqAdd3 = createScrapReqAdd(2023, 2023, 2, 3, 5, 10);
        list.add(reqAdd3);
        list.add(reqAdd3);

        // 시작: 이전달, 끝: 다음달
        ScrapReqAdd reqAdd4 = createScrapReqAdd(2023, 2023, 1, 3, 5, 10);
        list.add(reqAdd4);

        // 시작: 이전달, 끝: 이전달
        ScrapReqAdd reqAdd5 = createScrapReqAdd(2023, 2023, 1, 1, 5, 10);
        list.add(reqAdd5);


        ScrapReqAdd reqAdd6 = createScrapReqAdd(2023, 2024, 2, 2, 5, 10);
        list.add(reqAdd6);
        list.add(reqAdd6);

        return list;
    }

    private ScrapReqAdd createScrapReqAdd(int sy, int fy, int sm, int fm, int d, int h) {
        ScrapReqAdd scrapReqAdd = new ScrapReqAdd();
        LocalDateTime time1 = LocalDateTime.of(sy, sm, d, h,h,h);
        LocalDateTime time2 = LocalDateTime.of(fy, fm, d, h,h,h);
        scrapReqAdd.setStartScrapTime(time1);
        scrapReqAdd.setEndScrapTime(time2);

        return scrapReqAdd;
    }

    private List<Long> createAndSavePostList() throws Exception {
        List<Long> list = new ArrayList<>();

        for(int i=1; i<3; i++) {
//            Post post1 = createBasicPost("title" + i, "content" + i, "강연", "서울", "숭실대학교",
//                    "숭실대", "2023-02-25 12:10:00", "2023-02-25 12:20:00");
            SavePost savePost = createSavePost("title" + i, "content" + i, "축제", "서울", "중앙대학교", "중앙대");
            SaveResPost savedPost = postService.savePost(savePost, null);
            list.add(savedPost.getPost_id());
        }

        for(int i=3; i<5; i++) {
//            Post post2 = createBasicPost("title" + i, "content" + i, "축제", "서울", "숭실대학교",
//                    "숭실대", "2023-01-25 12:10:00", "2023-04-25 12:20:00");
            SavePost savePost = createSavePost("title" + i, "content" + i, "축제", "서울", "중앙대학교", "중앙대");
            SaveResPost savedPost = postService.savePost(savePost, null);
            list.add(savedPost.getPost_id());
        }

        for(int i=5; i<7; i++) {
//            Post post3 = createBasicPost("title" + i, "content" + i, "전시", "서울", "중앙대학교",
//                    "중앙대", "2022-02-25 12:10:00", "2022-08-25 12:10:00");
            SavePost savePost = createSavePost("title" + i, "content" + i, "축제", "부산", "부산대학교", "부산대");
            SaveResPost savedPost = postService.savePost(savePost, null);
            list.add(savedPost.getPost_id());
        }

        for(int i=7; i<9; i++) {
//            Post post2 = createBasicPost("title" + i, "content" + i, "대회", "대전", "대전대학교",
//                    "대전대", "2022-01-25 12:10:00", "2023-03-25 12:10:00");
            SavePost savePost = createSavePost("title" + i, "content" + i, "대회", "대전", "대전대학교", "대전");
            SaveResPost saveResPost = postService.savePost(savePost, null);
            list.add(saveResPost.getPost_id());
        }

        return list;
    }

    private Post createBasicPost(String title, String content, String event, String local, String school, String organizer,
                                 String startTime, String finishTime) {
        return Post.builder()
                .title(title)
                .content(content)
                .event(event)
                .local(local)
                .school(school)
                .organizer(organizer)
                .startPostTime(LocalDateTime.parse(startTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse(finishTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }

    @WithAccount("creamyyyy")
    @DisplayName("지역 게시글 날짜별로 가져오기")
    @Test
    public void getScrapWithoutLogin() throws Exception {
        //given
        List<Long> postIdList = createAndSavePostList();

        MultiValueMap<String, String> info = new LinkedMultiValueMap<>();

        // 결과: post_id = 1,2,3,4
//        info.add("year", "2022");
//        info.add("month", "11");
//        info.add("local", null);
//        info.add("local","서울");

        // 결과: post_id = 1,2,3,4
//        info.add("year", "2022");
//        info.add("month", "12");
//        info.add("local","서울");

        // 결과: post_id = 5,6
//        info.add("year", "2023");
//        info.add("month", "1");
//        info.add("local","부산");

        // 결과: post_id = 7,8
//        info.add("year", "2023");
//        info.add("month", "2");
//        info.add("local","대전");

        // 결과: post_id = 없음
//        info.add("year", "2023");
//        info.add("month", "5");
//        info.add("local","서울");

        // 결과: post_id = 없음
//        info.add("year", "2024");
//        info.add("month", "1");
//        info.add("local","대전");

        // 결과: post_id = 없음
//        info.add("year", "2024");
//        info.add("month", "8");
//        info.add("local","부산");



        //when
        //then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .get("/scrap") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
//                                .params(info)
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                )
                .andDo(print())
                .andExpect(status().isOk());
//                .andDo(print());

    }

    private SavePost createSavePost(String title, String content, String event, String local, String school, String organizer) {
        SavePost savePost = new SavePost();
        savePost.setTitle(title);
        savePost.setContent(content);
        savePost.setEvent(event);
        savePost.setLocal(local);
        savePost.setSchool(school);
        savePost.setOrganizer(organizer);
        savePost.setStartPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        savePost.setFinishPostTime(LocalDateTime.parse("2023-04-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        savePost.setEmail("kkk@kkk.com");

        return savePost;
    }

    private SavePost createSavePost() {
        SavePost savePost = new SavePost();
        savePost.setEmail("kkk@kkk.com");
        savePost.setTitle("우주하마");
        savePost.setContent("자세가 곧 스킬인 게임");
        savePost.setEvent("강연");
        savePost.setLocal("서울");
        savePost.setSchool("숭실대학교");
        savePost.setOrganizer("하마");
        savePost.setStartPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        savePost.setFinishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return savePost;
    }


}