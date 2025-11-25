package com.example.aqicn.services;

import com.example.aqicn.responseDto.AirQualityResponseDto;

public interface AirQualityService {
    public AirQualityResponseDto getAirQuality(String city);
    
}
