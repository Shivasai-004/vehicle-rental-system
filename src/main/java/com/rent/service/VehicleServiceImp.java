package com.rent.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return vehicleRepo.findById(id).orElse(null);
    }

    @Override
    public Vehicle updateVehicle(Long id, Vehicle vehicle) {

        Vehicle existingVehicle = vehicleRepo.findById(id).orElse(null);

        if (existingVehicle != null) {

            existingVehicle.setVehicleNumber(vehicle.getVehicleNumber());
            existingVehicle.setBrand(vehicle.getBrand());
            existingVehicle.setModel(vehicle.getModel());
            existingVehicle.setType(vehicle.getType());
            existingVehicle.setPricePerDay(vehicle.getPricePerDay());
            existingVehicle.setAvailable(vehicle.isAvailable());

            return vehicleRepo.save(existingVehicle);
        }

        return null;
    }

    @Override
    public void deleteVehicle(Long id) {
        vehicleRepo.deleteById(id);
    }
}