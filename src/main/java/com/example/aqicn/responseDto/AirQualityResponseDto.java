package com.example.aqicn.responseDto;

import java.util.Map;

public record AirQualityResponseDto(
    String city,
    String country,
    double[] coordinates,
    int aqi,
    String dominantPollutant,
    Map<String, Number> pollutants,
    String time,
    Map<String, Object> weather
) {
}



