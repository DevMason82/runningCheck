export const isSuitableForRunning = (weatherData: {
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  visibility: number;
  rain?: { "1h": number };
  snow?: { "1h": number };
}): {
  rating: string;
  details: { condition: string; rating: string; recommendation: string }[];
} => {
  const { temp, feels_like, humidity } = weatherData.main;
  const { speed: windSpeed } = weatherData.wind;
  const visibilityInKm = weatherData.visibility / 1000;
  const rainAmount = weatherData.rain?.["1h"] || 0;
  const snowAmount = weatherData.snow?.["1h"] || 0;

  const details = [];

  // 온도 평가 및 조언
  const tempRecommendation =
    temp < 0
      ? "체온을 유지하기 위해 레이어링이 중요합니다. 러닝 후 따뜻한 옷으로 갈아입어 체온이 떨어지지 않도록 하세요."
      : temp >= 0 && temp < 10
      ? "서늘한 날씨입니다. 워밍업을 충분히 하고 장갑이나 헤드밴드를 착용하면 좋습니다."
      : temp >= 10 && temp <= 20
      ? "쾌적한 날씨입니다. 부상을 예방하기 위해 러닝 전에 충분한 스트레칭을 해보세요."
      : temp > 20 && temp <= 30
      ? "더운 날씨이므로 물을 자주 마시고, 러닝 전후로 전해질 보충 음료를 섭취하세요."
      : "30°C 이상에서는 야외 러닝을 피하세요. 실내 러닝이나 아침·저녁 시간대를 추천합니다.";

  details.push({
    condition: `온도: ${temp}°C`,
    rating:
      temp < 0 || temp > 30
        ? "danger"
        : temp >= 10 && temp <= 20
        ? "good"
        : "warning",
    recommendation: tempRecommendation,
  });

  // 체감온도 평가 및 조언
  const feelsLikeRecommendation =
    feels_like < 0
      ? "체온 손실을 막기 위해 방풍 자켓과 따뜻한 모자를 착용하세요."
      : feels_like >= 0 && feels_like < 10
      ? "서늘한 체감온도입니다. 빠르게 체온이 떨어질 수 있으니 운동 전후 옷을 바꾸는 것이 좋습니다."
      : feels_like >= 10 && feels_like <= 25
      ? "쾌적한 체감온도입니다. 기분 좋은 러닝이 기대됩니다!"
      : "더운 날씨에는 땀이 많이 나므로 수분 섭취를 신경 쓰고, 러닝 코스를 짧게 잡으세요.";

  details.push({
    condition: `체감온도: ${feels_like}°C`,
    rating:
      feels_like < 0 || feels_like > 30
        ? "danger"
        : feels_like >= 10 && feels_like <= 25
        ? "good"
        : "warning",
    recommendation: feelsLikeRecommendation,
  });

  // 습도 평가 및 조언
  const humidityRecommendation =
    humidity < 30
      ? "건조한 날씨로 피부와 호흡이 불편할 수 있습니다. 입술 보호제와 물을 챙기세요."
      : humidity <= 70
      ? "습도가 적당합니다. 최상의 러닝 조건입니다!"
      : "높은 습도로 체온 조절이 어려울 수 있습니다. 러닝을 짧게 하고, 충분한 수분을 섭취하세요.";

  details.push({
    condition: `습도: ${humidity}%`,
    rating:
      humidity < 20 || humidity > 80
        ? "danger"
        : humidity <= 70
        ? "good"
        : "warning",
    recommendation: humidityRecommendation,
  });

  // 바람 속도 평가 및 조언
  const windRecommendation =
    windSpeed < 5
      ? "바람이 약해 쾌적한 러닝이 기대됩니다."
      : windSpeed <= 8
      ? "바람이 다소 있으니 바람막이 자켓을 입고, 바람을 피하는 코스를 선택하세요."
      : "강한 바람은 균형을 잃게 할 수 있습니다. 안전을 위해 러닝을 피하거나 코스를 조정하세요.";

  details.push({
    condition: `바람 속도: ${windSpeed} m/s`,
    rating: windSpeed > 8 ? "danger" : windSpeed <= 5 ? "good" : "warning",
    recommendation: windRecommendation,
  });

  // 가시거리 평가 및 조언
  const visibilityRecommendation =
    visibilityInKm >= 1
      ? "시야가 좋아 러닝하기에 좋습니다."
      : visibilityInKm >= 0.5
      ? "시야가 제한적입니다. 밝은 색 옷과 반사띠를 착용하세요."
      : "시야가 매우 나쁘니 러닝을 피하고, 반드시 해야 한다면 라이트를 사용하세요.";

  details.push({
    condition: `가시거리: ${visibilityInKm} km`,
    rating:
      visibilityInKm < 0.5
        ? "danger"
        : visibilityInKm >= 1
        ? "good"
        : "warning",
    recommendation: visibilityRecommendation,
  });

  // 강수량 및 적설량 평가 및 조언
  const rainRecommendation =
    rainAmount === 0
      ? "비가 오지 않아 쾌적한 러닝이 가능합니다."
      : rainAmount <= 2.5
      ? "가벼운 비가 내립니다. 방수 자켓을 준비하세요."
      : "비가 많이 오고 있어 미끄럼 사고에 주의하세요.";

  details.push({
    condition: `강수량: ${rainAmount} mm`,
    rating: rainAmount > 2.5 ? "danger" : rainAmount === 0 ? "good" : "warning",
    recommendation: rainRecommendation,
  });

  const snowRecommendation =
    snowAmount === 0
      ? "눈이 내리지 않습니다."
      : snowAmount <= 2.5
      ? "가벼운 눈이 내립니다. 미끄럼에 주의하세요."
      : "눈이 많이 쌓여 있으니 러닝을 피하세요.";

  details.push({
    condition: `적설량: ${snowAmount} mm`,
    rating: snowAmount > 2.5 ? "danger" : snowAmount === 0 ? "good" : "warning",
    recommendation: snowRecommendation,
  });

  // 최종 평가
  const hasDanger = details.some((detail) => detail.rating === "danger");
  const hasWarning = details.some((detail) => detail.rating === "warning");

  const overallRating = hasDanger ? "danger" : hasWarning ? "warning" : "good";

  return { rating: overallRating, details };
};

