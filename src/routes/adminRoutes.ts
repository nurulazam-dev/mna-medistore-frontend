import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard/dashboard",
      },
      {
        title: "Create Category",
        url: "/admin-dashboard/create-category",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
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
