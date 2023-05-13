package com.ssu.kiri.post.dto.response;


import com.ssu.kiri.post.Post;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// 게시글 등록
@Data
@AllArgsConstructor
public class SaveResPost {

    private Long post_id;
    private Long member_id;

    private String title; // 글 제목
    private int scrap_count; // 스크랩 수
    private String content; // 글 내용

    private String event; // 작은 카테고리 (축제, 전시, 대회, 강연, 공연, 기타 등)
    private String local; // 지역
    private String school; // 학교

    private String organizer; // 주최자
    private String contactNumber; // 연락처
    private String link; // 참고링크
    private String place; // 장소
    private List<String> savedImgList = new ArrayList<>(); // 이미지 url 리스트

    private LocalDateTime startPostTime;

    private LocalDateTime finishPostTime;

    private String email;

    private List<String> tagList = new ArrayList<>(); // tag 리스트

    public static SaveResPost of(Post post, List<String> tagList) {
        return new SaveResPost(post.getId(), post.getMember().getId(), post.getTitle(), post.getScrap_count(),
                post.getContent(), post.getEvent(), post.getLocal(), post.getSchool(), post.getOrganizer(),
                post.getContactNumber(), post.getLink(), post.getPlace(), null,
                post.getStartPostTime(), post.getFinishPostTime(), post.getEmail(), tagList);
    }

    public static SaveResPost ofWithImage(Post post, List<String> imageList, List<String> tagList) {
        SaveResPost saveResPost = new SaveResPost(post.getId(), post.getMember().getId(), post.getTitle(), post.getScrap_count(),
                post.getContent(), post.getEvent(), post.getLocal(), post.getSchool(), post.getOrganizer(),
                post.getContactNumber(), post.getLink(), post.getPlace(), imageList,
                post.getStartPostTime(), post.getFinishPostTime(), post.getEmail(), tagList);

        //System.out.println("Post 저장 후 반환할 DTO 의 imageList = " + imageList);

        return saveResPost;
    }




}
