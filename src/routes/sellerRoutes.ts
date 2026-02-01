import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Management",
    items: [
      {
        title: "Create Medicine",
        url: "/seller-dashboard/create-medicine",
      },
      {
        title: "Medicine Orders",
        url: "/seller-dashboard/medicine-orders",
      },
      {
        title: "Profile",
        url: "/seller-dashboard/me",
      },
    ],
  },
];
