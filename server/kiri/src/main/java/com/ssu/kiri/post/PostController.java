package com.ssu.kiri.post;


import com.ssu.kiri.post.dto.PostReqDto;
import com.ssu.kiri.post.dto.PostResDto;
import com.ssu.kiri.post.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;

    // home 화면
    @GetMapping("/home")
    public ResponseEntity<?> home() {

        return null;
    }

    // 게시글 상세보기
    @GetMapping("/posts/read/{post-id}")
    public ResponseEntity detailPost(@PathVariable("post-id") Long post_id) {
        Post post = postService.detailPost(post_id);
        return ResponseEntity.ok(postMapper.toPostResDto(post));
    }

    // 게시글 등록
    @PostMapping("/api/posts")
    public ResponseEntity savePost(@Valid @RequestBody PostReqDto.savePost savePost) {

        Post post = postMapper.saveToPost(savePost);
        Post savedPost = postService.savePost(post);
        PostResDto.savePost savedPostDto = postMapper.postToSave(savedPost);
        savedPostDto.setPost_id(savedPost.getId());
        savedPostDto.setMember_id(savedPost.getMember().getId());

        return ResponseEntity.ok(savedPostDto);
    }

    // 게시글 수정
    @PostMapping("/api/posts/{post-id}")
    public ResponseEntity updatePost(@PathVariable("post-id") Long post_id,
                                     @Valid @RequestBody PostReqDto.savePost savePost) {
        Post post = postMapper.saveToPost(savePost);
        Post result = postService.updatePost(post, post_id);

        return ResponseEntity.ok(result);
    }

    // 게시글 삭제
    @DeleteMapping("/api/posts/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") Long post_id) {
        postService.deletePost(post_id);

        return new ResponseEntity("게시글 삭제 완료", HttpStatus.NO_CONTENT); // 응답바디 무시
    }




}
