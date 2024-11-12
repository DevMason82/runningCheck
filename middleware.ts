import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export { default, withAuth } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token"); // 토큰 가져오기
  const currentPath = request.nextUrl.pathname; // 현재 요청 경로 가져오기

  if (token === undefined) {
    // console.log("sdfsdfsdfsd");
    // 토큰이 없으면 `/signing` 경로로 리다이렉트
    return NextResponse.rewrite(new URL("/signin", request.url));
  }

  if (currentPath === "/signin") {
    // 토큰이 있지만 현재 경로가 `/signin`일 경우, 홈으로 리다이렉트
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 위 조건에 해당하지 않으면 요청을 그대로 처리
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/runningStatusInfo/:path*", "/signin"], // 미들웨어 적용 경로
};
