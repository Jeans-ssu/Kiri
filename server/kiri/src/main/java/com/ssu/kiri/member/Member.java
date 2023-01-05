package com.ssu.kiri.member;

import com.ssu.kiri.post.Post;
import com.ssu.kiri.scrap.Scrap;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @OneToMany(mappedBy = "member")
    private List<Scrap> scrapList;

    @OneToMany(mappedBy = "member")
    private List<Post> postList;


    private String email;

    private String password;

    private String username; // 닉네임 . nickname -> username

    private String interest; // 사용자의 관심분야

    private String role; // 시큐리티 권한 추가

    //===== 생성자 =====//

    public Member(String email) {
        this.email = email;
    }

}
