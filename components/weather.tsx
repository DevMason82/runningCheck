"use client";

import { SetStateAction, useEffect, useState, useTransition } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import NextImage from "next/image";
const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default function Weather() {
  const [city, setCity] = useState("Seoul"); // 기본값으로 'Seoul' 설정
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition(); // useTransition 훅 사용

  const cities = [
    "Seoul",
    "Berlin",
    "New York",
    "Izmir",
    "London",
    "Tokyo",
    "Paris",
    "Shanghai",
    "Oslo",
  ];

  useEffect(() => {
    startTransition(() => {
      fetchWeather(city);
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
      console.log("Weather data", data);
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
    <Card>
      <CardHeader>Weather in {city}</CardHeader>
      <Divider />
      <CardBody>
        {isPending && <p>Loading weather data...</p>}
        {error && <p>{error}</p>}
        {weatherData && !isPending && (
          <>
            <div className="flex flex-col items-center justify-center mb-5">
              {weatherData.weather[0].icon && (
                <Image
                  isZoomed
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt={weatherData.weather[0].description}
                  width={100}
                />
              )}
              <p className="font-semibold">
                {weatherData.weather[0].description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <WiThermometer size={28} />
                <span>온도</span>
              </div>
              {weatherData.main.temp}°C
              {/*{weatherData.main.temp_min} {weatherData.main.temp_max}*/}
              {/*{weatherData.main.feels_like}*/}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <WiStrongWind size={28} />
                <span>바람</span>
              </div>
              {weatherData.wind.speed} m/s
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <WiHumidity size={28} />
                <span>습도</span>
              </div>
              {weatherData.main.humidity}%
            </div>
          </>
        )}
      </CardBody>
      <CardFooter>
        <Select
          labelPlacement="outside-left"
          id="city"
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={isPending} // 요청 중일 때 비활성화
          placeholder="Select a city"
          aria-label="Select city"
          defaultSelectedKeys={[city]}
        >
          {cities.map((city) => (
            <SelectItem key={city} value={city} className="text-default-700">
              {city}
            </SelectItem>
          ))}
        </Select>
      </CardFooter>
    </Card>
  );
}
