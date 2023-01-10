package com.bsuir.controller;

import com.bsuir.entity.Client;
import com.bsuir.security.JwtUtils;
import com.bsuir.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "")
public class AuthController {
    private final AuthService authenticationService;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(AuthService authenticationService, JwtUtils jwtUtils) {
        this.authenticationService = authenticationService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping(value = "/login")
    public Client authenticateUser(HttpServletResponse response, @RequestBody Client client) {
        Client authenticatedUser = authenticationService.login(client);
        String token = jwtUtils.generateToken(authenticatedUser);
        response.addHeader("X-Auth-Token", token);
        return authenticatedUser;
    }

    @PostMapping(value = "/register")
    public Client registerNewUser(HttpServletResponse response, @RequestBody Client client) {
        Client createdUser = authenticationService.register(client);
        String token = jwtUtils.generateToken(client);
        response.addHeader("X-Auth-Token", token);
        return createdUser;
    }
}
