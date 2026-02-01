import { Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "Customer",
    items: [
      {
        title: "Overview",
        url: "/dashboard/overview",
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
      },
      {
        title: "Profile",
        url: "/dashboard/me",
      },
    ],
  },
];
