"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { Chromium, LucideLogIn } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.email(),
  password: z.string().min(8, "Minimum length 8"),
  role: z.enum(["CUSTOMER", "SELLER"]),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_FRONTEND,
    });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user...");
      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          role: value.role,
          name: value.name,
          callbackURL: "/",
        } as any);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User created successfully", { id: toastId });
      } catch (err) {
        toast.error("User created fail!", { id: toastId });
      }
    },
  });

  return (
    <Card
      {...props}
      className="border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/55 transition-all duration-500"
    >
      <div className="text-center">
        <p className="text-md text-green-400">Enter your information to</p>
        <h1 className="text-3xl font-bold">Create an account</h1>
      </div>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <div className="grid grid-cols-2 gap-2">
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="role"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>I am a</FieldLabel>
                    <select
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value as any)
                      }
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="SELLER">Seller</option>
                    </select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>

        <Field className="mt-4">
          <Button
            form="register-form"
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Register <LucideLogIn />
          </Button>
        </Field>
        <FieldDescription className="text-center mt-4 text-sm">
          Already have an account? <Link href="/login">Login</Link>
        </FieldDescription>
        <div className="flex justify-center items-center overflow-hidden my-3">
          <Separator />
          <span className="px-2 text-sm">OR</span>
          <Separator />
        </div>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
        >
          Continue with Google <Chromium />
        </Button>
      </CardContent>
    </Card>
  );
}
