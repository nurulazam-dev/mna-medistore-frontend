import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMedicineType } from "@/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MedicineCard({
  medicine,
  viewMode,
}: {
  medicine: IMedicineType;
  viewMode: "grid" | "list";
}) {
  const isOutOfStock = (medicine.stock ?? 0) <= 0;

  return (
    <Link
      href={`/medicines/${medicine?.id}`}
      className={`group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 flex ${
        viewMode === "list" ? "flex-row h-45 p-4" : "flex-col"
      }`}
    >
      <div
        className={`relative bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center ${
          viewMode === "list" ? "w-40 rounded-md" : "h-50"
        }`}
      >
        <Image
          src={medicine?.image || "/mna-mediStore.png"}
          alt={medicine?.name}
          fill
          className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <Badge variant="destructive" className="font-bold">
              Stock Out
            </Badge>
          </div>
        )}
      </div>

      <div className={`px-5 py-2 flex flex-col justify-between flex-1`}>
        <div className="space-y-1">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {medicine?.name}
          </h3>
          <p className="text-xs font-bold text-slate-300 m-0">
            {" "}
            <span className="text-indigo-500"> Manufactured By: </span>
            {medicine?.manufacturer}
          </p>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed h-10">
            {medicine?.description}
          </p>
        </div>

        <div className={`flex items-center justify-between mt-4`}>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium leading-none">
              Price
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              $ {Number(medicine?.price).toFixed(2)}
            </span>
          </div>
          <Button
            // size="icon"
            variant="link"
            className="hover:text-indigo-600 transition-colors"
          >
            Details <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </Link>
  );
}
