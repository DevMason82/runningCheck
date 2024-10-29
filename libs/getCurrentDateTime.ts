// 현재 날짜 (yyyyMMdd)와 시간 (HHmm 정시 기준) 가져오는 함수
export function getCurrentDateTime() {
  const now = new Date();

  // 날짜 (yyyyMMdd)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");

  const baseDate = `${year}${month}${day}`;

  // 시간 (정시 기준으로 HH00)
  let hours = now.getHours();
  const minutes = now.getMinutes();

  // 정각보다 30분 이전일 경우 한 시간 전으로 조정
  if (minutes < 30) {
    hours -= 1;
  }

  // 자정 처리 (23시로 설정)
  if (hours < 0) {
    hours = 23;
  }

  const baseTime = `${String(hours).padStart(2, "0")}00`;

  return { baseDate, baseTime };
}
