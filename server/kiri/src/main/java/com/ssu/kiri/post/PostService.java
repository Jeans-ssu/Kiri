package com.ssu.kiri.post;


import com.ssu.kiri.common.dto.MultipleResponseDto;
import com.ssu.kiri.image.Image;
import com.ssu.kiri.image.ImageRepository;
import com.ssu.kiri.image.ImageService;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.dto.request.SavePost;
import com.ssu.kiri.post.dto.response.*;
import com.ssu.kiri.posttag.Posttag;
import com.ssu.kiri.posttag.PosttagRepository;
import com.ssu.kiri.posttag.PosttagService;
import com.ssu.kiri.scrap.Scrap;
import com.ssu.kiri.scrap.ScrapRepository;
import com.ssu.kiri.scrap.ScrapService;
import com.ssu.kiri.security.auth.PrincipalDetails;
import com.ssu.kiri.tag.Tag;
import com.ssu.kiri.tag.TagRepository;
import com.ssu.kiri.tag.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    private final ScrapRepository scrapRepository;
    private final ScrapService scrapService;
    private final MemberRepository memberRepository;
    private final PosttagService posttagService;
    private final PosttagRepository posttagRepository;
    private final TagRepository tagRepository;
    private final TagService tagService;

    public ResponseEntity<?> home() {
        // 최근 이벤트 16개, 관심있는 이벤트 10개, 인기있는 이벤트 10개
        // Pageable 사용하기

        return null;
    }

    // 게시글 상세보기
    public MultipleResponseDto detailPost(Long id, Member member) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 포스트를 상세보기할 수 없습니다."));

        List<Image> imageList = post.getImageList();
        List<String> imgUrlList = imageList.stream()
                .map(img -> img.getImgUrl())
                .collect(Collectors.toList());

        List<Long> imgIdList = imageList.stream()
                .map(img -> img.getId())
                .collect(Collectors.toList());

        // ===== tag 관련

        // 추천 태그 글 관련
        List<String> tagsByPost = new ArrayList<>();
        List<RecommendPost> recommendPostList = new ArrayList<>();
        List<Long> recommendPostIdList = new ArrayList<>();
        List<Posttag> posttags = posttagRepository.findByPost(post);
        if(posttags!=null && !posttags.isEmpty()) {
            for (Posttag posttag : posttags) {
                Long tag_id = posttag.getTag().getId();
                List<Posttag> posttagbyTag = posttagRepository.findByTagId(tag_id);
                for (Posttag posttagOne : posttagbyTag) {
                    Post postByPT = posttagOne.getPost();
                    if(postByPT.getId() != id && !recommendPostIdList.contains(postByPT.getId())) {
                        Long postByPTId = postByPT.getId();
                        String thumbnail = imageService.getThumbnail(postByPTId);
                        List<String> recoTagList = posttagService.findTagsByPost(postByPT);
                        RecommendPost recommendPost = RecommendPost.of(postByPT, recoTagList, thumbnail);
                        recommendPostIdList.add(postByPT.getId());
                        recommendPostList.add(recommendPost);
                        break;
                    }
                }
                tagsByPost.add(posttag.getTag().getTagname());
            }
        }


