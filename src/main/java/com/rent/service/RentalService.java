package com.rent.service;

import java.util.List;

import com.rent.model.Rental;

public interface RentalService {

    Rental addRental(Rental rental);

    List<Rental> getAllRentals();

    Rental getRentalById(Long id);

    Rental updateRental(Long id, Rental rental);

    void deleteRental(Long id);
}