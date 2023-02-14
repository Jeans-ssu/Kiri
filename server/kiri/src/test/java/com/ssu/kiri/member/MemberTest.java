package com.ssu.kiri.member;

import com.ssu.kiri.config.TestConfig;
import com.ssu.kiri.image.Image;
import com.ssu.kiri.infra.WithAccount;
import com.ssu.kiri.member.dto.request.UpdateDto;
import com.ssu.kiri.post.Post;
import com.ssu.kiri.scrap.Scrap;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@Import({TestConfig.class})
@SpringBootTest
@Transactional
//@Rollback(false)
class MemberTest {

    static {
        System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
    }

    @PersistenceContext
    EntityManager em;

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;


    @AfterEach
    void afterEach() {
        memberRepository.deleteAll();
    }

    /**
     * username : creamyyy
     * email : creamyyy@aaa.com
     * password : abcdefgh1234
     * interest = 기타
     */
    @DisplayName("개인 정보 수정 테스트 : 비밀 번호를 수정하지 않는 경우")
    @WithAccount("creamyyy")
    @Test
    void updateMyMember() throws Exception {
        //given
        Member member = memberRepository.findByEmail("creamyyy@aaa.com").get();
        Long id = member.getId();
        String beforePassword = member.getPassword();
        UpdateDto updateDto = new UpdateDto();
        updateDto.setUsername("creamyyy");
        updateDto.setEmail("creamyyy@aaa.com");
        updateDto.setLocal("대전");
        updateDto.setSchool("숭실대학교");
        updateDto.setDepartment("일반인");
        updateDto.setCheck_password(false);

        //when
        Member afterMember = memberService.updateMember(updateDto);

        //then
        assertThat(afterMember.getLocal()).isEqualTo("대전");
        assertThat(afterMember.getPassword()).isEqualTo(member.getPassword());
        System.out.println("beforePassword = " + beforePassword);
        System.out.println("afterMember.password = " + afterMember.getPassword());

    }

    @DisplayName("개인 정보 수정 테스트 : 비밀 번호를 수정하는 경우")
    @WithAccount("creamyyy")
    @Test
    void updateMyMemberWithPassword() throws Exception {
        //given
        Member member = memberRepository.findByEmail("creamyyy@aaa.com").get();
        Long id = member.getId();
        String beforePassword = member.getPassword();
        UpdateDto updateDto = new UpdateDto();
        updateDto.setUsername("creamyyy");
        updateDto.setEmail("creamyyy@aaa.com");
        updateDto.setPassword("aaaaaa1111");
        updateDto.setLocal("대전");
        updateDto.setSchool("숭실대학교");
        updateDto.setDepartment("일반인");
        updateDto.setCheck_password(true);

        //when
        Member afterMember = memberService.updateMember(updateDto);

        //then
        assertThat(afterMember.getLocal()).isEqualTo("대전");
        assertThat(afterMember.getPassword()).isNotEqualTo(beforePassword);
        System.out.println("beforePassword = " + beforePassword);
        System.out.println("afterMember.password = " + afterMember.getPassword());

    }


    // 개인 정보 조회 테스트 코드
//    @WithMockUser
    @DisplayName("개인 정보 조회 테스트")
    @WithAccount("creamyyy")
    @Test
    public void getMyMember() throws Exception {

        //given
        Member member = memberRepository.findByEmail("creamyyy@aaa.com").get();
        Long id = member.getId();

        //when
        Member findMember = memberService.findMember(id);

        //then
        assertThat(findMember).isEqualTo(member);
        assertThat(findMember.getId()).isEqualTo(member.getId());


    }

    @DisplayName("이메일 중복 체크 테스트")
    @Test
    public void checkEmailDuplicate() throws Exception {
        //given

        // Member 회원가입
        Member member = Member.builder()
                .email("ddd@ddd.com")
                .username("ddd")
                .password("ddddddddd")
                .local("서울")
                .school("숭실대학교")
                .department("대학생")
                .build();

        Member savedMember = memberService.postMember(member);

        //when
        boolean isCheck = memberService.checkEmailDuplicate("ddd@ddd.com");

        //then
        assertThat(isCheck).isEqualTo(true);

    }



    @Test
    public void testEntity() {

        //given
        Member member = new Member("love@nate.com");
        em.persist(member);

        Post post1 = new Post(member, "title1!!");
        Post post2 = new Post(member, "title2!!");
        em.persist(post1);
        em.persist(post2);

        Image image1 = new Image(post1);
        Image image2 = new Image(post2);
        em.persist(image1);
        em.persist(image2);

        Scrap scrap1 = new Scrap(member, post1);
        Scrap scrap2 = new Scrap(member, post2);

        em.persist(scrap1);
        em.persist(scrap2);

        // 초기화
        em.flush();
        em.clear();

        //확인
        List<Member> members = em.createQuery("select m from Member m", Member.class)
                .getResultList();

        for (Member m : members) {
            System.out.println("member = " + m);
            System.out.println("member.id = " + m.getId());
            System.out.println("-> member.team = " + m.getPostList());
            System.out.println("-> member.scrap = " + m.getScrapList());
            System.out.println("-> post.scrap = " + m.getPostList());
        }



    }

    @WithAccount("creamyyy")
    @DisplayName("비밀번호가 이미 존재하는지 확인 테스트")
    @Test
    public void checkPasswordExistTest() throws Exception {
        //given
//        String checkPassword = "abcdefgh1234";
        String checkPassword = "abcdefgh123";

        //when
        boolean isExist = memberService.checkPasswordExist(checkPassword);

        //then
//        assertThat(isExist).isEqualTo(true);
        assertThat(isExist).isEqualTo(false);

    }





}