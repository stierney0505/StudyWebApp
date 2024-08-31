package com.example.server.routes;


import com.example.server.services.JwtService;
import com.example.server.data.dto.JwtUser;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public abstract class Routes {
    protected static final String JWT_TOKEN_NAME = "jwtaccesstokentest";
    protected HttpServletResponse httpServletResponse;
    protected JwtService jwtService;
    
    public Routes (JwtService jwtService, HttpServletResponse httpServletResponse) {
        this.jwtService = jwtService;
        this.httpServletResponse = httpServletResponse;
    }

    int getIdFromToken(String token) {
        return jwtService.getClaimFromToken(token, "id", Integer.class);
    }

    public void assignCookie(HttpServletResponse httpServletResponse, JwtUser tempUser) {
        Cookie cookie = new Cookie(JWT_TOKEN_NAME, jwtService.generateToken(tempUser));
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) jwtService.getAccessExpiry() / 1000 );

        httpServletResponse.addCookie(cookie);
    }
}
