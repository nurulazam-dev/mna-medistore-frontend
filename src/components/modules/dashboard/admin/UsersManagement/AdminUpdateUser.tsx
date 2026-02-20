"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { Edit, Loader2, UserCog, ShieldCheck } from "lucide-react";

import { IUserType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import { adminUpdateUser } from "@/actions/user.action";

/* const adminUserSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  role: z.enum(["ADMIN", "SELLER", "CUSTOMER"]),
  status: z.enum(["ACTIVE", "BLOCKED"]),
  emailVerified: z.boolean(),
}); */

const adminUserSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z
    .string()
    .nullable()
    .transform((v) => v ?? ""),
  address: z
    .string()
    .nullable()
    .transform((v) => v ?? ""),
  role: z.enum(["ADMIN", "SELLER", "CUSTOMER"]),
  status: z.enum(["ACTIVE", "BLOCKED"]),
  emailVerified: z.boolean(),
});

export default function AdminUpdateUser({ user }: { user: IUserType }) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      role: (user.role as "ADMIN" | "SELLER" | "CUSTOMER") || "CUSTOMER",
      status: (user.status as "ACTIVE" | "BLOCKED") || "ACTIVE",
      emailVerified: !!user.emailVerified,
    },
    /* validators: {
        onSubmit: adminUserSchema,
      }, */

    validators: {
      onChange: ({ value }) => {
        const parse = adminUserSchema.safeParse(value);
        if (!parse.success) {
          return parse.error.issues[0].message;
        }
        return undefined;
      },
    },

    /* onValidate: ({ value }:any) => {
      const result = adminUserSchema.safeParse(value);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0] as string] = issue.message;
        });
        return fieldErrors;
      }
      return undefined;
    }, */
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating...");
      setIsUpdating(true);

      try {
        const res = await adminUpdateUser(user.id, value);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
        } else {
          toast.success("User updated successfully!", { id: toastId });
          setOpen(false);
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to update user", { id: toastId });
      } finally {
        setIsUpdating(false);
      }
    },
  });

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

      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <UserCog className="text-violet-600" />
            Edit User:{" "}
            <span className="text-muted-foreground font-normal">
              {user?.email}
            </span>
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 pt-4"
        >
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name="phone"
              children={(field) => (
                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name="role"
              children={(field) => (
                <Field>
                  <FieldLabel>User Role</FieldLabel>
                  <Select
                    // onValueChange={field.handleChange}
                    onValueChange={(value) =>
                      field.handleChange(
                        value as "ADMIN" | "SELLER" | "CUSTOMER",
                      )
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="SELLER">SELLER</SelectItem>
                      <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name="status"
              children={(field) => (
                <Field>
                  <FieldLabel>Account Status</FieldLabel>
                  <Select
                    // onValueChange={field.handleChange}
                    onValueChange={(v) =>
                      field.handleChange(v as "ACTIVE" | "BLOCKED")
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                      <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
          </FieldGroup>

          <form.Field
            name="address"
            children={(field) => (
              <Field>
                <FieldLabel>Address</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <div className="bg-muted/30 p-4 rounded-lg border flex items-center justify-between">
            <div className="space-y-0.5">
              <FieldLabel className="text-sm font-bold flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-600" />
                Email Verification
              </FieldLabel>
              <p className="text-xs text-muted-foreground">
                Manually verify or not verify this user
              </p>
            </div>
            <form.Field
              name="emailVerified"
              children={(field) => (
                <Switch
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
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
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-violet-600 hover:bg-violet-700"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
