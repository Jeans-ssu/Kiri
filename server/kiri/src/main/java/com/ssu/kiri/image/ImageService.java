package com.ssu.kiri.image;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssu.kiri.image.dto.ImageResDto;
import com.ssu.kiri.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 게시글을 수정할때 이미지를 업데이트 하지 않으면,
    public List<String> findImageUrlsByPostId(Long id) {
        List<Image> imageUrlList = imageRepository.findUrlByPostId(id);
        List<String> imgList = imageUrlList.stream()
                .map(i -> i.getImgUrl())
                .collect(Collectors.toList());
        return imgList;
    }


    // 게시글 저장시 이미지 파일도 같이 저장
    public List<String> savePost(Post savedPost, List<Long> imageIdList) {
        List<String> savedImgUrlList = new ArrayList<>();

        for (Long id : imageIdList) {
            Image image = imageRepository.findById(id).orElseThrow();
            image.changePost(savedPost); // Post 와 Image 간 연관관계 편의 메서드로 관계 생성
            imageRepository.save(image); // 변경한 image 를 다시 repository에 다시 저장해줌
            savedImgUrlList.add(image.getImgUrl());
        }

        return savedImgUrlList;

    }


    // 파일 저장
    public List<ImageResDto> addFile(List<MultipartFile> multipartFiles) throws IOException {
        List<ImageResDto> imageResDtoList = new ArrayList<>();
        /**
         *   private Long image_id;
         *   private String imgUrl;
         */

        // 파일 저장할 디렉토리 경로 생성
        String absolutePath = new File("").getAbsolutePath() + File.separator + "temp";

        // 파일 확장자 추출 -  확장자가 없거나 jpg, jpeg, png 가 아니면 예외 발생
        for (MultipartFile multipartFile : multipartFiles) {
            String contentType = multipartFile.getContentType();
            if(ObjectUtils.isEmpty(contentType)) {
                throw new RuntimeException("FILE TYPE 이 적절하지 않습니다.");
            } else if(!verifyContentType(contentType)){
                throw new RuntimeException("FILE TYPE 은 jpg, jpeg, png 만 가능합니다.");
            }
        }

        for (MultipartFile multipartFile : multipartFiles) {

            // 저장할 파일 이름 먼저 생성
            String filename = UUID.randomUUID() + multipartFile.getOriginalFilename();

            // 로컬에 저장
            // 디렉토리 이름 생성 , 그리고 해당 디렉토리가 없으면 생성해줌
            String fullFilePath = absolutePath + File.separator + filename;
            System.out.println("fullFilePath = " + fullFilePath);
            File file = new File(fullFilePath);
            if(!file.exists()) { file.mkdirs(); }

            // 절대경로를 쓰지 않아서 나는 에러 ..java.nio.file.AccessDeniedException => Path 를 이용하자.
            // multipartFile -> File 로 전환
//            Path path = Paths.get(fullFilePath).toAbsolutePath();
//            multipartFile.transferTo(path.toFile());

            multipartFile.transferTo(file);
            file.createNewFile(); // 디렉토리와 같은 이름의 파일 생성

//            File file = convert(multipartFile, file1, fullFilePath)
//                    .orElseThrow();//() -> new IllegalArgumentException("MultipartFile -> File 로의 변환이 실패."));

            // S3로 업로드
            amazonS3.putObject(
                    new PutObjectRequest(bucket, filename, file)
                            .withCannedAcl(CannedAccessControlList.PublicRead) // PublicRead 권한으로 업로드 됨
            );

            String imgUrl = amazonS3.getUrl(bucket, filename).toString();

            Image newImage = Image.builder()
                    .filename(filename)
                    .filepath(filename)
                    .imgUrl(imgUrl)
                    .build();


            imageRepository.save(newImage);
            ImageResDto imageResDto = ImageResDto.of(newImage);

            imageResDtoList.add(imageResDto);

            // 로컬에 남아있는 파일 삭제
//            file.delete();

        }



        return imageResDtoList;

    }

    // multipartFile -> file로 전환
    private Optional<File> convert(MultipartFile multipartFile, File file, String fullFilePath) throws IOException {
        if(file.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(file);
        }
        return Optional.empty();
    }

    // file 의 확장자가 jpq, jpeg, png 중에 있으면 true 리턴
    private boolean verifyContentType(String contentType) {
        if(contentType.contains("jpg") || contentType.contains("jpeg") || contentType.contains("png")) {
            return true;
        }
        return false;
    }


    public void upload() {

    }


    public void deleteImage(Long image_id) {

        Image image = imageRepository.findById(image_id)
                .orElseThrow(() -> new RuntimeException("삭제하려는 이미지를 찾을 수 없습니다."));

        String filepath = image.getFilepath();
        // S3에서 파일 삭제
        amazonS3.deleteObject(bucket, filepath);
        // DB에서 파일 정보 삭제
        imageRepository.delete(image);
    }
}
