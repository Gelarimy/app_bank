package com.bsuir.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class PreRequestSecurityFilter extends OncePerRequestFilter {
    @Autowired
    @Qualifier("clientService")
    private UserDetailsService service;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().contains("login")
                || (request.getRequestURI().contains("register")
                )) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");

        String login = null;
        String authToken = null;
        if (header != null && header.startsWith("Bearer ")) {
            authToken = header.replace("Bearer ", "");
            try {
                login = jwtUtils.getUsernameFromToken(authToken);

            } catch (IllegalArgumentException e) {
                logger.error("An error occurred during getting login from token");
            } catch (ExpiredJwtException e) {
                logger.error("The token is expired and not valid anymore");
            } catch (SignatureException e) {
                logger.error("Authentication Failed. Login or Password not valid");
            }
        } else {
            logger.warn("couldn't find bearer string, will ignore the header");
        }
        if (login != null && SecurityContextHolder.getContext().getAuthentication()
                == null) {
            UserDetails userDetails = service.loadUserByUsername(login);
            if (jwtUtils.validateToken(authToken, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new
                        UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource()
                        .buildDetails(request));
                logger.info("authenticated user" + login + ",setting security context");
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
