"use client";

import { SetStateAction, useEffect, useState, useTransition } from "react";
import {
  Button,
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
// import {
//   WiCloudRefresh,
//   WiHumidity,
//   WiStrongWind,
//   WiThermometer,
// } from "react-icons/wi";
import { getWeather, getWeather2 } from "@/app/actions";
import { FaPersonRunning } from "react-icons/fa6";
// import { cities } from "@/config/cityLists";
import { MdOutlineRefresh, MdVisibility } from "react-icons/md";
import { useSearchParams } from "next/navigation";
// import { getStorage } from "@/libs/localStorage";
import { useRouter } from "next-nprogress-bar";
import { useBaseDateTime } from "@/hooks/useBaseDateTime";

export default function Weather({
  data, // kmaData,
}: {
  data: any;
  // kmaData: any;
}) {
  const searchParams = useSearchParams();
  const getCity = searchParams.get("krName");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  // const [city, setCity] = useState<string>(data.city);
  const [weatherData, setWeatherData] = useState(data);
  const [refreshTime, setRefreshTime] = useState<string>("");
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
      {isPending && (
        <Spinner
          className="absolute inset-0 flex items-center justify-center z-50"
          color="success"
          size="lg"
        />
      )}
      <Card shadow="none">
        <CardHeader className="flex flex-col justify-center">
          <div className="w-full flex items-center justify-end mb-2">
            {/*<p className="text-xs text-default-700">{baseDate}</p>*/}

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
          <h3 className="font-semibold text-lg mt-3">{getCity}</h3>

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
          <div className="flex flex-col items-center mb-5">
            <div className="flex items-center mb-5 relative">
              <FaPersonRunning
                size={100}
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
              {weatherData.weather[0].iconUrl && (
                <div className="absolute -top-10 -left-12 z-0">
                  <Image
                    src={weatherData.weather[0].iconUrl}
                    alt={weatherData.weather[0].description}
                    width={120}
                    className="z-10"
                  />
                </div>
              )}
            </div>
            {/*<div className="flex items-center justify-between w-full">*/}
            {/*  {weatherData.weatherIcon && (*/}
            {/*    <Image*/}
            {/*      src={weatherData.weatherIcon}*/}
            {/*      alt={weatherData.weatherDescription}*/}
            {/*      width={65}*/}
            {/*    />*/}
            {/*  )}*/}

            {/*  <p*/}
            {/*    className={*/}
            {/*      weatherData.suitableForRunning.rating === "good"*/}
            {/*        ? "text-success-500 capitalize"*/}
            {/*        : weatherData.suitableForRunning.rating === "warning"*/}
            {/*        ? "text-warning-500 capitalize"*/}
            {/*        : "text-danger-500 capitalize"*/}
            {/*    }*/}
            {/*  >*/}
            {/*    {weatherData.suitableForRunning.rating}*/}
            {/*  </p>*/}
            {/*</div>*/}
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
