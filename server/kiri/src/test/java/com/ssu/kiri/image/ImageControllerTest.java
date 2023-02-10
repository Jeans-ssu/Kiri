package com.ssu.kiri.image;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssu.kiri.config.S3MockConfig;
import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.post.PostRepository;
import com.ssu.kiri.post.PostService;
import io.findify.s3mock.S3Mock;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Import({TestConfig.class})//, S3MockConfig.class})
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
class ImageControllerTest {

    static {
        System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
    }

    @Autowired
    private WebApplicationContext ctx;
    private ObjectMapper objectMapper = new ObjectMapper();
    private MockMvc mockMvc;
    @Autowired private ImageRepository imageRepository;
    @Autowired private PostRepository postRepository;
    @Autowired private MemberRepository memberRepository;
    @Autowired private PostService postService;
    @Autowired private ImageService imageService;
    @Autowired private ImageController imageController;

//    @Autowired private S3Mock s3Mock;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
                .addFilters(new CharacterEncodingFilter("UTF-8", true))  // 한글 깨짐 처리
//                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }



    @AfterEach
    void afterEach() {
        imageRepository.deleteAll();
        postRepository.deleteAll();
        memberRepository.deleteAll();
//        s3Mock.stop();
    }


    @WithAccount("creamyyyy")
    @DisplayName("이미지 등록 테스트")
    @Test
    public void createImageTest() throws Exception {
        //given

        String filename = "files"; // 파일 명
        String contentType = "png"; // 파일 타입
        String filePath = "C:\\Users\\user\\OneDrive\\사진" + File.separator + filename + "." + contentType; // 파일 경로
        FileInputStream fileInputStream = new FileInputStream(filePath);


//        MockMultipartFile image1 = new MockMultipartFile(
//                filename, // name
//                filename + "." + contentType, // originalFilename
//                contentType, // jpg, png 같은 파일의 형식
//                fileInputStream // 파일경로로 생성한 InputStream
//        );
//

        MockMultipartFile image1 = new MockMultipartFile(
                filename,
                filename + "." + contentType,
                "image/png",
                filename.getBytes());


        // MockMultipartFile 의 originalFilename 관련 문제인듯?
//        MockPart image1 = new MockPart(filename, filename + "." + contentType, filename.getBytes());

        //when
        //then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .multipart("/api/posts/image") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .file(image1)
//                                .part(image1)
                                .contentType(MediaType.MULTIPART_FORM_DATA)
//                                .accept(MediaType.APPLICATION_JSON)
                                .characterEncoding("UTF-8")
                )
                .andDo(print())
                .andExpect(status().isOk());
//                .andDo(print());


    }









}









