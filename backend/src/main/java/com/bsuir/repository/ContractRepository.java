package com.bsuir.repository;

import com.bsuir.entity.Contract;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends CrudRepository<Contract, Integer> {
    List<Contract> findAllByRelatedClient(int relatedClient);
}
