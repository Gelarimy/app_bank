package com.bsuir.service;

import com.bsuir.entity.Client;
import com.bsuir.security.ClientTokenModel;

public interface AuthService {
    Client login(Client client);
    Client register(Client client);
}
