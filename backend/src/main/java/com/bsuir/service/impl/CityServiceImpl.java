package com.bsuir.service.impl;

import com.bsuir.entity.City;
import com.bsuir.repository.CityRepository;
import com.bsuir.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements CityService {

    private CityRepository cityRepository;

    @Autowired
    public CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public Optional<City> getCityById(Integer id) {
        return cityRepository.findCityById(id);
    }

    @Override
    public List<City> getCitiesList() {
        return cityRepository.findAll();
    }
}
