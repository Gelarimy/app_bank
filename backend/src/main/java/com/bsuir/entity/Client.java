package com.bsuir.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "second_name")
    private String secondName;

    @Column(name = "birthday_date")
    private Date birthdayDate;

    @Column(name = "passport_number")
    private String passportNumber;

    @Column(name = "issued_by")
    private String issuedBy;

    @Column(name = "date_of_issue")
    private Date dateOfIssue;

    @Column(name = "passport_id")
    private String passportId;

    @Column(name = "place_of_birthday")
    private String placeOfBirthday;

    @Column(name = "place_of_residence")
    private String placeOfResidence;

    @Column(name = "address")
    private String address;

    @Column(name = "mobile_phone_number")
    private String mobilePhoneNumber;

    @Column(name = "home_phone_number")
    private String homePhoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "place_of_work")
    private String placeOfWork;

    @Column(name = "position")
    private String position;

    @Column(name = "marital_status")
    private String maritalStatus;

    @Column(name = "citizenship")
    private String citizenship;

    @Column(name = "disability")
    private String disability;

    @Column(name = "pensioner")
    private boolean pensioner;

    @Column(name = "monthly_income")
    private String monthlyIncome;

    @Column(name = "liable_for_military")
    private String liableForMilitary;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;
}
