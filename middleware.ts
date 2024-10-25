import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export { default, withAuth } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token"); // 토큰 가져오기
  const myPosition = request.cookies.get("myPosition"); // 쿠키 값 가져오기
  const currentPath = request.nextUrl.pathname; // 현재 요청 경로 가져오기
  const searchParams = request.nextUrl.searchParams;
  const targetCity = searchParams.get("city"); // ?city= 값 확인
  console.log("TARGETCITY", targetCity);

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token && !targetCity && currentPath === "/signin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 쿠키가 있고 현재 경로가 /runningStatusInfo가 아닌 경우에만 리다이렉트
  if (targetCity && currentPath !== "/runningStatusInfo") {
    return NextResponse.redirect(new URL("/runningStatusInfo", request.url));
  }

  // 쿠키가 없고 현재 경로가 /가 아닌 경우에만 리다이렉트
  if (!targetCity && currentPath !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 위 조건에 해당하지 않으면 요청을 그대로 처리
  return NextResponse.next();
}

export const config = {
  matcher: ["/runningStatusInfo/:path*", "/"], // 미들웨어 적용 경로
};
