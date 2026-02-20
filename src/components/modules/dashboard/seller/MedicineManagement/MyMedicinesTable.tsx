import { ICategoryType, IMedicineType } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PackageOpen } from "lucide-react";
import UpdateMedicine from "./UpdateMedicine";
import ViewMedicine from "./ViewMedicine";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default function MyMedicinesTable({
  myMedicines,
  categories,
  meta,
}: {
  myMedicines: IMedicineType[];
  categories: ICategoryType[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}) {
  const currentPage = meta?.page || 1;
  const limit = meta?.limit || 10;

  return (
    <div className="border rounded-md overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-12.5 text-center">#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Medicine Info</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Created Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myMedicines?.length > 0 ? (
            myMedicines.map((medicine, index) => (
              <TableRow
                key={medicine?.id}
                className="hover:bg-muted/30 transition-colors group"
              >
                <TableCell className="text-center font-medium">
                  {String((currentPage - 1) * limit + (index + 1)).padStart(
                    2,
                    "0",
                  )}
                </TableCell>

                <TableCell className="flex items-center">
                  <Image
                    src={medicine?.image || "/mna-mediStore.png"}
                    alt={medicine?.name}
                    height={9}
                    width={9}
                    className="rounded border h-9 w-9 p-0.5"
                  />
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-primary leading-none">
                      {medicine?.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">
                      {medicine?.manufacturer}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <span className="font-bold text-primary leading-none">
                    {medicine?.category?.name}
                  </span>
                </TableCell>

                <TableCell className="text-center font-bold text-slate-400">
                  $ {Number(medicine?.price).toFixed(2)}
                </TableCell>

                <TableCell className="text-center">
                  <span
                    className={`text-sm font-mono font-bold ${
                      (medicine?.stock ?? 0) < 10
                        ? "text-red-500"
                        : "text-slate-400"
                    }`}
                  >
                    {medicine?.stock ?? 0}
                  </span>
                </TableCell>

                <TableCell className="text-center">
                  {medicine?.isActive ? (
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="bg-red-500 text-white hover:bg-red-100 border-red-600"
                    >
                      Inactive
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="text-right text-muted-foreground text-[11px] font-medium italic">
                  {formatDate(medicine?.createdAt)}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <UpdateMedicine
                      medicine={medicine}
                      categories={categories}
                    />
                    <ViewMedicine medicine={medicine} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                  <PackageOpen className="h-10 w-10 opacity-20" />
                  <p className="font-semibold">No medicines found.</p>
                  <p className="text-xs italic">
                    Try adding new medicine to your inventory.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
