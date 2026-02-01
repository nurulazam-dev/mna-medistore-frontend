import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

const Role_Dashboard: Record<string, string> = {
  [Roles.admin]: "/admin-dashboard",
  [Roles.seller]: "/seller-dashboard",
  [Roles.customer]: "/dashboard",
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = user.role as string;
  const allowedDashboard = Role_Dashboard[userRole];

  const isAccessAdmin = pathname.startsWith("/admin-dashboard");
  const isAccessSeller = pathname.startsWith("/seller-dashboard");
  const isAccessCustomer = pathname.startsWith("/dashboard");

  const isUnauthorized =
    (isAccessAdmin && userRole !== Roles.admin) ||
    (isAccessSeller && userRole !== Roles.seller) ||
    (isAccessCustomer && userRole !== Roles.customer);

  if (
    isUnauthorized ||
    pathname === "/dashboard" ||
    pathname === "/admin-dashboard" ||
    pathname === "/seller-dashboard"
  ) {
    if (pathname !== allowedDashboard) {
      return NextResponse.redirect(new URL(allowedDashboard, request.url));
    }
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
