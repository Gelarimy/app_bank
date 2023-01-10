package com.bsuir.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigInteger;

@Data
@Entity
@Table(name = "bank_development_fund")
public class BankDevelopmentFund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "balance")
    private BigInteger balance;
}
