package com.bsuir.repository;

import com.bsuir.entity.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends CrudRepository<Client, Integer> {
    Optional<Client> findClientByUsername(String username);
    Optional<Client> findClientByPassportId(String passportId);
    Optional<Client> findClientById(Integer id);
    List<Client> findAll();

}
