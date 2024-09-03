package com.example.server.services;

import com.example.server.data.dto.JwtUser;
import io.jsonwebtoken.Claims;

import java.util.Date;
import java.util.function.Function;

public interface JwtService {
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver);

    public Claims getAllClaimsFromToken(String token);

    public long getAccessExpiry();

    public String generateToken(JwtUser user);

    public Date getExpirationDate(String token);

    public String getEmailFromToken(String token);

    public <T> T getClaimFromToken(String token, String fieldName, Class<T> type);

    public Boolean validate(String token);
}