import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface iPublicOnlyUrl {
  [key: string]: boolean;
}

const publicOnlyUrls: iPublicOnlyUrl = {
  "/home": true,
  "/create-account": true,
  "/log-in": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (session.id) {
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!exists) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
