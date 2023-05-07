package com.ssu.kiri.image;

import com.ssu.kiri.post.Post;
import lombok.*;

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

    @Column(length = 1500)
    private String imgUrl; // 파일 url
    private String filename; // 파일 이름
    private String filepath; // 포스팅 사진 경로 + 이름


    //======builder=======//
    @Builder
    public Image(String filename, String filepath, String imgUrl) {
        this.filename = filename;
        this.filepath = filepath;
        this.imgUrl = imgUrl;
    }


    //===== 연관관계 편의 메서드 =====//

    public void changePost(Post post) {
        this.post = post;
        post.getImageList().add(this);
    }


    //===== 생성자 =====//

    public Image(Post post) {
        this.post = post;
    }

    public Image(String origFileName, String filePath) {
        this.filename = origFileName;
        this.imgUrl = filePath;
    }

    public void deleteImageInPost() {
        this.getPost().getImageList().remove(this);
    }

}
