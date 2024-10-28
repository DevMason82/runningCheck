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
import { useSearchParams } from "next/navigation";
import { getStorage } from "@/libs/localStorage";

export default function Weather({
  data,
  kmaData,
}: {
  data: any;
  kmaData: any;
}) {
  const searchParams = useSearchParams();
  const getCity = searchParams.get("krName");

  // const [city, setCity] = useState<string>(data.city);
  const [weatherData, setWeatherData] = useState(kmaData);
  const [isPending, startTransition] = useTransition();

  console.log("KMA", kmaData);

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
        <CardHeader className="flex flex-col gap-3 justify-center">
          <h3 className="font-semibold text-lg">{getCity}</h3>
          {/*<Select*/}
          {/*  id="city"*/}
          {/*  selectedKeys={[city]}*/}
          {/*  onChange={(e) => handleCityChange(e.target.value)}*/}
          {/*  disabled={isPending} // 요청 중일 때 비활성화*/}
          {/*  disabledKeys={[city]}*/}
          {/*  placeholder="Select a city"*/}
          {/*  aria-label="Select city"*/}
          {/*>*/}
          {/*  {cities.map((city) => (*/}
          {/*    <SelectItem*/}
          {/*      key={city.name}*/}
          {/*      value={city.name}*/}
          {/*      className="text-default-700"*/}
          {/*    >*/}
          {/*      {city.krName}*/}
          {/*    </SelectItem>*/}
          {/*  ))}*/}
          {/*</Select>*/}
        </CardHeader>
        {/*<Divider />*/}

        <CardBody>
          <div className="flex flex-col items-center mt-3 mb-5">
            <div className="flex items-center mb-3">
              <FaPersonRunning
                size={74}
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
            <div className="flex items-center justify-between w-full">
              {weatherData.weatherIcon && (
                <Image
                  src={weatherData.weatherIcon}
                  alt={weatherData.weatherDescription}
                  width={65}
                />
              )}

              <p
                className={
                  weatherData.suitableForRunning.rating === "good"
                    ? "text-success-500 capitalize"
                    : weatherData.suitableForRunning.rating === "warning"
                    ? "text-warning-500 capitalize"
                    : "text-danger-500 capitalize"
                }
              >
                {weatherData.suitableForRunning.rating}
              </p>
            </div>
            <Divider />
          </div>

          <div>
            {weatherData.suitableForRunning.details.map((item, index) => {
              return (
                <div key={index.toString()} className="flex flex-col mb-5">
                  <div className="flex justify-between mb-1">
                    <span>{item.condition}</span>
                    <span
                      className={
                        item.rating === "good"
                          ? "text-success-500 capitalize"
                          : item.rating === "warning"
                          ? "text-warning-500 capitalize"
                          : "text-danger-500 capitalize"
                      }
                    >
                      {item.rating}
                    </span>
                  </div>

                  <div
                    className={
                      item.rating === "good"
                        ? "bg-success-500 p-1 px-2 rounded-md"
                        : item.rating === "warning"
                        ? "bg-warning-500 p-1 px-2 rounded-md"
                        : "bg-danger-500 p-1 px-2 rounded-md"
                    }
                    // className="bg-success-500 p-3 rounded-md"
                  >
                    <p className="flex justify-end text-default-50 text-base subpixel-antialiased">
                      {item.recommendation}
                    </p>
                  </div>

                  {/*<Divider />*/}
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
