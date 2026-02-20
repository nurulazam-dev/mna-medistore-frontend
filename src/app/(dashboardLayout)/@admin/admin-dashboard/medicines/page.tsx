export const dynamic = "force-dynamic";

import ManageMedicinesTable from "@/components/modules/dashboard/admin/MedicinesManagement/ManageMedicinesTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";
import { userService } from "@/services/user.service";
import { LayoutList } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ManageMedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const [sessionData, medicinesRes, categoriesRes] = await Promise.all([
    userService.getSession(),
    medicineService.getMedicines({ page }),
    categoryService.getCategories(),
  ]);

  const session = sessionData?.data;
  const medicines = medicinesRes?.data?.data || [];
  const categories = categoriesRes?.data?.data || [];

  const pagination = medicines?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  if (!session?.user || session?.user?.role !== "ADMIN") {
    redirect(session?.user ? "/dashboard" : "/login");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Medicines Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage all medicines (Admin) and track inventory.
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border text-sm font-medium">
            <LayoutList size={18} className="text-primary" />
            <span>Total: {medicines?.pagination?.total}</span>
          </div>
        </div>
      </div>
      <ManageMedicinesTable
        medicines={medicines?.data}
        categories={categories}
        meta={medicines?.pagination}
      />
      <PaginationControls meta={pagination} />
    </div>
  );
}
