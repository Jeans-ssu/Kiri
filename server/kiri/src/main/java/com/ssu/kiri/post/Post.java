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

    private String category; // 글 카테고리 (동아리, 스터디,..)

    private String field; // 글 분야 (IT, 공학)

    private String organizer; // 주최자



    // 추가
    private String link; // 참고링크
    private String place; // 장소

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
            String title, int scrap_count, String content, String category, String field,
            String organizer, String link, String place, List<Image> imageList, LocalDateTime startPostTime, LocalDateTime finishPostTime
    ) {

        this.title = title;
        this.scrap_count = scrap_count;
        this.content = content;
        this.category = category;
        this.field = field;
        this.organizer = organizer;
        this.link = link;
        this.place = place;
//        this.imageList = imageList;

        this.startPostTime = startPostTime;
        this.finishPostTime = finishPostTime;
    }


    //===== 생성자 =====//

    public Post createPostTest(String title,String content, String category, String field,
                               String organizer, LocalDateTime startPostTime, LocalDateTime finishPostTime) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.field = field;
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
        this.field = post.getField();
        this.link = post.getLink();
        this.place = post.getPlace();
//        this.imageList = post.getImageList();
        this.startPostTime = post.getStartPostTime();
        this.finishPostTime = post.getFinishPostTime();
    }

    // 연관관계 메서드 호출
    public static Post saveMember(Member member, Post newPost) {
        Post post = new Post();
        post.changeMember(member);

        post.title = newPost.getTitle();
        post.content = newPost.getContent();
        post.category = newPost.getCategory();
        post.field = newPost.getField();
        post.link = newPost.getLink();
        post.place = newPost.getPlace();
//        this.imageList = newPost.getImageList();
        post.startPostTime = newPost.getStartPostTime();
        post.finishPostTime = newPost.getFinishPostTime();

        return post;
    }
}
