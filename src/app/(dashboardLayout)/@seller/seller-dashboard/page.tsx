// export const dynamic = "force-dynamic";

import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function SellerDashboard() {
  const { data: session } = await userService.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role !== "SELLER") {
    redirect("/dashboard");
  }
  return redirect("/seller-dashboard/dashboard");
}
