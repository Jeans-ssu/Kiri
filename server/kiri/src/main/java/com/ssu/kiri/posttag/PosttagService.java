package com.ssu.kiri.posttag;

import com.ssu.kiri.post.Post;
import com.ssu.kiri.tag.Tag;
import com.ssu.kiri.tag.TagRepository;
import com.ssu.kiri.tag.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PosttagService {

    private final PosttagRepository posttagRepository;

    public List<String> findTagsByPost(Post post) {
        List<String> tagList = new ArrayList<>();

        List<Posttag> posttags = posttagRepository.findByPost(post);
        for (Posttag posttag : posttags) {
            Tag tag = posttag.getTag();
            tagList.add(tag.getTagname());
        }

        return tagList;
    }

    public void deletePostTag(Long posttag_id) {
        Posttag posttag = posttagRepository.findById(posttag_id).orElseThrow();
        posttagRepository.delete(posttag);
    }

}
