// 러닝에 적합한 날씨 조건을 3단계로 평가하고, 복장 및 장비 추천
export const isSuitableForRunning = (weatherData: {
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  visibility: number; // 가시거리 (미터 단위)
  rain?: { "1h": number }; // 1시간 강수량 (mm)
  snow?: { "1h": number }; // 1시간 적설량 (mm)
}): {
  rating: string;
  details: { condition: string; rating: string; recommendation: string }[];
} => {
  const { temp, feels_like, humidity } = weatherData.main;
  const { speed: windSpeed } = weatherData.wind;
  const visibilityInKm = weatherData.visibility / 1000;
  const rainAmount = weatherData.rain?.["1h"] || 0; // 강수량이 없으면 0으로 설정
  const snowAmount = weatherData.snow?.["1h"] || 0; // 적설량이 없으면 0으로 설정

  const details = [];

  // 온도 평가 및 추천
  let tempRating: string;
  let tempRecommendation: string;
  if (temp >= 10 && temp <= 25) {
    tempRating = "good";
    tempRecommendation =
      "가벼운 반팔과 반바지 또는 레깅스, 모자, 썬크림을 착용하세요.";
  } else if ((temp >= 5 && temp < 10) || (temp > 25 && temp <= 30)) {
    tempRating = "warning";
    if (temp < 10) {
      tempRecommendation =
        "긴팔 티셔츠와 자켓, 장갑, 귀 보호용 헤드밴드를 착용하세요.";
    } else {
      tempRecommendation = "통기성이 좋은 옷, 물통, 썬크림을 준비하세요.";
    }
  } else {
    tempRating = "danger";
    if (temp < 5) {
      tempRecommendation = "보온이 좋은 옷과 장갑, 방수 자켓을 착용하세요.";
    } else {
      tempRecommendation =
        "최대한 가볍고 통기성이 좋은 옷과 물통을 준비하세요.";
    }
  }
  details.push({
    condition: `온도: ${temp}°C`,
    rating: tempRating,
    recommendation: tempRecommendation,
  });

  // 체감온도 평가 및 추천
  let feelsLikeRating: string;
  let feelsLikeRecommendation: string;
  if (feels_like >= 10 && feels_like <= 25) {
    feelsLikeRating = "good";
    feelsLikeRecommendation =
      "쾌적한 날씨입니다. 기본적인 러닝 복장으로 충분합니다.";
  } else if (
    (feels_like >= 5 && feels_like < 10) ||
    (feels_like > 25 && feels_like <= 30)
  ) {
    feelsLikeRating = "warning";
    if (feels_like < 10) {
      feelsLikeRecommendation =
        "추위를 느낄 수 있으니 가벼운 자켓을 착용하세요.";
    } else {
      feelsLikeRecommendation =
        "더위를 피하기 위해 물통과 썬크림을 준비하세요.";
    }
  } else {
    feelsLikeRating = "danger";
    if (feels_like < 5) {
      feelsLikeRecommendation =
        "추위로 인한 저체온증을 방지할 수 있도록 충분히 보온하세요.";
    } else {
      feelsLikeRecommendation =
        "더위를 피하기 위해 최대한 가벼운 복장을 착용하고 충분한 수분을 섭취하세요.";
    }
  }
  details.push({
    condition: `체감온도: ${feels_like}°C`,
    rating: feelsLikeRating,
    recommendation: feelsLikeRecommendation,
  });

  // 습도 평가 및 추천
  let humidityRating: string;
  let humidityRecommendation: string;
  if (humidity >= 30 && humidity <= 70) {
    humidityRating = "good";
    humidityRecommendation = "기본적인 수분 보충을 준비하세요.";
  } else if (
    (humidity >= 20 && humidity < 30) ||
    (humidity > 70 && humidity <= 80)
  ) {
    humidityRating = "warning";
    if (humidity < 30) {
      humidityRecommendation = "보습제를 사용하고 충분한 수분을 섭취하세요.";
    } else {
      humidityRecommendation = "땀을 잘 흡수하는 옷과 손목 밴드를 준비하세요.";
    }
  } else {
    humidityRating = "danger";
    if (humidity < 20) {
      humidityRecommendation = "수분 보충과 보습을 필수로 준비하세요.";
    } else {
      humidityRecommendation =
        "땀이 잘 마르는 옷과 충분한 수분 보충이 필요합니다.";
    }
  }
  details.push({
    condition: `습도: ${humidity}%`,
    rating: humidityRating,
    recommendation: humidityRecommendation,
  });

  // 바람 속도 평가 및 추천
  let windRating: string;
  let windRecommendation: string;
  if (windSpeed <= 5) {
    windRating = "good";
    windRecommendation = "기본적인 러닝 복장으로 충분합니다.";
  } else if (windSpeed > 5 && windSpeed <= 8) {
    windRating = "warning";
    windRecommendation = "가벼운 윈드브레이커와 선글라스를 착용하세요.";
  } else {
    windRating = "danger";
    windRecommendation =
      "바람을 막아줄 방풍 자켓과 눈 보호용 고글이 필요합니다.";
  }
  details.push({
    condition: `바람 속도: ${windSpeed} m/s`,
    rating: windRating,
    recommendation: windRecommendation,
  });

  // 가시거리 평가 및 추천
  let visibilityRating: string;
  let visibilityRecommendation: string;
  if (visibilityInKm >= 1) {
    visibilityRating = "good";
    visibilityRecommendation = "기본적인 복장으로 충분합니다.";
  } else if (visibilityInKm >= 0.5 && visibilityInKm < 1) {
    visibilityRating = "warning";
    visibilityRecommendation = "눈에 잘 띄는 밝은 옷과 반사띠를 착용하세요.";
  } else {
    visibilityRating = "danger";
    visibilityRecommendation =
      "라이트와 반사띠를 필수로 착용하고, 밝은 색상의 옷을 입으세요.";
  }
  details.push({
    condition: `가시거리: ${visibilityInKm} km`,
    rating: visibilityRating,
    recommendation: visibilityRecommendation,
  });

  // 강수량 평가 및 추천
  let rainRating: string;
  let rainRecommendation: string;
  if (rainAmount === 0) {
    rainRating = "good";
    rainRecommendation = "비가 오지 않아 쾌적한 러닝이 가능합니다.";
  } else if (rainAmount > 0 && rainAmount <= 2.5) {
    rainRating = "warning";
    rainRecommendation = "가벼운 비가 오고 있습니다. 방수 자켓을 착용하세요.";
  } else {
    rainRating = "danger";
    rainRecommendation =
      "강한 비가 오고 있습니다. 안전을 위해 러닝을 피하세요.";
  }
  details.push({
    condition: `강수량: ${rainAmount} mm`,
    rating: rainRating,
    recommendation: rainRecommendation,
  });

  // 최종 평가 (모든 조건 중 하나라도 'danger'이면 danger, 아니면 warning, 모두 good이면 good)
  const hasDanger = details.some((detail) => detail.rating === "danger");
  const hasWarning = details.some((detail) => detail.rating === "warning");

  let overallRating: string;
  if (hasDanger) {
    overallRating = "danger";
  } else if (hasWarning) {
    overallRating = "warning";
  } else {
    overallRating = "good";
  }

  return { rating: overallRating, details };
};
