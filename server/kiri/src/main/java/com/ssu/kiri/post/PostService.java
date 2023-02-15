package com.ssu.kiri.post;


import com.ssu.kiri.image.Image;
import com.ssu.kiri.image.ImageRepository;
import com.ssu.kiri.image.ImageService;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.post.dto.response.SaveResPost;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    public ResponseEntity<?> home() {
        // 최근 이벤트 16개, 관심있는 이벤트 10개, 인기있는 이벤트 10개
        // Pageable 사용하기

        return null;
    }

    // 게시글 상세보기
    public SaveResPost detailPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 포스트를 상세보기할 수 없습니다."));

        List<Image> imageList = post.getImageList();
        List<String> imgUrlList = imageList.stream()
                .map(img -> img.getImgUrl())
                .collect(Collectors.toList());

        SaveResPost saveResPost = SaveResPost.ofWithImage(post, imgUrlList);

        return saveResPost;
    }

    // 게시물 등록
    public SaveResPost savePost(Post post, List<Long> imageIdList) {
        // 연관관계가 있으므로(@JoinColumn(name = "member_id")), Post 를 정하기전에 Member 를 정해주고 나중에 저장해준다.
        // post 에 member 저장 -> post 를 저장 -> image 에 post 저장

        // post 에 member 설정
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        // member, post 간 연관관계 설정
        Post newPost = Post.saveMember(member, post);

        // post 저장
        Post savedPost = postRepository.save(newPost);

        System.out.println("등록할 이미지가 없는 경우 뭐라 나오냐 imageIdList = " + imageIdList);
        // post에 이미지가 있는 경우
        if(imageIdList == null || imageIdList.isEmpty()) {
            System.out.println("등록할 이미지가 없는 거 확인");
            SaveResPost saveResPost = SaveResPost.of(savedPost);
            return saveResPost;
        }


        // post에 이미지가 있는 경우
        System.out.println("PostService 에서의 imageIdList = " + imageIdList);
        // image 에 post 저장
        List<String> savedImageUrlList = imageService.savePost(savedPost, imageIdList);

        SaveResPost saveResPost = SaveResPost.ofWithImage(savedPost, savedImageUrlList);

        return saveResPost;
    }

    // 게시글 수정
    public SaveResPost updatePost(Post post, Long id, List<Long> imageIdList) {
        // update 를 해줘야 함. 그런데 member 의 내용은 바뀌지 않음. 수정은 인증된 사용자만 할 수 있으므로.

        Optional<Post> optPost = postRepository.findById(id);
        if(optPost.isEmpty()) {
            throw new RuntimeException("해당 포스트를 찾을 수 없습니다.");
        }
        Post findPost = optPost.get();
//        findPost.updatePost(post,id);
        findPost.updatePost(post);
        Post savedPost = postRepository.save(findPost);


        // ====== 이미지 수정하기

        // 이미지를 수정하지 않는 경우,
         if(imageIdList == null || imageIdList.isEmpty()) {
             List<String> existedImageUrlList = imageService.findImageUrlsByPostId(savedPost.getId());
             // 원래 포스트에 이미지가 존재하지 않은 경우
             if(existedImageUrlList == null || existedImageUrlList.isEmpty()) {
                 SaveResPost saveResPost = SaveResPost.of(savedPost);
                 return saveResPost;
             }
             // 원래 포스트에 이미지가 존재하지만 수정하지 않는 경우
             SaveResPost saveResPost = SaveResPost.ofWithImage(savedPost, existedImageUrlList);
             return saveResPost;
         }

        // 게시글을 수정할때 이미지를 수정하는 경우,
        List<String> savedImageUrlList = imageService.savePost(savedPost, imageIdList);
        SaveResPost saveResPost = SaveResPost.ofWithImage(savedPost, savedImageUrlList);

        return saveResPost;

    }



    public void deletePost(Long id) {
        List<Image> imageList = imageRepository.findUrlByPostId(id);
        for (Image image : imageList) {
            imageService.deleteImage(image.getId());
        }

        postRepository.delete(
                postRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 포스트를 삭제할 수 없습니다."))
        );
    }

    // 분류해서 게시글들 보기
    public void classifyPost(String category, List<String> eventList) {

        // 1. category eventList 둘다 없는 경우
        // 2. eventList 만 없는 경우
        // 3. 둘다 있는 경우

        if(category == null || category.isEmpty()) {
            if(eventList == null || eventList.isEmpty()) {
                // 1. category eventList 둘다 없는 경우

                return;
            }

            // 2. eventList 만 없는 경우

            return;
        }
        // 3. 둘다 있는 경우


        return;

    }
}
