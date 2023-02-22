package com.ssu.kiri.post;

import com.ssu.kiri.post.dto.response.ClassifyPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface PostCustomRepository {

    Page<ClassifyPost> findClassifyPostJoin(Pageable pageable);

    List<ClassifyPost> findClassifyPostByEventList(List<String> eventList);

}
