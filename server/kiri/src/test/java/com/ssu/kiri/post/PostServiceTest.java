package com.ssu.kiri.post;

import com.ssu.kiri.config.S3MockConfig;
import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.image.Image;
import com.ssu.kiri.image.ImageRepository;
import com.ssu.kiri.image.ImageService;
import com.ssu.kiri.image.dto.ImageResDto;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.dto.request.SavePost;
import com.ssu.kiri.post.dto.response.ClassifyPost;
import com.ssu.kiri.post.dto.response.SaveResPost;
import com.ssu.kiri.scrap.Scrap;
import com.ssu.kiri.scrap.ScrapRepository;
import com.ssu.kiri.scrap.ScrapService;
import com.ssu.kiri.scrap.dto.ScrapReqAdd;
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


@Import({TestConfig.class, S3MockConfig.class})
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
    @Autowired ScrapService scrapService;
    @Autowired ScrapRepository scrapRepository;

//    @WithAccount("creamyyy")
//    @BeforeEach
//    void createPosts() {
//
//
//    }


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
        assertThat(savedPost.getEvent()).isEqualTo(post.getEvent());
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
        assertThat(savedPost.getEvent()).isEqualTo(post.getEvent());
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
        Long member_id = savedPost.getMember_id();

        Member member1 = memberRepository.findById(member_id).get();
        List<Post> postList = member1.getPostList();
        for (Post post1 : postList) {
            System.out.println("post1.getTitle() = " + post1.getTitle());
        }
