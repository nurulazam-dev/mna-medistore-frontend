"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { Edit, Loader2, ImagePlus, X } from "lucide-react";
import Image from "next/image";

import { updateMedicine } from "@/actions/medicine.action";
import { uploadImage } from "@/actions/upload.action";
import { ICategoryType, IMedicineType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const medicineSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  description: z.string().min(10, "Description is too short"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  isActive: z.boolean().optional(),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  categoryId: z.string().uuid("Invalid category"),
});

export default function UpdateMedicine({
  medicine,
  categories,
}: {
  medicine: IMedicineType;
  categories: ICategoryType[];
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(medicine.image || null);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm({
    defaultValues: {
      name: medicine.name,
      description: medicine.description,
      price: medicine.price,
      stock: medicine.stock,
      isActive: medicine.isActive ?? true,
      manufacturer: medicine.manufacturer,
      categoryId: medicine.categoryId,
    },
    /* validators: {
      onSubmit: medicineSchema,
    }, */
    validators: {
      onChange: ({ value }) => {
        const parse = medicineSchema.safeParse(value);
        if (!parse.success) {
          return parse.error.issues[0].message;
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating medicine...");
      setIsUpdating(true);

      try {
        let finalImageUrl = medicine.image;

        if (preview && preview.startsWith("data:image")) {
          const uploadRes = await uploadImage(preview);

          if (uploadRes.error) throw new Error(uploadRes.error);
          finalImageUrl = uploadRes.url || "";
        } else if (!preview) {
          finalImageUrl = "";
        }

        const res = await updateMedicine(medicine.id as string, {
          ...value,
          image: finalImageUrl,
        });

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
        } else {
          toast.success("Medicine updated successfully!", { id: toastId });
          setOpen(false);
        }
      } catch (err: any) {
        toast.error(err.message || "Medicine updated Fail", { id: toastId });
      } finally {
        setIsUpdating(false);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
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

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b">
          <DialogTitle className="text-2xl font-bold text-center pb-1">
            Update `{medicine?.name}`
          </DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to medicine details here.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-3 pt-1">
            <div className="grid grid-cols-2">
              <div className="">
                <div className="relative w-40 h-30 border rounded-lg overflow-hidden bg-muted group">
                  {preview ? (
                    <>
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        onClick={() => setPreview(null)}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="text-white" size={16} />
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImagePlus size={20} />
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 w-40"
                />
              </div>
              <div>
                <form.Field
                  name="isActive"
                  children={(field) => (
                    <Field className="flex flex-col gap-2">
                      <FieldLabel>Medicine Status</FieldLabel>
                      <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/20">
                        <span
                          className={`text-xs font-bold uppercase ${field.state.value ? "text-green-600" : "text-red-600"}`}
                        >
                          {field.state.value ? "Active" : "Inactive"}
                        </span>

                        <Button
                          type="button"
                          variant={field.state.value ? "default" : "secondary"}
                          size="sm"
                          onClick={() => field.handleChange(!field.state.value)}
                        >
                          {field.state.value ? "Disable" : "Enable"}
                        </Button>
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="name"
                children={(field) => (
                  <Field>
                    <FieldLabel>Medicine Name</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
              <form.Field
                name="categoryId"
                children={(field) => (
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      onValueChange={field.handleChange}
                      value={field.state.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((c) => (
                          <SelectItem key={c?.id} value={c?.id!}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <form.Field
                name="price"
                children={(field) => (
                  <Field>
                    <FieldLabel>Price</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
              <form.Field
                name="stock"
                children={(field) => (
                  <Field>
                    <FieldLabel>Stock</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;

                        field.handleChange(
                          Number(val === "" ? 0 : Number(val)),
                        );
                      }}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
              <form.Field
                name="manufacturer"
                children={(field) => (
                  <Field>
                    <FieldLabel>Manufacturer</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>

            <form.Field
              name="description"
              children={(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    rows={3}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating} className="min-w-24">
                {isUpdating ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
