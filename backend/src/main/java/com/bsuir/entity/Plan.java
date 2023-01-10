package com.bsuir.entity;

import lombok.Data;

import javax.persistence.*;

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
    private String period;

    @Column(name = "deposit_interest")
    private String depositInterest;

    @Column(name = "minimum_deposit_amount")
    private String minimumDepositAmount;
}
