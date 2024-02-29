import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";


export function middleware(request: NextRequest) {

  const cookie = request.headers.get("cookie");
  const cookies = parse(cookie || "");
  const userId = cookies["id"];


  if (!userId) {
    if (request.nextUrl.pathname.startsWith("/story")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
