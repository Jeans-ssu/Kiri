package com.ssu.kiri.scrap;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssu.kiri.member.QMember;
import com.ssu.kiri.post.QPost;
import com.ssu.kiri.scrap.dto.QScrapResCal;
import com.ssu.kiri.scrap.dto.ScrapResCal;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.BitSet;
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
                .where(compareStart(year, month), compareFinish(year, month))
//                .where(compareSY(year), compareSM(month), compareFY(year), compareFM(month))
//                .offset(0)
//                .limit(20)
                .fetch();

        return result;
    }


    /**
     * start year <= now year (2022 < 2023)
     * - start month <= now month (1 < 2)
     * - start month > now month (12 > 1) => 문제
     *
     * now year <= finish year (2023 < 2024)
     * - now month <= finish month (2 <= 3)
     * - now month > finish month (12 > 1) => 문제
     *
     * 그니까, year month 가 다 start보다 크거나 같고, finish보다 작거나 같다
     * 로 끝나면 안됨.
     *
     * nowY > startY 이면,
     *
     *
     */

    /*private BooleanExpression compareSY(Integer year, Integer month) {
        if(year == null) {
            return null;
        }
        return scrap.startYear.loe(year).and(compareSM(month));
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
    }*/

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


//    private BooleanExpression compareSSM(int year , int month) {
//        if(scrap.startMonth.lt(year)) {
//            return true;
//        } else if(scrap.startMonth.eq(year)) {
//            return false;
//        }
//    }

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



}
