package com.sergio.healthtrack.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtUtil {

    @Value("${JWT_SECRET}")
    private String secretKey;

    @Value("${JWT_EXPIRATION}")
    private long jwtExpiration;

    private SecretKey secretKeyEncripted;

    @PostConstruct
    public void init() {
        this.secretKeyEncripted = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    //Genera el token con el email dentro
    public String generarToken(String email,String role) {
        return Jwts
                .builder()
                .subject(email)
                .claim("role",role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(secretKeyEncripted)
                .compact();
    }

    //Extrae el username del token
    public String extraerUsername(String token) {
        return Jwts
                .parser()
                .verifyWith((SecretKey) secretKeyEncripted)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    //Verifica que el token sea valido
    public boolean validarToken(String token,String username) {
        return extraerUsername(token).equals(username) && !estaExpirado(token);
    }

    private boolean estaExpirado(String token) {
        return Jwts
                .parser()
                .verifyWith((SecretKey) secretKeyEncripted)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }
}
