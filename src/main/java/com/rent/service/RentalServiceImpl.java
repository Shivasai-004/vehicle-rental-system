
package com.rent.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rent.model.Customer;
import com.rent.model.Rental;
import com.rent.model.Vehicle;
import com.rent.repo.CustomerRepo;
import com.rent.repo.RentalRepo;
import com.rent.repo.VehicleRepo;

@Service
public class RentalServiceImpl implements RentalService {

    private final RentalRepo rentalRepo;
    private final VehicleRepo vehicleRepo;
    private final CustomerRepo customerRepo;

    public RentalServiceImpl(RentalRepo rentalRepo, VehicleRepo vehicleRepo, CustomerRepo customerRepo) {
        this.rentalRepo = rentalRepo;
        this.vehicleRepo = vehicleRepo;
        this.customerRepo = customerRepo;
    }

   
    @Override
    public String addRental(Rental rental) {

        Vehicle vehicle = vehicleRepo.findById(rental.getVehicleId()).orElse(null);

        Customer customer = customerRepo.findById(rental.getCustomerId()).orElse(null);

        if (vehicle == null) {
            return "Vehicle not found";
        }

        if (customer == null) {
            return "Customer not found";
        }

        if (!vehicle.isAvailable()) {
            return "Vehicle is currently not available";
        }

        vehicle.setAvailable(false);
        vehicleRepo.save(vehicle);

        rentalRepo.save(rental);

        return "Rental created successfully";
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

        Rental rental = rentalRepo.findById(id).orElse(null);

        if (rental != null) {

            Vehicle vehicle = vehicleRepo.findById(rental.getVehicleId()).orElse(null);

            if (vehicle != null) {
                vehicle.setAvailable(true);
                vehicleRepo.save(vehicle);
            }

            rentalRepo.deleteById(id);
        }
    }
}

