"use server";
import { getNextRevalidateTime, parseWeatherData } from "@/libs/helpers";
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function getWeather(city: string) {
  const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=kr&appid=${API_KEY}&units=metric`;
  try {
    // OpenWeather API로부터 날씨 데이터 가져오기
    const res = await fetch(endPoint, {
      next: { revalidate: 300 },
      // cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }

    // 날씨 데이터 파싱
    const weatherData = await res.json();

    // 결과 반환
    return parseWeatherData(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
}

/**
 * 위도와 경도를 사용해 OpenWeather에서 날씨 데이터 가져오기
 */
export async function getWeatherByCoords(lat: any, lon: any) {
  const endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`;

  try {
    // OpenWeather API로부터 날씨 데이터 가져오기
    const res = await fetch(endPoint, {
      cache: "no-store", // 최신 데이터 가져오기
    });

    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }

    // 날씨 데이터 파싱
    const weatherData = await res.json();

    // 결과 반환
    return parseWeatherData(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
}
