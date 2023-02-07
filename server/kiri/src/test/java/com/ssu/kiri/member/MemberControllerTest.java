package com.ssu.kiri.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.dto.request.LoginReqDto;
import com.ssu.kiri.member.dto.request.PostMemberReqDto;
import com.ssu.kiri.member.dto.request.UpdateDto;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@Rollback(false)
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
    @Autowired MemberService memberService;


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

    @DisplayName("회원가입 테스트")
    @Test
    public void postMember() throws Exception {
        //given
        PostMemberReqDto postMemberReqDto = new PostMemberReqDto();
        postMemberReqDto.setEmail("love5@aaa.com");
        postMemberReqDto.setUsername("ddddd");
        postMemberReqDto.setPassword("ddddd55555");
        postMemberReqDto.setPasswordVal("ddddd55555");
        postMemberReqDto.setSchool("숭실대학교");
        postMemberReqDto.setDepartment("대학생");
        postMemberReqDto.setLocal("서울");

        //when
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/auth/signup") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(postMemberReqDto))
                )
                .andExpect(status().isOk())
                .andDo(print());


        //then

    }


    @DisplayName("로그인 테스트")
    @Test
    public void loginMember() throws Exception {
        //given

        // 회원가입 실행
        Member member = Member.builder()
                .username("ddddd")
                .email("ddd@ddd.com")
                .password("ddddd55555")
                .local("서울")
                .department("대학생")
                .school("숭실대학교")
                .build();

        Member postMember = memberService.postMember(member);

        // 로그인 정보 생성성
        LoginReqDto loginReqDto = new LoginReqDto(postMember.getEmail(), postMember.getPassword());

        //when
        //then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/login") // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
                                .accept(MediaType.APPLICATION_JSON) // accept encoding 타입을 지정
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(loginReqDto))
                )
                .andExpect(status().isOk())
                .andDo(print());
    }



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

    @DisplayName("이메일 중복 체크 테스트")
    @Test
    public void checkEmailDuplicate() throws Exception {
        //given
        // 회원가입 실행
        Member member = Member.builder()
                .username("ddddd")
                .email("ddd@ddd.com")
                .password("ddddd55555")
                .local("서울")
                .department("대학생")
                .school("숭실대학교")
                .build();

        Member postMember = memberService.postMember(member);

        //when
        //then
        this.mockMvc.perform(
                        MockMvcRequestBuilders // MockMvcRequestBuilders 를 안쓰면 get 함수를 인식 못함
                                .post("/auth/{email}/exist", member.getEmail()) // 넣어준 컨트롤러의 Http Method 와 URL 을 지정
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

        UpdateDto updateDto = new UpdateDto();
        updateDto.setUsername("creamyyyy");
        updateDto.setEmail("creamyyyy@aaa.com");
        updateDto.setLocal("서울");
        updateDto.setDepartment("대학생");
        updateDto.setSchool("숭실대학교");
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