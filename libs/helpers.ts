import {
  isSuitableForRunning,
  // isSuitableForRunningKMA,
  isSuitableForRunningNew,
} from "@/libs/isSuitableForRunnibg";

export const getNextRevalidateTime = (): number => {
  const now = new Date();

  // 현재 시간의 분 단위가 30분 이상이면 다음 정각, 그렇지 않으면 30분 단위로 설정
  const nextRevalidateMinutes = now.getMinutes() >= 30 ? 60 : 30;

  // 다음 재검증 시간까지 남은 초를 계산
  const remainingMinutes = nextRevalidateMinutes - now.getMinutes();
  const remainingSeconds = remainingMinutes * 60 - now.getSeconds();

  return remainingSeconds; // 다음 정각 또는 30분까지 남은 초 반환
};

export const parseWeatherDataNew = (weatherData) => {
  const { current, lat, lon, timezone } = weatherData;

  // Helper to format UNIX timestamp to local time
  const formatToLocalTime = (timestamp, timeZone) =>
    new Intl.DateTimeFormat("ko-KR", {
      timeZone: timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(timestamp * 1000));

  const parsedData = {
    latitude: lat.toFixed(2),
    longitude: lon.toFixed(2),
    timezone,
    timestamp: formatToLocalTime(current.dt, timezone),
    sunrise: formatToLocalTime(current.sunrise, timezone),
    sunset: formatToLocalTime(current.sunset, timezone),
    temperature: current.temp.toFixed(1), // 온도 소수점 한 자리
    feelsLike: current.feels_like.toFixed(1), // 체감 온도
    pressure: current.pressure, // 기압
    humidity: current.humidity, // 습도
    dewPoint: current.dew_point.toFixed(1), // 이슬점
    uvi: current.uvi, // 자외선 지수
    clouds: `${current.clouds}%`, // 구름량
    visibility: `${(current.visibility / 1000).toFixed(1)} km`, // 가시 거리
    windSpeed: `${current.wind_speed.toFixed(1)} m/s`, // 풍속
    windDirection: `${current.wind_deg}°`, // 풍향
    windGust: current.wind_gust
      ? `${current.wind_gust.toFixed(1)} m/s`
      : "없음", // 돌풍 유무
    weather: current.weather.map((w) => ({
      main: w.main, // 날씨 상태 요약
      description: w.description, // 상세 설명
      iconUrl: `https://openweathermap.org/img/wn/${w.icon}@4x.png`, // 날씨 아이콘 URL
    })),
    suitableForRunning: isSuitableForRunningNew(weatherData), // 러닝 적합성 여부
  };

  return parsedData;
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
    visibility: weatherData.visibility, // 가시 거리 (미터)
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
