"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getNextRevalidateTime,
  parseWeatherData,
  parseWeatherDataNew,
} from "@/libs/helpers";
import { generateHmac } from "@/libs/coupangAuth";
import { getStorage } from "@/libs/localStorage";
import { getCurrentDateTime } from "@/libs/getCurrentDateTime";
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const COUPANG_PARTNER_API_KEY = process.env.COUPANG_PARTNER_API_KEY;
const ACCESS_KEY = process.env.COUPANG_ACCESS_KEY;
const SECRET_KEY = process.env.COUPANG_SECRET_KEY;

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

export async function getWeather2(latitude: number, longitude: number) {
  const endPoint = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily&appid=${API_KEY}&lang=kr&units=metric`;
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

    console.log("@@@@@", weatherData);

    // 결과 반환
    return parseWeatherDataNew(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
}

export async function fetchCoupangRecommendations() {
  const method = "GET";
  const endPoint =
    "/v2/providers/affiliate_open_api/apis/openapi/v1/products/reco";
  const fullUrl = `https://api-gateway.coupang.com${endPoint}`;

  try {
    // HMAC 인증 헤더 생성
    const authHeader = generateHmac(method, endPoint, SECRET_KEY, ACCESS_KEY);

    // 쿠팡 API로부터 추천 상품 데이터 가져오기
    const res = await fetch(fullUrl, {
      method,
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      cache: "no-store", // 실시간 데이터를 위해 캐시를 사용하지 않음
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Coupang recommendations");
    }

    // JSON 형태로 응답을 받아 파싱
    const data = await res.json();
    console.log(data);
    return data.data || []; // 추천 상품 배열을 반환
  } catch (error) {
    console.error("Error fetching Coupang recommendations:", error);
    throw new Error("Error fetching Coupang recommendations");
  }
}
