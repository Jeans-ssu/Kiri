package com.ssu.kiri.scrap;

import com.ssu.kiri.member.Member;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.scrap.dto.ScrapReqAdd;
import com.ssu.kiri.scrap.dto.ScrapResCal;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ScrapService {

    private final PostRepository postRepository;
    private final ScrapRepository scrapRepository;

    // 단순히 좋아요, 좋아요 취소 만 구현 => 나중에 캘린더에서 시간을 바꾸는 것은 이후 고려하자.
    public boolean addScrap(Long post_id, ScrapReqAdd requestDto) {
        // 회원 찾기
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        // post 찾기
        Post post = postRepository.findById(post_id).orElseThrow();

        // 좋아요 중복 방지 => 이미 좋아요를 했으면 좋아요 취소 가 됨
        if(isAlreadyScrap(member, post)) {
            Scrap scrap = scrapRepository.findByMemberAndPost(member, post).get();
            scrap.deleteScrapInMemberAndPost();
            scrapRepository.delete(scrap);

            post.minusScrapCount();

            return false;
        }

        post.updateScrapCount();

        // scrap 객체 생성하고 시간 설정
        // scrap 과 member, scrap과 post 관계 설정 -> 연관관계 편의 메서드
        Scrap scrap = Scrap.updateMemberAndPostWithScrap(member, post, requestDto);

        Scrap savedScrap = scrapRepository.save(scrap);

        return true;
    }

    public void deleteScrap(Long post_id) {
        // 회원 찾기
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        // post 찾기
        Post post = postRepository.findById(post_id).orElseThrow();

        // post 의 scrap 수 감수
        post.minusScrapCount();

        Scrap scrap = scrapRepository.findByMemberAndPost(member, post).orElseThrow();
        scrap.deleteScrapInMemberAndPost();

        scrapRepository.delete(scrap);

    }

    public void deleteScrapInPostDelete(Long scrap_id) {
        Scrap scrap = scrapRepository.findById(scrap_id).orElseThrow();
        scrapRepository.delete(scrap);
    }


    /**
     * 좋아요 개수 세기
     * @param post
     *
     */
    public int countScrap(Post post) {
        Integer scrapCount = scrapRepository.countByPost(post).orElseThrow();
        int result = scrapCount.intValue();

        return result;
    }



    // 로그인한 회원이 이미 좋아요를 했는지 확인
    private boolean isAlreadyScrap(Member member, Post post) {
        return scrapRepository.findByMemberAndPost(member, post).isPresent();
//        Scrap scrap = scrapRepository.findByMemberAndPost(member, post).orElseThrow();
//        return scrap;
    }

    public List<ScrapResCal> getScrap(String year, String month) {
        if( (year == null || year.isEmpty() ) && ( month == null || month.isEmpty() ) ) {
            LocalDateTime now = LocalDateTime.now();
            int nowYear = now.getYear();
            int nowMonth = now.getMonthValue();
            int dayOfMonth = now.getDayOfMonth();

            Integer nowIYear = Integer.valueOf(nowYear);
            Integer nowIMonth = Integer.valueOf(nowMonth);

            List<ScrapResCal> scraps = scrapRepository.findScrapsByYearAndMonth(nowIYear, nowIMonth);
            return scraps;
        }

        // 오늘 날짜가 게시글의 startDateTime의 Year과 Month보다 크거나 같고 FinishDateTime의 Year과 Month보다 작거나 같은 경우 가져옴
        Integer nowIMear = Integer.valueOf(year);
        Integer nowIMonth = Integer.valueOf(month);
        List<ScrapResCal> scraps = scrapRepository.findScrapsByYearAndMonth(nowIMonth, nowIMonth);
        return scraps;
    }
}
