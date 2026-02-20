export const dynamic = "force-dynamic";

import MyProfile from "@/components/modules/dashboard/MyProfile";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function SellerProfilePage() {
  const { data: session } = await userService.getSession();

  const sessionUser = session?.user;

  if (!sessionUser) {
    redirect("/login");
  }

  if (sessionUser?.role !== "SELLER") {
    redirect("/dashboard");
  }

  const { data: latestUserData } = await userService.getSingleUser(
    sessionUser.id,
  );

  return (
    <div>
      {/* <MyProfile userData={latestUserData || sessionUser} /> */}
      <MyProfile userData={latestUserData?.data} />
    </div>
  );
}
