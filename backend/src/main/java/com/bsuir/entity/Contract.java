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

    @Column(name = "plan_name")
    private String planName;

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

    @Column(name = "amount")
    private String amount;

    @Column(name = "interest")
    private String interest;

    @Column(name = "is_deposit_contract")
    private boolean depositContract;

    @Column(name = "is_credit_contract")
    private boolean creditContract;

}
