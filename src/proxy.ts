import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = user.role;

  if (role === Roles.admin && !pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (role === Roles.seller && !pathname.startsWith("/seller-dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  if (role === Roles.customer && !pathname.startsWith("/customer-dashboard")) {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  if (pathname.startsWith("/admin-dashboard") && role !== Roles.admin) {
    return NextResponse.redirect(new URL(`/${role}-dashboard`, request.url));
  }

  if (pathname.startsWith("/seller-dashboard") && role !== Roles.seller) {
    return NextResponse.redirect(new URL(`/${role}-dashboard`, request.url));
  }

  if (pathname.startsWith("/dashboard") && role !== Roles.customer) {
    return NextResponse.redirect(new URL(`/${role}-dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
