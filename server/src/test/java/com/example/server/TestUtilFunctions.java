package com.example.server;

import com.example.server.services.JwtService;
import com.example.server.data.dto.JwtUser;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TestUtilFunctions {
    @Value("${jwt.access.name}")
    private String accessTokenName;

    @Autowired
    private JwtService jwtService;

    // Utility method to set JWT cookie
    public Cookie getJwtCookie(String email, int id) throws Exception {
        return new Cookie(accessTokenName, jwtService.generateToken(new JwtUser(email, id)));
    }
}
