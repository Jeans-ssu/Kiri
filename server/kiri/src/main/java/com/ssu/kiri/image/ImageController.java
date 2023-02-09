package com.ssu.kiri.image;


import com.ssu.kiri.image.dto.ImageResDto;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/api/posts/image")
    public ResponseEntity createImage(@RequestPart(value = "files") List<MultipartFile> multipartFiles) throws IOException {

        // member 인가
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        List<ImageResDto> imageResDtoList = imageService.addFile(multipartFiles);

        return new ResponseEntity(imageResDtoList, HttpStatus.CREATED);
    }




}
