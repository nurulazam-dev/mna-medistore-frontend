"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IMedicineType } from "@/types";
import { Eye, Package, Factory, Tag, DollarSign, Info } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function ViewMedicine({
  medicine,
}: {
  medicine: IMedicineType;
}) {
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
        <DialogHeader className="p-6 bg-muted/30 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              Medicine Details
            </DialogTitle>
            <Badge
              variant={medicine?.isActive ? "default" : "destructive"}
              className="px-3 py-1 uppercase text-[10px] tracking-wider"
            >
              {medicine?.isActive ? "Available" : "Unavailable"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden border bg-muted shadow-sm shrink-0">
              {medicine?.image ? (
                <Image
                  src={medicine?.image}
                  alt={medicine?.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div>
                <h3 className="text-3xl font-extrabold text-primary mb-1">
                  {medicine?.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Factory size={14} /> {medicine?.manufacturer}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-xl border">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 flex items-center gap-1">
                    <DollarSign size={10} /> Price
                  </p>
                  <p className="text-lg font-bold">$ {medicine?.price}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl border">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 flex items-center gap-1">
                    <Package size={10} /> Stock
                  </p>
                  <p
                    className={`text-lg font-bold ${medicine?.stock && medicine?.stock < 10 ? "text-orange-500" : ""}`}
                  >
                    {medicine?.stock} Units
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <p className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                <Tag size={16} /> Category
              </p>
              <p className="text-sm bg-secondary/30 p-2 rounded-md border">
                {medicine?.category?.name}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                <Info size={16} /> Product ID
              </p>
              <p className="text-xs font-mono bg-secondary/30 p-2 rounded-md border truncate">
                {medicine?.id}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-bold text-lg">Description</h4>
            <div className="bg-muted/20 p-4 rounded-xl border leading-relaxed text-muted-foreground text-sm italic">
              {medicine?.description ||
                "No description provided for this medicine."}
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/30 border-t flex justify-end">
          <Button variant="secondary" onClick={() => {}} asChild>
            <DialogTrigger>Close</DialogTrigger>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
