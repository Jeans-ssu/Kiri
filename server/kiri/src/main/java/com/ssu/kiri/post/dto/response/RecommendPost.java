package com.ssu.kiri.post.dto.response;

import com.ssu.kiri.post.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class RecommendPost {
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

    private List<String> tagList = new ArrayList<>();

    public static RecommendPost of(Post post, List<String> tagList) {
        return new RecommendPost(post.getId(), post.getMember().getId(), post.getTitle(), post.getScrap_count(),
                post.getContent(), post.getEvent(), post.getLocal(), post.getSchool(), post.getOrganizer(),
                post.getContactNumber(), post.getLink(), post.getPlace(), tagList);
    }
}
