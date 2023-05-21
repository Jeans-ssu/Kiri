package com.ssu.kiri.posttag;

import com.ssu.kiri.post.Post;
import com.ssu.kiri.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PosttagRepository extends JpaRepository<Posttag, Long> {
    Optional<Posttag> findByPostAndTag(Post post, Tag tag);
    List<Posttag> findByPost(Post post);
    List<Posttag> findByPostId(Long post_id);
    List<Posttag> findByTag(Tag tag);
    List<Posttag> findByTagId(Long tag_id);
}
