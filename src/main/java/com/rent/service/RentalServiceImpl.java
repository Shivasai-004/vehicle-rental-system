
package com.rent.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rent.exception.RentalException;
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

    public RentalServiceImpl(RentalRepo rentalRepo,
                             VehicleRepo vehicleRepo,
                             CustomerRepo customerRepo) {

        this.rentalRepo = rentalRepo;
        this.vehicleRepo = vehicleRepo;
        this.customerRepo = customerRepo;
    }

    @Override
    public String addRental(Rental rental) {

        Vehicle vehicle =
                vehicleRepo.findById(rental.getVehicleId()).orElse(null);

        Customer customer =
                customerRepo.findById(rental.getCustomerId()).orElse(null);

        if (vehicle == null) {
            return "Vehicle not found";
        }

        if (customer == null) {
            return "Customer not found";
        }

        if (!vehicle.isAvailable()) {
            return "Vehicle is currently not available";
        }

        Rental activeRental =
                rentalRepo.findByVehicleIdAndReturnedFalse(
                        rental.getVehicleId()).orElse(null);

        if (activeRental != null) {
            return "Vehicle already has an active rental";
        }

        LocalDate startDate =
                LocalDate.parse(rental.getStartDate());

        LocalDate endDate =
                LocalDate.parse(rental.getEndDate());

        if (endDate.isBefore(startDate)) {
            return "End date cannot be before start date";
        }

        long days =
                ChronoUnit.DAYS.between(startDate, endDate) + 1;

        double totalAmount =
                days * vehicle.getPricePerDay();

        rental.setTotalAmount(totalAmount);
        rental.setReturned(false);

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

        return rentalRepo.findById(id)
                .orElseThrow(() ->
                    new RentalException(
                        "Rental not found with id: " + id
                    )
                );
    }

    @Override
    public Rental updateRental(Long id, Rental rental) {

        Rental existingRental =
                rentalRepo.findById(id).orElse(null);

        if (existingRental == null) {
            throw new RentalException(
                    "Rental not found with id: " + id);
        }

        Vehicle vehicle =
                vehicleRepo.findById(rental.getVehicleId()).orElse(null);

        if (vehicle == null) {
            throw new RentalException(
                    "Vehicle not found with id: "
                            + rental.getVehicleId());
        }

        Customer customer =
                customerRepo.findById(rental.getCustomerId()).orElse(null);

        if (customer == null) {
            throw new RentalException(
                    "Customer not found with id: "
                            + rental.getCustomerId());
        }

        Vehicle oldVehicle =
                vehicleRepo.findById(
                        existingRental.getVehicleId()).orElse(null);

        if (!existingRental.getVehicleId()
                .equals(rental.getVehicleId())) {

            if (!vehicle.isAvailable()) {
                throw new RentalException(
                        "Vehicle is currently not available");
            }

            Rental activeRental =
                    rentalRepo.findByVehicleIdAndReturnedFalse(
                            rental.getVehicleId()).orElse(null);

            if (activeRental != null) {
                throw new RentalException(
                        "Vehicle already has an active rental");
            }

            if (oldVehicle != null) {
                oldVehicle.setAvailable(true);
                vehicleRepo.save(oldVehicle);
            }

            vehicle.setAvailable(false);
            vehicleRepo.save(vehicle);
        }

        LocalDate startDate =
                LocalDate.parse(rental.getStartDate());

        LocalDate endDate =
                LocalDate.parse(rental.getEndDate());

        if (endDate.isBefore(startDate)) {
            throw new RentalException(
                    "End date cannot be before start date");
        }

        long days =
                ChronoUnit.DAYS.between(startDate, endDate) + 1;

        double totalAmount =
                days * vehicle.getPricePerDay();

        existingRental.setVehicleId(rental.getVehicleId());
        existingRental.setCustomerId(rental.getCustomerId());
        existingRental.setStartDate(rental.getStartDate());
        existingRental.setEndDate(rental.getEndDate());
        existingRental.setTotalAmount(totalAmount);

        return rentalRepo.save(existingRental);
    }

    @Override
    public void deleteRental(Long id) {

        Rental rental =
                rentalRepo.findById(id).orElse(null);

        if (rental == null) {
            throw new RentalException(
                    "Rental not found with id: " + id);
        }

        Vehicle vehicle =
                vehicleRepo.findById(
                        rental.getVehicleId()).orElse(null);

        if (vehicle != null) {
            vehicle.setAvailable(true);
            vehicleRepo.save(vehicle);
        }

        rentalRepo.deleteById(id);
    }

    @Override
    public double calculateRentalAmount(Long rentalId) {

        Rental rental =
                rentalRepo.findById(rentalId)
                        .orElseThrow(() ->
                            new RentalException(
                                "Rental not found with id: "
                                        + rentalId
                            )
                        );

        Vehicle vehicle =
                vehicleRepo.findById(
                        rental.getVehicleId())
                        .orElseThrow(() ->
                            new RentalException(
                                "Vehicle not found with id: "
                                        + rental.getVehicleId()
                            )
                        );

        LocalDate startDate =
                LocalDate.parse(rental.getStartDate());

        LocalDate endDate =
                LocalDate.parse(rental.getEndDate());

        long days =
                ChronoUnit.DAYS.between(startDate, endDate) + 1;

        double totalAmount =
                days * vehicle.getPricePerDay();

        rental.setTotalAmount(totalAmount);
        rentalRepo.save(rental);

        return totalAmount;
    }

    @Override
    public String returnVehicle(Long rentalId) {

        Rental rental =
                rentalRepo.findById(rentalId).orElse(null);

        if (rental == null) {
            return "Rental not found";
        }

        if (rental.isReturned()) {
            return "Vehicle has already been returned";
        }

        Vehicle vehicle =
                vehicleRepo.findById(
                        rental.getVehicleId()).orElse(null);

        if (vehicle == null) {
            return "Vehicle not found";
        }

        rental.setReturned(true);
        rentalRepo.save(rental);

        vehicle.setAvailable(true);
        vehicleRepo.save(vehicle);

        return "Vehicle returned successfully";
    }
}
