package com.bsuir.repository;

import com.bsuir.entity.Plan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends CrudRepository<Plan, Integer> {
    List<Plan> findAll();
    List<Plan> findAllByDepositPlan(boolean depositPlan);
    List<Plan> findAllByCreditPlan(boolean depositPlan);
}
