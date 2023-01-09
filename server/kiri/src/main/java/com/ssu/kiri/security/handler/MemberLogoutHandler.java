package com.ssu.kiri.security.handler;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MemberLogoutHandler implements LogoutHandler {
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Authentication secAuthentication = SecurityContextHolder.getContext().getAuthentication();
//        secAuthentication.setAuthenticated(false);

        // 시큐리티를 저장하는 세션공간을 날려버림
        if(secAuthentication != null) {
//            new SecurityContextLogoutHandler().logout(request,response,authentication);
//            UsernamePasswordAuthenticationToken nope = new UsernamePasswordAuthenticationToken("NOPE", null);
//            SecurityContextHolder.clearContext();
            new SecurityContextLogoutHandler().logout(request,response,secAuthentication);
        }
    }
}
