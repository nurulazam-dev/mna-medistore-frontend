"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  //   Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Chromium } from "lucide-react";

/* const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
}); */

export default function LoginForm() {
  /*   const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  }; */

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/70">
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
          <p className="mt-4 font-semibold text-xl tracking-tight">
            Login to MNA-MediStore
          </p>

          <Button className="mt-8 w-full gap-3">
            <Chromium />
            Continue with Google
          </Button>

          <div className="my-7 flex w-full items-center justify-center overflow-hidden">
            <Separator />
            <span className="px-2 text-sm">OR</span>
            <Separator />
          </div>

          {/* <Form {...form}> */}
          <form
            className="w-full space-y-4"
            //   onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              // control={form.control}
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
              // control={form.control}
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
              Continue with Email
            </Button>
          </form>
          {/* </Form> */}

          <p className="mt-5 text-center text-sm">
            Already have an account?
            <Link className="ml-1 text-muted-foreground underline" href="#">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
