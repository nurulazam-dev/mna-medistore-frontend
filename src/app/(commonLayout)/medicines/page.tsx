import Medicines from "@/components/modules/medicine/Medicines";
import PaginationControls from "@/components/ui/pagination-controls";
import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const [medicinesRes, categoriesRes] = await Promise.all([
    medicineService.getMedicines({ page }),
    categoryService.getCategories(),
  ]);

  const medicines = medicinesRes.data?.data?.data || [];
  const pagination = medicinesRes.data?.data?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  const categories = categoriesRes?.data?.data || [];

  return (
    <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6">
      <Medicines medicines={medicines} />
      <PaginationControls meta={pagination} />
    </div>
  );
}
