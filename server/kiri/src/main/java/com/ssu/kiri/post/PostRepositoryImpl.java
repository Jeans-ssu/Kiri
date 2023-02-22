package com.ssu.kiri.post;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssu.kiri.image.QImage;
import com.ssu.kiri.post.dto.response.ClassifyPost;
import com.ssu.kiri.post.dto.response.QClassifyPost;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssu.kiri.image.QImage.image;
import static com.ssu.kiri.post.QPost.post;

//@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

//    public PostRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
//        this.jpaQueryFactory = jpaQueryFactory;
//    }

    public Page<ClassifyPost> findClassifyPostJoin(Pageable pageable) {
        jpaQueryFactory.select(new QClassifyPost(
                        post.id,
                        post.title,
                        post.imageList,
                        post.startPostTime,
                        post.scrap_count))
                .from(post)
                .orderBy(post.startPostTime.desc())
                .fetch();
        return null;
    }

    /*public Page<ClassifyPost> findPostWithoutCE(Pageable pageable) {
        jpaQueryFactory.select(new QClassifyPost(
                post.id,
                post.title,
                image.imgUrl,
                post.startPostTime,
                post.scrap_count
                ))
                .from(image)
                .leftJoin(image.post, post)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }*/

    public List<ClassifyPost> findClassifyPostByEventList(List<String> eventList) {

        return null;
    }


}
