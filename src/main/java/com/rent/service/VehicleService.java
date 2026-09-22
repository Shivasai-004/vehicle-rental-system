package com.rent.service;

import java.util.List;

import com.rent.model.Vehicle;

public interface VehicleService {

    Vehicle addVehicle(Vehicle vehicle);

    List<Vehicle> getAllVehicles();

    Vehicle getVehicleById(Long id);

    Vehicle updateVehicle(Long id, Vehicle vehicle);

    void deleteVehicle(Long id);
}