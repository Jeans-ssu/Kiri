package com.ssu.kiri.post.dto.response;


import com.ssu.kiri.image.Image;
import com.ssu.kiri.post.Post;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

// 게시글 상세보기
@Data
@AllArgsConstructor
public class DetailPost {

    private String title; // 글 제목

    private int scrap_count; // 스크랩 수

    private String content; // 글 내용

    private String category; // 큰 카테고리 (지역, 학교 둘 중 택 1)
    private String event; // 작은 카테고리 (축제, 전시, 대회, 강연, 공연, 기타 등)
    private String local; // 지역
    private String school; // 학교

    private String organizer; // 주최자
    private String contactNumber; // 연락처
    private String link; // 참고링크
    private String place; // 장소
    private List<Image> imageList; // 이미지
    private LocalDateTime startPostTime;
    private LocalDateTime finishPostTime;


    public static DetailPost of(Post post) {
        return new DetailPost(post.getTitle(), post.getScrap_count(), post.getContent(), post.getCategory(), post.getEvent(),
                post.getLocal(), post.getSchool(), post.getOrganizer(), post.getContactNumber(),
                post.getLink(), post.getPlace(), null, post.getStartPostTime(), post.getFinishPostTime());
    }

}
