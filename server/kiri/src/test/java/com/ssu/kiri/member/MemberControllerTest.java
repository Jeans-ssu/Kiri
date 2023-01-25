package com.ssu.kiri.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.dto.MemberReqDto;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Rollback(false)
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
class MemberControllerTest {

    @Autowired private MemberController memberController;
    @Autowired private WebApplicationContext ctx;
    private ObjectMapper objectMapper = new ObjectMapper();
    private MockMvc mockMvc;

    @Autowired MemberRepository memberRepository;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
                .addFilters(new CharacterEncodingFilter("UTF-8", true))  // 한글 깨짐 처리
//                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @AfterEach
    void afterEach() {
        memberRepository.deleteAll();
    }

//    @BeforeEach
//    public void setup2() {
//        mockMvc = MockMvcBuilders.standaloneSetup(memberController).build();
//    }

    @WithAccount("creamyyyy")
    @DisplayName("개인 정보 조회 테스트")
    @Test
    void getMyMember() throws Exception {

        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .get("/member") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                )
                .andExpect(status().isOk())
                .andDo(print());


    }

    /**
     * String email = username + "@aaa.com";
     * String password = "abcdefgh1234";
     * String interest = "기타";
     * @throws Exception
     */
    @WithAccount("creamyyyy")
    @DisplayName("개인 정보 수정 테스트")
    @Test
    void updateMyMember() throws Exception {

        MemberReqDto.updateDto updateDto = new MemberReqDto.updateDto();
        updateDto.setUsername("creamyyyy");
        updateDto.setEmail("creamyyyy@aaa.com");
        updateDto.setInterest("IT");
        updateDto.setPassword("bbbbbbbb444");

        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/member") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(updateDto))
                )
                .andExpect(status().isOk())
                .andDo(print());


    }


}