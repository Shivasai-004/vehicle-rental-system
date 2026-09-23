
package com.rent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rent.exception.VehicleNotFoundException;
import com.rent.model.Vehicle;
import com.rent.repo.VehicleRepo;

@Service
public class VehicleServiceImp implements VehicleService {

    @Autowired
    private VehicleRepo vehicleRepo;

    @Override
    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepo.save(vehicle);
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepo.findAll();
    }

    
    @Override
    public Vehicle getVehicleById(Long id) {

        return vehicleRepo.findById(id).orElseThrow(() ->new VehicleNotFoundException("Vehicle not found with id: " + id));
    }
    

    
    @Override
    public Vehicle updateVehicle(Long id, Vehicle vehicle) {

        Vehicle existingVehicle = vehicleRepo.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException(
                                "Vehicle not found with id: " + id));

        existingVehicle.setVehicleNumber(vehicle.getVehicleNumber());
        existingVehicle.setBrand(vehicle.getBrand());
        existingVehicle.setModel(vehicle.getModel());
        existingVehicle.setType(vehicle.getType());
        existingVehicle.setPricePerDay(vehicle.getPricePerDay());
        existingVehicle.setAvailable(vehicle.isAvailable());

        return vehicleRepo.save(existingVehicle);
    } 
    
    @Override
    public void deleteVehicle(Long id) {

        if (!vehicleRepo.existsById(id)) {
            throw new VehicleNotFoundException(
                    "Vehicle not found with id: " + id);
        }

        vehicleRepo.deleteById(id);
    }

    // Search and Filter

    @Override
    public List<Vehicle> searchByBrand(String brand) {
        return vehicleRepo.findByBrandContainingIgnoreCase(brand);
    }

    @Override
    public List<Vehicle> searchByModel(String model) {
        return vehicleRepo.findByModelContainingIgnoreCase(model);
    }

    @Override
    public List<Vehicle> filterByType(String type) {
        return vehicleRepo.findByTypeIgnoreCase(type);
    }

    @Override
    public List<Vehicle> filterByAvailability(boolean available) {
        return vehicleRepo.findByAvailable(available);
    }

    @Override
    public List<Vehicle> filterByPriceRange(double minPrice, double maxPrice) {
        return vehicleRepo.findByPriceRange(minPrice, maxPrice);
    }

}

