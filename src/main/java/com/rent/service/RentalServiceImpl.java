package com.rent.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rent.model.Rental;
import com.rent.repo.RentalRepo;

@Service
public class RentalServiceImpl implements RentalService {

    private final RentalRepo rentalRepo;

    public RentalServiceImpl(RentalRepo rentalRepo) {
        this.rentalRepo = rentalRepo;
    }

    @Override
    public Rental addRental(Rental rental) {
        return rentalRepo.save(rental);
    }

    @Override
    public List<Rental> getAllRentals() {
        return rentalRepo.findAll();
    }

    @Override
    public Rental getRentalById(Long id) {
        return rentalRepo.findById(id).orElse(null);
    }

    @Override
    public Rental updateRental(Long id, Rental rental) {

        Rental existingRental = rentalRepo.findById(id).orElse(null);

        if (existingRental != null) {

            existingRental.setVehicleId(rental.getVehicleId());
            existingRental.setCustomerId(rental.getCustomerId());
            existingRental.setStartDate(rental.getStartDate());
            existingRental.setEndDate(rental.getEndDate());
            existingRental.setTotalAmount(rental.getTotalAmount());

            return rentalRepo.save(existingRental);
        }

        return null;
    }

    @Override
    public void deleteRental(Long id) {
        rentalRepo.deleteById(id);
    }
}