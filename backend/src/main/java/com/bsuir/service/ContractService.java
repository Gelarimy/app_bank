package com.bsuir.service;

import com.bsuir.entity.Contract;
import com.bsuir.entity.Plan;

import java.util.List;

public interface ContractService {

    Contract createContract(Contract contract);
    List<Plan> getAllDepositPlans();
    List<Contract> getContractsByClientId(int clientId);
    void updateBankDevelopmentFund(Contract contract);
}
