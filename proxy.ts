import { NextRequest, NextResponse } from "next/server";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

const Role_Dashboard: Record<string, string> = {
  [Roles.admin]: "/admin-dashboard",
  [Roles.seller]: "/seller-dashboard",
  [Roles.customer]: "/dashboard",
};

const privateRoutes = ["/dashboard", "/admin-dashboard", "/seller-dashboard"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackURL", pathname);
    return NextResponse.redirect(url);
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
    "/dashboard/:path*",
    "/seller-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};
