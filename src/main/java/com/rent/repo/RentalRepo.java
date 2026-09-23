package com.rent.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rent.model.Rental;

public interface RentalRepo extends JpaRepository<Rental, Long> {

    Optional<Rental> findByVehicleIdAndReturnedFalse(Long vehicleId);

}