package com.ssu.kiri.scrap;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssu.kiri.member.QMember;
import com.ssu.kiri.post.QPost;
import com.ssu.kiri.scrap.dto.QScrapResCal;
import com.ssu.kiri.scrap.dto.ScrapResCal;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import static com.ssu.kiri.member.QMember.member;
import static com.ssu.kiri.post.QPost.post;
import static com.ssu.kiri.scrap.QScrap.scrap;

@RequiredArgsConstructor
public class ScrapRepositoryImpl implements ScrapCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<ScrapResCal> findScrapsByYearAndMonth(Integer year, Integer month) {

        List<ScrapResCal> result = jpaQueryFactory.select(new QScrapResCal(
                        post.id,
                        post.title,
                        post.organizer,
                        post.school,
                        post.local,
                        post.event,
                        scrap.startScrapTime,
                        scrap.endScrapTime))
                .from(scrap)
                .leftJoin(scrap.post, post)
                .leftJoin(scrap.member, member)
                .where(compareSY(year), compareSM(month), compareFY(year), compareFM(month))
                .offset(0)
                .limit(20)
                .fetch();

        return result;
    }

    private BooleanExpression compareSY(Integer year) {
        if(year == null) {
            return null;
        }
        return scrap.startYear.loe(year);
    }
    private BooleanExpression compareSM(Integer month) {
        if(month == null) {
            return null;
        }
        return scrap.startMonth.loe(month);
    }

    private BooleanExpression compareFY(Integer year) {
        if(year == null) {
            return null;
        }
        return scrap.finishYear.goe(year);
    }
    private BooleanExpression compareFM(Integer month) {
        if(month == null) {
            return null;
        }
        return scrap.finishMonth.goe(month);
    }


}
