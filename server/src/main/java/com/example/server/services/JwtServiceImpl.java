package com.example.server.services;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtServiceImpl implements JwtService {
    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.access.expiry}")
    private long accessExpiry;

    public long getAccessExpiry() { return accessExpiry; }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }

    public String generateToken(JwtUser user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        return Jwts.builder().setClaims(claims).setSubject(user.getEmail()).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + accessExpiry))
                .signWith(getSignInKey(), SignatureAlgorithm.HS512).compact();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Date getExpirationDate(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    @Override
    public <T> T getClaimFromToken(String token, String fieldName, Class<T> type) {
        Claims claims = getAllClaimsFromToken(token);
        T val = claims.get(fieldName, type);
        return val;
    }

    private Boolean isExpired(String token) {
        final Date expiration = getExpirationDate(token);
        return expiration.before(new Date());
    }

    public Boolean validate(String token) {
        try {
            if (!isExpired(token)) { return true; }
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Invalid JWT token: " + e.getMessage());
        }
        return false;
    }
}
