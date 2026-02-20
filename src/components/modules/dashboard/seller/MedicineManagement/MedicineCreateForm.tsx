"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Loader2, ImagePlus, X } from "lucide-react";
import Image from "next/image";

import { createMedicine } from "@/actions/medicine.action";
import { uploadImage } from "@/actions/upload.action";
import { ICategoryType } from "@/types";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  categoryId: z.string().uuid("Please select a valid category"),
  image: z.string().optional().default(""),
  sellerId: z.string().min(1, "Seller identification failed"),
});

export default function MedicineCreateForm({
  categories,
}: {
  categories: ICategoryType[];
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: session } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      manufacturer: "",
      categoryId: "",
      image: "",
      sellerId: "",
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
      if (!session?.user?.id) {
        toast.error("Session not found. Please login again!");
        return;
      }

      const toastId = toast.loading("Adding medicine...");
      try {
        let finalImageUrl = "";

        if (preview && preview.startsWith("data:image")) {
          setIsUploading(true);

          const uploadRes = await uploadImage(preview);

          if (uploadRes.error) throw new Error(uploadRes.error);
          finalImageUrl = uploadRes.url || "";
        }

        const res = await createMedicine({
          ...value,
          image: finalImageUrl,
          sellerId: session.user.id,
        });

        if (res.error) {
          toast.error(res.error.message, {
            id: toastId,
          });
        } else {
          toast.success("Medicine added successfully!", { id: toastId });

          setOpen(false);
          setPreview(null);
          form.reset();
        }
      } catch (error: any) {
        toast.error(error.message || "Something went wrong", { id: toastId });
      } finally {
        setIsUploading(false);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("Image max size 2MB");
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold shadow-sm">
          <Plus size={18} className="mr-2" /> Add Medicine
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center font-bold tracking-tight">
            Add Medicine Details
          </DialogTitle>
        </DialogHeader>

        <form
          id="medicine-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (session?.user?.id) {
              form.setFieldValue("sellerId", session.user.id);
            }
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-6 pt-2">
            <Field>
              <FieldLabel className="text-sm font-semibold mb-2 block text-muted-foreground uppercase tracking-wider">
                Medicine Image
              </FieldLabel>
              <div className="flex flex-col items-center justify-center gap-4 p-4 border-2 border-dashed rounded-2xl bg-muted/20 hover:bg-muted/30 transition-all duration-300 group relative">
                {preview ? (
                  <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-contain bg-background"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setPreview(null)}
                        className="rounded-full h-10 w-10 p-0"
                      >
                        <X size={20} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="p-3 bg-primary/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <ImagePlus className="w-8 h-8 text-primary" />
                      </div>
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground/60">
                        PNG, JPG or WebP (Max 2MB)
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            </Field>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field
                  name="name"
                  children={(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel htmlFor={field.name} className="font-medium">
                        Medicine Name
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id={field.name}
                          placeholder="e.g. Paracetamol 500mg"
                          className="pl-3 focus-visible:ring-primary/50"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>
                  )}
                />
                <form.Field
                  name="categoryId"
                  children={(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="font-medium">Category</FieldLabel>
                      <Select
                        onValueChange={field.handleChange}
                        value={field.state.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((c) => (
                            <SelectItem key={c.id} value={c.id as string}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <form.Field
                  name="price"
                  children={(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel htmlFor={field.name} className="font-medium">
                        Unit Price
                      </FieldLabel>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          $
                        </span>
                        <Input
                          id={field.name}
                          type="number"
                          placeholder="0.00"
                          className="pl-7"
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                        />
                      </div>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>
                  )}
                />
                <form.Field
                  name="stock"
                  children={(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel htmlFor={field.name} className="font-medium">
                        Stock
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="number"
                        placeholder="Available Stock"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>
                  )}
                />
                <form.Field
                  name="manufacturer"
                  children={(field) => (
                    <Field className="space-y-1.5">
                      <FieldLabel htmlFor={field.name} className="font-medium">
                        Manufacturer
                      </FieldLabel>
                      <Input
                        id={field.name}
                        placeholder="Company Name"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>
                  )}
                />
              </div>

              <form.Field
                name="description"
                children={(field) => (
                  <Field className="space-y-1.5">
                    <FieldLabel htmlFor={field.name} className="font-medium">
                      Description
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      placeholder="Describe the medicine..."
                      rows={4}
                      className="resize-none"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                  </Field>
                )}
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isUploading}
                className="rounded-md px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading}
                className="rounded-md px-8 shadow-md hover:shadow-lg transition-all"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Add Medicine"
                )}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
