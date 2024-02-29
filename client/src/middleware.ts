import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";

export function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie");
  const cookies = parse(cookie || "");
  const userId = cookies["id"];

  if (!userId) {
    if (request.nextUrl.pathname.startsWith("/chat")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (userId) {
    if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/chat", request.url));
    }
  }

  return NextResponse.next();
}
