import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Create Category",
        url: "/admin-dashboard/create-category",
      },
      {
        title: "Manage Categories",
        url: "/admin-dashboard/manage-categories",
      },
      {
        title: "Manage Orders",
        url: "/admin-dashboard/manage-orders",
      },
      {
        title: "Manage Users",
        url: "/admin-dashboard/manage-users",
      },
      {
        title: "Profile",
        url: "/admin-dashboard/me",
      },
    ],
  },
];
