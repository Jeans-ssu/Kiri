package com.ssu.kiri.post.mapper;


import com.ssu.kiri.post.Post;
import com.ssu.kiri.post.dto.PostReqDto;
import com.ssu.kiri.post.dto.PostResDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostMapper {

    // 게시글 상세보기
    PostResDto.detailPost toPostResDto(Post post);

    // 게시글 등록
    Post saveToPost(PostReqDto.savePost post);
    PostResDto.savePost postToSave(Post post);

}
