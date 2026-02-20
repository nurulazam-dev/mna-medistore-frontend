"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  ShieldX,
  User as UserIcon,
  Fingerprint,
  Info,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { IUserType } from "@/types";
import { formatDate } from "@/lib/utils";

export default function ViewUser({ user }: { user: IUserType }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="p-5 bg-muted/30 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-primary" />
              Profile Details
            </DialogTitle>
            <Badge
              variant={user?.status === "ACTIVE" ? "default" : "destructive"}
              className="px-3 py-1 mr-4 uppercase text-[10px] tracking-wider"
            >
              {user?.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="py-2 px-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-full md:w-40 h-40 rounded-2xl overflow-hidden border-4 border-background bg-muted shadow-md shrink-0">
              {user?.image ? (
                <Image
                  src={user?.image}
                  alt={user?.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400">
                  <UserIcon size={48} />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div>
                <div className="flex items-start gap-1">
                  <h2 className="text-3xl font-extrabold text-primary mb-1 flex items-center gap-2">
                    {user?.name || "N/A"}
                  </h2>
                  <Badge
                    variant="outline"
                    className={`px-3 py-1 uppercase text-[10px] tracking-wider font-bold ${
                      user?.role === "ADMIN"
                        ? "border-violet-600 text-violet-600"
                        : user?.role === "SELLER"
                          ? "border-amber-600 text-amber-600"
                          : "border-emerald-600 text-emerald-600"
                    }`}
                  >
                    {user?.role}
                  </Badge>
                </div>

                <p className="text-md font-medium text-muted-foreground flex items-center gap-1">
                  <Mail size={14} /> {user?.email}
                </p>
                <div>
                  {user?.emailVerified ? (
                    <div className="flex items-center gap-1 text-blue-600">
                      <ShieldCheck className="w-4 h-4" />{" "}
                      <span className="text-xs">Email Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600">
                      <ShieldX className="w-4 h-4" />{" "}
                      <span className="text-xs">Email Not Verified</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-xl border">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 flex items-center gap-1">
                    <Phone size={10} />
                    Phone
                  </p>
                  <p className="text-sm font-bold">{user?.phone || "N/A"}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl border">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 flex items-center gap-1">
                    <Calendar size={10} /> Joined Date
                  </p>
                  <p className="text-sm font-bold">
                    {formatDate(user?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <p className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                Address
              </p>
              <p className="text-sm bg-secondary/30 p-3 rounded-md border min-h-10">
                {user?.address || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                <Fingerprint size={16} /> User ID
              </p>
              <p className="text-xs font-mono bg-secondary/30 p-3 rounded-md border truncate">
                {user?.id}
              </p>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex items-center gap-4 ${user?.emailVerified ? "bg-blue-50 border-blue-100" : "bg-amber-50 border-amber-100"}`}
          >
            <div
              className={`p-1.5 rounded-full ${user?.emailVerified ? "bg-blue-500" : "bg-amber-500"} text-white`}
            >
              {user?.emailVerified ? (
                <ShieldCheck size={20} />
              ) : (
                <Info size={20} />
              )}
            </div>
            <div>
              <h4 className="font-bold text-sm text-muted-foreground">
                Account Verification
              </h4>
              <p className="text-xs text-muted-foreground">
                {user?.emailVerified
                  ? "This user has successfully verified their email address."
                  : "Email verification is still pending for this account."}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/30 border-t flex justify-end">
          <Button variant="outline" asChild>
            <DialogTrigger>Close</DialogTrigger>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
