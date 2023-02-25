package com.ssu.kiri.scrap;

import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.image.dto.ImageResDto;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.post.PostService;
import com.ssu.kiri.post.dto.response.SaveResPost;
import com.ssu.kiri.scrap.dto.ScrapReqAdd;
import com.ssu.kiri.scrap.dto.ScrapResCal;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@Import({TestConfig.class})
@SpringBootTest
@Transactional
class ScrapServiceTest {
    @Autowired PostRepository postRepository;
    @Autowired MemberRepository memberRepository;
    @Autowired ScrapRepository scrapRepository;
    @Autowired PostService postService;
    @Autowired ScrapService scrapService;

    @AfterEach
    void afterEach() {
        scrapRepository.deleteAll();
        postRepository.deleteAll();
        memberRepository.deleteAll();
    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글 좋아요 누르기 테스트")
    @Test
    public void addScrapTest() throws Exception {
        //given

        // creamyyy 가 post 등록.
        Post post = createPostOne();


        SaveResPost savedPost = postService.savePost(post, null);

        Long savedPostId = savedPost.getPost_id();
        System.out.println("savedPostId = " + savedPostId);

        // 좋아요 시 필요한 시간들 DTO(실행 시작 시간, 실행 끝난 시간)
        ScrapReqAdd request = new ScrapReqAdd();
        request.setStartScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        request.setEndScrapTime(LocalDateTime.parse("2022-11-25 12:20:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));


        //when
        boolean isScrap = scrapService.addScrap(savedPostId, request);
        boolean cancelScrap = scrapService.addScrap(savedPostId, null);

        //then
        assertThat(isScrap).isEqualTo(true);
        System.out.println("=======================================================================");
        assertThat(cancelScrap).isEqualTo(false);

    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글 좋아요 취소 테스트")
    @Test
    public void deleteScrapTest() throws Exception {
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

        // 좋아요 완료
        boolean isScrap = scrapService.addScrap(savedPostId, request);

        //when
        scrapService.deleteScrap(savedPostId);

        //then


    }

    @WithAccount("creamyyyy")
    @DisplayName("게시글 스크랩시 스크랩 개수 확인")
    @Test
    public void countScrapTest() throws Exception {
        //given
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


        //when
        // 좋아요 완료
        boolean isScrap = scrapService.addScrap(savedPostId, request);
        scrapService.deleteScrap(savedPostId);

        Post resultPost = postRepository.findById(savedPostId).get();

        //then
//        assertThat(resultPost.getScrap_count()).isEqualTo(1);
        assertThat(resultPost.getScrap_count()).isEqualTo(0);


    }

    @WithAccount("creamyyyy")
    @DisplayName("좋아요한 게시글의 정보 리스트 가져오기")
    @Test
    public void getScrapTest() throws Exception {
        //given
        List<Long> postIdList = createAndSavePostList();
        List<ScrapReqAdd> scrapReq = createScrapReq();
        int iter = 0;

        for (Long id : postIdList) {
            scrapService.addScrap(id, scrapReq.get(iter++));
        }

        //when
//        List<ScrapResCal> list = scrapService.getScrap(null, null);
//        List<ScrapResCal> list = scrapService.getScrap("2023", "1");
//        List<ScrapResCal> list = scrapService.getScrap("2023", "1");
//        List<ScrapResCal> list = scrapService.getScrap("2023", "3");
//        List<ScrapResCal> list = scrapService.getScrap("2023", "1");
        List<ScrapResCal> list = scrapService.getScrap("2022", "12");

        //then
//        assertThat(list.size()).isEqualTo(7);
//        assertThat(list.size()).isEqualTo(7);
//        assertThat(list.size()).isEqualTo(4);
//        assertThat(list.size()).isEqualTo(3);
//        assertThat(list.size()).isEqualTo(6);
//        assertThat(list.size()).isEqualTo(5);
        assertThat(list.size()).isEqualTo(2);

    }

    private List<ScrapReqAdd> createScrapReq() {
        List<ScrapReqAdd> list = new ArrayList<>();

        // 시작: 이번달, 끝: 이번달
        ScrapReqAdd reqAdd1 = createScrapReqAdd(2022, 2023, 11, 3, 5, 10);
        list.add(reqAdd1);
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
        list.add(reqAdd5);

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


    @Test
    public void testCode() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        int year = now.getYear();
        Month month = now.getMonth();
        int monthValue = now.getMonthValue();
        int dayOfMonth = now.getDayOfMonth();
        DayOfWeek dayOfWeek = now.getDayOfWeek();
        int dayOfYear = now.getDayOfYear();
        System.out.println("year = " + year);
        System.out.println("monthValue = " + monthValue);
        System.out.println("month = " + month);
        System.out.println("dayOfMonth = " + dayOfMonth);
        System.out.println("dayOfWeek = " + dayOfWeek);
        System.out.println("dayOfYear = " + dayOfYear);

    }


    private List<Long> createAndSavePostList() throws Exception {
        List<Long> list = new ArrayList<>();

        for(int i=1; i<3; i++) {
            Post post1 = createBasicPost("title" + i, "content" + i, "강연", "서울", "숭실대학교",
                    "숭실대", "2023-02-25 12:10:00", "2023-02-25 12:20:00");
            SaveResPost savedPost = postService.savePost(post1, null);
            list.add(savedPost.getPost_id());
        }

        for(int i=3; i<5; i++) {
            Post post2 = createBasicPost("title" + i, "content" + i, "축제", "서울", "숭실대학교",
                    "숭실대", "2023-01-25 12:10:00", "2022-02-25 12:20:00");
            SaveResPost saveResPost = postService.savePost(post2, null);
            list.add(saveResPost.getPost_id());
        }

        for(int i=5; i<7; i++) {
            Post post3 = createBasicPost("title" + i, "content" + i, "전시", "서울", "중앙대학교",
                    "중앙대", "2022-02-25 12:10:00", "2022-03-25 12:10:00");
            SaveResPost savedPost = postService.savePost(post3, null);
            list.add(savedPost.getPost_id());
        }

        for(int i=7; i<9; i++) {
            Post post2 = createBasicPost("title" + i, "content" + i, "대회", "대전", "대전대학교",
                    "대전대", "2022-01-25 12:10:00", "2022-03-25 12:10:00");
            SaveResPost saveResPost = postService.savePost(post2, null);
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


}