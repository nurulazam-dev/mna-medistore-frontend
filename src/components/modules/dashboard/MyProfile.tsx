"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  User,
  Fingerprint,
  Clock,
  VerifiedIcon,
} from "lucide-react";
import Image from "next/image";
import UpdateProfile from "./UpdateProfile";
import { formatDate, formatFullDate } from "@/lib/utils";
import { IUserType } from "@/types";

export default function MyProfile({ userData }: { userData: IUserType }) {
  const {
    address,
    createdAt,
    email,
    emailVerified,
    id,
    image,
    name,
    phone,
    role,
    status,
    updatedAt,
  } = userData || {};

  return (
    <div className="max-w-5xl mx-auto p-2 space-y-4">
      <div className="relative h-32 w-full bg-linear-to-r from-blue-600 to-indigo-700 rounded-t-2xl shadow-lg">
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative h-32 w-32 rounded-2xl border-4 border-background overflow-hidden bg-muted shadow-xl">
            {image ? (
              <Image src={image} alt="Profile" fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full bg-slate-200">
                <User size={48} className="text-slate-400" />
              </div>
            )}
          </div>
          <div className="mb-2 pb-1">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              {name}
              {emailVerified && (
                <VerifiedIcon className="text-blue-600 w-5 h-5" />
              )}
            </h1>
            <p className="text-muted-foreground flex items-center gap-1 font-medium">
              <Badge
                variant="secondary"
                className="uppercase tracking-wider text-[10px]"
              >
                {role}
              </Badge>
              <span className="mx-1">•</span>
              <span className="text-sm">{status}</span>
            </p>
          </div>
        </div>
        <div className="absolute -bottom-12 md:right-8 right-4">
          <UpdateProfile userData={userData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-muted/30">
            <CardHeader className="pb-2 font-bold text-sm uppercase tracking-wide">
              Contact Information
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-background rounded-lg shadow-sm">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    Email
                  </span>
                  <span className="font-medium truncate">{email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-background rounded-lg shadow-sm">
                  <Phone size={16} className="text-green-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    Phone
                  </span>
                  <span className="font-medium">{phone || "Not provided"}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-background rounded-lg shadow-sm">
                  <MapPin size={16} className="text-red-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    Address
                  </span>
                  <span className="font-medium">
                    {address || "Set your address"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="font-bold text-lg">
              Account Overview
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <Fingerprint size={12} /> User ID
                </p>
                <p className="text-xs font-mono bg-muted p-2 rounded border truncate">
                  {id}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <ShieldCheck size={12} /> Verification Status
                </p>
                <Badge
                  variant={emailVerified ? "default" : "outline"}
                  className="mt-1 font-semibold"
                >
                  {emailVerified ? "Verified User" : "Pending Verification"}
                </Badge>
              </div>
              <div className="space-y-1 pt-2">
                <p className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <Calendar size={12} /> Joined Date
                </p>
                <p className="text-sm font-semibold">
                  {formatFullDate(createdAt)}
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <Clock size={12} /> Last Updated
                </p>
                <p className="text-sm font-semibold">
                  {formatDate(updatedAt)} -{" "}
                  {new Date(updatedAt).toLocaleTimeString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
