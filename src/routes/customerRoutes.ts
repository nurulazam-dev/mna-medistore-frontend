import { Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "Customer Management",
    items: [
      {
        title: "My Orders",
        url: "/dashboard/my-orders",
      },
      {
        title: "Profile",
        url: "/dashboard/me",
      },
    ],
  },
];
