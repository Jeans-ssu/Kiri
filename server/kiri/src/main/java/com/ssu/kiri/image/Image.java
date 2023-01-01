package com.ssu.kiri.image;

import com.ssu.kiri.post.Post;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    private String location; // 사진 찍은 위치
    private String caption; // 사진 설명
    private String postImage; // 포스팅 사진 경로 + 이름


    //===== 연관관계 편의 메서드 =====//

    public void changePost(Post post) {
        this.post = post;
        post.getImageList().add(this);
    }


    //===== 생성자 =====//

    public Image(Post post) {
        this.post = post;
    }



}
