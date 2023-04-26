package com.ssu.kiri.image;

import com.ssu.kiri.image.dto.ImageResDto;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


// List<MultipartFile> 을 전달받아 파일을 저장한 후 관련 정보를 List<Image>로 변환
@Component
public class ImageHandler {

    private final ImageService imageService;

    public ImageHandler(ImageService imageService) {
        this.imageService = imageService;
    }


    /*public List<Image> parseFileInfo(List<MultipartFile> multipartFiles) throws Exception {
        // 반환할 파일 리스트
        List<Image> fileList = new ArrayList<>();

        // 전달받은 파일이 존재할 경우,
        if(CollectionUtils.isEmpty(multipartFiles)) {
            // 파일명을 업로드한 날짜로 변환하여 저장.
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            String current_date = now.format(dateTimeFormatter);

            // 프로젝트 디렉터리 내의 저장을 위한 절대 경로 설정
            // 경로 구분자 File.separator 사용
            String absolutePath = new File("").getAbsolutePath() + File.separator;// + File.separator;

            // 파일을 저장할 세부 경로 지정
            String path = "images" + File.separator + current_date;
            File file = new File(path);

            // 디렉터리가 존재하지 않을 경우,
            if(!file.exists()) {
                boolean wasSuccessful = file.mkdirs();

                // 디렉터리 생성에 실패했을 경우,
                if(!wasSuccessful) {
                    System.out.println("file: was not successful");
                }
            }

            // 다중 파일 처리
            for (MultipartFile multipartFile : multipartFiles) {

                // 파일의 확장자 추출
                String originalFileExtension;
                String contentType = multipartFile.getContentType();

                // 확장자명이 존재하지 않을 경우 처리 X
                if(ObjectUtils.isEmpty(contentType)) {
                    break;
                } else {
                    if(contentType.contains("image/jpeg"))
                        originalFileExtension = ".jpg";
                    else if(contentType.contains("image/png"))
                        originalFileExtension = ".png";
                    else // jpeg, png 외의 다른 확장자일 경우 처리 x
                        break;
                }

                // 파일 명 중복 피하고자 나노초까지 얻어와 지정
                String new_file_name = System.nanoTime() + originalFileExtension;

                // 파일 DTO 생성
                ImageResDto imageResDto = ImageResDto.builder()
                        .origFileName(multipartFile.getOriginalFilename())
                        .filePath(path + File.separator + new_file_name)
                        .build();

                // 파일 DTO 이용하여 Image 엔티티 생성
                Image image = new Image(imageResDto.getOrigFileName(), imageResDto.getFilePath());

                // 엔티티 생성 후 리스트에 추가
                fileList.add(image);

                // 업로드한 파일 데이터를 지정한 파일에 저장
                file = new File(absolutePath + path + File.separator + new_file_name);
                multipartFile.transferTo(file);

                // 파일 권한 설정 (쓰기, 읽기)
                file.setWritable(true);
                file.setReadable(true);


            }

        }

        return fileList;
    }
*/
}
