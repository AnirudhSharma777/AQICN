package com.example.aqicn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.aqicn.responseDto.AirQualityResponseDto;
import com.example.aqicn.services.AirQualityService;
import com.example.aqicn.services.AirQualityServiceImpl;

@RestController
@RequestMapping("/api/v1")
public class AirQualityController {

    private final AirQualityServiceImpl airQualityService;
    
    public AirQualityController(AirQualityServiceImpl airQualityService) {
        this.airQualityService = airQualityService;
    }

    @GetMapping("/airquality")
    public ResponseEntity<AirQualityResponseDto> get(@RequestParam String city) {
        AirQualityResponseDto dto =  airQualityService.getAirQuality(city.toLowerCase());
        return ResponseEntity.ok(dto);
    }
    
}
