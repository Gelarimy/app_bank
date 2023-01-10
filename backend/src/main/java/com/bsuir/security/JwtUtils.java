package com.bsuir.security;

import com.bsuir.entity.Client;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String login = getUsernameFromToken(token);
        return (login.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String generateToken(Client client) {
        final String authorityScope = ClientUtils.buildAuthority(client.getRole())
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        return Jwts.builder()
                .setSubject(client.getUsername())
                .claim("scopes", authorityScope)
                .signWith(SignatureAlgorithm.HS256, Constants.SIGNING_KEY)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()
                        + Constants.ACCESS_TOKEN_VALIDITY_SECONDS))
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    private Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(Constants.SIGNING_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}
