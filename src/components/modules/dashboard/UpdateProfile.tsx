"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, ImagePlus, X, Edit } from "lucide-react";
import Image from "next/image";

import { uploadImage } from "@/actions/upload.action";

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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { IUpdateUserPayload } from "@/types";
import { updateProfileUser } from "@/actions/user.action";

const userSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z
    .string()
    .nullable()
    .transform((v) => v ?? ""),
  address: z
    .string()
    .nullable()
    .transform((v) => v ?? ""),
});

export default function UpdateProfile({
  userData,
}: {
  userData: IUpdateUserPayload;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(userData.image || null);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm({
    defaultValues: {
      name: userData.name || "",
      phone: userData.phone || "",
      address: userData.address || "",
    },
    /*  validators: {
      onSubmit: userSchema,
    }, */

    validators: {
      onChange: ({ value }) => {
        const parse = userSchema.safeParse(value);
        if (!parse.success) {
          return parse.error.issues[0].message;
        }
        return undefined;
      },
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");
      setIsUpdating(true);

      try {
        let finalImageUrl = userData.image;

        if (preview && preview.startsWith("data:image")) {
          const uploadRes = await uploadImage(preview);
          if (uploadRes.error) throw new Error(uploadRes.error);
          finalImageUrl = uploadRes.url || "";
        } else if (!preview) {
          finalImageUrl = "";
        }

        const res = await updateProfileUser({
          ...value,
          image: finalImageUrl,
        });

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
        } else {
          toast.success("Profile updated successfully!", { id: toastId });
          setOpen(false);
        }
      } catch (err: any) {
        toast.error(err.message || "Update Failed", { id: toastId });
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
          className="h-8 w-27 p-0 gap-1 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
        >
          <Edit className="h-4 w-4" /> Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b">
          <DialogTitle className="text-2xl text-center font-bold pb-2">
            Update Profile Information
          </DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to profile here.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4 pt-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="relative w-24 h-24 border-2 border-dashed rounded-full overflow-hidden bg-muted group">
                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      onClick={() => setPreview(null)}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    >
                      <X size={20} />
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <ImagePlus size={24} />
                  </div>
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="max-w-23.5 text-xs"
              />
            </div>

            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <form.Field
                name="phone"
                children={(field) => (
                  <Field>
                    <FieldLabel>Phone Number</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="+88017..."
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="address"
                children={(field) => (
                  <Field>
                    <FieldLabel>Address</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Street, City, Country"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating} className="min-w-25">
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
