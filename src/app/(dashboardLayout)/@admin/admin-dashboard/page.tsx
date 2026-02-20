// export const dynamic = "force-dynamic";

import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const { data: session } = await userService.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return redirect("/admin-dashboard/dashboard");
}
