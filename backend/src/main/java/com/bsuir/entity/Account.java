package com.bsuir.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigInteger;

@Data
@Entity
@Table(name = "account_numbers")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "related_client", nullable = false)
    private int relatedClient;

    @Column(name = "master_account")
    private BigInteger masterAccount;

    @Column(name = "interest_account")
    private BigInteger depositInterestAccount;

    @Column(name = "initial_deposit")
    private BigInteger initialDeposit;

    @Column(name = "accrued_on_interest")
    private BigInteger accruedOnInterest;

    @Column(name = "is_deposit_account")
    private boolean depositAccount;

    @Column(name = "is_credit_account")
    private boolean creditAccount;
}
