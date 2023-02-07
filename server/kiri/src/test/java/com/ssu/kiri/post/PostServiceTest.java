package com.ssu.kiri.post;

import com.ssu.kiri.config.TestConfig;
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
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@Import({TestConfig.class})
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
                .username("love3")
                .local("서울")
                .department("대학생")
                .school("숭실대학교")
                .build();

        em.persist(member);

        Post post = Post.builder()
                .title("봄봄")
//                .member(member)
                .content("내용내용내용내용")
                .category("지역")
                .event("축제")
                .local("서울")
                .school("숭실대학교")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
        post.createPost(member);
        em.persist(post);
    }

    @AfterEach
    void afterEach() {
        postRepository.deleteAll();
        memberRepository.deleteAll();
    }

    @Test
    public void testFiles() throws Exception {
        //given
        System.out.println("File's AbsolutePath = " + new File("").getAbsolutePath());
        System.out.println("File.separator = " + File.separator);
        //when

        //then

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
    @WithAccount("creamyyy")
    @DisplayName("게시글 등록")
    @Test
    public void savePost() throws Exception {
        //given
        Optional<Member> optMember = memberRepository.findByEmail("creamyyy@aaa.com");
        if(optMember.isEmpty()) {
            throw new RuntimeException("해당 이메일을 가진 멤버를 찾을 수 없습니다.");
        }
        Member member2 = optMember.get();

        System.out.println("======================================================");
        System.out.println("member2.getUsername() = " + member2.getUsername());

//        Post post2 = new Post();
//        Post newPost = post2.createPostTest("가을이 오면", "눈부신 아침햇살에 비친 그대의 미소가 아름다워요", "지역 축제", "IT",
//                "주최자는 나야 둘이 될 수 없어", LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
//                LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));


        Post post2 = Post.builder()
                .title("가을이 오면")
//                .member(member2)
                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
                .category("지역")
                .event("축제")
                .local("서울")
                .school("숭실대학교")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
//        em.persist(post2);


        //when
        Post savedPost = postService.savePost(post2);


        //then
//
        assertThat(savedPost.getTitle()).isEqualTo(post2.getTitle());
        assertThat(savedPost.getMember().getUsername()).isEqualTo("creamyyy");
        assertThat(savedPost.getTitle()).isEqualTo("가을이 오면");

    }


    @WithAccount("creamyyy")
    @DisplayName("게시글 수정")
    @Test
    public void updatePost() throws Exception {
        //given
        // creamyyy 가 post 등록.
        Post post2 = Post.builder()
                .title("가을이 오면")
                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
                .category("지역")
                .event("축제")
                .local("서울")
                .school("숭실대학교")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();

        // 기존 post 저장
        Post savedPost = postService.savePost(post2);

        Long savedPostId = savedPost.getId();
        System.out.println("savedPostId = " + savedPostId);

        // 업데이트할 newPost 생성
        Post newPost = Post.builder()
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


        //when
        Post updatePost = postService.updatePost(newPost, savedPostId);

        //then
        assertThat(updatePost.getTitle()).isEqualTo("혜안");
        assertThat(updatePost.getId()).isEqualTo(savedPostId);
        assertThat(updatePost.getMember().getUsername()).isEqualTo("creamyyy");


    }


    @WithAccount("creamyyy")
    @DisplayName("게시글 삭제")
    @Test
    public void deletePost() throws Exception {
        //given
        // creamyyy 가 post 등록.
        Post post2 = Post.builder()
                .title("가을이 오면")
                .content("눈부신 아침햇살에 비친 그대의 미소가 아름다워요")
                .category("지역")
                .event("축제")
                .local("서울")
                .school("숭실대학교")
                .organizer("주최자는 나야 둘이 될 수 없어")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();

        // 기존 post 저장
        Post savedPost = postService.savePost(post2);


        //when
        Long post_id = savedPost.getId();
        postService.deletePost(post_id);

        //then
        Optional<Post> deletePost = postRepository.findById(post_id);
        assertThat(deletePost).isEqualTo(Optional.empty());

    }





}