export const isSuitableForRunningNew = (weatherData) => {
  const { current } = weatherData;

  const {
    temp,
    feels_like,
    humidity,
    wind_speed,
    wind_gust,
    visibility,
    uvi,
    weather,
  } = current;

  const details = [];

  // 7. Weather Condition Evaluation
  const weatherCondition = weather[0].main;
  const weatherRecommendation =
    weatherCondition === "Rain"
      ? "비가 내리고 있습니다. 방수 장비를 착용하세요."
      : weatherCondition === "Snow"
      ? "눈이 내립니다. 미끄럼 주의하세요."
      : "맑은 날씨입니다. 러닝하기에 좋습니다.";

  const weatherRating = weatherCondition === "Clear" ? "good" : "warning";

  details.push({
    condition: `날씨 상태: ${weatherCondition}`,
    rating: weatherRating,
    recommendation: weatherRecommendation,
  });

  // 1. Temperature Evaluation
  const tempRecommendation =
    temp < 0
      ? "추운 날씨입니다. 보온에 신경 쓰고 장갑과 모자를 착용하세요."
      : temp < 10
      ? "서늘한 날씨입니다. 워밍업과 보온에 유의하세요."
      : temp <= 25
      ? "쾌적한 날씨입니다. 즐겁게 러닝하세요!"
      : "더운 날씨입니다. 수분을 충분히 섭취하세요.";

  const tempRating = temp < 0 || temp > 30 ? "danger" : "good";

  details.push({
    condition: `기온: ${temp.toFixed(1)}°C`,
    rating: tempRating,
    recommendation: tempRecommendation,
  });

  // 2. Feels Like Temperature Evaluation
  const feelsLikeRecommendation =
    feels_like < 0
      ? "체감 온도가 낮습니다. 보온에 신경 쓰세요."
      : feels_like <= 25
      ? "체감 온도가 적절합니다. 운동하기 좋습니다."
      : "더운 날씨가 느껴집니다. 수분 보충에 유의하세요.";

  details.push({
    condition: `체감 온도: ${feels_like.toFixed(1)}°C`,
    rating: feels_like > 30 ? "warning" : "good",
    recommendation: feelsLikeRecommendation,
  });

  // 3. Humidity Evaluation
  const humidityRecommendation =
    humidity < 30
      ? "건조한 날씨입니다. 수분을 충분히 섭취하세요."
      : humidity <= 70
      ? "습도가 적절합니다. 러닝에 최적입니다."
      : "높은 습도로 인해 체온 조절이 어려울 수 있습니다.";

  const humidityRating = humidity > 80 ? "warning" : "good";

  details.push({
    condition: `습도: ${humidity}%`,
    rating: humidityRating,
    recommendation: humidityRecommendation,
  });

  // 4. Wind Speed and Gust Evaluation
  const windRecommendation =
    wind_speed < 5
      ? "바람이 거의 없습니다. 쾌적한 러닝을 즐기세요."
      : wind_speed <= 8
      ? "바람이 다소 불고 있습니다. 바람막이 자켓을 착용하세요."
      : "강한 바람입니다. 러닝 코스를 조정하거나 실내 운동을 고려하세요.";

  const windRating = wind_speed > 8 ? "danger" : "good";

  details.push({
    condition: `풍속: ${wind_speed.toFixed(1)} m/s`,
    rating: windRating,
    recommendation: windRecommendation,
  });

  // 5. Visibility Evaluation
  const visibilityInKm = (visibility / 1000).toFixed(1);
  const visibilityRecommendation =
    visibilityInKm >= 1
      ? "시야가 좋아 안전한 러닝이 가능합니다."
      : visibilityInKm >= 0.5
      ? "시야가 다소 제한적입니다. 밝은 옷을 착용하세요."
      : "시야가 매우 나쁩니다. 안전에 주의하세요.";

  const visibilityRating = visibilityInKm < 0.5 ? "danger" : "good";

  details.push({
    condition: `가시 거리: ${visibilityInKm} km`,
    rating: visibilityRating,
    recommendation: visibilityRecommendation,
  });

  // 6. UV Index Evaluation
  const uvRecommendation =
    uvi < 3
      ? "자외선 지수가 낮아 안전하게 운동할 수 있습니다."
      : uvi <= 6
      ? "자외선 지수가 높습니다. 선크림을 바르세요."
      : "자외선 지수가 매우 높습니다. 모자와 선글라스를 착용하세요.";

  const uvRating = uvi > 6 ? "warning" : "good";

  details.push({
    condition: `자외선 지수: ${uvi}`,
    rating: uvRating,
    recommendation: uvRecommendation,
  });

  // Overall Rating
  const hasDanger = details.some((detail) => detail.rating === "danger");
  const hasWarning = details.some((detail) => detail.rating === "warning");

  const overallRating = hasDanger ? "danger" : hasWarning ? "warning" : "good";

  return { rating: overallRating, details };
};

