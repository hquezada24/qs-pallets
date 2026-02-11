import { NextResponse } from "next/server";

export function proxy(req) {
  const host = req.headers.get("host") || "";

  console.log("Host: ", host);

  if (host.startsWith("dashboard.")) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// MUY IMPORTANTE
export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};
