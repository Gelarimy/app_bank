package com.bsuir.security;

import com.bsuir.entity.AuthToken;
import com.bsuir.entity.Client;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientTokenModel {
    Client client;
    AuthToken token;
}
