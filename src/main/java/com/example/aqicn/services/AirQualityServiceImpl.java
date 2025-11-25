package com.example.aqicn.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Comparator;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.example.aqicn.responseDto.AirQualityResponseDto;

@Service
public class AirQualityServiceImpl implements AirQualityService {

    @Value("${aqicn.token}")
    private String token;
    @Value("${aqicn.baseurl}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable(cacheNames = "aqiData", key = "#city.toLowerCase()")
    public AirQualityResponseDto getAirQuality(String city) {

        String url = baseUrl + city + "/?token=" + token;
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        Map body = response.getBody();

        if (!"ok".equals(body.get("status"))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "City not found or API error");
        }

        Map data = (Map) body.get("data");
        Map cityInfo = (Map) data.get("city");
        List<Double> coords = (List<Double>) cityInfo.get("geo");
        Map iaqi = (Map) data.get("iaqi");
        Map weather = (Map) data.get("weather");
        Map timeInfo = (Map) data.get("time");

        // Extract city full name ("Delhi, India")
        String fullName = (String) cityInfo.get("name");

        // Extract country from fullName
        String country = "Unknown";
        if (fullName != null && fullName.contains(",")) {
            country = fullName.substring(fullName.lastIndexOf(",") + 1).trim();
        }

        // Coordinates
        double latitude = coords.get(0);
        double longitude = coords.get(1);

        // AQI value
        Number aqiValue = (Number) data.get("aqi");

        // Pollutants
        Map<String, Number> pollutants = new HashMap<>();
        for (String key : new String[] { "pm25", "pm10", "no2", "so2", "o3", "co" }) {
            Object val = iaqi.get(key);
            if (val instanceof Map pollutantObj && pollutantObj.get("v") instanceof Number pollutantValue) {
                pollutants.put(key, pollutantValue);
            }
        }

        // Determine dominant pollutant
        String dominantPollutant = pollutants.entrySet()
                .stream()
                .max(Comparator.comparingDouble(e -> e.getValue().doubleValue()))
                .map(Map.Entry::getKey)
                .orElse("unknown");

        // Extract time
        String time = timeInfo != null ? (String) timeInfo.get("s") : "N/A";

        // Return DTO
        return new AirQualityResponseDto(
                city,
                country,
                new double[] { latitude, longitude },
                aqiValue != null ? aqiValue.intValue() : 0,
                dominantPollutant,
                pollutants,
                time,
                weather);
    }

}