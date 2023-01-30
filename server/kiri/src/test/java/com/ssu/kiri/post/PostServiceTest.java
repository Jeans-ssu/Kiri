package com.ssu.kiri.post;

import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
//@Rollback(false)
class PostServiceTest {

    @PersistenceContext
    EntityManager em;

    @Autowired PostRepository postRepository;
    @Autowired MemberRepository memberRepository;
    @Autowired PostService postService;

    @BeforeEach
    void beforeEach() {
        Member member = Member.builder()
                .email("love3@aaa.com")
                .password("qqqqqq33333")
                .interest("IT")
                .username("love3")
                .build();

        em.persist(member);

        Post post = Post.builder()
                .title("봄봄")
                .member(member)
                .content("내용내용내용내용")
                .category("공모전")
                .field("IT")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
        em.persist(post);
    }

    @AfterEach
    void afterEach() {
        postRepository.deleteAll();
        memberRepository.deleteAll();
    }


    // 게시글 상세보기 테스트
    //    @WithAccount("username")
    @DisplayName("게시글 상세보기")
    @Test
    public void detailPost() throws Exception {
        //given
        // beforeEach

        //when
        Post post = postService.detailPost(1L);

        //then
//        assertThat(post.getId()).isEqualTo(1L);
        assertThat(post.getTitle()).isEqualTo("봄봄");
        assertThat(post.getMember().getUsername()).isEqualTo("love3");

    }


    // 게시글 등록 테스트
    @DisplayName("게시글 등록")
    @Test
    public void savePost() throws Exception {
        //given

        //when

        //then

    }








}