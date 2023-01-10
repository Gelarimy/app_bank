package com.bsuir.service;

import com.bsuir.entity.City;

import java.util.List;
import java.util.Optional;

public interface CityService {

    Optional<City> getCityById(Integer id);
    List<City> getCitiesList();
}
