package com.ssu.kiri.post.mapper;


import com.ssu.kiri.post.Post;
import com.ssu.kiri.post.dto.PostResDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostMapper {

    PostResDto.detailPost toPostResDto(Post post);

}