// export const isSuitableForRunningKMA = (weatherData) => {
//   const {
//     temperature,
//     humidity,
//     windSpeed,
//     precipitation,
//     rain1h,
//     windDirection,
//   } = weatherData;
//
//   const details = [];
//
//   // 1. 기온 평가 및 조언
//   const tempRecommendation =
//     temperature < 0
//       ? "추운 날씨입니다. 따뜻한 옷과 장갑을 준비하세요."
//       : temperature >= 0 && temperature < 10
//       ? "서늘한 날씨입니다. 보온을 유지하며 워밍업을 충분히 하세요."
//       : temperature >= 10 && temperature <= 25
//       ? "쾌적한 날씨입니다. 러닝하기 좋은 날입니다!"
//       : "더운 날씨입니다. 충분한 수분 섭취를 잊지 마세요.";
//
//   details.push({
//     condition: `기온: ${temperature}°C`,
//     rating:
//       temperature < 0 || temperature > 30
//         ? "danger"
//         : temperature <= 25
//         ? "good"
//         : "warning",
//     recommendation: tempRecommendation,
//   });
//
//   // 2. 습도 평가 및 조언
//   const humidityRecommendation =
//     humidity < 30
//       ? "건조한 날씨입니다. 수분 섭취에 신경 쓰세요."
//       : humidity <= 70
//       ? "적절한 습도입니다. 러닝하기 좋은 날입니다."
//       : "습도가 높아 체온 조절이 어려울 수 있습니다. 수분을 충분히 섭취하세요.";
//
//   details.push({
//     condition: `습도: ${humidity}%`,
//     rating:
//       humidity < 30 || humidity > 80
//         ? "danger"
//         : humidity <= 70
//         ? "good"
//         : "warning",
//     recommendation: humidityRecommendation,
//   });
//
//   // 3. 풍속 및 풍향 평가
//   const windRecommendation =
//     windSpeed < 5
//       ? "바람이 약해 쾌적합니다."
//       : windSpeed <= 8
//       ? "바람이 다소 불고 있습니다. 바람막이를 준비하세요."
//       : "강한 바람이 불고 있습니다. 안전을 위해 조심하세요.";
//
//   details.push({
//     condition: `풍속: ${windSpeed} m/s, 풍향: ${windDirection}°`,
//     rating: windSpeed > 8 ? "danger" : windSpeed <= 5 ? "good" : "warning",
//     recommendation: windRecommendation,
//   });
//
//   // 4. 강수량 평가 및 조언
//   const rainRecommendation =
//     precipitation === "비"
//       ? rain1h === 0
//         ? "비가 오지 않아 러닝하기 좋습니다."
//         : rain1h <= 2.5
//         ? "가벼운 비가 내리고 있습니다. 방수 자켓을 준비하세요."
//         : "비가 많이 내립니다. 러닝을 피하는 것이 좋습니다."
//       : precipitation === "비/눈" || precipitation === "눈"
//       ? "눈이 내리고 있습니다. 미끄럼에 주의하세요."
//       : "비나 눈이 오지 않습니다. 러닝하기 좋은 날씨입니다.";
//
//   details.push({
//     condition: `강수량: ${rain1h} mm`,
//     rating: rain1h > 2.5 ? "danger" : rain1h === 0 ? "good" : "warning",
//     recommendation: rainRecommendation,
//   });
//
//   // 최종 평가
//   const hasDanger = details.some((detail) => detail.rating === "danger");
//   const hasWarning = details.some((detail) => detail.rating === "warning");
//
//   const overallRating = hasDanger ? "danger" : hasWarning ? "warning" : "good";
//
//   return { rating: overallRating, details };
// };
