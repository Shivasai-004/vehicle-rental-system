package com.rent.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rent.model.Vehicle;

public interface VehicleRepo extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByBrandContainingIgnoreCase(String brand);

    List<Vehicle> findByModelContainingIgnoreCase(String model);

    List<Vehicle> findByTypeIgnoreCase(String type);

    List<Vehicle> findByAvailable(boolean available);

    @Query("SELECT v FROM Vehicle v WHERE v.pricePerDay BETWEEN :minPrice AND :maxPrice")
    List<Vehicle> findByPriceRange(
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice
    );

}