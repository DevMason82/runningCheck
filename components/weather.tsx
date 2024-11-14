"use client";

import React, { SetStateAction, useState, useTransition } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { getWeather2 } from "@/app/actions";
import { FaLeaf, FaPersonRunning } from "react-icons/fa6";
import { MdOutlineRefresh } from "react-icons/md";
import { useSearchParams } from "next/navigation";

import { useRouter } from "next-nprogress-bar";
import HvCenterSpinner from "@/components/hvCenterSpinner";
import { BiCurrentLocation } from "react-icons/bi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { PiPercentBold } from "react-icons/pi";
import ModalDetail from "@/app/runningStatusInfo/components/modalDetail";
import { FaAngleUp } from "react-icons/fa";

export default function Weather({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const krName = searchParams.get("krName");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  const [weatherData, setWeatherData] = useState(data);
  const [weatherIndex, setWeatherIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleModalOpen = (runId: SetStateAction<number>) => {
    setWeatherIndex(runId);
    onOpen();
  };

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

      <Card className="mb-5">
        <CardHeader className="text-default-700">
          <div className="w-full flex items-center justify-between">
            <span className="font-semibold">러닝 상태</span>
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
        <CardBody className="flex flex-row items-center justify-center gap-3">
          <div className="flex flex-col">
            <div className="text-base flex items-center justify-between mb-2">
              <span>{krName}</span>
              <div>
                {weatherData.suitableForRunning.details[6].recommendation[0]
                  .season === "spring" ? (
                  <FaLeaf className="text-lime-400" />
                ) : weatherData.suitableForRunning.details[6].recommendation[0]
                    .season === "summer" ? (
                  <FaLeaf className="text-green-600" />
                ) : weatherData.suitableForRunning.details[6].recommendation[0]
                    .season === "fall" ? (
                  <FaLeaf className="text-amber-600" />
                ) : (
                  <FaLeaf className="text-white" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {weatherData.suitableForRunning.details[6].recommendation.map(
                (item, index) => {
                  return (
                    <div
                      key={index.toString()}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-xs">
                        {item.season === "spring" || item.season === "fall"
                          ? item.time === "morning"
                            ? "오전[8~10시]"
                            : item.time === "afternoon"
                            ? "오후[16~18시]"
                            : "저녁[20시 이후]"
                          : item.season === "summer"
                          ? item.time === "morning"
                            ? "이른 아침[6~8시 (더위를 피해 이른 아침 추천)]"
                            : "저녁[20시 이후 (해가 진 후 시원한 저녁 시간 추천)]"
                          : item.season === "winter"
                          ? item.time === "lateMorning"
                            ? "늦은 아침[10~12시 (날씨가 추운 겨울엔 늦은 아침 추천)]"
                            : "오후[14~16시 (온도가 올라가는 오후 시간대 추천)]"
                          : ""}
                      </span>
                      <div className="flex items-center gap-2">
                        <Chip
                          size="sm"
                          className={
                            item.rating === "good"
                              ? "bg-success-400 capitalize"
                              : item.rating === "caution"
                              ? "bg-amber-300 text-black capitalize"
                              : item.rating === "warning"
                              ? "bg-warning-400 capitalize"
                              : "bg-danger-400 capitalize"
                          }
                        >
                          {item.rating}
                        </Chip>
                        <FaPersonRunning
                          size={24}
                          className={
                            item.rating === "good"
                              ? "text-success-400"
                              : item.rating === "warning"
                              ? "text-warning-400"
                              : item.rating === "caution"
                              ? "text-amber-300"
                              : "text-danger-400"
                          }
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="mb-5">
        <Button
          href="https://link.coupang.com/a/bZga9r"
          as={Link}
          // color="primary"
          showAnchorIcon
          size="sm"
          variant="solid"
          className="mb-2 font-semibold text-sm bg-red-500"
          isExternal
          fullWidth
        >
          쿠팡 홈
        </Button>
        <p className="text-xs text-default-700 text-center">
          &quot;쿠팡 파트너스 활동으로, 일정액의 수수료를 제공받습니다.&quot;
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card isPressable onPress={() => handleModalOpen(0)}>
          <CardHeader
            className={
              weatherData.suitableForRunning.details[0].rating === "good"
                ? "text-success-400"
                : weatherData.suitableForRunning.details[0].rating === "warning"
                ? "text-warning-400"
                : weatherData.suitableForRunning.details[0].rating === "caution"
                ? "text-amber-300"
                : "text-danger-400"
            }
          >
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold">날씨</span>
              <FaAngleUp className="text-white" size={20} />
            </div>
          </CardHeader>
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
              흐림 {weatherData.clouds}
              {/*{weatherData.weather[0].description}({weatherData.weather[0].main}*/}
              {/*)*/}
            </p>
          </CardBody>
        </Card>

        <Card isPressable onPress={() => handleModalOpen(1)}>
          <CardHeader
            className={
              weatherData.suitableForRunning.details[1].rating === "good"
                ? "text-success-400"
                : weatherData.suitableForRunning.details[1].rating === "warning"
                ? "text-warning-400"
                : weatherData.suitableForRunning.details[1].rating === "caution"
                ? "text-amber-300"
                : "text-danger-400"
            }
          >
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold">체감 온도</span>
              <FaAngleUp className="text-white" size={20} />
            </div>
          </CardHeader>
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

        <Card isPressable onPress={() => handleModalOpen(2)}>
          <CardHeader
            className={
              weatherData.suitableForRunning.details[2].rating === "good"
                ? "text-success-400"
                : weatherData.suitableForRunning.details[2].rating === "warning"
                ? "text-warning-400"
                : weatherData.suitableForRunning.details[2].rating === "caution"
                ? "text-amber-300"
                : "text-danger-400"
            }
          >
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold">습도</span>
              <FaAngleUp className="text-white" size={20} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex items-center justify-center">
            <div className="flex flex-col">
              <div className="flex items-center text-3xl">
                {weatherData.humidity}
                <PiPercentBold size={30} />
              </div>
              <div className="flex items-center text-xs text-default-500">
                <span>이슬점: {weatherData.dewPoint}</span>
                <TbTemperatureCelsius />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card isPressable onPress={() => handleModalOpen(3)}>
          <CardHeader
            className={
              weatherData.suitableForRunning.details[3].rating === "good"
                ? "text-success-400"
                : weatherData.suitableForRunning.details[3].rating === "warning"
                ? "text-warning-400"
                : weatherData.suitableForRunning.details[3].rating === "caution"
                ? "text-amber-300"
                : "text-danger-400"
            }
          >
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold">풍속</span>
              <FaAngleUp className="text-white" size={20} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex items-center justify-center">
            <div className="flex flex-col">
              <div className="flex items-center text-3xl">
                {weatherData.windSpeed}
              </div>
              <div className="flex items-center text-xs text-default-500">
                <span>돌풍: {weatherData.windGust}</span>
                <TbTemperatureCelsius />
              </div>
              <div className="flex items-center text-xs text-default-500">
                <span>풍향: {weatherData.windDirection}</span>
                <TbTemperatureCelsius />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card isPressable onPress={() => handleModalOpen(5)}>
          <CardHeader
            className={
              weatherData.suitableForRunning.details[5].rating === "good"
                ? "text-success-400"
                : weatherData.suitableForRunning.details[5].rating === "warning"
                ? "text-warning-400"
                : weatherData.suitableForRunning.details[5].rating === "caution"
                ? "text-amber-300"
                : "text-danger-400"
            }
          >
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold">자외선 지수</span>
              <FaAngleUp className="text-white" size={20} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex items-center justify-center">
            <div className="flex flex-col">
              <div className="flex items-center text-3xl">
                {weatherData.uvi}
                {/*<PiPercentBold size={30} />*/}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card isPressable onPress={() => handleModalOpen(4)}>
          <CardHeader
            className={
              weatherData.suitableForRunning.details[4].rating === "good"
                ? "text-success-400"
                : weatherData.suitableForRunning.details[4].rating === "warning"
                ? "text-warning-400"
                : weatherData.suitableForRunning.details[4].rating === "caution"
                ? "text-amber-300"
                : "text-danger-400"
            }
          >
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold">가시거리</span>
              <FaAngleUp className="text-white" size={20} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex items-center justify-center">
            <div className="flex flex-col">
              <div className="flex items-center text-3xl">
                {weatherData.visibility}
                {/*<PiPercentBold size={30} />*/}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {isOpen && (
        <ModalDetail
          isOpen={isOpen}
          onClose={onClose}
          result={weatherData.suitableForRunning.details}
          weatherIndex={weatherIndex}
        />
      )}
    </>
  );
}
