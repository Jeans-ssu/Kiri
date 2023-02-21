package com.ssu.kiri.scrap;

import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.post.PostService;
import com.ssu.kiri.post.dto.response.SaveResPost;
import com.ssu.kiri.scrap.dto.ScrapReqAdd;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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
        boolean isScrap = scrapService.addScrap(savedPostId, request);

        //then
        assertThat(isScrap).isEqualTo(true);

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



}