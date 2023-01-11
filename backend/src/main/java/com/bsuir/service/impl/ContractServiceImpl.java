package com.bsuir.service.impl;

import com.bsuir.entity.Account;
import com.bsuir.entity.BankDevelopmentFund;
import com.bsuir.entity.Contract;
import com.bsuir.entity.Plan;
import com.bsuir.repository.AccountRepository;
import com.bsuir.repository.ContractRepository;
import com.bsuir.repository.DevelopmentFundRepository;
import com.bsuir.repository.PlanRepository;
import com.bsuir.service.AccountService;
import com.bsuir.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.*;

@Service
public class ContractServiceImpl implements ContractService {

    private ContractRepository contractRepository;
    private PlanRepository planRepository;
    private AccountService accountService;
    private AccountRepository accountRepository;
    private DevelopmentFundRepository developmentFundRepository;

    @Autowired
    public ContractServiceImpl(ContractRepository contractRepository, PlanRepository planRepository,
                               AccountService accountService, AccountRepository accountRepository,
                               DevelopmentFundRepository developmentFundRepository) {
        this.contractRepository = contractRepository;
        this.planRepository = planRepository;
        this.accountService = accountService;
        this.accountRepository = accountRepository;
        this.developmentFundRepository = developmentFundRepository;
    }

    @Override
    public Contract createContract(Contract contract) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        contract.setContractStartDate(calendar.getTime());
        Account tempAccount = new Account();
        tempAccount.setRelatedClient(contract.getRelatedClient());
        tempAccount.setInitialDeposit(new BigInteger(contract.getAmount()));
        tempAccount.setDepositAccount(contract.isDepositContract());
        tempAccount.setCreditAccount(contract.isCreditContract());
        if (refillContractParameters(tempAccount) != null) {
            contract.setRelatedAccount(accountService.saveAccount(tempAccount).getId());
        }
        calendar.add(Calendar.MONTH, Integer.parseInt(contract.getTermOfContract()));
        contract.setContractEndDate(calendar.getTime());
        return this.contractRepository.save(contract);
    }

    public void updateBankDevelopmentFund(Contract contract) {
        BankDevelopmentFund bankDevelopmentFund = developmentFundRepository.findBankDevelopmentFundById(1).get();
        if (contract.isDepositContract()) {
            bankDevelopmentFund.setBalance(bankDevelopmentFund.getBalance().add(new BigInteger(contract.getAmount())));
        }
        if (contract.isCreditContract()) {
            bankDevelopmentFund.setBalance(bankDevelopmentFund.getBalance().subtract(new BigInteger(contract.getAmount())));
        }
        developmentFundRepository.save(bankDevelopmentFund);
    }

    private Account refillContractParameters(Account account) {
        account.setMasterAccount(new BigInteger(generateAccountNumber()));
        account.setDepositInterestAccount(new BigInteger(generateAccountNumber()));
        List<Account> accounts = accountRepository.findAllByDepositInterestAccount(account.getDepositInterestAccount());
        List<Account> accounts2 = accountRepository.findAllByMasterAccount(account.getMasterAccount());
        if (accounts.isEmpty() && accounts2.isEmpty()) {
            return account;
        } else refillContractParameters(account);
        return null;
    }

    public List<Plan> getAllDepositPlans() {
        return planRepository.findAllByDepositPlan(true);
    }

    public List<Plan> getAllCreditPlans() {
        return planRepository.findAllByCreditPlan(true);
    }

    @Override
    public List<Contract> getDepositContractsByClientId(int clientId) {
        return this.contractRepository.findAllByRelatedClientAndDepositContract(clientId, true);
    }

    @Override
    public List<Contract> getCreditContractsByClientId(int clientId) {
        return this.contractRepository.findAllByRelatedClientAndCreditContract(clientId, true);
    }

    private String generateAccountNumber() {
        Integer min = 10000000;
        Integer max = 99999999;

        Random random = new Random();

        int second = random.nextInt(max - min + 1);
        int third = random.nextInt(9 + 1);

        return "1314" + Integer.toString(second) + Integer.toString(third);
    }
}
