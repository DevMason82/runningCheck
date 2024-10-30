import {
  isSuitableForRunning,
  isSuitableForRunningKMA,
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

  // Helper function to convert a UNIX timestamp to KST (UTC+9)
  const convertToKST = (timestamp) => {
    const kstOffset = 9 * 60 * 60 * 1000; // UTC+9 in milliseconds
    const date = new Date(timestamp * 1000 + kstOffset);
    return date.toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul" });
  };

  const parsedData = {
    latitude: lat.toFixed(2),
    longitude: lon.toFixed(2),
    timezone: "Asia/Seoul",
    timestamp: convertToKST(current.dt), // Current time in KST
    sunrise: convertToKST(current.sunrise), // Sunrise in KST
    sunset: convertToKST(current.sunset), // Sunset in KST
    temperature: current.temp.toFixed(1), // Temperature with one decimal place
    feelsLike: current.feels_like.toFixed(1), // Feels-like temperature
    pressure: current.pressure, // Pressure in hPa
    humidity: current.humidity, // Humidity in %
    dewPoint: current.dew_point.toFixed(1), // Dew point in °C
    uvi: current.uvi, // UV index
    clouds: `${current.clouds}%`, // Cloud cover in percentage
    visibility: `${(current.visibility / 1000).toFixed(1)} km`, // Visibility in km
    windSpeed: `${current.wind_speed.toFixed(1)} m/s`, // Wind speed in m/s
    windDirection: `${current.wind_deg}°`, // Wind direction in degrees
    windGust: current.wind_gust
      ? `${current.wind_gust.toFixed(1)} m/s`
      : "없음", // Wind gust presence
    weather: current.weather.map((w) => ({
      main: w.main, // Main weather description
      description: w.description, // Detailed weather description
      iconUrl: `https://openweathermap.org/img/wn/${w.icon}@4x.png`, // Weather icon URL
    })),
    suitableForRunning: isSuitableForRunningNew(weatherData), // Running suitability check
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

export const parseWeatherKMAData = (weatherData) => {
  console.log("@@@@@@@@@@", weatherData);
  const parsedData = {
    temperature: 0, // 기본값 0으로 초기화
    humidity: 0,
    precipitation: "없음",
    windSpeed: 0,
    windDirection: 0,
    windUComponent: 0,
    windVComponent: 0,
    rain1h: 0,
    weatherCondition: "맑음", // 기본값 설정
  };

  // API 응답의 각 항목을 분류하여 매핑
  weatherData.forEach((item) => {
    const { category, obsrValue } = item;

    switch (category) {
      case "T1H": // 기온
        parsedData.temperature = parseFloat(obsrValue);
        break;
      case "REH": // 습도
        parsedData.humidity = parseInt(obsrValue, 10);
        break;
      case "PTY": // 강수 형태
        parsedData.precipitation =
          parseInt(obsrValue, 10) === 1
            ? "비"
            : parseInt(obsrValue, 10) === 2
            ? "비/눈"
            : parseInt(obsrValue, 10) === 3
            ? "눈"
            : "없음";
        break;
      case "RN1": // 1시간 강수량
        parsedData.rain1h = parseFloat(obsrValue) || 0;
        break;
      case "WSD": // 풍속
        parsedData.windSpeed = parseFloat(obsrValue);
        break;
      case "VEC": // 풍향
        parsedData.windDirection = parseInt(obsrValue, 10);
        break;
      case "UUU": // 동서풍 성분
        parsedData.windUComponent = parseFloat(obsrValue);
        break;
      case "VVV": // 남북풍 성분
        parsedData.windVComponent = parseFloat(obsrValue);
        break;
      default:
        console.warn(`알 수 없는 카테고리: ${category}`);
        break;
    }
  });

  // 러닝 적합성 평가 함수 호출
  const suitableForRunning = isSuitableForRunningKMA(parsedData);

  return {
    ...parsedData,
    suitableForRunning, // 러닝 적합성 여부 포함
  };
};
