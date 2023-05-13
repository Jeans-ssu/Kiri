package com.ssu.kiri.posttag;

import com.ssu.kiri.post.Post;
import com.ssu.kiri.tag.Tag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Posttag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posttag_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public static void savePostTag(Post post, Tag tag) {
        Posttag posttag = new Posttag();
        posttag.post = post;
        posttag.tag = tag;

    }

}

