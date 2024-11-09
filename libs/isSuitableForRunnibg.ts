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
  const { current, hourly } = weatherData;
  const { temp, feels_like, humidity, wind_speed, visibility, uvi, weather } =
    current;

  const details = [];

  // Weather Condition Evaluation
  const weatherCondition = weather[0].main;

  const weatherConditions = {
    Clear: {
      message: "맑고 화창한 날씨입니다.",
      rating: "good",
      items: "썬크림, 모자, 스포츠 선글라스",
      shoes: "",
    },
    Clouds: {
      message: "구름이 많습니다. 주의하며 운동하세요.",
      rating: "caution",
      items: "가벼운 바람막이 자켓, 반사 소재 액세서리 (시야 확보)",
      shoes: "",
    },
    Rain: {
      message: "비가 내립니다. 방수 장비(GORE-TEX)가 필요합니다.",
      rating: "warning",
      items: "방수 자켓, 방수 러닝화 (GORE-TEX 소재), 방수 캡 또는 모자",
      shoes: "방수 러닝화 (GORE-TEX 소재)",
    },
    Drizzle: {
      message: "이슬비가 내립니다. 가볍게 조심하세요.",
      rating: "caution",
      items: "얇은 방수 자켓, 캡 또는 모자",
      shoes: "",
    },
    Thunderstorm: {
      message: "천둥번개가 있습니다. 실내에서 운동하세요.",
      rating: "danger",
      items: "실내 운동복, 수건, 물병",
      shoes: "",
    },
    Snow: {
      message: "눈이 내립니다. 미끄럼 주의하세요.",
      rating: "warning",
      items: "방한 자켓, 장갑, 모자",
      shoes: "겨울용 방수 러닝화",
    },
    Mist: {
      message: "안개가 짙어 시야가 나쁩니다.",
      rating: "caution",
      items: "반사 소재 액세서리, 밝은 색상의 옷, 모자",
      shoes: "",
    },
    Haze: {
      message: "옅은 안개가 낀 날씨입니다.",
      rating: "caution",
      items: "반사 소재 액세서리, 모자",
      shoes: "",
    },
    Dust: {
      message: "먼지나 황사가 심합니다. 마스크를 착용하세요.",
      rating: "danger",
      items: "황사 마스크, 모자, 운동 후 클렌징 용품",
      shoes: "",
    },
  };

  const weatherEval = weatherConditions[weatherCondition];

  details.push({
    condition: `날씨 상태: ${weatherCondition}`,
    rating: weatherEval.rating,
    recommendation: {
      message: weatherEval.message,
      items: weatherEval.items,
      shoes: weatherEval.shoes,
    },
  });

  // Temperature Evaluation
  const tempRecommendation =
    temp <= 5
      ? {
          message:
            "추운 날씨입니다.\n" +
            "근육이 수축하고, 체온 유지에 더 많은 에너지를 소비하게 됩니다.\n" +
            "추운 날씨에 적응되지 않은 러너는 자제하는 것이 좋습니다.",
          items: "여러 겹의 옷, 손과 귀를 보호할 수 있는 장갑과 모자",
          shoes: "방한 기능이 있는 러닝화 또는 겨울용 트레일 러닝화",
          // tips: "옷을 여러 겹 입고 손과 귀를 보호하세요. 추운 날씨에 적응되지 않은 러너는 자제하는 것이 좋습니다.",
        }
      : temp <= 10
      ? {
          message:
            "시원한 날씨입니다.\n" + "페이스를 일정하게 유지하기 좋습니다.",
          // "페이스를 일정하게 유지하기 좋습니다.",
          items: "장갑, 얇은 모자, 얇은 윈드브레이커 또는 긴팔 옷",
          shoes: "통기성과 쿠셔닝이 좋은 일반 러닝화",
          // tips: "장갑과 얇은 모자를 착용하고 얇은 윈드브레이커나 긴팔을 입는 것이 좋습니다.",
        }
      : temp <= 15
      ? {
          message:
            "체온 조절에 이상적이며 장시간 달리기에 적합합니다.\n" +
            "페이스 조절에 좋은 날씨로 추천됩니다.",
          items: "얇은 긴팔 또는 반팔, 얇은 재킷",
          shoes: "쿠셔닝이 좋은 일반 러닝화",
          // tips: "체온 조절에 이상적이며 장시간 달리기에 적합합니다. 페이스 조절에 좋은 날씨로 추천됩니다.",
        }
      : temp <= 20
      ? {
          message:
            "가장 이상적인 러닝 날씨입니다.\n" +
            "반팔, 반바지 착용이 적합하며, 물을 자주 마시며 수분을 충분히 섭취하는 것이 좋습니다.",
          items: "반팔, 반바지",
          shoes: "가벼운 메쉬 소재 러닝화",
          // tips: "반팔, 반바지 착용이 적합하며, 물을 자주 마시며 수분을 충분히 섭취하는 것이 좋습니다.",
        }
      : temp <= 25
      ? {
          message:
            "약간 더운 날씨입니다.\n" +
            "체온이 쉽게 올라가므로 적응이 필요합니다.\n" +
            "물을 자주 섭취하고 체온 조절을 위해 페이스 조절이 필요할 수 있습니다.",
          items: "얇은 반팔, 반바지, 모자, 물병",
          shoes: "통풍이 잘 되는 메쉬 러닝화",
          // tips: "물을 자주 섭취하고 체온 조절을 위해 페이스 조절이 필요할 수 있습니다.",
        }
      : {
          message:
            "러닝을 피하거나 이른 아침이나 늦은 저녁에 하세요.\n" +
            "항상 물병을 소지하고 중간에 수분을 보충하세요.",
          items: "얇은 운동복, 물병, 쿨링 스프레이",
          shoes: "통기성이 좋은 러닝화",
          // tips: "러닝을 피하거나 이른 아침이나 늦은 저녁에 하세요. 항상 물병을 소지하고 중간에 수분을 보충하세요.",
        };

  const tempRating =
    temp <= 5
      ? "warning"
      : temp <= 10
      ? "good"
      : temp <= 15
      ? "good"
      : temp <= 20
      ? "good"
      : temp <= 25
      ? "caution"
      : "danger";

  details.push({
    condition: `기온: ${temp.toFixed(1)}°C`,
    rating: tempRating,
    recommendation: tempRecommendation,
  });

  // Humidity Evaluation
  const humidityRecommendation = {
    message:
      humidity < 30
        ? "건조한 날씨입니다. 수분을 섭취하세요."
        : humidity <= 60
        ? "적절한 습도입니다. 운동하기 좋습니다."
        : humidity <= 80
        ? "습도가 높습니다. 무리하지 마세요."
        : "매우 높은 습도로 위험할 수 있습니다.",
    items: humidity < 30 || humidity > 60 ? "물병" : "", // 예시로 습도가 낮거나 높을 때 물병을 추천
    shoes: "",
  };

  const humidityRating =
    humidity < 30
      ? "warning"
      : humidity <= 60
      ? "good"
      : humidity <= 80
      ? "caution"
      : "danger";

  details.push({
    condition: `습도: ${humidity}%`,
    rating: humidityRating,
    recommendation: humidityRecommendation,
  });

  // Wind Speed Evaluation
  const windRecommendation = {
    message:
      wind_speed < 2
        ? "바람이 거의 없습니다. 쾌적합니다."
        : wind_speed < 8
        ? "바람이 다소 불고 있습니다. 조심하세요."
        : wind_speed < 14
        ? "강한 바람입니다. 바람에 유의하세요."
        : "매우 강한 바람입니다. 외출을 피하세요.",
    items: wind_speed >= 8 ? "바람막이 자켓" : "", // 예시로 바람이 강할 때 바람막이 추천
    shoes: "",
  };

  const windRating =
    wind_speed < 2
      ? "good"
      : wind_speed < 8
      ? "caution"
      : wind_speed < 14
      ? "warning"
      : "danger";

  details.push({
    condition: `풍속: ${wind_speed.toFixed(1)} m/s`,
    rating: windRating,
    recommendation: windRecommendation,
  });

  // Visibility Evaluation
  const visibilityInKm = (visibility / 1000).toFixed(1);
  const visibilityRecommendation = {
    message:
      visibilityInKm >= 1
        ? "시야가 좋습니다. 안전하게 운동하세요."
        : visibilityInKm >= 0.5
        ? "시야가 다소 제한적입니다. 주의하세요."
        : "시야가 매우 나쁩니다. 조심하세요.",
    items: visibilityInKm < 1 ? "반사 소재 액세서리" : "", // 예시로 시야가 나쁠 때 반사 액세서리 추천
    shoes: "",
  };

  const visibilityRating =
    visibilityInKm < 0.5 ? "danger" : visibilityInKm >= 1 ? "good" : "caution";

  details.push({
    condition: `가시 거리: ${visibilityInKm} km`,
    rating: visibilityRating,
    recommendation: visibilityRecommendation,
  });

  // UV Index Evaluation
  const uvRecommendation = {
    message:
      uvi < 3
        ? "자외선 지수가 낮아 안전합니다."
        : uvi < 6
        ? "자외선 지수가 중간입니다. 선크림을 바르세요."
        : uvi < 8
        ? "자외선이 강합니다. 보호 장비를 착용하세요."
        : uvi < 11
        ? "자외선이 매우 강합니다. 외출을 피하세요."
        : "위험한 수준의 자외선입니다. 실내 운동을 추천합니다.",
    items: uvi >= 6 ? "선크림, 모자, 스포츠 선글라스" : "", // 자외선 지수에 따른 보호 장비 추천
    shoes: "",
  };

  const uvRating =
    uvi < 3 ? "good" : uvi < 6 ? "caution" : uvi < 8 ? "warning" : "danger";

  details.push({
    condition: `자외선 지수: ${uvi}`,
    rating: uvRating,
    recommendation: uvRecommendation,
  });

  // Running Time Recommendation Logic
  const recommendRunningTime = () => {
    const morning = hourly.slice(8, 11); // 8~10시
    const afternoon = hourly.slice(16, 19); // 16~18시
    const evening = hourly.slice(20, 24); // 20시 이후

    const evaluateTimeSlot = (slot) => {
      const avgTemp =
        slot.reduce((acc, hour) => acc + hour.temp, 0) / slot.length;
      const avgUVI =
        slot.reduce((acc, hour) => acc + hour.uvi, 0) / slot.length;
      const avgWindSpeed =
        slot.reduce((acc, hour) => acc + hour.wind_speed, 0) / slot.length;

      // 조건에 따른 적합성 평가
      if (avgTemp >= 25 || avgUVI >= 8 || avgWindSpeed >= 14) return "avoid"; // 너무 덥거나 자외선 강한 시간 회피
      if (avgTemp <= 5 || avgWindSpeed >= 10) return "caution"; // 추운 시간대나 바람이 강한 시간대 주의
      return "good";
    };

    // 시간대별 추천
    const morningRating = evaluateTimeSlot(morning);
    const afternoonRating = evaluateTimeSlot(afternoon);
    const eveningRating = evaluateTimeSlot(evening);

    return [
      { time: "오전 8~10시", rating: morningRating },
      { time: "오후 16~18시", rating: afternoonRating },
      { time: "저녁 20시 이후", rating: eveningRating },
    ];
  };

  // 최종 추천 시간대를 details에 추가
  details.push({
    condition: "추천 러닝 시간대",
    recommendation: recommendRunningTime(),
  });

  // Overall Rating Logic
  const hasDanger = details.some((detail) => detail.rating === "danger");
  const hasWarning = details.some((detail) => detail.rating === "warning");
  const hasCaution = details.some((detail) => detail.rating === "caution");

  const overallRating = hasDanger
    ? "danger"
    : hasWarning
    ? "warning"
    : hasCaution
    ? "caution"
    : "good";

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
