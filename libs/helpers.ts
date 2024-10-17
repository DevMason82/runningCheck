// 러닝에 적합한 날씨 조건을 3단계로 평가: good, warning, danger
// export const isSuitableForRunning = (weatherData: {
//   main: { temp: number; humidity: number };
//   wind: { speed: number };
//   visibility: number; // 가시거리 (미터 단위)
// }): { rating: string; details: { condition: string; rating: string }[] } => {
//   const { temp, humidity } = weatherData.main;
//   const { speed: windSpeed } = weatherData.wind;
//   const visibilityInKm = weatherData.visibility / 1000; // 가시거리를 km 단위로 변환
//
//   const details = [];
//
//   // 온도 평가
//   let tempRating: string;
//   if (temp >= 10 && temp <= 25) {
//     tempRating = "good";
//   } else if ((temp >= 5 && temp < 10) || (temp > 25 && temp <= 30)) {
//     tempRating = "warning";
//   } else {
//     tempRating = "danger";
//   }
//   details.push({ condition: `온도: ${temp}°C`, rating: tempRating });
//
//   // 습도 평가
//   let humidityRating: string;
//   if (humidity >= 30 && humidity <= 70) {
//     humidityRating = "good";
//   } else if (
//     (humidity >= 20 && humidity < 30) ||
//     (humidity > 70 && humidity <= 80)
//   ) {
//     humidityRating = "warning";
//   } else {
//     humidityRating = "danger";
//   }
//   details.push({ condition: `습도: ${humidity}%`, rating: humidityRating });
//
//   // 바람 속도 평가
//   let windRating: string;
//   if (windSpeed <= 5) {
//     windRating = "good";
//   } else if (windSpeed > 5 && windSpeed <= 8) {
//     windRating = "warning";
//   } else {
//     windRating = "danger";
//   }
//   details.push({
//     condition: `바람 속도: ${windSpeed} m/s`,
//     rating: windRating,
//   });
//
//   // 가시거리 평가
//   let visibilityRating: string;
//   if (visibilityInKm >= 1) {
//     visibilityRating = "good";
//   } else if (visibilityInKm >= 0.5 && visibilityInKm < 1) {
//     visibilityRating = "warning";
//   } else {
//     visibilityRating = "danger";
//   }
//   details.push({
//     condition: `가시거리: ${visibilityInKm} km`,
//     rating: visibilityRating,
//   });
//
//   // 최종 평가 (모든 조건 중 하나라도 'danger'이면 danger, 아니면 warning, 모두 good이면 good)
//   const hasDanger = details.some((detail) => detail.rating === "danger");
//   const hasWarning = details.some((detail) => detail.rating === "warning");
//
//   let overallRating: string;
//   if (hasDanger) {
//     overallRating = "danger";
//   } else if (hasWarning) {
//     overallRating = "warning";
//   } else {
//     overallRating = "good";
//   }
//
//   return { rating: overallRating, details };
// };

// 정각 또는 30분 간격에 맞춰 revalidate 시간을 동적으로 계산하는 함수
import { isSuitableForRunning } from "@/libs/isSuitableForRunnibg";

export const getNextRevalidateTime = (): number => {
  const now = new Date();

  // 현재 시간의 분 단위가 30분 이상이면 다음 정각, 그렇지 않으면 30분 단위로 설정
  const nextRevalidateMinutes = now.getMinutes() >= 30 ? 60 : 30;

  // 다음 재검증 시간까지 남은 초를 계산
  const remainingMinutes = nextRevalidateMinutes - now.getMinutes();
  const remainingSeconds = remainingMinutes * 60 - now.getSeconds();

  return remainingSeconds; // 다음 정각 또는 30분까지 남은 초 반환
};

// API에서 받은 날씨 데이터로 필요한 정보만 추출하는 함수
export const parseWeatherData = (weatherData: any) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

  return {
    city: weatherData.name,
    country: weatherData.sys.country,
    temp: weatherData.main.temp, // 현재 온도
    tempMin: weatherData.main.temp_min, // 최저 온도
    tempMax: weatherData.main.temp_max, // 최고 온도
    feelsLike: weatherData.main.feels_like, // 체감 온도
    pressure: weatherData.main.pressure, // 기압
    humidity: weatherData.main.humidity, // 습도
    windSpeed: weatherData.wind.speed, // 풍속
    windDirection: weatherData.wind.deg, // 풍향
    windGust: weatherData.wind.gust || null, // 돌풍 (있을 경우)
    clouds: weatherData.clouds.all, // 구름량 (백분율)
    visibility: weatherData.visibility / 1000, // 가시 거리 (미터)
    rain1h: weatherData.rain?.["1h"] || 0, // 1시간 강수량
    rain3h: weatherData.rain?.["3h"] || 0, // 3시간 강수량
    snow1h: weatherData.snow?.["1h"] || 0, // 1시간 적설량
    snow3h: weatherData.snow?.["3h"] || 0, // 3시간 적설량
    weatherDescription: weatherData.weather[0].description, // 날씨 설명
    weatherIcon: iconUrl, // 날씨 아이콘
    sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(), // 일출 시간
    sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(), // 일몰 시간
    suitableForRunning: isSuitableForRunning(weatherData), // 러닝 적합성 여부
  };
};
