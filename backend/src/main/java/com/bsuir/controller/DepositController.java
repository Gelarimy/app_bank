package com.bsuir.controller;

import com.bsuir.entity.Contract;
import com.bsuir.entity.Plan;
import com.bsuir.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/contracts/deposits")
public class DepositController {

    private final ContractService contractService;

    @Autowired
    public DepositController(ContractService contractService) {
        this.contractService = contractService;
    }

    @Transactional(rollbackOn = Exception.class)
    @PostMapping(value = "/create")
    public void createContract(@RequestBody Contract contract) {
        contractService.updateBankDevelopmentFund(contractService.createContract(contract));
    }

    @RequestMapping(value = "/plans", method = RequestMethod.GET)
    public List<Plan> getDepositPlans() {
        return contractService.getAllDepositPlans();
    }

    @PostMapping(value = "/closure")
    public void bankDayClosure() {
        contractService.bankDateClosure();
    }
}
