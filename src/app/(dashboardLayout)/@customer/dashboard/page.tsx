// export const dynamic = "force-dynamic";

import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function CustomerDashboard() {
  const { data: session } = await userService.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role !== "CUSTOMER") {
    redirect("/dashboard");
  }
  return redirect("/dashboard/overview");
}
