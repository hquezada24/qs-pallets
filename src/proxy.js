import { NextResponse } from "next/server";

export function proxy(req) {
  const host = req.headers.get("host") || "";
  const { pathname, protocol } = req.nextUrl;

  const isLocalhost = host.includes("localhost");
  const baseDomain = isLocalhost
    ? "localhost:3000"
    : host.split(".").slice(-2).join(".");

  const dashboardSubdomain = `dashboard.${baseDomain}`;

  console.log("Host: ", host);

  if (host === baseDomain && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(`${protocol}//${dashboardSubdomain}`);
  }

  if (host === dashboardSubdomain) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};
