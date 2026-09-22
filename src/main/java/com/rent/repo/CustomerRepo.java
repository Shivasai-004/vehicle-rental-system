package com.rent.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rent.model.Customer;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

}