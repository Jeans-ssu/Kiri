package com.ssu.kiri.post.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyPostDto {

    private Long post_id;
    private String title; // 제목
    private String imgUrl; // 썸네일 사진
    private String startPostTime; // 게시글 시작 날짜
    private String finishPostTime; // 게시글 시작 날짜

    private int scrap_count; // 좋아요 수
}
