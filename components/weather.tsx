"use client";

import { useState, useTransition } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import { getWeather2 } from "@/app/actions";
import { FaPersonRunning } from "react-icons/fa6";
import { MdOutlineRefresh } from "react-icons/md";
import { useSearchParams } from "next/navigation";

import { useRouter } from "next-nprogress-bar";
import HvCenterSpinner from "@/components/hvCenterSpinner";
import { BiCurrentLocation } from "react-icons/bi";
import { TbTemperatureCelsius } from "react-icons/tb";

export default function Weather({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const getCity = searchParams.get("krName");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  const [weatherData, setWeatherData] = useState(data);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  console.log("data ==>>", weatherData);

  // Refresh 버튼 클릭 시 호출되는 함수
  const handleRefresh = () => {
    startTransition(() => {
      getWeather2(latitude, longitude).then((res) => setWeatherData(res));
      // const now = new Date();
      // setRefreshTime(now.toLocaleTimeString()); // 새로고침 시간 업데이트
    });
  };
  // const { baseDate } = useBaseDateTime(); // 날짜 및 시간 가져오기

  // console.log("KMA", kmaData);

  // const handleCityChange = (city: SetStateAction<string>) => {
  //   setCity(city);
  //   startTransition(() => {
  //     getWeather(city).then((r) => setWeatherData(r));
  //   });
  // };

  return (
    <>
      {isPending && <HvCenterSpinner />}
      <div className="w-full flex items-center justify-end mb-2">
        <div className="flex items-center justify-between">
          <span className="ml-2 text-xs text-default-500">
            {`업데이트: ${weatherData.timestamp}`}
          </span>
          <Button
            isIconOnly
            variant="light"
            onPress={handleRefresh}
            aria-label="새로고침"
            size="sm"
          >
            <MdOutlineRefresh size={20} />
          </Button>
        </div>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <div className="w-full flex items-center justify-between">
            <span>러닝 상태</span>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={() => router.push("/")}
              aria-label="위치 변경"
            >
              <BiCurrentLocation size={20} />
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-row items-center justify-center">
          <FaPersonRunning
            size={68}
            className={
              weatherData.suitableForRunning.rating === "good"
                ? "text-success-500 z-10"
                : weatherData.suitableForRunning.rating === "warning"
                ? "text-warning-500 z-10"
                : weatherData.suitableForRunning.rating === "caution"
                ? "text-yellow-500 z-10"
                : "text-danger-500 z-10"
            }
          />
          <div className="flex flex-col">
            <div className="text-base">{getCity}</div>
            <div className="flex items-center text-3xl">
              {weatherData.temperature}
              <TbTemperatureCelsius size={36} />
            </div>
            <div className="flex items-center text-xs text-default-500">
              <span>체감 온도: {weatherData.feelsLike}</span>
              <TbTemperatureCelsius />
            </div>
          </div>
        </CardBody>
      </Card>

      <Link href="https://link.coupang.com/a/bY0LkW" isExternal>
        jjjjjj
      </Link>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>날씨</CardHeader>
          <Divider />
          <CardBody className="flex items-center justify-center">
            {weatherData.weather[0].iconUrl && (
              <div className="">
                <Image
                  src={weatherData.weather[0].iconUrl}
                  alt={weatherData.weather[0].description}
                  width={90}
                />
              </div>
            )}
            <p className="text-sm">
              {weatherData.weather[0].description}({weatherData.weather[0].main}
              )
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>체감 온도</CardHeader>
          <Divider />
          <CardBody className="flex items-center justify-center">
            <div className="flex flex-col">
              <div className="flex items-center text-3xl">
                {weatherData.feelsLike}
                <TbTemperatureCelsius size={36} />
              </div>
              <div className="flex items-center text-xs text-default-500">
                <span>실제: {weatherData.temperature}</span>
                <TbTemperatureCelsius />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>습도</CardHeader>
          <Divider />
          <CardBody className="flex items-center justify-center">
            <div className="flex flex-col">
              <div className="flex items-center text-3xl">
                {weatherData.humidity}
                <TbTemperatureCelsius size={36} />
              </div>
              {/*<div className="flex items-center text-xs text-default-500">*/}
              {/*  <span>실제: {weatherData.temperature}</span>*/}
              {/*  <TbTemperatureCelsius />*/}
              {/*</div>*/}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card shadow="none" className="hidden">
        {/*<CardHeader className="flex flex-col justify-center">*/}
        {/*  <div className="w-full flex items-center justify-end mb-2">*/}
        {/*    <div className="flex items-center justify-between">*/}
        {/*      <span className="ml-2 text-xs text-default-500">*/}
        {/*        {`업데이트: ${weatherData.timestamp}`}*/}
        {/*      </span>*/}
        {/*      <Button*/}
        {/*        isIconOnly*/}
        {/*        variant="light"*/}
        {/*        onPress={handleRefresh}*/}
        {/*        aria-label="새로고침"*/}
        {/*        size="sm"*/}
        {/*      >*/}
        {/*        <MdOutlineRefresh size={20} />*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <h3 className="font-semibold text-lg mt-3">{getCity}</h3>*/}

        {/*  /!*<Select*!/*/}
        {/*  /!*  id="city"*!/*/}
        {/*  /!*  selectedKeys={[city]}*!/*/}
        {/*  /!*  onChange={(e) => handleCityChange(e.target.value)}*!/*/}
        {/*  /!*  disabled={isPending} // 요청 중일 때 비활성화*!/*/}
        {/*  /!*  disabledKeys={[city]}*!/*/}
        {/*  /!*  placeholder="Select a city"*!/*/}
        {/*  /!*  aria-label="Select city"*!/*/}
        {/*  /!*>*!/*/}
        {/*  /!*  {cities.map((city) => (*!/*/}
        {/*  /!*    <SelectItem*!/*/}
        {/*  /!*      key={city.name}*!/*/}
        {/*  /!*      value={city.name}*!/*/}
        {/*  /!*      className="text-default-700"*!/*/}
        {/*  /!*    >*!/*/}
        {/*  /!*      {city.krName}*!/*/}
        {/*  /!*    </SelectItem>*!/*/}
        {/*  /!*  ))}*!/*/}
        {/*  /!*</Select>*!/*/}
        {/*</CardHeader>*/}

        <CardBody>
          {/*<div className="flex flex-col items-center mb-5">*/}
          {/*  <div className="flex items-center mb-5 relative">*/}
          {/*    <FaPersonRunning*/}
          {/*      size={100}*/}
          {/*      className={*/}
          {/*        weatherData.suitableForRunning.rating === "good"*/}
          {/*          ? "text-success-500 z-10"*/}
          {/*          : weatherData.suitableForRunning.rating === "warning"*/}
          {/*          ? "text-warning-500 z-10"*/}
          {/*          : weatherData.suitableForRunning.rating === "caution"*/}
          {/*          ? "text-yellow-500 z-10"*/}
          {/*          : "text-danger-500 z-10"*/}
          {/*      }*/}
          {/*    />*/}
          {/*    {weatherData.weather[0].iconUrl && (*/}
          {/*      <div className="absolute -top-10 -left-12 z-0">*/}
          {/*        <Image*/}
          {/*          src={weatherData.weather[0].iconUrl}*/}
          {/*          alt={weatherData.weather[0].description}*/}
          {/*          width={120}*/}
          {/*          className="z-10"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*  /!*<div className="flex items-center justify-between w-full">*!/*/}
          {/*  /!*  {weatherData.weatherIcon && (*!/*/}
          {/*  /!*    <Image*!/*/}
          {/*  /!*      src={weatherData.weatherIcon}*!/*/}
          {/*  /!*      alt={weatherData.weatherDescription}*!/*/}
          {/*  /!*      width={65}*!/*/}
          {/*  /!*    />*!/*/}
          {/*  /!*  )}*!/*/}

          {/*  /!*  <p*!/*/}
          {/*  /!*    className={*!/*/}
          {/*  /!*      weatherData.suitableForRunning.rating === "good"*!/*/}
          {/*  /!*        ? "text-success-500 capitalize"*!/*/}
          {/*  /!*        : weatherData.suitableForRunning.rating === "warning"*!/*/}
          {/*  /!*        ? "text-warning-500 capitalize"*!/*/}
          {/*  /!*        : "text-danger-500 capitalize"*!/*/}
          {/*  /!*    }*!/*/}
          {/*  /!*  >*!/*/}
          {/*  /!*    {weatherData.suitableForRunning.rating}*!/*/}
          {/*  /!*  </p>*!/*/}
          {/*  /!*</div>*!/*/}
          {/*  <Divider />*/}
          {/*</div>*/}

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
                          : item.rating === "caution"
                          ? "text-yellow-500 capitalize"
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
                        : item.rating === "caution"
                        ? "bg-yellow-500 p-1 px-2 rounded-md"
                        : "bg-danger-500 p-1 px-2 rounded-md"
                    }
                  >
                    <p className="flex justify-end text-default-50 text-base subpixel-antialiased">
                      {item.recommendation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
