package com.ssu.kiri.post;

import com.ssu.kiri.post.dto.response.ClassifyPost;
import com.ssu.kiri.scrap.dto.ScrapResCal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface PostCustomRepository {

    Page<ClassifyPost> findClassifyPostJoin(Pageable pageable);

    List<ClassifyPost> findClassifyPostByEventList(List<String> eventList);

    List<ScrapResCal> findScrapsByLocal(Integer nowIYear, Integer nowIMonth, String local);

}
