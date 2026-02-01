"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Chromium } from "lucide-react";
// import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(7, "Password must be at least 7 characters long"),
});

export default function LoginFormCopy() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleGoogleLogin = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
      });
    } catch (err) {
      toast.error("Google login failed");
      console.log("Google login Err: ", err);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Logging in...");
    try {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        // callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Login failed!", { id: toastId });
        return;
      }

      toast.success("Logged in successfully", { id: toastId });
    } catch (err) {
      toast.error("Login fail, please try again", { id: toastId });
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative w-full max-w-sm overflow-hidden rounded-xl border bg-card px-8 py-8 shadow-lg/5 dark:shadow-xl">
        <div
          className="absolute inset-0 -top-px -left-px z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, color-mix(in srgb, var(--card-foreground) 8%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--card-foreground) 8%, transparent) 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 50% at 50% 0%, #000 60%, transparent 100%)
      `,
            WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 50% at 50% 0%, #000 60%, transparent 100%)
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <div className="relative isolate flex flex-col items-center">
          <p className="mt-2 font-semibold text-2xl tracking-tight">
            Login to MNA-MediStore
          </p>

          <Form {...form}>
            <form
              className="w-full space-y-4 mt-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4 w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>

          <p className="mt-2 text-center text-sm">
            If you new here?
            <Link
              className="ml-1 text-muted-foreground underline"
              href="/register"
            >
              Please register
            </Link>
          </p>

          <div className="my-3 flex w-full items-center justify-center overflow-hidden">
            <Separator />
            <span className="px-2 text-sm">OR</span>
            <Separator />
          </div>

          <Button
            onClick={() => handleGoogleLogin()}
            type="button"
            className="w-full gap-3"
          >
            <Chromium />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
