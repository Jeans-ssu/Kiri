package com.ssu.kiri.image;


import com.ssu.kiri.image.dto.ImageResDto;
import com.ssu.kiri.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ImageService {

    private final ImageRepository imageRepository;

//    public void addFileToLocal(List<MultipartFile> multipartFiles) {
//
//    }
//
//    public void savePostToLocal() {
//
//    }


    public List<ImageResDto> addFiles(List<MultipartFile> multipartFiles) throws IOException {
        List<ImageResDto> imageResDtoList = new ArrayList<>(); // image_id + 이미지 url 경로

        for (MultipartFile multipartFile : multipartFiles) {
            // 파일 경로, 날짜이름으로 폴더 생성 - 준비
            // File's AbsolutePath = D:\workspace_intellij_forKiri\Kiri\server\kiri + \ + temp
            String absolutePath = new File("").getAbsolutePath() + File.separator + "temp";
            String filename = "";

            String contentType = multipartFile.getContentType(); // Multipart/form-data
            // file
            if (contentType !=null && !contentType.isEmpty()) {
                if(contentType.contains("jpg")|| contentType.contains("png")||contentType.contains("jpeg")) { // jpg, png, jpeg 파일만 가능
                    // 파일 이름 생성
                    filename = UUID.randomUUID() + multipartFile.getOriginalFilename();

                    // 로컬 저장
                    File file = new File(absolutePath + File.separator + filename); // 디렉토리 생성
                    if(!file.exists()) { // 디렉토리가 없으면 새로 생성
                        file.mkdir();
                    }
                    multipartFile.transferTo(file); // multipartFile 을 file 디렉토리에 올리기
//                    file.createNewFile(); // file이 없으면 새로 생성, 있으면 아무것도 안함

                    Image image = Image.builder()
                            .filename(filename)
                            .build();

                    // repository 에 저장
                    imageRepository.save(image);
                    ImageResDto imageResDto = null; //new ImageResDto(image);


                    imageResDtoList.add(imageResDto);

                } else {
                    throw new RuntimeException("해당 타입의 파일은 올릴 수 없습니다.");
                }
            }
            else {
                throw new RuntimeException("해당 타입의 파일은 올릴 수 없습니다.");
            }

        }

        return imageResDtoList;
    }


    public List<String> savePost(Post post, List<Long> image_id) {
        List<String> savedImgUrlList = new ArrayList<>();

        for (Long id : image_id) {
            Optional<Image> optImage = imageRepository.findById(id);
            if(optImage.isEmpty()) {
                throw new RuntimeException("해당 이미지를 찾을 수 없습니다.");
            }
            Image image = optImage.get();
            image.changePost(post); // image.post = post, post.imageList.add(image)
            imageRepository.save(image);
            savedImgUrlList.add(image.getImgUrl());
        }
        return savedImgUrlList;
    }

    public List<String> findUrlByPostId(Long post_id) {
        List<Image> imgUrlList = imageRepository.findUrlByPostId(post_id);
        return imgUrlList.stream()
                .map(imgUrl -> imgUrl.getImgUrl())
                .collect(Collectors.toList());
    }

}
