// 현재 날짜 (yyyyMMdd)와 시간 (HHmm 정시 기준) 가져오는 함수
export function getCurrentDateTime() {
  const now = new Date();

  // 날짜 (yyyyMMdd)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");

  const hours = now.getHours(); // 현재 시간 (0-23)
  const minutes = now.getMinutes(); // 현재 분 (0-59)

  const baseDate = `${year}${month}${day}`;

  // 시간 (정시 기준으로 HH00)
  // let hours = now.getHours();
  // const minutes = now.getMinutes();
  // 시간을 두 자리 형식으로 맞춤 (예: "09", "14")
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  const baseTime = `${formattedHours}${formattedMinutes}`;

  return { baseDate, baseTime };
}
