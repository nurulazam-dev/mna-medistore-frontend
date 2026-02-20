"use client";

import { createCategory } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CategoryCreateForm() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (!name || name.trim().length === 0) {
      return toast.error("Category name is required");
    }

    const toastId = toast.loading("Creating category...");
    setIsLoading(true);

    try {
      const res = await createCategory({ name });

      if (res.error) {
        toast.error(res.error.message || "Failed to create category", {
          id: toastId,
        });
      } else {
        toast.success("Category created successfully!", { id: toastId });
        setOpen(false);
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={18} /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Category Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Antibiotics, Vitamins, Surgery"
              className="w-full"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
