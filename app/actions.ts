"use server";
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

// 러닝에 적합한 날씨 조건 판단 로직
const isSuitableForRunning = (weatherData: {
  main: { temp: any; humidity: any };
  wind: { speed: any };
}) => {
  const { temp, humidity } = weatherData.main;
  const { speed: windSpeed } = weatherData.wind;

  const tempSuitable = temp >= 10 && temp <= 25;
  const humiditySuitable = humidity >= 30 && humidity <= 70;
  const windSuitable = windSpeed <= 5;

  return tempSuitable && humiditySuitable && windSuitable;
};

export async function getWeather(city: string) {
  const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    // OpenWeather API로부터 날씨 데이터 가져오기
    const res = await fetch(endPoint, {
      // cache: "no-store", // 최신 데이터를 가져오기 위해 캐시 사용 안 함
    });

    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }

    // 날씨 데이터 파싱
    const weatherData = await res.json();

    // 러닝 적합성 여부 판단
    const suitableForRunning = isSuitableForRunning(weatherData);

    // 날씨 아이콘 URL 생성 (OpenWeather에서 제공하는 아이콘 URL)
    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

    // 결과 반환
    return {
      city,
      temp: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      weatherDescription: weatherData.weather[0].description,
      weatherIcon: iconUrl,
      suitableForRunning,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
}
