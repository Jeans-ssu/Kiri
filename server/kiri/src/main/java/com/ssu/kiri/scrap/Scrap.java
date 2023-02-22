package com.ssu.kiri.scrap;

import com.ssu.kiri.member.Member;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.scrap.dto.ScrapReqAdd;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Scrap {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scrap_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    private LocalDateTime startScrapTime;

    private LocalDateTime endScrapTime;


    //===== 연관관계 편의 메서드 =====//

    public void changeMember(Member member) {
        this.member = member;
        member.getScrapList().add(this);
    }

    public void changePost(Post post) {
        this.post = post;
        post.getScrapList().add(this);
    }

    //===== 생성자 =====//

    public Scrap(Member member, Post post) {
        this.member = member;
        this.post = post;
    }

    //===== builder =====//
    @Builder
    public Scrap(LocalDateTime startScrapTime, LocalDateTime endScrapTime) {
        this.startScrapTime = startScrapTime;
        this.endScrapTime = endScrapTime;
    }

    //=====좋아요 했을때 scrap 과 member, scrap 과 post 관계 설정 ======//
    // 연관관계 편의 메서드 호출
    public static Scrap updateMemberAndPostWithScrap(Member member, Post post, ScrapReqAdd request) {
        Scrap scrap = new Scrap();
        scrap.changeMember(member);
        scrap.changePost(post);
        scrap.startScrapTime = request.getStartScrapTime();
        scrap.endScrapTime = request.getEndScrapTime();

        return scrap;
    }


    public void deleteScrapInMemberAndPost() {
        this.getMember().getScrapList().remove(this);
        this.getPost().getScrapList().remove(this);
    }
}
