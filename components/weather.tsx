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
  const [city, setCity] = useState("Suwon"); // 기본값으로 'Seoul' 설정
  const [weatherData, setWeatherData] = useState(data);
  const [isPending, startTransition] = useTransition(); // useTransition 훅 사용

  const cities = [
    { name: "Suwon", krName: "수원", isoCode: "KR" },
    { name: "Goyang", krName: "고양", isoCode: "KR" },
    { name: "Yongin", krName: "용인", isoCode: "KR" },
    { name: "Seongnam", krName: "성남", isoCode: "KR" },
    { name: "Bucheon", krName: "부천", isoCode: "KR" },
    { name: "Ansan", krName: "안산", isoCode: "KR" },
    { name: "Anyang", krName: "안양", isoCode: "KR" },
    { name: "Pyeongtaek", krName: "평택", isoCode: "KR" },
    { name: "Uijeongbu", krName: "의정부", isoCode: "KR" },
    { name: "Gwangmyeong", krName: "광명", isoCode: "KR" },
    { name: "Hanam", krName: "하남", isoCode: "KR" },
    { name: "Gimpo", krName: "김포", isoCode: "KR" },
    { name: "Namyangju", krName: "남양주", isoCode: "KR" },
    { name: "Paju", krName: "파주", isoCode: "KR" },
    { name: "Uiwang", krName: "의왕", isoCode: "KR" },
    { name: "Siheung", krName: "시흥", isoCode: "KR" },
    { name: "Gunpo", krName: "군포", isoCode: "KR" },
    { name: "Anseong", krName: "안성", isoCode: "KR" },
    { name: "Pocheon", krName: "포천", isoCode: "KR" },
    { name: "Yangju", krName: "양주", isoCode: "KR" },
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
              <SelectItem
                key={city.name}
                value={city.name}
                className="text-default-700"
              >
                {city.krName}
              </SelectItem>
            ))}
          </Select>
        </CardFooter>
      </Card>
    </>
  );
}
