"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  setCookie,
  deleteCookie,
  hasCookie,
  getCookie,
  getCookies,
} from "cookies-next";
import { getNextRevalidateTime, parseWeatherData } from "@/libs/helpers";
import { getStorage } from "@/libs/localStorage";
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function getWeather(city: string | undefined) {
  // const getMyPosition = getCookies({ cookies });
  // const { myPosition } = getMyPosition;
  // console.log(myPosition);

  // const ddd = getStorage("myPosition");
  // console.log("My position DDD ==>>", ddd);

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

export async function getWeather2(request: Request) {
  const { searchParams } = new URL(request.url); // URL 객체로 쿼리스트링 파싱
  const queryValue = searchParams.get("city");
  const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${queryValue}&lang=kr&appid=${API_KEY}&units=metric`;
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
