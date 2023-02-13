package com.ssu.kiri.temp;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssu.kiri.config.TestConfig;
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
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Import({TestConfig.class})
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
class TempControllerTest {

    @Autowired
    private WebApplicationContext ctx;
    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
                .addFilters(new CharacterEncodingFilter("UTF-8", true))  // 한글 깨짐 처리
//                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @Test
    @DisplayName("이미지 로컬 업로드 테스트")
    public void uploadTest() throws Exception {
        //given

        MockMultipartFile image1 = new MockMultipartFile(
                "images",
                "test.png",
                "image/png",
                "test.png".getBytes());
        //when

        //then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .multipart("/upload") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .file(image1)
                                .accept(MediaType.MULTIPART_FORM_DATA) // accept encoding 타입을 지정
                                .contentType(MediaType.MULTIPART_FORM_DATA)

                )
                .andDo(print())
                .andExpect(status().isOk());
//                .andDo(print());

    }

}