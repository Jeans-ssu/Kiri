package com.ssu.kiri.post;

import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.image.Image;
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
    @WithAccount("username")
    @DisplayName("게시글 상세보기 테스트")
    @Test
    public void detailPost() throws Exception {
        //given

        // 게시글 저장
        Post post = createPostOne();
        List<MultipartFile> list = createMockMultipartFiles();
        List<ImageResDto> imageResDtoList = imageService.addFile(list);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        SaveResPost savedPost = postService.savePost(post, imageIdList);
        Long post_id = savedPost.getPost_id();

        //when - 게시글 상세보기
        SaveResPost saveResPost = postService.detailPost(post_id);

        //then
        assertThat(saveResPost.getPost_id()).isEqualTo(post_id);
        assertThat(saveResPost.getSavedImgList().size()).isEqualTo(2);
        assertThat(saveResPost.getTitle()).isEqualTo(post.getTitle());
        assertThat(saveResPost.getTitle()).isEqualTo("혜안");

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
    @DisplayName("게시글 수정 : 이미지 존재O -> 이미지 존재O")
    @Test
    public void updatePost() throws Exception {
        //given

        Post post = createPostOne();
        List<MultipartFile> updateBeforeList = createMockMultipartFile1();
        List<ImageResDto> imageResDtoList = imageService.addFile(updateBeforeList);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        SaveResPost savedPost = postService.savePost(post, imageIdList);
        Long savedPostId = savedPost.getPost_id();
        System.out.println("savedPostId = " + savedPostId);


        // 업데이트 할 Post 내용
        Post postTwo = createPostTwo();
        List<MultipartFile> updateAfterList = createMockMultipartFile2();
        List<ImageResDto> imageResDtoList2 = imageService.addFile(updateAfterList);
        List<Long> imageIdList2 = imageResDtoList2.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());


        //when
        SaveResPost saveResPost = postService.updatePost(postTwo, savedPostId ,imageIdList2);

        //then
        assertThat(saveResPost.getPost_id()).isEqualTo(savedPostId);
        assertThat(saveResPost.getSavedImgList().size()).isEqualTo(1);
        System.out.println("saveResPost.getSavedImgList() = " + saveResPost.getSavedImgList());
        Long member_id = savedPost.getMember_id();
        Member member = memberRepository.findById(member_id).get();
        assertThat(member.getUsername()).isEqualTo("creamyyy");


    }

    @WithAccount("creamyyy")
    @DisplayName("게시글 수정 : 이미지 존재X -> 이미지 존재O")
    @Test
    public void updatePostXO() throws Exception {
        //given

        Post post = createPostOne();

        SaveResPost savedPost = postService.savePost(post, null);
        Long savedPostId = savedPost.getPost_id();
        System.out.println("savedPostId = " + savedPostId);


        // 업데이트 할 Post 내용
        Post postTwo = createPostTwo();
        List<MultipartFile> updateAfterList = createMockMultipartFiles();
        List<ImageResDto> imageResDtoList2 = imageService.addFile(updateAfterList);
        List<Long> imageIdList2 = imageResDtoList2.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());


        //when
        SaveResPost saveResPost = postService.updatePost(postTwo, savedPostId ,imageIdList2);

        //then
        assertThat(saveResPost.getPost_id()).isEqualTo(savedPostId);
        assertThat(saveResPost.getSavedImgList().size()).isEqualTo(2);
        System.out.println("saveResPost.getSavedImgList() = " + saveResPost.getSavedImgList());
        Long member_id = savedPost.getMember_id();
        Member member = memberRepository.findById(member_id).get();
        assertThat(member.getUsername()).isEqualTo("creamyyy");


    }

    @WithAccount("creamyyy")
    @DisplayName("게시글 수정 : 이미지 존재O , 이미지 수정 X")
    @Test
    public void updatePostOX() throws Exception {
        //given

        Post post = createPostOne();
        List<MultipartFile> updateBeforeList = createMockMultipartFile1();
        List<ImageResDto> imageResDtoList = imageService.addFile(updateBeforeList);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        SaveResPost savedPost = postService.savePost(post, imageIdList);
        Long savedPostId = savedPost.getPost_id();
        System.out.println("savedPostId = " + savedPostId);


        // 업데이트 할 Post 내용
        Post postTwo = createPostTwo();

        //when
        SaveResPost saveResPost = postService.updatePost(postTwo, savedPostId ,null);

        //then
        assertThat(saveResPost.getPost_id()).isEqualTo(savedPostId);
        assertThat(saveResPost.getSavedImgList().size()).isEqualTo(1);
        System.out.println("saveResPost.getSavedImgList() = " + saveResPost.getSavedImgList());
        Long member_id = savedPost.getMember_id();
        Member member = memberRepository.findById(member_id).get();
        assertThat(member.getUsername()).isEqualTo("creamyyy");


    }

    @WithAccount("creamyyy")
    @DisplayName("게시글을 수정 : 게시글에 이미지가 있었는데 삭제해서 이미지가 없는채로 저장하고 싶은 경우")
    @Test
    public void updatePostWithDelete() throws Exception {
        //given
        Post post = createPostOne();
        List<MultipartFile> updateBeforeList = createMockMultipartFile1();
        List<ImageResDto> imageResDtoList = imageService.addFile(updateBeforeList);
        List<Long> imageIdList = imageResDtoList.stream()
                .map(img -> img.getImage_id())
                .collect(Collectors.toList());

        SaveResPost savedPost = postService.savePost(post, imageIdList);
        Long savedPostId = savedPost.getPost_id();
        System.out.println("savedPostId = " + savedPostId);

        // 저장된 포스트에서 이미지를 삭제하고 다시 저장(수정) 시도
        imageService.deleteUpdateImage(1L);
        Post postTwo = createPostTwo();

        //when
        SaveResPost saveResPost = postService.updatePost(postTwo, savedPostId ,null);

        //then
        assertThat(saveResPost.getSavedImgList()).isNullOrEmpty();
        assertThat(saveResPost.getPost_id()).isEqualTo(savedPostId);
        Long member_id = savedPost.getMember_id();
        Member member = memberRepository.findById(member_id).get();
        assertThat(member.getUsername()).isEqualTo("creamyyy");
    }


    @WithAccount("creamyyy")
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
        Long post_id = savedPost.getPost_id();

        //when
        postService.deletePost(post_id);

        //then
        Optional<Post> deletePost = postRepository.findById(post_id);
        assertThat(deletePost).isEqualTo(Optional.empty());
        List<Image> resultList = imageRepository.findUrlByPostId(post_id);
        System.out.println("resultList = " + resultList); // []
        assertThat(resultList).isNullOrEmpty();

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