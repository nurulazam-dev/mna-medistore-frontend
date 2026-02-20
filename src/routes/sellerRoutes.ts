import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Dashboard",
    items: [
      {
        title: "Overview",
        url: "/seller-dashboard/dashboard",
      },
      {
        title: "Medicines",
        url: "/seller-dashboard/medicines",
      },
      {
        title: "Orders",
        url: "/seller-dashboard/orders",
      },
      {
        title: "Profile",
        url: "/seller-dashboard/me",
      },
    ],
  },
];
