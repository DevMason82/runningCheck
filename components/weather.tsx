"use client";

import { SetStateAction, useEffect, useState, useTransition } from "react";
import { Select, SelectItem } from "@nextui-org/react"; // NextUI Select 컴포넌트 import
const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default function Weather() {
  const [city, setCity] = useState("Seoul"); // 기본값으로 'Seoul' 설정
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition(); // useTransition 훅 사용

  const cities = ["Seoul", "New York", "London", "Tokyo", "Paris"];

  useEffect(() => {
    startTransition(() => {
      fetchWeather(city); // 컴포넌트가 처음 렌더링될 때 기본값인 'Seoul'의 날씨 정보를 가져옴
    });
  }, []);

  const fetchWeather = async (city: React.SetStateAction<string>) => {
    setError(null);
    const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(endPoint);
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCityChange = (city: SetStateAction<string>) => {
    setCity(city);
    startTransition(() => {
      fetchWeather(city);
    });
  };

  return (
    <div>
      <div className="mb-5">
        <Select
          labelPlacement="outside-left"
          id="city"
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={isPending} // 요청 중일 때 비활성화
          placeholder="Select a city"
          aria-label="Select city"
        >
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </Select>
      </div>

      {isPending && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}
      {weatherData && !isPending && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
