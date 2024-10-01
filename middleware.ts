export { default, withAuth } from "next-auth/middleware";


export const config = {
  matcher: ["/carts/:path*"],
};
