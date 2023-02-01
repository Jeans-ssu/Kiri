package com.ssu.kiri.post;


import com.ssu.kiri.post.dto.request.SavePost;
import com.ssu.kiri.post.dto.response.DetailPost;
import com.ssu.kiri.post.dto.response.SaveResPost;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    public ResponseEntity savePost(@Valid @RequestBody SavePost savePost) {

//        Post post = postMapper.saveToPost(savePost);
        Post post = Post.builder()
                .title(savePost.getTitle())
                .scrap_count(savePost.getScrap_count())
                .content(savePost.getContent())
                .category(savePost.getCategory())
                .field(savePost.getField())
                .organizer(savePost.getOrganizer())
                .link(savePost.getLink())
                .place(savePost.getPlace())
                .startPostTime(savePost.getStartPostTime())
                .finishPostTime(savePost.getFinishPostTime())
                .build();

        Post savedPost = postService.savePost(post);
//        PostResDto.savePost savedPostDto = postMapper.postToSave(savedPost);
        SaveResPost resultPost = SaveResPost.of(savedPost);

//        savedPostDto.setPost_id(savedPost.getId());
        resultPost.setMember_id(savedPost.getMember().getId());

        return ResponseEntity.ok(resultPost);
    }

    // 게시글 수정
    @PostMapping("/api/posts/{post-id}")
    public ResponseEntity<?> updatePost(@PathVariable("post-id") Long post_id,
                                     @Valid @RequestBody SavePost savePost) {
//        Post post = postMapper.saveToPost(savePost);
        Post post = Post.builder()
                .title(savePost.getTitle())
                .scrap_count(savePost.getScrap_count())
                .content(savePost.getContent())
                .category(savePost.getCategory())
                .field(savePost.getField())
                .organizer(savePost.getOrganizer())
                .link(savePost.getLink())
                .place(savePost.getPlace())
                .startPostTime(savePost.getStartPostTime())
                .finishPostTime(savePost.getFinishPostTime())
                .build();

        return ResponseEntity.ok(postService.updatePost(post, post_id));
    }

    // 게시글 삭제
    @DeleteMapping("/api/posts/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") Long post_id) {
        postService.deletePost(post_id);

        return new ResponseEntity("게시글 삭제 완료", HttpStatus.NO_CONTENT); // 응답바디 무시
    }






}
