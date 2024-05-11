import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default withAuth(
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });
    const protectedRoutes = ["/contactUs"];
    const isAuthRoute = pathname.startsWith("/auth/signin");
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    if (isAuth && isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/contactUs", "/auth/:path*", "/"],
};
