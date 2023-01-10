package com.bsuir.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "deposit_name")
    private String depositName;

    @Column(name = "related_client", nullable = false)
    private int relatedClient;

    @Column(name = "related_account", nullable = false)
    private int relatedAccount;

    @Column(name = "type_of_currency")
    private String typeOfCurrency;

    @Column(name = "contract_start_date")
    private Date contractStartDate;

    @Column(name = "contract_end_date")
    private Date contractEndDate;

    @Column(name = "term_of_contract")
    private String termOfContract;

    @Column(name = "deposit_amount")
    private String depositAmount;

    @Column(name = "deposit_interest")
    private String depositInterest;

}
