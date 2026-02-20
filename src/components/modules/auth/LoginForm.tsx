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
  email: z.email(),
  password: z.string().min(8, "Minimum length 8"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_FRONTEND,
    });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Login...");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Logged in successfully", { id: toastId });
      } catch (err) {
        toast.error("Login fail, please try again", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <div className="text-center">
        <p className="text-xl text-green-400">Welcome Back</p>
        <h1 className="text-3xl font-bold">Login your account</h1>
      </div>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
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
          </FieldGroup>
        </form>
        <Field className="mt-4">
          <Button form="login-form" type="submit" className="w-full">
            Login <LucideLogIn />
          </Button>
        </Field>
        <FieldDescription className="text-center mt-4 text-sm">
          Don&apos;t have an account? <Link href="/register">Register</Link>
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
          className="w-full"
        >
          Continue with Google <Chromium />
        </Button>
      </CardContent>
    </Card>
  );
}
