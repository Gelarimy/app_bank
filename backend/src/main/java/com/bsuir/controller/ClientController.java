package com.bsuir.controller;

import com.bsuir.entity.Client;
import com.bsuir.entity.Contract;
import com.bsuir.security.ClientTokenModel;
import com.bsuir.service.AuthService;
import com.bsuir.service.ClientService;
import com.bsuir.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clients")
@Transactional(rollbackOn = Exception.class)
public class ClientController {
    private final ClientService clientService;
    private final ContractService contractService;

    @Autowired
    public ClientController(ClientService clientService, ContractService contractService) {
        this.clientService = clientService;
        this.contractService = contractService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Client> getClientById(@PathVariable(name = "id") Integer id) {
        return clientService.getClientById(id);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<Client> getClientsList() {
        return clientService.getClientsList();
    }

    @PostMapping(value = "/{id}/update")
    public ResponseEntity updateUser(
            @RequestBody Client client, @PathVariable(name = "id") Integer id) {
        clientService.updateClient(client);
        return new ResponseEntity<>("Client profile updated", HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/{id}/contracts", method = RequestMethod.GET)
    public List<Contract> getClientContracts(@PathVariable(name = "id") int id) {
        return this.contractService.getContractsByClientId(id);
    }
}
