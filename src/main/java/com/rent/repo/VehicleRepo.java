package com.rent.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rent.model.Vehicle;

public interface VehicleRepo extends JpaRepository<Vehicle, Long> {

}



