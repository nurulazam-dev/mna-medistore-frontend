// export const dynamic = "force-dynamic";

import CategoryCreateForm from "@/components/modules/dashboard/admin/CategoriesManagement/CategoryCreateForm";
import CategoryTable from "@/components/modules/dashboard/admin/CategoriesManagement/CategoryTable";
import { categoryService } from "@/services/category.service";
import { userService } from "@/services/user.service";
import { LayoutList } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ManageCategoriesPage() {
  const [sessionData, categoriesRes] = await Promise.all([
    userService.getSession(),
    categoryService.getCategories(),
  ]);

  const session = sessionData?.data;
  const categories = categoriesRes?.data?.data || [];

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Categories Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage medicine categories and track inventory.
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border text-sm font-medium">
            <LayoutList size={18} className="text-primary" />
            <span>Total: {categories?.length}</span>
          </div>

          <CategoryCreateForm />
        </div>
      </div>
      <CategoryTable categories={categories} />
    </div>
  );
}
