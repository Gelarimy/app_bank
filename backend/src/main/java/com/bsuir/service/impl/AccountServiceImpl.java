package com.bsuir.service.impl;

import com.bsuir.entity.Account;
import com.bsuir.repository.AccountRepository;
import com.bsuir.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Account saveAccount(Account account) {
        return this.accountRepository.save(account);
    }
}
