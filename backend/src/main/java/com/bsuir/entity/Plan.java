package com.bsuir.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigInteger;

@Data
@Entity
@Table(name = "available_plans")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "type_of_currency")
    private String typeOfCurrency;

    @Column(name = "period")
    private int period;

    @Column(name = "interest")
    private String interest;

    @Column(name = "minimum_deposit_amount")
    private String minimumDepositAmount;

    @Column(name = "is_credit_plan")
    private boolean creditPlan;

    @Column(name = "is_deposit_plan")
    private boolean depositPlan;

    @Column(name = "maximum_credit_amount")
    private BigInteger maximumCreditAmount;
}
