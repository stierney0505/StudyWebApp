package com.example.server.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public interface JwtService {
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver);

    public Claims getAllClaimsFromToken(String token);

    public long getAccessExpiry();

    public String generateToken(JwtUser user);

    public Date getExpirationDate(String token);

    public String getUserFromToken(String token);

    public Boolean validate(String token);
}