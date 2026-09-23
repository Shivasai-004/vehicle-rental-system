package com.rent.service;

import java.util.List;

import com.rent.model.Rental;

public interface RentalService {

    String addRental(Rental rental);

    List<Rental> getAllRentals();

    Rental getRentalById(Long id);

    Rental updateRental(Long id, Rental rental);

    void deleteRental(Long id);

    double calculateRentalAmount(Long rentalId);

    String returnVehicle(Long rentalId);
}