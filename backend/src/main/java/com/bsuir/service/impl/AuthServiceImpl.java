package com.bsuir.service.impl;

import com.bsuir.entity.Client;
import com.bsuir.security.ClientUtils;
import com.bsuir.security.Constants;
import com.bsuir.service.AuthService;
import com.bsuir.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private ClientService clientService;
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, ClientService clientService) {
        this.authenticationManager = authenticationManager;
        this.clientService = clientService;
    }

    @Override
    public Client login(Client client) {
        Optional<Client> tempUser = clientService.getClientByUsername(client.getUsername());
        if (!tempUser.isPresent()) {
            throw new AuthenticationCredentialsNotFoundException("Cannot find user with such username");
        }
        Client foundUser = tempUser.get();
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                ClientUtils.buildUserDetails(foundUser), client.getPassword(), ClientUtils.buildAuthority(foundUser.getRole())
        );

        authenticationManager.authenticate(authenticationToken);

        if (authenticationToken.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        return foundUser;
    }

    @Override
    public Client register(Client client) {
        client.setRole(Constants.DEFAULT_ROLE);

        Client registeredUser = clientService.saveClient(client);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                registeredUser, client.getPassword(), ClientUtils.buildAuthority(registeredUser.getRole())
        );

        if (authenticationToken.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        return registeredUser;
    }
}
