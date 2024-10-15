"use client";

import { SetStateAction, useEffect, useState, useTransition } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Image,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import { getWeather } from "@/app/actions";
import { FaPersonRunning } from "react-icons/fa6";
// import { weekStartData } from "@internationalized/date/src/weekStartData";

export default function Weather({ data }: { data: any }) {
  const [city, setCity] = useState("Seoul"); // 기본값으로 'Seoul' 설정
  const [weatherData, setWeatherData] = useState(data);
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

  const handleCityChange = (city: SetStateAction<string>) => {
    setCity(city);
    startTransition(() => {
      getWeather(city).then((r) => setWeatherData(r));
    });
  };

  return (
    <>
      {isPending && (
        <Spinner
          className="absolute inset-0 flex items-center justify-center z-50"
          color="success"
          size="lg"
        />
      )}
      <Card>
        <CardHeader>{city} - Running Info</CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col items-center mt-3">
            <div className="flex items-center gap-1 mb-3">
              <FaPersonRunning
                size={54}
                // color={
                //   weatherData.suitableForRunning ? "green" : "text-red-500"
                // }
                className={
                  weatherData.suitableForRunning
                    ? "text-green-600"
                    : "text-red-500"
                }
              />
            </div>
            <p
              className={
                weatherData.suitableForRunning
                  ? "text-green-600 text-lg font-semibold"
                  : "text-red-500 text-lg font-semibold"
              }
            >
              {weatherData.suitableForRunning ? "Good" : "Bad"}
            </p>
          </div>

          <Divider className="my-5" />

          <div className="flex flex-col items-center justify-center">
            {weatherData.weatherIcon && (
              <Image
                isZoomed
                src={weatherData.weatherIcon}
                alt={weatherData.weatherDescription}
                // fallbackSrc="https://via.placeholder.com/100x100"
                height={100}
                width={100}
              />
            )}
            <p className="font-semibold">{weatherData.weatherDescription}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <WiThermometer size={28} />
              <span>온도(체감)</span>
            </div>
            {Math.round(weatherData.temp)}({Math.round(weatherData.feelsLike)}
            )°C
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <WiStrongWind size={28} />
              <span>바람</span>
            </div>
            {weatherData.windSpeed} m/s
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <WiHumidity size={28} />
              <span>습도</span>
            </div>
            {weatherData.humidity}%
          </div>
        </CardBody>
        <CardFooter>
          <Select
            labelPlacement="outside-left"
            id="city"
            selectedKeys={[city]}
            onChange={(e) => handleCityChange(e.target.value)}
            disabled={isPending} // 요청 중일 때 비활성화
            disabledKeys={[city]}
            placeholder="Select a city"
            aria-label="Select city"
          >
            {cities.map((city) => (
              <SelectItem key={city} value={city} className="text-default-700">
                {city}
              </SelectItem>
            ))}
          </Select>
        </CardFooter>
      </Card>
    </>
  );
}
