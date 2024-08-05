package com.example.server.routes;


import com.example.server.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class Routes {
    protected static final String JWT_TOKEN_NAME = "jwtaccesstokentest";

    protected JwtService jwtService;
    
    public Routes (JwtService jwtService) { this.jwtService = jwtService; }
}
