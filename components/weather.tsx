"use client";

import { SetStateAction, useEffect, useState, useTransition } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
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
import { cities } from "@/config/cityLists";
import { MdVisibility } from "react-icons/md";
// import { weekStartData } from "@internationalized/date/src/weekStartData";

export default function Weather({ data }: { data: any }) {
  const [city, setCity] = useState("Uijeongbu-si"); // 기본값으로 'Seoul' 설정
  const [weatherData, setWeatherData] = useState(data);
  const [isPending, startTransition] = useTransition(); // useTransition 훅 사용

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
      <Card shadow="none">
        <CardHeader className="flex justify-center">
          {city} Running 상태
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col items-center mt-3 mb-5">
            <div className="flex items-center gap-1 mb-3">
              <FaPersonRunning
                size={54}
                // color={
                //   weatherData.suitableForRunning ? "green" : "text-red-500"
                // }
                className={
                  weatherData.suitableForRunning.rating === "good"
                    ? "text-success-500"
                    : weatherData.suitableForRunning.rating === "warning"
                    ? "text-warning-500"
                    : "text-danger-500"
                }
              />
            </div>
            <p
              className={
                weatherData.suitableForRunning.rating === "good"
                  ? "text-success-500"
                  : weatherData.suitableForRunning.rating === "warning"
                  ? "text-warning-500"
                  : "text-danger-500"
              }
            >
              {weatherData.suitableForRunning.rating}
            </p>
            {/*<p>{JSON.stringify(weatherData.suitableForRunning.details)}</p>*/}
          </div>

          <div>
            {weatherData.suitableForRunning.details.map((item, index) => {
              return (
                <div key={index.toString()} className="flex flex-col mb-3">
                  <div className="flex justify-between">
                    <span>{item.condition}</span>
                    <span
                      className={
                        item.rating === "good"
                          ? "text-success-500"
                          : item.rating === "warning"
                          ? "text-warning-500"
                          : "text-danger-500"
                      }
                    >
                      {item.rating}
                    </span>
                  </div>

                  <div className="flex justify-end">{item.recommendation}</div>
                </div>
              );
            })}
          </div>

          {/*<div className="flex items-center justify-between mb-2">*/}
          {/*  <Chip*/}
          {/*    startContent={<WiThermometer />}*/}
          {/*    variant="light"*/}
          {/*    // color="success"*/}
          {/*  >*/}
          {/*    온도(체감)*/}
          {/*  </Chip>*/}
          {/*  <div className="flex items-center">*/}
          {/*    {weatherData.weatherIcon && (*/}
          {/*      <Image*/}
          {/*        // isZoomed*/}
          {/*        src={weatherData.weatherIcon}*/}
          {/*        alt={weatherData.weatherDescription}*/}
          {/*        height={35}*/}
          {/*        width={35}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*    {Math.round(weatherData.temp)}({Math.round(weatherData.feelsLike)}*/}
          {/*    )°C*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className="flex items-center justify-between mb-3">*/}
          {/*  <Chip*/}
          {/*    startContent={<WiStrongWind />}*/}
          {/*    variant="light"*/}
          {/*    // color="success"*/}
          {/*  >*/}
          {/*    바람*/}
          {/*  </Chip>*/}
          {/*  {weatherData.windSpeed} m/s*/}
          {/*</div>*/}

          {/*<div className="flex items-center justify-between mb-3">*/}
          {/*  <Chip*/}
          {/*    startContent={<WiHumidity />}*/}
          {/*    variant="light"*/}
          {/*    // color="success"*/}
          {/*  >*/}
          {/*    습도*/}
          {/*  </Chip>*/}
          {/*  {weatherData.humidity}%*/}
          {/*</div>*/}

          {/*<div className="flex items-center justify-between">*/}
          {/*  <Chip*/}
          {/*    startContent={<MdVisibility />}*/}
          {/*    variant="light"*/}
          {/*    // color="success"*/}
          {/*  >*/}
          {/*    가시거리*/}
          {/*  </Chip>*/}
          {/*  {weatherData.visibility}km*/}
          {/*</div>*/}
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
