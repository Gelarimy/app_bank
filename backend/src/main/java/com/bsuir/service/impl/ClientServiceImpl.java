package com.bsuir.service.impl;

import com.bsuir.entity.Client;
import com.bsuir.repository.ClientRepository;
import com.bsuir.security.ClientUtils;
import com.bsuir.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("clientService")
public class ClientServiceImpl implements ClientService, UserDetailsService {
    private ClientRepository clientRepository;

    private BCryptPasswordEncoder encoder;


    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository, BCryptPasswordEncoder encoder) {
        this.clientRepository = clientRepository;
        this.encoder = encoder;
    }

    @Override
    public Client saveClient(Client client) {
        Optional<Client> temp = clientRepository.findClientByUsername(client.getUsername());
        if (client.getId() != null || !temp.isPresent()) {
            client.setPassword(encoder.encode(client.getPassword()));
            return clientRepository.save(client);
        } else return null;
    }

    @Override
    public void deleteClient(Integer id) {
        clientRepository.deleteById(id);
    }

    @Override
    public Optional<Client> getClientByUsername(String username) {
        return clientRepository.findClientByUsername(username);
    }

    @Override
    public Optional<Client> getClientById(Integer id) {
        return clientRepository.findClientById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Client client = clientRepository.findClientByUsername(username).get();
        return ClientUtils.buildUserDetails(client);
    }

    @Override
    public void updateClient(Client client) {
        clientRepository.save(client);
    }

    @Override
    public List<Client> getClientsList() {
        return clientRepository.findAll();
    }
}
