package com.ssu.kiri.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssu.kiri.image.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class PostReqDto {


    // 게시글 등록
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class savePost {

        @NotBlank
        private String title; // 글 제목

        private int scrap_count; // 스크랩 수

        @NotBlank
        private String content; // 글 내용

        @NotBlank
        private String category; // 글 카테고리 (동아리, 스터디,..)

        @NotBlank
        private String field; // 글 분야 (IT, 공학)

        @NotBlank
        private String organizer; // 주최자

        private String link; // 참고링크
        private String place; // 장소
        private List<Image> imageList; // 이미지

        @NotBlank
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDateTime startPostTime;

        @NotBlank
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDateTime finishPostTime;
    }

}
