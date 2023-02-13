package com.ssu.kiri.temp;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssu.kiri.image.Image;
import com.ssu.kiri.image.dto.ImageResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Transactional
public class TempService {

    // 파일 저장
    public void addFile(List<MultipartFile> multipartFiles) throws IOException {

        /**
         *   private Long image_id;
         *   private String imgUrl;
         */

        // 파일 저장할 디렉토리 경로 생성
        String absolutePath = new File("").getAbsolutePath() + File.separator + "temp";

        // 파일 확장자 추출 -  확장자가 없거나 jpg, jpeg, png 가 아니면 예외 발생
        for (MultipartFile multipartFile : multipartFiles) {
            String contentType = multipartFile.getContentType();
            if (ObjectUtils.isEmpty(contentType)) {
                throw new RuntimeException("FILE TYPE 이 적절하지 않습니다.");
            } else if (!verifyContentType(contentType)) {
                throw new RuntimeException("FILE TYPE 은 jpg, jpeg, png 만 가능합니다.");
            }
        }

        for (MultipartFile multipartFile : multipartFiles) {

            // 저장할 파일 이름 먼저 생성
            String filename = UUID.randomUUID() + multipartFile.getOriginalFilename();

            // 로컬에 저장
            // 디렉토리 이름 생성 , 그리고 해당 디렉토리가 없으면 생성해줌
            String fullFilePath = absolutePath + File.separator + filename;
//            System.out.println("fullFilePath = " + fullFilePath);
//            File file = new File(fullFilePath);
//            if (!file.exists()) {
//                file.mkdirs();
//            }

            // 절대경로를 쓰지 않아서 나는 에러 ..java.nio.file.AccessDeniedException => Path 를 이용하자.
            // multipartFile -> File 로 전환
            Path path = Paths.get(fullFilePath).toAbsolutePath();
            File file = path.toFile();
            multipartFile.transferTo(file);
//            Files.createFile(path);


//            multipartFile.transferTo(file);
//            file.createNewFile(); // 디렉토리와 같은 이름의 파일 생성


//            File file = convert(multipartFile, file1, fullFilePath)
//                    .orElseThrow();//() -> new IllegalArgumentException("MultipartFile -> File 로의 변환이 실패."));



            // 로컬에 남아있는 파일 삭제
//            file.delete();

        }
    }


    // file 의 확장자가 jpq, jpeg, png 중에 있으면 true 리턴
    private boolean verifyContentType(String contentType) {
        if(contentType.contains("jpg") || contentType.contains("jpeg") || contentType.contains("png")) {
            return true;
        }
        return false;
    }

}
