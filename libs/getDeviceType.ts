import { headers } from "next/headers";

export function getDeviceType() {
  // 서버 사이드에서 headers를 통해 user-agent를 가져옴
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";

  // 간단한 user-agent 분석
  if (/mobile/i.test(userAgent)) {
    return "Mobile";
  } else if (/tablet/i.test(userAgent)) {
    return "Tablet";
  } else {
    return "Desktop";
  }
}
