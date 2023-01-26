package com.ssu.kiri.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssu.kiri.image.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class PostResDto {

    // 게시글 상세보기
    @Data
    @AllArgsConstructor
    public static class detailPost {

        private String title; // 글 제목

        private int scrap_count; // 스크랩 수

        private String content; // 글 내용

        private String category; // 글 카테고리 (동아리, 스터디,..)

        private String field; // 글 분야 (IT, 공학)

        private String organizer; // 주최자

        private String link; // 참고링크
        private String place; // 장소
        private List<Image> imageList; // 이미지
        private LocalDateTime startPostTime;
        private LocalDateTime finishPostTime;

    }

    // 게시글 등록
    @Data
    @AllArgsConstructor
    public static class savePost {

        private Long post_id;
        private Long member_id;

        private String title; // 글 제목

        private int scrap_count; // 스크랩 수


        private String content; // 글 내용


        private String category; // 글 카테고리 (동아리, 스터디,..)


        private String field; // 글 분야 (IT, 공학)


        private String organizer; // 주최자

        private String link; // 참고링크
        private String place; // 장소
        private List<Image> imageList; // 이미지

        private LocalDateTime startPostTime;

        private LocalDateTime finishPostTime;

    }


}
