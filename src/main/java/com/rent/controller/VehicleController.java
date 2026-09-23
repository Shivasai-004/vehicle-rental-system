
package com.rent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.rent.model.Vehicle;
import com.rent.service.VehicleService;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(vehicle);
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public Vehicle getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id);
    }

    @PutMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id,
                                 @RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicle(id, vehicle);
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return "Vehicle deleted successfully";
    }

    // Search by brand
    @GetMapping("/search/brand/{brand}")
    public List<Vehicle> searchByBrand(@PathVariable String brand) {
        return vehicleService.searchByBrand(brand);
    }

    // Search by model
    @GetMapping("/search/model/{model}")
    public List<Vehicle> searchByModel(@PathVariable String model) {
        return vehicleService.searchByModel(model);
    }

    // Filter by type
    @GetMapping("/filter/type/{type}")
    public List<Vehicle> filterByType(@PathVariable String type) {
        return vehicleService.filterByType(type);
    }

    // Filter by availability
    @GetMapping("/filter/available/{available}")
    public List<Vehicle> filterByAvailability(@PathVariable boolean available) {
        return vehicleService.filterByAvailability(available);
    }

    // Filter by price range
    @GetMapping("/filter/price")
    public List<Vehicle> filterByPriceRange(
            @RequestParam double min,
            @RequestParam double max) {

        return vehicleService.filterByPriceRange(min, max);
    }
}
