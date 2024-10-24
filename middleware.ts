import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export { default, withAuth } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  const myPosition = request.cookies.get("myPosition"); // 쿠키 값 가져오기
  const currentPath = request.nextUrl.pathname; // 현재 요청 경로 가져오기

  // 쿠키가 있고 현재 경로가 /runningStatusInfo가 아닌 경우에만 리다이렉트
  if (myPosition && currentPath !== "/runningStatusInfo") {
    return NextResponse.redirect(new URL("/runningStatusInfo", request.url));
  }

  // 쿠키가 없고 현재 경로가 /가 아닌 경우에만 리다이렉트
  if (!myPosition && currentPath !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 위 조건에 해당하지 않으면 요청을 그대로 처리
  return NextResponse.next();
}

export const config = {
  matcher: ["/runningStatusInfo/:path*", "/"], // 미들웨어 적용 경로
};
