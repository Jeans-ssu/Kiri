package com.ssu.kiri.post;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssu.kiri.image.Image;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.scrap.Scrap;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor//(access = AccessLevel.PROTECTED)
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "post")
    private List<Scrap> scrapList = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<Image> imageList = new ArrayList<>(); // 문제

    private String title; // 글 제목
    private int scrap_count; // 스크랩 수
    private String content; // 글 내용

    private String category; // 큰 카테고리 (지역, 학교 둘 중 택 1)
    private String event; // 작은 카테고리 (축제, 전시, 대회, 강연, 공연, 기타 등)
    private String local; // 지역
    private String school; // 학교
    private String place; // 상세 장소

    private String organizer; // 주최자
    private String link; // 참고링크
    private String contactNumber; // 전화번호
    private LocalDateTime startPostTime;
    private LocalDateTime finishPostTime;


    //===== 연관관계 편의 메서드 =====//

    public void changeMember(Member member) {
        this.member = member;
        System.out.println("member.getPostList() = " + member.getPostList());
        if(member.getPostList() == null){
            System.out.println("member의 Post리스트가 널인지 테스트!!");
        }
        member.getPostList().add(this);
    }

    //======builder=========//
    @Builder
    public Post(
            String title, int scrap_count, String content, String category, String event, String local, String school,
            String place, String organizer, String link, String contactNumber, LocalDateTime startPostTime, LocalDateTime finishPostTime
    ) {

        this.title = title;
        this.scrap_count = scrap_count;
        this.content = content;
        this.category = category;
        this.event =event;
        this.local = local;
        this.school = school;
        this.place = place;
        this.organizer = organizer;
        this.link = link;
        this.contactNumber = contactNumber;
        this.startPostTime = startPostTime;
        this.finishPostTime = finishPostTime;
    }


    //===== 생성자 =====//

    public Post createPostTest(String title, String content, String category, String event, String local, String school, String place,
                               String organizer, LocalDateTime startPostTime, LocalDateTime finishPostTime) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.event = event;
        this.local = local;
        this.school = school;
        this.place = place;
        this.organizer = organizer;
        this.startPostTime = startPostTime;
        this.finishPostTime = finishPostTime;

        return this;
    }


    public void createPost(Member member) {
        this.member = member;
    }


    public Post(Member member, String title) {
        this.member = member;
        this.title = title;
    }


    public void updatePost(Post post) {
//        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.category = post.getCategory();
        this.event = event;
        this.local = local;
        this.school = school;
        this.link = post.getLink();
        this.place = post.getPlace();
        this.organizer = post.getOrganizer();
        this.contactNumber = post.getContactNumber();
//        this.imageList = post.getImageList();
        this.startPostTime = post.getStartPostTime();
        this.finishPostTime = post.getFinishPostTime();
    }

    // 게시글 등록
    // 연관관계 메서드 호출
    public static Post saveMember(Member member, Post newPost) {
        Post post = new Post();
        post.changeMember(member);

        post.title = newPost.getTitle();
        post.content = newPost.getContent();
        post.category = newPost.getCategory();
        post.event = newPost.getEvent();
        post.local = newPost.getLocal();
        post.school = newPost.getSchool();
        post.organizer = newPost.getOrganizer();
        post.link = newPost.getLink();
        post.place = newPost.getPlace();
        post.contactNumber = newPost.getContactNumber();
//        this.imageList = newPost.getImageList();
        post.startPostTime = newPost.getStartPostTime();
        post.finishPostTime = newPost.getFinishPostTime();

        return post;
    }

    //==== scrap 으로 인한 scrap 수 증가 ===//
    public void updateScrapCount() {
        this.scrap_count = this.scrap_count +1;
    }
    //==== scrap 으로 인한 scrap 수 증가 ===//
    public void minusScrapCount() {
        if(scrap_count > 0) {
            this.scrap_count = this.scrap_count - 1;
        }
    }


}
