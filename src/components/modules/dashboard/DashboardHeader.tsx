"use client";

import {
  UserCircle,
  Calendar,
  ShieldCheck,
  Mail,
  Sparkles,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UserInfo {
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function DashboardHeader({ user }: { user: UserInfo }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-white shadow-2xl mb-8 border border-slate-800">
      <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-48 w-48 rounded-full bg-blue-500/10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative h-20 w-20 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-xl">
            <UserCircle className="h-12 w-12 text-slate-300" />
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center shadow-lg">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-medium text-slate-400 tracking-tight">
              Welcome back,
            </h1>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400">
              {user?.name} !
            </h2>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-slate-400 text-sm mt-2">
              <div className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-700/50">
                <Mail size={14} className="text-emerald-500" />
                <span className="text-slate-300">{user?.email}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="capitalize font-semibold text-emerald-400">
                  {user?.role?.toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-2 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <Calendar size={16} className="text-emerald-500" />
            <span className="text-sm">
              Member since:{" "}
              <span className="text-slate-200">
                {user.createdAt ? formatDate(user.createdAt) : "N/A"}
              </span>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium max-w-50 md:text-right leading-relaxed">
            Keep track of your health and prescriptions in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
