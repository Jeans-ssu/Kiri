package com.ssu.kiri.member;

import com.ssu.kiri.image.Image;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.scrap.Scrap;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(false)
class MemberTest {

    @PersistenceContext
    EntityManager em;

    @Test
    public void testEntity() {

        //given
        Member member = new Member("love@nate.com");
        em.persist(member);

        Post post1 = new Post(member, "title1!!");
        Post post2 = new Post(member, "title2!!");
        em.persist(post1);
        em.persist(post2);

        Image image1 = new Image(post1);
        Image image2 = new Image(post2);
        em.persist(image1);
        em.persist(image2);

        Scrap scrap1 = new Scrap(member, post1);
        Scrap scrap2 = new Scrap(member, post2);

        em.persist(scrap1);
        em.persist(scrap2);

        // 초기화
        em.flush();
        em.clear();

        //확인
        List<Member> members = em.createQuery("select m from Member m", Member.class)
                .getResultList();

        for (Member m : members) {
            System.out.println("member = " + m);
            System.out.println("member.id = " + m.getId());
            System.out.println("-> member.team = " + m.getPostList());
            System.out.println("-> member.scrap = " + m.getScrapList());
            System.out.println("-> post.scrap = " + m.getPostList());
        }



    }




}