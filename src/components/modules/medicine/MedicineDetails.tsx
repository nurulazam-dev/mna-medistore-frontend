"use client";

import {
  Plus,
  Minus,
  ShoppingCart,
  ShieldCheck,
  Truck,
  CornerUpLeft,
  Info,
  Factory,
  Layers,
  Star,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Image from "next/image";
import { IMedicineType } from "@/types";
import { toast } from "sonner";
import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { cn } from "@/lib/utils";

export default function MedicineDetails({
  medicine,
}: {
  medicine: IMedicineType;
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const dispatch = useAppDispatch();

  const isOutOfStock = (medicine?.stock ?? 0) <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("Sorry, this medicine is currently out of stock.");
      return;
    }

    const cartData = {
      ...medicine,
      quantity,
    };

    dispatch(addToCart(cartData));
    toast.success(`${medicine.name} added to cart!`, {
      description: `${quantity} unit(s) successfully added.`,
      position: "top-right",
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 border border-slate-100 shadow-sm group">
          <Image
            src={medicine?.image || "/placeholder-medicine.png"}
            alt={medicine?.name}
            fill
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <Badge className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-slate-800 border-none shadow-sm px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
            {medicine?.category?.name || "General Medicine"}
          </Badge>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
              <Factory size={16} />
              <span>{medicine?.manufacturer}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-400 tracking-tight">
              {medicine?.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-green-600 bg-emerald-50 px-2.5 py-1 rounded-full border text-xs font-bold">
                <ShieldCheck size={14} /> 100% Genuine
              </div>
              <Badge
                variant={isOutOfStock ? "destructive" : "outline"}
                className="rounded-full"
              >
                {isOutOfStock ? "Out of Stock" : `In Stock: ${medicine.stock}`}
              </Badge>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-green-600">
              $ {Number(medicine?.price).toFixed(2)}
            </span>
            <span className="text-sm text-slate-400 font-medium">per unit</span>
          </div>

          <p className="text-slate-700 dark:text-slate-500 leading-relaxed text-sm md:text-base italic">
            {medicine?.description}
          </p>

          <Separator className="bg-slate-100" />

          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
              Select Quantity
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-lg p-1 dark:bg-slate-400 shadow-sm">
                <Button
                  variant="default"
                  size="icon"
                  className="h-10 w-10 rounded-lg"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={isOutOfStock}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center font-bold text-lg text-slate-800">
                  {quantity}
                </span>
                <Button
                  variant="default"
                  size="icon"
                  className="h-10 w-10 rounded-lg"
                  onClick={() =>
                    setQuantity((q) => Math.min(medicine.stock || 10, q + 1))
                  }
                  disabled={isOutOfStock}
                >
                  <Plus size={16} />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg gap-2 font-bold shadow-lg transition-all active:scale-95"
                disabled={isOutOfStock}
              >
                <ShoppingCart size={18} />
                {isOutOfStock ? "Notify Me" : "Add to Cart"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Truck className="text-green-600 mt-1" size={20} />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Fast Delivery
                </p>
                <p className="text-[11px] text-slate-500">
                  Reliable delivery across the country.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <CornerUpLeft className="text-green-600 mt-1" size={20} />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Secure Policy
                </p>
                <p className="text-[11px] text-slate-500">
                  Sealed items eligible for easy returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex gap-8 border-b border-slate-100 mb-8 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab("details")}
            className={cn(
              "pb-4 border-b-2 transition-all font-bold text-sm whitespace-nowrap",
              activeTab === "details"
                ? "border-green-600 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-600",
            )}
          >
            Product Details
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={cn(
              "pb-4 border-b-2 transition-all font-bold text-sm whitespace-nowrap",
              activeTab === "reviews"
                ? "border-green-600 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-600",
            )}
          >
            Reviews ({medicine.reviews?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab("seller")}
            className={cn(
              "pb-4 border-b-2 transition-all font-bold text-sm whitespace-nowrap",
              activeTab === "seller"
                ? "border-indigo-600 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-600",
            )}
          >
            Seller Information
          </button>
        </div>

        <div className="min-h-75">
          {activeTab === "details" && (
            <div className="grid md:grid-cols-3 gap-12 animate-in fade-in duration-500">
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-start gap-3">
                  <Info className="text-green-600 mt-1" size={18} />
                  <div className="space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {medicine.description}
                    </p>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 italic text-xs text-green-700">
                      <AlertCircle size={16} />
                      Note: Please consult with a doctor before consuming any
                      medication.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 text-white h-fit shadow-sm shadow-green-600">
                <h4 className="font-bold flex items-center gap-2 mb-6">
                  <Layers size={18} className="text-green-600" /> Technical
                  Details
                </h4>
                <ul className="space-y-4 text-xs">
                  <li className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-slate-400 uppercase">
                      Manufacturer
                    </span>
                    <span className="font-bold tracking-wide">
                      {medicine.manufacturer}
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-slate-400 uppercase">Category</span>
                    <span className="font-bold">
                      {medicine?.category?.name || "General"}
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-slate-400 uppercase">Rating</span>
                    <span className="font-bold flex items-center gap-1">
                      4.8{" "}
                      <Star
                        size={10}
                        className="fill-amber-400 text-amber-400"
                      />
                    </span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-slate-400 uppercase">
                      Verified Seller
                    </span>
                    <span className="text-green-600 font-bold">Authorized</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400 animate-in slide-in-from-bottom-2 duration-500">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">
                No reviews yet for this product.
              </p>
              <Button variant="link" className="text-green-600 mt-2">
                Be the first to review
              </Button>
            </div>
          )}

          {activeTab === "seller" && (
            <div className="border border-slate-100 rounded-2xl p-8 animate-in zoom-in-95 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-14 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <UserCheck size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-400 text-lg">
                    MNA Authorized Pharma
                  </h3>
                  <p className="text-xs text-slate-500">
                    Certified Medical Distributor Since 2020
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 max-w-2xl mb-6">
                This seller is verified by MNA-Medistore. All products sold by
                this seller are sourced directly from manufacturers and stored
                in temperature-controlled environments.
              </p>
              <Button variant="outline" className="rounded-xl px-8">
                Visit Store
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AlertCircle({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
