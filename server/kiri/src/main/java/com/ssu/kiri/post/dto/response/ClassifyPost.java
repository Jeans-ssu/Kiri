package com.ssu.kiri.post.dto.response;


import com.querydsl.core.annotations.QueryProjection;
import com.ssu.kiri.image.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassifyPost {

    private Long post_id;
    private String title; // 제목
    private String imgUrl; // 썸네일 사진
    private String startPostTime; // 게시글 시작 날짜

    private int scrap_count; // 좋아요 수

    @QueryProjection
    public ClassifyPost(Long post_id, String title, List<Image> image, LocalDateTime startPostTime, int count) {
        this.post_id = post_id;
        this.title = title;
        this.imgUrl = image.get(0).getImgUrl();
        this.startPostTime = startPostTime.toString();
        this.scrap_count = count;
    }

    /*@QueryProjection
    public ClassifyPost(Long post_id, String title, String imgUrl, LocalDateTime startPostTime, int count) {
        this.post_id = post_id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.startPostTime = startPostTime.toString();
        this.scrap_count = count;
    }*/

}
