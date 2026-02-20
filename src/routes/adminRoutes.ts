import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard/dashboard",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
      {
        title: "Medicines",
        url: "/admin-dashboard/medicines",
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "Manage Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Profile",
        url: "/admin-dashboard/me",
      },
    ],
  },
];
