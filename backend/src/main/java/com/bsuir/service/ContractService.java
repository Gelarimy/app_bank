package com.bsuir.service;

import com.bsuir.entity.Contract;
import com.bsuir.entity.Plan;

import java.util.List;

public interface ContractService {

    Contract createContract(Contract contract);
    List<Plan> getAllDepositPlans();
    List<Plan> getAllCreditPlans();
    List<Contract> getDepositContractsByClientId(int clientId);
    List<Contract> getCreditContractsByClientId(int clientId);
    void updateBankDevelopmentFund(Contract contract);
    void bankDateClosure();
}
