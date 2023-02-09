package com.ssu.kiri.post;


import com.ssu.kiri.post.dto.request.SavePost;
import com.ssu.kiri.post.dto.response.DetailPost;
import com.ssu.kiri.post.dto.response.SaveResPost;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // home 화면
    @GetMapping("/home")
    public ResponseEntity<?> home() {

        return null;
    }

    // 게시글 상세보기
    @GetMapping("/posts/read/{post-id}")
    public ResponseEntity detailPost(@PathVariable("post-id") Long post_id) {
        Post post = postService.detailPost(post_id);

        return ResponseEntity.ok(DetailPost.of(post));
    }

    // 게시글 등록
    @PostMapping("/api/posts")
    public ResponseEntity savePost(@Valid @RequestBody SavePost savePost,
                                   List<MultipartFile> multipartFiles) {

        List<Long> imageIdList = savePost.getImageIdList();

        Post post = Post.builder()
                .title(savePost.getTitle())
                .scrap_count(savePost.getScrap_count())
                .content(savePost.getContent())
                .category(savePost.getCategory())
                .event(savePost.getEvent())
                .school(savePost.getSchool())
                .local(savePost.getLocal())
                .organizer(savePost.getOrganizer())
                .link(savePost.getLink())
                .place(savePost.getPlace())
                .startPostTime(savePost.getStartPostTime())
                .finishPostTime(savePost.getFinishPostTime())
                .build();

        SaveResPost saveResPost = postService.savePost(post, imageIdList);

        //=====================이거 꼭 써야 하나?======================//
//        saveResPost.setMember_id(saveResPost.getMember().getId());
        //=====================이거 꼭 써야 하나?======================//


        return ResponseEntity.ok(saveResPost);
    }

    // 게시글 수정
    @PostMapping("/api/posts/{post-id}")
    public ResponseEntity<?> updatePost(@PathVariable("post-id") Long post_id,
                                     @Valid @RequestBody SavePost savePost) {

        List<Long> imageIdList = savePost.getImageIdList();

//        Post post = postMapper.saveToPost(savePost);
        Post post = Post.builder()
                .title(savePost.getTitle())
                .scrap_count(savePost.getScrap_count())
                .content(savePost.getContent())
                .category(savePost.getCategory())
                .event(savePost.getEvent())
                .school(savePost.getSchool())
                .local(savePost.getLocal())
                .organizer(savePost.getOrganizer())
                .link(savePost.getLink())
                .contactNumber(savePost.getContactNumber())
                .place(savePost.getPlace())
                .startPostTime(savePost.getStartPostTime())
                .finishPostTime(savePost.getFinishPostTime())
                .build();

        SaveResPost saveResPost = postService.updatePost(post, post_id, imageIdList);
        return ResponseEntity.ok(saveResPost);
    }

    // 게시글 삭제
    @DeleteMapping("/api/posts/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") Long post_id) {
        postService.deletePost(post_id);

        return new ResponseEntity("게시글 삭제 완료", HttpStatus.NO_CONTENT); // 응답바디 무시
    }






}
