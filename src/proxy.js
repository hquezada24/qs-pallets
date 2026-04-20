import { NextResponse } from "next/server";

export function proxy(req) {
  // const host = req.headers.get("host") || "";
  // const { pathname, protocol } = req.nextUrl;

  // const isLocalhost = host.includes("localhost");
  // const baseDomain = isLocalhost
  //   ? "localhost:3000"
  //   : host.split(".").slice(-2).join(".");

  // const dashboardSubdomain = `dashboard.${baseDomain}`;

  // console.log("Host: ", host);

  // if (host === baseDomain && pathname.startsWith("/login")) {
  //   return NextResponse.redirect(`${protocol}//${dashboardSubdomain}/login`);
  // }

  // const isDashboardSubdomain = host?.startsWith("dashboard.");
  // const isDashboardPath = pathname.startsWith("/dashboard");

  // if (isDashboardSubdomain && isDashboardPath) {
  //   // OPCIÓN A: redirigir a "/"
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/";

  //   return NextResponse.rewrite(new URL("/not-found", req.url));
  // }

  // if (host === baseDomain && pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(`${protocol}//${dashboardSubdomain}`);
  // }

  // if (host === dashboardSubdomain) {
  //   return NextResponse.rewrite(
  //     new URL(pathname === "/" ? "/dashboard" : pathname, req.url),
  //   );
  // }

  return NextResponse.next();
}

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
  matcher: "/((?!_next|favicon.ico).*)",
};
