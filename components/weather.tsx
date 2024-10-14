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
import { weekStartData } from "@internationalized/date/src/weekStartData";

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

  // useEffect(() => {
  //   startTransition(async () => {
  //     try {
  //       const data = await getWeather(city);
  //       setWeatherData(data);
  //     } catch (error) {
  //       console.error("Error fetching weather data:", error);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   });
  // }, []);

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
        <CardHeader>{city} - Running Check!</CardHeader>
        <Divider />
        <CardBody>
          {/*{JSON.stringify(isPending)}*/}
          {/*{weatherData === null && <p>OPOPOPOPOP</p>}*/}
          {/*{isPending && <CircularProgress color="success" />}*/}
          {/*{JSON.stringify(weatherData)}*/}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1">
              {/*<WiHumidity size={28} />*/}
              <FaPersonRunning
                size={26}
                color={weatherData.suitableForRunning ? "green" : "red"}
              />
              <span>러닝</span>
            </div>
            <p
              className={
                weatherData.suitableForRunning
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {weatherData.suitableForRunning ? "Good" : "Bad"}
            </p>

            {/*{JSON.stringify(weatherData.suitableForRunning)}*/}
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
              <span>온도</span>
            </div>
            {weatherData.temp}°C
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

          {/*{weatherData && !isPending && (*/}
          {/*  <>*/}
          {/*    <div className="flex flex-col items-center justify-center mb-5">*/}
          {/*      {weatherData.weatherIcon && (*/}
          {/*        <Image*/}
          {/*          isZoomed*/}
          {/*          src={weatherData.weatherIcon}*/}
          {/*          alt={weatherData.weatherDescription}*/}
          {/*          width={100}*/}
          {/*        />*/}
          {/*      )}*/}
          {/*      <p className="font-semibold">*/}
          {/*        {weatherData.weatherDescription}*/}
          {/*      </p>*/}
          {/*    </div>*/}

          {/*    <div className="flex items-center justify-between">*/}
          {/*      <div className="flex items-center gap-1">*/}
          {/*        <WiThermometer size={28} />*/}
          {/*        <span>온도</span>*/}
          {/*      </div>*/}
          {/*      {weatherData.temp}°C*/}
          {/*    </div>*/}

          {/*    <div className="flex items-center justify-between">*/}
          {/*      <div className="flex items-center gap-1">*/}
          {/*        <WiStrongWind size={28} />*/}
          {/*        <span>바람</span>*/}
          {/*      </div>*/}
          {/*      {weatherData.windSpeed} m/s*/}
          {/*    </div>*/}

          {/*    <div className="flex items-center justify-between">*/}
          {/*      <div className="flex items-center gap-1">*/}
          {/*        <WiHumidity size={28} />*/}
          {/*        <span>습도</span>*/}
          {/*      </div>*/}
          {/*      {weatherData.humidity}%*/}
          {/*    </div>*/}

          {/*    <div className="flex items-center justify-between">*/}
          {/*      <div className="flex items-center gap-1">*/}
          {/*        <WiHumidity size={28} />*/}
          {/*        <span>러닝</span>*/}
          {/*      </div>*/}
          {/*      {JSON.stringify(weatherData.suitableForRunning)}%*/}
          {/*    </div>*/}
          {/*  </>*/}
          {/*)}*/}
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
