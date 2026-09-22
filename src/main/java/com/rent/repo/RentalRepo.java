package com.rent.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rent.model.Rental;

public interface RentalRepo extends JpaRepository<Rental, Long> {

}