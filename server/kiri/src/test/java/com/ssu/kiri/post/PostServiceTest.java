package com.ssu.kiri.post;

import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.image.ImageRepository;
import com.ssu.kiri.image.ImageService;
import com.ssu.kiri.image.dto.ImageResDto;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.dto.request.SavePost;
import com.ssu.kiri.post.dto.response.SaveResPost;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    @Autowired ImageService imageService;
    @Autowired ImageRepository imageRepository;

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
        imageRepository.deleteAll();
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


    // 게시글 등록 테스트 : 이미지가 있을 경우
    @WithAccount("creamyyy")
    @DisplayName("게시글 등록 : 이미지가 있을 경우")
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


        Post post = createPostOne();
        List<MultipartFile> list = createMockMultipartFiles();
        List<ImageResDto> imageResDtoList = imageService.addFile(list);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());


        //when
        SaveResPost savedPost = postService.savePost(post, imageIdList);


        //then
        assertThat(savedPost.getCategory()).isEqualTo(post.getCategory());
        assertThat(savedPost.getSavedImgList().size()).isEqualTo(2);
        Long member_id = savedPost.getMember_id();
        Member member = memberRepository.findById(member_id).get();
        assertThat(member.getUsername()).isEqualTo("creamyyy");

    }

    // 게시글 등록 테스트 : 이미지가 없을 경우
    @WithAccount("creamyyy")
    @DisplayName("게시글 등록 : 이미지가 없을 경우")
    @Test
    public void savePostWithoutImage() throws Exception {
        //given
        Post post = createPostOne();

        //when
        SaveResPost savedPost = postService.savePost(post, null);


        //then
        assertThat(savedPost.getCategory()).isEqualTo(post.getCategory());
        assertThat(savedPost.getSavedImgList()).isNullOrEmpty();
        Long member_id = savedPost.getMember_id();
        Member member = memberRepository.findById(member_id).get();
        assertThat(member.getUsername()).isEqualTo("creamyyy");

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

        List<Long> imageIdList = new ArrayList<>();
        imageIdList.add(1L);

        // 기존 post 저장
        SaveResPost savedPost = postService.savePost(post2, imageIdList);

        Long savedPostId = savedPost.getPost_id();
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
        SaveResPost saveResPost = postService.updatePost(newPost, savedPostId, imageIdList);

        //then
        assertThat(saveResPost.getTitle()).isEqualTo("혜안");
        assertThat(saveResPost.getPost_id()).isEqualTo(savedPostId);
//        assertThat(saveResPost.getMember().getUsername()).isEqualTo("creamyyy");


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

        List<Long> imageIdList = new ArrayList<>();
        imageIdList.add(1L);

        // 기존 post 저장
        SaveResPost savedPost = postService.savePost(post2, imageIdList);


        //when
        Long post_id = savedPost.getPost_id();
        postService.deletePost(post_id);

        //then
        Optional<Post> deletePost = postRepository.findById(post_id);
        assertThat(deletePost).isEqualTo(Optional.empty());

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

    private SavePost createSavePost() {
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

        return savePost;
    }

    private Post createPostOne() {
        return Post.builder()
                .title("우주하마")
                .content("자세가 곧 스킬인 게임")
                .category("지역")
                .event("강연")
                .local("서울")
                .school("숭실대학교")
                .organizer("하마")
                .startPostTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .finishPostTime(LocalDateTime.parse("2022-11-25 12:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }




}