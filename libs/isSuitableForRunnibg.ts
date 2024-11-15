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

  // 현재 날짜를 기반으로 계절을 판별합니다.
  const currentMonth = new Date().getMonth() + 1; // JavaScript 월은 0부터 시작하므로 +1
  const season =
    currentMonth >= 3 && currentMonth <= 5
      ? "spring"
      : currentMonth >= 6 && currentMonth <= 8
      ? "summer"
      : currentMonth >= 9 && currentMonth <= 11
      ? "fall"
      : "winter";

  // 계절별 러닝 시간대 설정
  const timeSlots = {
    spring: {
      morning: hourly.slice(8, 11), // 8~10시
      afternoon: hourly.slice(16, 19), // 16~18시
      evening: hourly.slice(20, 24), // 20시 이후
    },
    summer: {
      morning: hourly.slice(6, 9), // 6~8시 (더위를 피해 이른 아침 추천)
      evening: hourly.slice(20, 24), // 20시 이후 (해가 진 후 시원한 저녁 시간 추천)
    },
    fall: {
      morning: hourly.slice(8, 11), // 8~10시
      afternoon: hourly.slice(16, 19), // 16~18시
      evening: hourly.slice(20, 24), // 20시 이후
    },
    winter: {
      morning: hourly.slice(10, 13), // 10~12시 (날씨가 추운 겨울엔 늦은 아침 추천)
      afternoon: hourly.slice(14, 17), // 14~16시 (온도가 올라가는 오후 시간대 추천)
    },
  };

  const timeSlotForSeason = timeSlots[season];

  const evaluateTimeSlot = (slot) => {
    const avgTemp =
      slot.reduce((acc, hour) => acc + hour.temp, 0) / slot.length;
    const avgUVI = slot.reduce((acc, hour) => acc + hour.uvi, 0) / slot.length;
    const avgWindSpeed =
      slot.reduce((acc, hour) => acc + hour.wind_speed, 0) / slot.length;
    const avgWeatherCondition = slot[0].weather[0].main; // 시간대별 첫 번째 날씨 상태 기준

    // 날씨 상태에 따른 조건 추가
    const weatherConditions = {
      Thunderstorm: "danger",
      Snow: "warning",
      Rain: "warning",
      Drizzle: "caution",
      Mist: "caution",
      Haze: "caution",
      Clear: "good",
      Clouds: "good",
    };

    // 날씨 상태에 따른 초기 등급 설정
    let rating = weatherConditions[avgWeatherCondition] || "caution";

    // 조건에 따른 등급 업데이트
    if (avgTemp >= 30 || avgUVI >= 10 || avgWindSpeed >= 15) {
      rating = "danger";
    } else if (avgTemp >= 25 || avgUVI >= 8 || avgWindSpeed >= 10) {
      rating = "warning";
    } else if (avgTemp <= 5 || avgUVI >= 6 || avgWindSpeed >= 8) {
      rating = rating === "good" ? "caution" : rating; // 좋은 날씨에서도 주의로 변경
    }

    return rating;
  };

  const recommendations = Object.entries(timeSlotForSeason).map(
    ([timeLabel, slot]) => ({
      season: season,
      time: timeLabel,
      rating: evaluateTimeSlot(slot),
    }),
  );

  // 최종 추천 시간대를 details에 추가
  details.push({
    condition: "추천 러닝 시간대",
    recommendation: recommendations,
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
