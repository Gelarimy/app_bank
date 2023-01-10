package com.bsuir.repository;

import com.bsuir.entity.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
    Optional<Account> findAccountById(int id);
    Optional<Account> findAccountByMasterAccount(BigInteger masterAccount);
    Optional<Account> findAccountByDepositInterestAccount(BigInteger depositInterestAccount);
    List<Account> findAllByDepositInterestAccount(BigInteger depositInterestAccount);
    List<Account> findAllByMasterAccount(BigInteger masterAccount);
}
