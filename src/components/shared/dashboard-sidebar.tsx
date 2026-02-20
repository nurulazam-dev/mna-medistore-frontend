"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";

import { Route } from "@/types";
import { Roles } from "@/constants/roles";
import { customerRoutes } from "@/routes/customerRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import { Separator } from "../ui/separator";
import { ArrowUpRight, LogOut, User2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function DashboardSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user?.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.seller:
      routes = sellerRoutes;
      break;
    case Roles.customer:
      routes = customerRoutes;
      break;

    default:
      routes = [];
      break;
  }

  const { data: session } = authClient.useSession();
  const loggedUser = session?.user;

  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <div className="text-center bg-slate-50 dark:bg-slate-900 py-2">
              <Link
                href="/"
                className="group flex items-center justify-center py-1"
              >
                <div className="flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
                  <span className="text-xl font-black tracking-tighter text-slate-800 dark:text-slate-100 uppercase flex items-center">
                    MNA
                    <span className="text-green-600 ml-1">MediStore</span>
                    <div className="relative ml-1 overflow-hidden">
                      <ArrowUpRight
                        size={20}
                        className="text-indigo-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>
                  </span>
                </div>
              </Link>
            </div>

            <Separator className="mb-2" />
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <div className="p-2 mt-auto border-t border-slate-200 dark:border-slate-800">
            <SidebarMenuItem className="flex flex-col gap-2">
              <SidebarMenuButton className="h-auto py-3 px-3 flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-indigo-600 text-white shadow-md group-hover:scale-105 transition-transform">
                  <User2 size={26} />
                </div>

                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate w-full">
                    {loggedUser?.name}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 truncate w-full">
                    {loggedUser?.email}
                  </span>
                </div>
              </SidebarMenuButton>

              <SidebarMenuButton
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 text-red-500 bg-white hover:bg-red-600 dark:hover:bg-red-700 hover:text-white py-5 rounded-md transition-colors font-semibold w-full"
              >
                <LogOut size={18} />
                Log Out
              </SidebarMenuButton>
            </SidebarMenuItem>
          </div>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
