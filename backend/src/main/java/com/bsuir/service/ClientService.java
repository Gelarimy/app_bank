package com.bsuir.service;

import com.bsuir.entity.Client;

import java.util.List;
import java.util.Optional;

public interface ClientService {
    Optional<Client> getClientById(Integer id);
    Optional<Client> getClientByUsername(String username);
    Client saveClient(Client client);
    void deleteClient(Integer id);
    void updateClient(Client client);
    List<Client> getClientsList();
}
