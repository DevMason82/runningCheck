import {
  isSuitableForRunning,
  isSuitableForRunningKMA,
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

export const parseWeatherKMAData = (weatherData: any) => {
  const parsedData = {
    temperature: null,
    humidity: null,
    precipitation: null,
    windSpeed: null,
    windDirection: null,
    windUComponent: null,
    windVComponent: null,
    rain1h: null,
    weatherCondition: null,
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
      case "PTY": // 강수 형태 (0: 없음, 1: 비, 2: 비/눈, 3: 눈)
        parsedData.weatherCondition = parseInt(obsrValue, 10);
        break;
      case "RN1": // 1시간 강수량
        parsedData.rain1h = parseFloat(obsrValue);
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
        console.warn(`Unknown category: ${category}`);
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

const mapSkyCondition = (skyCode) => {
  switch (skyCode) {
    case 1:
      return "맑음";
    case 3:
      return "구름 많음";
    case 4:
      return "흐림";
    default:
      return "정보 없음";
  }
};
