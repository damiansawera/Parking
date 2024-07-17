package project.parking.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtGenerator {
    public static final long JWT_EXPIRATION = 600000;
    public static final long JWT_REFRESH_EXPIRATION = 100000000;
    public static final String JWT_SECRET = "Secret";

    public String generateToken(Authentication authentication) {
        return generateToken(authentication.getName(), JWT_EXPIRATION, authentication.getAuthorities());
    }
    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails.getUsername(), JWT_EXPIRATION, userDetails.getAuthorities());
    }

    public String generateRefreshToken(Authentication authentication) {
        return generateToken(authentication.getName(), JWT_REFRESH_EXPIRATION, authentication.getAuthorities());
    }

    public String generateToken(String username, long expiration, Collection<? extends GrantedAuthority> authorities) {
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + expiration);

        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
}
