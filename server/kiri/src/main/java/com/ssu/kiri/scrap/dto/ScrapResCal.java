package com.ssu.kiri.scrap.dto;


import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
//@AllArgsConstructor
public class ScrapResCal {
    /**
     * list [ 글id
     * 제목
     * 주최
     * 학교
     * 지역
     * 키워드
     * 날짜(년,월,일) ]
     */

    private Long post_id;
    private String title;
    private String organizer;
    private String school;
    private String local;
    private String event;
    private LocalDateTime startScrapTime;
    private LocalDateTime finishScrapTime;

    @QueryProjection
    public ScrapResCal (Long post_id, String title, String organizer, String school,
                        String local, String event, LocalDateTime startSCrapTime, LocalDateTime finishScrapTime) {

        this.post_id = post_id;
        this.title = title;
        this.organizer = organizer;
        this.school = school;
        this.local = local;
        this.event = event;
        this.startScrapTime = startScrapTime;
        this.finishScrapTime = finishScrapTime;

    }



}
