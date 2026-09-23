
package com.rent.service;

import java.util.List;

import com.rent.model.Vehicle;

public interface VehicleService {

    Vehicle addVehicle(Vehicle vehicle);

    List<Vehicle> getAllVehicles();

    Vehicle getVehicleById(Long id);

    Vehicle updateVehicle(Long id, Vehicle vehicle);

    void deleteVehicle(Long id);

    // Search and Filter
    List<Vehicle> searchByBrand(String brand);

    List<Vehicle> searchByModel(String model);

    List<Vehicle> filterByType(String type);

    List<Vehicle> filterByAvailability(boolean available);

    List<Vehicle> filterByPriceRange(double minPrice, double maxPrice);

}