//        System.out.println("member.getPostList() = " + member1.getPostList());

        ScrapReqAdd request = new ScrapReqAdd();
        request.setStartScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        request.setEndScrapTime(LocalDateTime.parse("2022-11-25 12:10:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        scrapService.addScrap(post_id, request);

        //when
        postService.deletePost(post_id);

        //then
        Optional<Post> deletePost = postRepository.findById(post_id);
        assertThat(deletePost).isEqualTo(Optional.empty());

        List<Image> resultList = imageRepository.findUrlByPostId(post_id);
        System.out.println("resultList = " + resultList); // []
        assertThat(resultList).isNullOrEmpty();

        List<Scrap> scrapByPostId = scrapRepository.findScrapByPostId(post_id);
        assertThat(scrapByPostId).isNullOrEmpty();

        Member member = memberRepository.findById(member_id).get();
        assertThat(member.getPostList()).isNullOrEmpty();
        System.out.println("member.getPostList() = " + member.getPostList());
    }

    @WithAccount("creamyyy")
    @DisplayName("카테고리별 조회 테스트: 지역,서울,강연")
    @Test
    public void categoryPost() throws Exception {
        //given
        // post 리스트 등록
        for(int i=0; i<5; i++) {
            Post post1 = createBasicPost("title" + i, "content" + i, "강연", "서울", "숭실대학교", "숭실대");
            List<MultipartFile> updateBeforeList = createMockMultipartFile1();
            List<ImageResDto> imageResDtoList = imageService.addFile(updateBeforeList);
            List<Long> imageIdList = imageResDtoList.stream()
                    .map(img -> img.getImage_id())
                    .collect(Collectors.toList());
            SaveResPost savedPost = postService.savePost(post1, imageIdList);

        }
        for(int i=5; i<10; i++) {
            Post post2 = createBasicPost("title" + i, "content" + i, "축제", "부산", "부산대학교", "부산대");
            SaveResPost saveResPost = postService.savePost(post2, null);
        }

        List<String> eventList = new ArrayList<>();
        eventList.add("강연");

        //when
        // division: 지역, category: 서울, eventList: 강연
        List<ClassifyPost> classifyPosts = postService.classifyPost("지역", "서울", eventList);

        //then
        assertThat(classifyPosts.size()).isEqualTo(5);
        for (ClassifyPost classifyPost : classifyPosts) {
            System.out.println("classifyPost.getTitle() = " + classifyPost.getTitle());
        }

    }

    @WithAccount("creamyyy")
    @DisplayName("카테고리별 조회 테스트: null,null,null")
    @Test
    public void categoryPostWithout() throws Exception {
        //given
        // post 리스트 등록
        createAndSavePostList();

        List<String> eventList = new ArrayList<>();
        eventList.add("강연");

        //when
        // division: 지역, category: 서울, eventList: 강연
        List<ClassifyPost> classifyPosts = postService.classifyPost(null, null, null);

        //then
        assertThat(classifyPosts.size()).isEqualTo(8);
        for (ClassifyPost classifyPost : classifyPosts) {
            System.out.println("classifyPost.getTitle() = " + classifyPost.getTitle());
        }

    }

    @WithAccount("creamyyy")
    @DisplayName("카테고리별 조회 테스트: 학교 ,숭실대학교, null")
    @Test
    public void categoryPostWithSchool() throws Exception {
        //given
        // post 리스트 등록
        createAndSavePostList();

        //when
        // division: 지역, category: 서울, eventList: 강연
        List<ClassifyPost> classifyPosts = postService.classifyPost("학교", "숭실대학교", null);

        //then
        assertThat(classifyPosts.size()).isEqualTo(4);
        for (ClassifyPost classifyPost : classifyPosts) {
            System.out.println("classifyPost = " + classifyPost);
        }

    }

    @WithAccount("creamyyy")
    @DisplayName("카테고리별 조회 테스트: 지역 ,대전 ,null")
    @Test
    public void categoryPostWithLocal() throws Exception {
        //given
        // post 리스트 등록
        createAndSavePostList();

        //when
        // division: 지역, category: 서울, eventList: 강연
        List<ClassifyPost> classifyPosts = postService.classifyPost("지역", "대전", null);

        //then
        assertThat(classifyPosts.size()).isEqualTo(2);
        for (ClassifyPost classifyPost : classifyPosts) {
            System.out.println("classifyPost = " + classifyPost);
        }

    }

    @WithAccount("creamyyy")
    @DisplayName("카테고리별 조회 테스트: null, null, 축제")
    @Test
    public void categoryPostWithEvent() throws Exception {
        //given
        // post 리스트 등록
        createAndSavePostList();
        List<String> eventList = new ArrayList<>();
        eventList.add("축제");

        //when
        // division: 지역, category: 서울, eventList: 강연
        List<ClassifyPost> classifyPosts = postService.classifyPost(null, null, eventList);

        //then
        assertThat(classifyPosts.size()).isEqualTo(2);
        for (ClassifyPost classifyPost : classifyPosts) {
            System.out.println("classifyPost = " + classifyPost);
        }

    }

    @WithAccount("creamyyy")
    @DisplayName("카테고리별 조회 테스트: 학교, 숭실대학교, [강연,축제]")
    @Test
    public void categoryPostWithCSE() throws Exception {
        //given
        // post 리스트 등록
        createAndSavePostList();
        List<String> eventList = new ArrayList<>();
        eventList.add("강연");
        eventList.add("축제");

        //when
        // division: 지역, category: 서울, eventList: 강연
        List<ClassifyPost> classifyPosts = postService.classifyPost("학교", "숭실대학교", eventList);

        //then
        assertThat(classifyPosts.size()).isEqualTo(4);
        for (ClassifyPost classifyPost : classifyPosts) {
            System.out.println("classifyPost = " + classifyPost);
        }

    }

    @WithAccount("creamyyy")
    @DisplayName("카테고리별 조회 테스트: 지역, 서울, [강연,축제,전시,대회]")
    @Test
    public void categoryPostWithCLE() throws Exception {
        //given
        // post 리스트 등록
        createAndSavePostList();
        List<String> eventList = new ArrayList<>();
        eventList.add("강연");
        eventList.add("축제");
        eventList.add("전시");
        eventList.add("대회");

        //when
        // division: 지역, category: 서울, eventList: 강연
        List<ClassifyPost> classifyPosts = postService.classifyPost("지역", "서울", eventList);

        //then
        assertThat(classifyPosts.size()).isEqualTo(6);
        for (ClassifyPost classifyPost : classifyPosts) {
            System.out.println("classifyPost = " + classifyPost);
        }

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
            Post post2 = createBasicPost("title" + i, "content" + i, "축제", "서울", "숭실대학교", "숭실대");
            SaveResPost saveResPost = postService.savePost(post2, null);
        }

        for(int i=5; i<7; i++) {
            Post post3 = createBasicPost("title" + i, "content" + i, "전시", "서울", "중앙대학교", "중앙대");
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
        List<ClassifyPost> classifyPosts = postService.searchPost("T");

        //then
        assertThat(classifyPosts.size()).isEqualTo(5);
        for (ClassifyPost classifyPost : classifyPosts) {
            System.out.println("classifyPost = " + classifyPost);
        }

    }


}