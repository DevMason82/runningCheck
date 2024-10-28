"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useWatchPosition } from "@/hooks/useWatchPosition";
import { useLatLonToGrid } from "@/hooks/useLatLonToGrid";
import { useBaseDateTime } from "@/hooks/useBaseDateTime";
import { Button, Spinner } from "@nextui-org/react";
import { getUltraSrtNcst } from "@/app/actions";

export default function LocationTracker() {
  const { location, error } = useWatchPosition();
  const { x, y } = useLatLonToGrid(location.lat, location.lon);
  const { baseDate, baseTime } = useBaseDateTime();

  const [weatherData, setWeatherData] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  console.log(x, y);

  // 초기 렌더링 시 데이터 가져오기 (useEffect + useTransition)
  useEffect(() => {
    if (x && y) {
      startTransition(() => {
        getUltraSrtNcst(x, y, baseDate, baseTime).then((r) =>
          setWeatherData(r),
        );
      });
    }
  }, [x, y, baseDate, baseTime]); // 의존성 배열에 좌표와 시간 포함

  // const fetchWeatherData = async () => {
  //   setIsLoading(true); // 로딩 시작
  //
  //   try {
  //     const data = await getUltraSrtNcst(x, y, baseDate, baseTime); // API 호출
  //     setWeatherData(data); // 데이터 업데이트
  //   } catch (error) {
  //     console.error("Failed to fetch weather data:", error); // 오류 처리
  //   } finally {
  //     setIsLoading(false); // 로딩 종료
  //   }
  // };

  // 기상청 API 호출 함수
  // const fetchWeatherData = async () => {
  //   setIsLoading(true); // 로딩 시작
  //
  //   try {
  //     const data = await getUltraSrtNcst(x, y, baseDate, baseTime); // API 호출
  //     setWeatherData(data); // 데이터 업데이트
  //   } catch (error) {
  //     console.error("Failed to fetch weather data:", error); // 오류 처리
  //   } finally {
  //     setIsLoading(false); // 로딩 종료
  //   }
  // };

  const handleFetchWeather = () => {
    startTransition(async () => {
      try {
        const data = await getUltraSrtNcst(x, y, baseDate, baseTime);
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    });
  };

  return (
    <div className="text-default-500 relative">
      {/* 로딩 스피너 표시 */}
      {(isPending || isLoading) && (
        <Spinner
          className="absolute inset-0 flex items-center justify-center z-50"
          color="success"
          size="lg"
        />
      )}

      <h1>Real-time Location Tracking</h1>

      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {location.lat && location.lon ? (
            <>
              <p>
                Latitude: {location.lat}, Longitude: {location.lon}
              </p>
              <p>
                X: {x}, Y: {y}
              </p>
              <p>
                Base Date: {baseDate}, Base Time: {baseTime}
              </p>
              <Button
                onPress={handleFetchWeather}
                disabled={isPending}
                className="bg-blue-500 text-white p-2 mt-4 rounded"
              >
                {isPending ? "Loading..." : "Get Weather Data"}
              </Button>

              {/* 날씨 데이터 표시 */}
              {weatherData && (
                <div className="mt-4">
                  <h2>Weather Data:</h2>
                  <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                </div>
              )}
            </>
          ) : (
            <p>Getting location...</p>
          )}
        </>
      )}
    </div>
  );
}
