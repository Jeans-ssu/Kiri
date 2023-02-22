package com.ssu.kiri.scrap;

import com.ssu.kiri.image.Image;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {

    Optional<Scrap> findByMemberAndPost(Member member, Post post);

    Optional<Integer> countByPost(Post post);

    List<Scrap> findScrapByPostId(Long post_id);

}
