package com.ssu.kiri.post.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostResCal {

    private Long post_id;
    private String title;
    private String organizer;
    private String school;
    private String local;
    private String event;
    private LocalDateTime startPostTime;
    private LocalDateTime finishPostTime;
    private String place;

    @QueryProjection
    public PostResCal (Long post_id, String title, String organizer, String school,
                       String local, String event, LocalDateTime startPostTime, LocalDateTime finishPostTime, String place) {
        this.post_id = post_id;
        this.title = title;
        this.organizer = organizer;
        this.school = school;
        this.local = local;
        this.event = event;
        this.startPostTime = startPostTime;
        this.finishPostTime = finishPostTime;
        this.place = place;
    }

}
