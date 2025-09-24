package com.smartstock.repository;

import com.smartstock.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ForecastRepository extends JpaRepository<Forecast, UUID> {

}