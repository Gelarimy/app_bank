package com.bsuir.repository;

import com.bsuir.entity.BankDevelopmentFund;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DevelopmentFundRepository extends CrudRepository<BankDevelopmentFund, Integer> {
    Optional<BankDevelopmentFund> findBankDevelopmentFundById(int id);
}
