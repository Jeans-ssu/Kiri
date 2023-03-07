package com.ssu.kiri.post;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssu.kiri.image.QImage;
import com.ssu.kiri.post.dto.response.ClassifyPost;
import com.ssu.kiri.post.dto.response.QClassifyPost;
import com.ssu.kiri.scrap.dto.QScrapResCal;
import com.ssu.kiri.scrap.dto.ScrapResCal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssu.kiri.image.QImage.image;
import static com.ssu.kiri.member.QMember.member;
import static com.ssu.kiri.post.QPost.post;
import static com.ssu.kiri.scrap.QScrap.scrap;

//@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<ScrapResCal> findScrapsByLocal(Integer year, Integer month, String local) {


        List<ScrapResCal> result = jpaQueryFactory.select(new QScrapResCal(
                        post.id,
                        post.title,
                        post.organizer,
                        post.school,
                        post.local,
                        post.event,
                        post.startPostTime,
                        post.finishPostTime,
                        post.place))
                .from(post)
                .where(post.local.eq(local))
                .where(compareStart(year, month), compareFinish(year, month))
//                .where(compareSY(year), compareSM(month), compareFY(year), compareFM(month))
//                .offset(0)
//                .limit(20)
                .fetch();

        return result;
    }


    private BooleanExpression compareStart(Integer year, Integer month) {
        if(year == null || month == null) {
            return null;
        }
        return compareLwSY(year).or(compareSYSM(year, month));
    }

    private BooleanExpression compareLwSY(Integer year) {
        return scrap.startYear.lt(year);
    }
    private BooleanExpression compareSYSM(Integer year, Integer month) {
        return compareEqSY(year).and(compareLwSM(month));
    }

    private BooleanExpression compareEqSY(Integer year) {
        return scrap.startYear.eq(year);
    }
    private BooleanExpression compareLwSM(Integer month) {
        return scrap.startMonth.loe(month);
    }


    private BooleanExpression compareFinish(Integer year, Integer month) {
        if(year == null || month == null) {
            return null;
        }
        return compareGtFY(year).or(compareFYFM(year, month));
    }

    private BooleanExpression compareGtFY(Integer year) {
        return scrap.finishYear.gt(year);
    }

    private BooleanExpression compareFYFM(Integer year, Integer month) {
        return compareEqFY(year).and(compareGtFM(month));
    }

    private BooleanExpression compareEqFY(Integer year) {
        return scrap.finishYear.eq(year);
    }

    private BooleanExpression compareGtFM(Integer month) {
        return scrap.finishMonth.goe(month);
    }


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
