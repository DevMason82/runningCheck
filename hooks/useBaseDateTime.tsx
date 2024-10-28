import { useState, useEffect } from "react";

// base_date와 base_time 계산 함수
function getBaseDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}${month}${day}`; // YYYYMMDD 형식 반환
}

// function getBaseTime(): string {
//   const now = new Date();
//   let hours = now.getHours();
//
//   // 현재 시각에서 분 단위가 30분 이전이라면 한 시간 전 정시 사용
//   if (now.getMinutes() < 30) {
//     hours -= 1;
//   }
//
//   // 자정(00:00) 처리: 한 시간 전은 23시 (이전 날)
//   if (hours < 0) {
//     hours = 23;
//   }
//
//   // 시각을 두 자리로 맞춰 반환 (예: "08", "14")
//   return String(hours).padStart(2, "0") + "00"; // 항상 정시로 반환
// }
// function getBaseTime(): string {
//   const now = new Date();
//   const hours = now.getHours();
//
//   // 시각을 두 자리로 맞춰 반환 (예: "08", "14")
//   return String(hours).padStart(2, "0") + "00"; // 항상 정시 반환
// }

function getBaseTime(): string {
  const now = new Date();
  const hours = now.getHours(); // 현재 시간 (0-23)
  const minutes = now.getMinutes(); // 현재 분 (0-59)

  // 시간을 두 자리 형식으로 맞춤 (예: "09", "14")
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // 4자리 시간 형식 반환 (예: "0930", "1445")
  return `${formattedHours}${formattedMinutes}`;
}

// React 커스텀 훅 정의
export function useBaseDateTime() {
  const [baseDateTime, setBaseDateTime] = useState({
    baseDate: getBaseDate(),
    baseTime: getBaseTime(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBaseDateTime({
        baseDate: getBaseDate(),
        baseTime: getBaseTime(),
      });
    }, 1800 * 1000); // 30분마다 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, []);

  return baseDateTime;
}
