package com.bsuir.security;

import com.bsuir.entity.Client;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class ClientUtils {
    public static Collection<GrantedAuthority> buildAuthority(String role) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(role));
        return authorities;
    }

    public static UserDetails buildUserDetails(Client client) {
        return new org.springframework.security.core.userdetails.User(
                client.getUsername(), client.getPassword(), buildAuthority(client.getRole()));
    }
}