//        List<String> tagsByPost = posttagService.findTagsByPost(post); // tagList
        //==== tag 관련 끝

        // 회원가입을 안한 경우
        if(member == null) {
            DetailPost detailPost = DetailPost.ofWithImage(post, imgUrlList,false, imgIdList, tagsByPost);
            return new MultipleResponseDto(detailPost, recommendPostList);
//            return detailPost;
        }
        else {
            Long member_id = member.getId();
            Member findMember = memberRepository.findById(member_id).orElseThrow(() -> new IllegalArgumentException());

            Optional<Scrap> scrapOptional = scrapRepository.findByMemberAndPost(findMember, post);
            boolean isScrap = scrapOptional.isPresent();
            //System.out.println("isScrap 값을 출력 = " + isScrap);
            DetailPost detailPost = DetailPost.ofWithImage(post, imgUrlList, isScrap, imgIdList, tagsByPost);

            return new MultipleResponseDto(detailPost, recommendPostList);
//            return detailPost;
        }


    }



    // 게시물 등록
    public SaveResPost savePost(SavePost post, List<Long> imageIdList) {
        // 연관관계가 있으므로(@JoinColumn(name = "member_id")), Post 를 정하기전에 Member 를 정해주고 나중에 저장해준다.
        // post 에 member 저장 -> post 를 저장 -> image 에 post 저장

        // post 에 member 설정
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Long id = member.getId();
        Member findMember = memberRepository.findById(id).orElseThrow();


        // member, post 간 연관관계 설정
        Post newPost = Post.saveMember(findMember, post);

        // post 저장
        Post savedPost = postRepository.save(newPost);

        //=============================================================
        // post와 tag 간의 관계인 PostTag 객체 생성해서 저장하기
        List<String> tagList = post.getTagList();

        if(tagList != null && !tagList.isEmpty()) {
            for (String tag : tagList) {
                Optional<Tag> byTag = tagRepository.findByTagname(tag);
                if(byTag.isEmpty()) {
                    // tag가 없으면 저장
                    Tag savedTag = tagService.saveTag(tag);
                    Posttag posttag = Posttag.savePostTag(savedPost, savedTag);
                    posttagRepository.save(posttag);
                }
                else {
                    Posttag posttag = Posttag.savePostTag(savedPost, byTag.get());// tag가 존재하면 바로 저장
                    posttagRepository.save(posttag);
                }

            }
        }

        // Posttag에서 Post를 이용해서 해당 Post의 tag 리스트들 가져오기
        List<String> tagsByPost = posttagService.findTagsByPost(savedPost);


        //=============================================================

        //System.out.println("등록할 이미지가 없는 경우 뭐라 나오냐 imageIdList = " + imageIdList);
        // post에 이미지가 있는 경우
        if(imageIdList == null || imageIdList.isEmpty()) {
            //System.out.println("등록할 이미지가 없는 거 확인");
            SaveResPost saveResPost = SaveResPost.of(savedPost, tagsByPost);

            return saveResPost;
        }


        // post에 이미지가 있는 경우
        //System.out.println("PostService 에서의 imageIdList = " + imageIdList);
        // image 에 post 저장
        List<String> savedImageUrlList = imageService.savePost(savedPost, imageIdList);

        SaveResPost saveResPost = SaveResPost.ofWithImage(savedPost, savedImageUrlList, tagsByPost);

        return saveResPost;
    }

    // 게시글 수정
    public SaveResPost updatePost(SavePost savePost, Long id, List<Long> imageIdList) {
        // update 를 해줘야 함. 그런데 member 의 내용은 바뀌지 않음. 수정은 인증된 사용자만 할 수 있으므로.

        Optional<Post> optPost = postRepository.findById(id);
        if(optPost.isEmpty()) {
            throw new RuntimeException("해당 포스트를 찾을 수 없습니다.");
        }
        Post findPost = optPost.get();
//        findPost.updatePost(post,id);
        findPost.updatePost(savePost);
        Post savedPost = postRepository.save(findPost);

        // ===== tag 관련
        // tag 다 삭제하고 다시 만들기

        List<String> tagList = savePost.getTagList();
        List<Posttag> posttagList = posttagRepository.findByPost(savedPost);
        for (Posttag posttag : posttagList) { // 다 삭제하고 tag 다시 설정하기
            posttagService.deletePostTag(posttag.getId());
        }
        if(tagList != null && !tagList.isEmpty()) {
            for (String tag : tagList) {
                Optional<Tag> byTag = tagRepository.findByTagname(tag);
                if(byTag.isEmpty()) {
                    // tag가 없으면 저장
                    Tag savedTag = tagService.saveTag(tag);
                    Posttag posttag = Posttag.savePostTag(savedPost, savedTag);
                    posttagRepository.save(posttag);
                }
                else {
                    Posttag posttag = Posttag.savePostTag(savedPost, byTag.get());// tag가 존재하면 바로 저장
                    posttagRepository.save(posttag);
                }

            }
        }

        // Posttag에서 Post를 이용해서 해당 Post의 tag 리스트들 가져오기
        List<String> tagsByPost = posttagService.findTagsByPost(savedPost);

        // ===== tag 관련 끝


        // ====== 이미지 수정하기

        // 이미지를 수정하지 않는 경우,
         if(imageIdList == null || imageIdList.isEmpty()) {
             List<String> existedImageUrlList = imageService.findImageUrlsByPostId(savedPost.getId());
             // 원래 포스트에 이미지가 존재하지 않은 경우
             if(existedImageUrlList == null || existedImageUrlList.isEmpty()) {
                 SaveResPost saveResPost = SaveResPost.of(savedPost, tagsByPost);
                 return saveResPost;
             }
             // 원래 포스트에 이미지가 존재하지만 수정하지 않는 경우
             SaveResPost saveResPost = SaveResPost.ofWithImage(savedPost, existedImageUrlList, tagsByPost);
             return saveResPost;
         }

        // 게시글을 수정할때 이미지를 수정하는 경우,
        List<String> savedImageUrlList = imageService.savePost(savedPost, imageIdList);
        SaveResPost saveResPost = SaveResPost.ofWithImage(savedPost, savedImageUrlList, tagsByPost);

        return saveResPost;

    }



    public void deletePost(Long id) {
        // 관련 tag 관계 삭제
        List<Posttag> posttagList = posttagRepository.findByPostId(id);
        for (Posttag posttag : posttagList) {
            posttagService.deletePostTag(posttag.getId());
        }

        // 1. 관련 이미지 삭제하기
        List<Image> imageList = imageRepository.findUrlByPostId(id);
        for (Image image : imageList) {
            imageService.deleteImage(image.getId());
        }

        // 2. 관련 스크랩 삭제하기
        List<Scrap> scrapList = scrapRepository.findScrapByPostId(id);
        for (Scrap scrap : scrapList) {
            scrapService.deleteScrapInPostDelete(scrap.getId());
        }

        // 3. 관련 회원과의 관계 삭제하기
        Post post = postRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 포스트를 삭제할 수 없습니다."));
        post.deletePostAndMember();

        // 4. post 삭제
        postRepository.delete(post);

//        postRepository.delete(
//                postRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 포스트를 삭제할 수 없습니다."))
//        );
    }

    // 분류해서 게시글들 보기
    public List<ClassifyPost> classifyPost(String division, String category, List<String> eventList) {

        // 1. category eventList 둘다 없는 경우 -> 나의 학교로 지정되어 나옴
        // 2. category만 있는 경우 -> 서울, 부산 또는 숭실대학교, 중앙대학교
        // 3. eventList만 있는 경우 -> 강연, 강의, 축제 ... 리스트
        // 4. 둘다 있는 경우 - category와 eventList 둘다 있는 경우
        List<ClassifyPost> list = new ArrayList<>();

        // 1. category eventList 둘다 없는 경우 -> 전체를 보여줌.
        if(category == null || category.isEmpty()) {
            if(eventList == null || eventList.isEmpty()) {
//                if(mySchool == null || mySchool.isEmpty()) {
                //System.out.println("category: null, eventList = null, mySchool: null (학교 미지정)");
                List<Post> all = postRepository.findAll();
                List<ClassifyPost> allClassifyPosts = convertToClassify(all);
                return allClassifyPosts;
//                }
//                System.out.println("category: null, eventList = null, mySchool: 존재 (학교 지정)");
//                List<Post> posts = postRepository.findAllBySchool(mySchool);
//                List<ClassifyPost> classifyPosts = convertToClassify(posts);
//                return classifyPosts;
            }
        }

        // 2. category만 있는 경우 -> 서울, 부산 또는 숭실대학교, 중앙대학교
        if(eventList == null || eventList.isEmpty()) {
            if(category != null || !category.isEmpty()) {

                if(category.equals("전체")) {
                    //System.out.println("category: 전체, eventList = null, 학교 또는 지역 미지정");
                    List<Post> allSchool = postRepository.findAll();
                    List<ClassifyPost> allClassifyPosts = convertToClassify(allSchool);
                    return allClassifyPosts;
                }
                if(division.equals("학교")) {
                    //System.out.println("category: OO대학교, eventList = null, 학교만 지정");
                    List<Post> posts = postRepository.findAllBySchool(category);
                    List<ClassifyPost> classifyPosts = convertToClassify(posts);
                    return classifyPosts;
                } else if(division.equals("지역")) {
                    //System.out.println("category: 서울, eventList = null, 지역만 지정");
                    List<Post> posts = postRepository.findAllByLocal(category);
                    List<ClassifyPost> classifyPosts = convertToClassify(posts);
                    return classifyPosts;
                }
            }
        }

        // 3. eventList만 있는 경우 -> 강연, 강의, 축제 ... 리스트
        if(category == null || category.isEmpty()) {
            if(eventList != null || !eventList.isEmpty()) {
                //System.out.println("category: null, eventList = 존재, eventList만 지정");
                List<Post> posts = postRepository.findAllByEventIn(eventList);
                List<ClassifyPost> classifyPosts = convertToClassify(posts);
                return classifyPosts;
            }
        }


        // 4. 둘다 있는 경우 - category와 eventList 둘다 있는 경우
        // category 와 eventList 가 둘다 있는데, category 가 "전체" 인 경우
        if(category.equals("전체")) {
            List<Post> posts = postRepository.findAllByEventIn(eventList);
            List<ClassifyPost> classifyPosts = convertToClassify(posts);
            return classifyPosts;
        }
        // category 와 eventList 가 둘다 있는데, category 는 "전체" 가 아닌 경우
        if(division.equals("학교")) {
            List<Post> posts = postRepository.findAllBySchoolAndEventIn(category, eventList);
            List<ClassifyPost> classifyPosts = convertToClassify(posts);
            return classifyPosts;

        } else { // division.equals("지역")
            List<Post> posts = postRepository.findAllByLocalAndEventIn(category, eventList);
            List<ClassifyPost> classifyPosts = convertToClassify(posts);
            return classifyPosts;
        }





    }

    private List<ClassifyPost> convertToClassify(List<Post> posts) {
        List<ClassifyPost> list = new ArrayList<>();

        for (Post post : posts) {
            ClassifyPost classifyPost = new ClassifyPost();
            classifyPost.setPost_id(post.getId());
            classifyPost.setTitle(post.getTitle());
            classifyPost.setScrap_count(post.getScrap_count());
            classifyPost.setStartPostTime(post.getStartPostTime().toString());
            classifyPost.setEvent(post.getEvent());
            classifyPost.setOrganizer(post.getOrganizer());
            String thumbnail = imageService.getThumbnail(post.getId());
            if(thumbnail == null || thumbnail.isEmpty()) {
                classifyPost.setImgUrl(null);
            }else {
                classifyPost.setImgUrl(thumbnail);
            }
            list.add(classifyPost);
        }
        return list;
    }

    public List<ClassifyPost> searchPost(String relation) {

        List<Post> posts = postRepository.findByTitleContaining(relation);
        List<ClassifyPost> classifyPosts = convertToClassify(posts);

        return classifyPosts;
    }

    public List<MyPostDto> getMyPost() {
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        //System.out.println("========================================================================================");
        List<Post> posts = postRepository.findAllByMember(member);
        List<MyPostDto> myPostDto = convertToMyPost(posts);
        return myPostDto;
    }

    private List<MyPostDto> convertToMyPost(List<Post> posts) {
        List<MyPostDto> list = new ArrayList<>();

        for (Post post : posts) {
            MyPostDto myPostDto = new MyPostDto();
            myPostDto.setPost_id(post.getId());
            myPostDto.setTitle(post.getTitle());
            myPostDto.setScrap_count(post.getScrap_count());
            myPostDto.setStartPostTime(post.getStartPostTime().toString());
            myPostDto.setFinishPostTime(post.getFinishPostTime().toString());
            myPostDto.setEvent(post.getEvent());

            String thumbnail = imageService.getThumbnail(post.getId());
            if(thumbnail == null || thumbnail.isEmpty()) {
                myPostDto.setImgUrl(null);
            }else {
                myPostDto.setImgUrl(thumbnail);
            }
            list.add(myPostDto);
        }
        return list;
    }


    public List<PostResCal> findScrapsByLocal(Integer nowIYear, Integer nowIMonth) {
        String local = "서울";
        List<PostResCal> scraps = postRepository.findScrapsByLocal(nowIYear, nowIMonth, local);
        return scraps;
    }
}
