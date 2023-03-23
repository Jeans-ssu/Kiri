package com.ssu.kiri.post;


import com.ssu.kiri.member.Member;
import com.ssu.kiri.post.dto.request.SavePost;
import com.ssu.kiri.post.dto.response.ClassifyPost;
import com.ssu.kiri.post.dto.response.DetailPost;
import com.ssu.kiri.post.dto.response.MyPostDto;
import com.ssu.kiri.post.dto.response.SaveResPost;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public ResponseEntity detailPost(@PathVariable("post-id") Long post_id, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        if(member == null) {
            DetailPost detailPost = postService.detailPost(post_id, null);
        }
        DetailPost detailPost = postService.detailPost(post_id, member);
        return ResponseEntity.ok(detailPost);
    }


    // 게시글 등록
    @PostMapping("/api/posts")
    public ResponseEntity savePost(@Valid @RequestBody SavePost savePost) {

        List<Long> imageIdList = savePost.getImageIdList();

        /*Post post = Post.builder()
                .title(savePost.getTitle())
                .scrap_count(savePost.getScrap_count())
                .content(savePost.getContent())
                .event(savePost.getEvent())
                .school(savePost.getSchool())
                .local(savePost.getLocal())
                .organizer(savePost.getOrganizer())
                .link(savePost.getLink())
                .place(savePost.getPlace())
                .startPostTime(savePost.getStartPostTime())
                .finishPostTime(savePost.getFinishPostTime())
                .build();
*/
        SaveResPost saveResPost = postService.savePost(savePost, imageIdList);

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
        /*Post post = Post.builder()
                .title(savePost.getTitle())
                .scrap_count(savePost.getScrap_count())
                .content(savePost.getContent())
                .event(savePost.getEvent())
                .school(savePost.getSchool())
                .local(savePost.getLocal())
                .organizer(savePost.getOrganizer())
                .link(savePost.getLink())
                .contactNumber(savePost.getContactNumber())
                .place(savePost.getPlace())
                .startPostTime(savePost.getStartPostTime())
                .finishPostTime(savePost.getFinishPostTime())
                .build();*/

        SaveResPost saveResPost = postService.updatePost(savePost, post_id, imageIdList);
        return ResponseEntity.ok(saveResPost);
    }

    // 게시글 삭제
    @DeleteMapping("/api/posts/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") Long post_id) {
        postService.deletePost(post_id);

        return new ResponseEntity("게시글 삭제 완료", HttpStatus.NO_CONTENT); // 응답바디 무시
    }


//    @RequestMapping(value = "/posts", method = RequestMethod.GET)
    @GetMapping("/posts")//({"/posts", "/posts/{division}", "/posts/{division}/{category}", "posts/{division}/{category}/{event}"})
    public ResponseEntity classifyPost(//@PathVariable(value = "division", required = false) String division, @PathVariable(value = "category", required = false) String category, @PathVariable(value = "event", required = false) List<String> eventList
                                       @RequestParam(value = "division", required = false, defaultValue = "") String division,
                                       @RequestParam(value = "category", required = false, defaultValue = "") String category,
                                       @RequestParam(value = "eventList", required = false) List<String> eventList) {
        // division - 학교, 지역
        // category 에는 어떤 학교인지 또는 어떤 지역인지
        // eventList 에는 강연, 강의 등등..
        List<ClassifyPost> classifyPosts = postService.classifyPost(division, category, eventList);

        return ResponseEntity.ok(classifyPosts);
    }

    @GetMapping("/posts/search")
    public ResponseEntity searchPost(@RequestParam("relation") String relation) {
        List<ClassifyPost> posts = postService.searchPost(relation);

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/api/posts/mypost")
    public ResponseEntity getMyPost() {
        List<MyPostDto> posts = postService.getMyPost();

        return ResponseEntity.ok(posts);
    }

}
