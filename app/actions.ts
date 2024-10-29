"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getNextRevalidateTime,
  parseWeatherData,
  parseWeatherKMAData,
} from "@/libs/helpers";
import { getStorage } from "@/libs/localStorage";
import { getCurrentDateTime } from "@/libs/getCurrentDateTime";
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const API_KEY_KMA = process.env.NEXT_PUBLIC_KMA_API_KEY;

export async function getWeather(city: string | undefined) {
  const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=kr&appid=${API_KEY}&units=metric`;

  try {
    // OpenWeather API로부터 날씨 데이터 가져오기
    const res = await fetch(endPoint, {
      // next: { revalidate: 300 },
      cache: "no-store",
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

export async function getWeather2(latitude: any, longitude: any) {
  // const { searchParams } = new URL(request.url); // URL 객체로 쿼리스트링 파싱

  const endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=kr&units=metric`;
  try {
    // OpenWeather API로부터 날씨 데이터 가져오기
    const res = await fetch(endPoint, {
      // next: { revalidate: 300 },
      cache: "no-store",
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

// 기상청 API 호출 함수 (격자 X, Y 좌표로 요청)
export async function getUltraSrtNcst(nx: number | null, ny: number | null) {
  const { baseDate, baseTime } = getCurrentDateTime();
  console.log("BASETIME", baseTime);
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${API_KEY_KMA}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&dataType=JSON`;

  try {
    const response = await fetch(url, {
      // cache: "no-store", // 캐싱 방지
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch weather data from KMA");
    }

    const data = await response.json();
    // return data.response.body.items.item;
    console.log("KMA data ==>>", data.response.body.items.item);
    return parseWeatherKMAData(data.response.body.items.item);
  } catch (error) {
    console.error("Error fetching KMA weather data:", error);
    throw new Error("Failed to fetch weather data.");
  }
}
