"use client";

import { useState } from "react";
import { Search, LayoutGrid, List, AlertCircle, Pill } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IMedicineType } from "@/types";
import MedicineCard from "./MedicineCard";

export default function Medicines({
  medicines,
}: {
  medicines: IMedicineType[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const activeMedicines =
    medicines?.filter((medicine) => medicine?.isActive === true) || [];

  const filteredMedicines = activeMedicines?.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8 px-4 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 px-6 py-4 rounded-md shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Pill className="text-indigo-600" />
            Explore Medicines
          </h1>
          <p className="text-sm text-slate-500">
            Find the right medication for your needs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search by name or brand..."
              className="pl-10 h-11 bg-slate-50 border-none rounded-xl focus-visible:ring-indigo-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden sm:flex border border-slate-200 rounded-xl p-1 bg-slate-500">
            <Button
              variant={viewMode === "grid" ? "outline" : "ghost"}
              size="icon"
              className={`h-9 w-9 rounded-lg ${viewMode === "grid" ? "shadow-sm bg-white" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={18} />
            </Button>
            <Button
              variant={viewMode === "list" ? "outline" : "ghost"}
              size="icon"
              className={`h-9 w-9 rounded-lg ${viewMode === "list" ? "shadow-sm bg-white" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List size={18} />
            </Button>
          </div>
        </div>
      </div>

      {filteredMedicines?.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredMedicines?.map((med) => (
            <MedicineCard key={med?.id} medicine={med} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center">
            <AlertCircle size={40} className="text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">
            No medicines found matching "{searchQuery}"
          </p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
