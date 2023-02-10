package com.ssu.kiri.image;

import com.ssu.kiri.config.S3MockConfig;
import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.image.dto.ImageResDto;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.post.PostService;
import io.findify.s3mock.S3Mock;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.FileInputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@Import({TestConfig.class, S3MockConfig.class})
@SpringBootTest
@Transactional
class ImageServiceTest {

    static {
        System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
    }

    @PersistenceContext
    EntityManager em;

    @Autowired private S3Mock s3Mock;
    @Autowired private ImageService imageService;

    @Autowired private ImageRepository imageRepository;
    @Autowired private PostRepository postRepository;
    @Autowired private MemberRepository memberRepository;

    @BeforeEach
    void beforeEach() {

    }

    @AfterEach
    void afterEach() {
        imageRepository.deleteAll();
        postRepository.deleteAll();
        memberRepository.deleteAll();
    }

    @WithAccount("username")
    @DisplayName("이미지 등록 테스트")
    @Test
    public void addFileTest() throws Exception {
        //given
//        String path = "test.png";
//        String contentType = "image/png";
//        String dirName = "test";
//
//        MultipartFile file = new MockMultipartFile("files", path, contentType, "test".getBytes());

        MultipartFile file = new MockMultipartFile("files",
                "test.png",
                "image/png",
                new FileInputStream("./src/test/java/com/ssu/kiri/testimg/test.png"));

        List<MultipartFile> list = new ArrayList<>();
        list.add(file);

        //when
        List<ImageResDto> imageResDtoList = imageService.addFile(list);

        //then
        assertThat(imageResDtoList.size()).isEqualTo(1);

    }

}