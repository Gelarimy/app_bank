package com.bsuir.controller;

import com.bsuir.entity.City;
import com.bsuir.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cities")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<City> getCitiesList() {
        return cityService.getCitiesList();
    }
}
