package com.ssu.kiri.post;


import com.ssu.kiri.image.Image;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.scrap.Scrap;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "post")
    private List<Scrap> scrapList;

    @OneToMany(mappedBy = "post")
    private List<Image> imageList; // 문제

    private String title; // 글 제목

    private int scrap_count; // 스크랩 수

    private String content; // 글 내용

    private String category; // 글 카테고리 (동아리, 스터디,..)

    private String field; // 글 분야 (IT, 공학)

    private String organizer; // 주최자


    //===== 연관관계 편의 메서드 =====//

    public void changeMember(Member member) {
        this.member = member;
        member.getPostList().add(this);
    }


    //===== 생성자 =====//

    public Post(Member member, String title) {
        this.member = member;
        this.title = title;
    }

}
