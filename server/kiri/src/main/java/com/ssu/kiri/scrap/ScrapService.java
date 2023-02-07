package com.ssu.kiri.scrap;

import com.ssu.kiri.member.Member;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.scrap.dto.ScrapReqAdd;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ScrapService {

    private final PostRepository postRepository;
    private final ScrapRepository scrapRepository;

    public boolean addScrap(Long post_id, ScrapReqAdd requestDto) {
        // 회원 찾기
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        // post 찾기
        Post post = postRepository.findById(post_id).orElseThrow();

        // 좋아요 중복 방지 => 이미 좋아요를 했으면 false 리턴
        if(isAlreadyScrap(member, post)) {
            return false;
        }

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

        Scrap scrap = scrapRepository.findByMemberAndPost(member, post).orElseThrow();
        scrapRepository.delete(scrap);

    }



    // 로그인한 회원이 이미 좋아요를 했는지 확인
    private boolean isAlreadyScrap(Member member, Post post) {
        return scrapRepository.findByMemberAndPost(member, post).isPresent();
    }

}
