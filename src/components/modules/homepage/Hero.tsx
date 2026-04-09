import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden mb-10">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-125 h-125" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-100 h-100" />

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="px-4 py-1.5 rounded-full border-primary/20 text-primary font-semibold tracking-wide animate-fade-in bg-green-700"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              100% Genuine Certified Medicines
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
              Your Health, <br />
              <span className="text-primary italic">Our Priority.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Order your essential medications, healthcare products, and
              wellness supplements. Delivered to your doorstep within{" "}
              <span className="text-foreground font-bold">45 minutes.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/medicines">
              <Button
                size="lg"
                className="h-14 px-8 rounded-md text-lg font-bold shadow-lg shadow-primary/20 group"
              >
                Order Now
                <ShoppingCart className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-md text-lg font-bold border-2"
            >
              Upload Prescription
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-sm font-bold text-foreground">24/7 Delivery</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-bold text-foreground">Verified Shop</p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative z-10 w-full aspect-square rounded-2xl overflow-hidden border-8 border-background">
            <Image
              src="https://msh.org/wp-content/uploads/2021/08/20210708_214842_715px.png"
              alt="MNA MediStore"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="absolute -bottom-2 -left-6 bg-slate-400 dark:bg-slate-800 p-4 rounded-xl shadow-2xl border border-border z-20 animate-bounce-slow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center text-slate-400 font-black text-xl">
                4.9
              </div>
              <div>
                <p className="text-sm font-black text-foreground leading-none">
                  TrustScore
                </p>
                <p className="text-xs text-foreground mt-1">
                  From 10k+ Customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
