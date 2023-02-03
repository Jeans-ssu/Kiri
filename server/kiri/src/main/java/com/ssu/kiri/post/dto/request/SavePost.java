package com.ssu.kiri.post.dto.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

// 게시글 등록
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavePost {
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

    //        private List<Long> imageIdList; // 이미지
    // 이미지 로컬에 저장
    private List<MultipartFile> files;


//    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @NotNull
    private LocalDateTime startPostTime;

//    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @NotNull
    private LocalDateTime finishPostTime;

}
