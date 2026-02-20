"use client";

import { updateCategory } from "@/actions/category.action";
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
import { ICategoryType } from "@/types";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateCategory({
  category,
}: {
  category: ICategoryType;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name === category.name) {
      setOpen(false);
      return;
    }

    const toastId = toast.loading("Updating category...");
    setIsLoading(true);

    try {
      const res = await updateCategory(category.id as string, { name });

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
      } else {
        toast.success("Category updated successfully!", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      toast.error("Failed to update category", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Update Category
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
