import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("connect.sid");
  const { pathname } = req.nextUrl;

  if ((pathname === "/login" || pathname === "/register") && sessionCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/property/new" && !sessionCookie) {
    return NextResponse.redirect(new URL(`/login?redirect=/property/new`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/register", "/login", "/property/new"],
};
