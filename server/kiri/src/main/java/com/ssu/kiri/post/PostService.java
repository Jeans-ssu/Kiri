package com.ssu.kiri.post;


import com.ssu.kiri.member.Member;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;

    public ResponseEntity<?> home() {
        // 최근 이벤트 16개, 관심있는 이벤트 10개, 인기있는 이벤트 10개
        // Pageable 사용하기

        return null;
    }

    // 게시글 상세보기
    public Post detailPost(Long id) {
        Optional<Post> onePost = postRepository.findById(id);
        if(onePost.isPresent()) {
            return onePost.get();
        } else {
            throw new RuntimeException("해당 포스트를 상세보기할 수 없습니다.");
        }
    }

    // 게시물 등록
    public Post savePost(Post post) {
        // 로그인한 사용자 id Post 에 저장 -> Post 저장 -> postId Image 에 저장
        //====================================================================
        // 연관관계가 있으므로(@JoinColumn(name = "member_id")), Post 를 정하기전에 Member 를 정해주고 나중에 저장해준다.

        // post 에 member 설정
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        post.changeMember(member);

        Post savedPost = postRepository.save(post);
        return savedPost;
    }


}
