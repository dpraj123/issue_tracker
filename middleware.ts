import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { auth } from "./app/api/auth/[...nextauth]/route";

export async function middleware(request: NextRequest) {
  const token = cookies()?.get("authjs.session-token")?.value;
  // await auth().then((c) => console.log(c?.user));
  if (token === undefined) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }
}
export const config = {
  matcher: "/issues/:path*",
};
