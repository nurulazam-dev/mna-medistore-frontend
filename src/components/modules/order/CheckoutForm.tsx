"use client";

import { useTransition } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Truck,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ICreateOrderPayload, IOrderItemPayload } from "@/types";
import { createOrder } from "@/actions/order.action";

export default function CheckoutForm() {
  const [isPending, startTransition] = useTransition();
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const shippingFee = items.length > 0 ? 10.0 : 0;
  const grandTotal = totalPrice + shippingFee;

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const phone = formData.get("phone") as string;

    const orderItems: IOrderItemPayload[] = items.map((item) => ({
      medicineId: item.id,
      sellerId: item.sellerId || "",
      quantity: item.quantity,
    }));

    const payload: ICreateOrderPayload = {
      items: orderItems,
      shipping_address: `${address}, ${city}. Phone: ${phone}`,
      total_amount: grandTotal,
    };

    startTransition(async () => {
      const result = await createOrder(payload);

      if (result.success) {
        toast.success("Order Placed Successfully!");
        dispatch(clearCart());
        router.push("/dashboard/orders");
      } else {
        toast.error(result.error || "Something went wrong!");
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="p-8 rounded-full border border-red-600">
          <ShoppingBag size={80} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-700 dark:text-slate-400">
          Your cart is empty
        </h2>
        <Button asChild className="bg-green-600 rounded px-8">
          <Link href="/medicines">Browse Medicines</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto px-4 py-5 max-w-7xl">
      <div className="mb-5">
        <Link
          href="/medicines"
          className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-green-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to medicines
        </Link>
        <h1 className="text-4xl font-black text-slate-800 dark:text-slate-300 mt-2 tracking-tight">
          Checkout <span className="text-green-600">Details</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-10">
          <section className="space-y-6 dark:bg-slate-900 p-8 rounded-md border shadow-md border-slate-300">
            <div className="flex items-center gap-3 text-green-600 font-black uppercase text-md tracking-widest border-b border-slate-300 pb-2">
              <MapPin size={18} /> Shipping Address
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="font-bold text-slate-600 dark:text-slate-300"
                >
                  First Name
                </Label>
                <Input
                  name="firstName"
                  id="firstName"
                  placeholder="John"
                  required
                  className="h-12 rounded-md text-slate-700 dark:text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="font-bold text-slate-600 dark:text-slate-300"
                >
                  Last Name
                </Label>
                <Input
                  name="lastName"
                  id="lastName"
                  placeholder="Doe"
                  required
                  className="h-12  rounded-md text-slate-700 dark:text-slate-200"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label
                  htmlFor="address"
                  className="font-bold text-slate-600 dark:text-slate-300"
                >
                  Street Address
                </Label>
                <Input
                  name="address"
                  id="address"
                  placeholder="House 123, Road 4, Sector 7"
                  required
                  className="h-12 rounded-md text-slate-700 dark:text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="font-bold text-slate-600 dark:text-slate-300"
                >
                  Phone Number
                </Label>
                <Input
                  name="phone"
                  id="phone"
                  type="tel"
                  placeholder="+880 123456789"
                  required
                  className="h-12 rounded-md text-slate-700 dark:text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="font-bold text-slate-600 dark:text-slate-300"
                >
                  City
                </Label>
                <Input
                  name="city"
                  id="city"
                  placeholder="Chittagong"
                  required
                  className="h-12 rounded-md text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
          </section>

          <section className="space-y-6 dark:bg-slate-900 py-5 px-8 rounded-md border shadow-md border-slate-300">
            <div className="flex items-center gap-3 text-green-600 font-black uppercase text-md tracking-widest border-b border-slate-300 pb-2">
              <CreditCard size={18} /> Payment Method
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative flex items-center justify-between p-5 border-2 border-green-600 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full border-4 border-green-600 bg-white" />
                  <span className="font-black text-slate-700 dark:text-slate-300">
                    Cash on Delivery
                  </span>
                </div>
                <Truck className="text-green-600" size={20} />
              </div>

              <div className="flex items-center justify-between p-5 border-2 border-slate-700 dark:border-slate-100 rounded-2xl opacity-40 grayscale cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full border-2 border-slate-600 dark:border-slate-200" />
                  <span className="font-black text-slate-600 dark:text-slate-400">
                    Online Payment
                  </span>
                </div>
                <CreditCard
                  className="text-slate-600 dark:text-slate-300"
                  size={20}
                />
              </div>
            </div>
          </section>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-16 bg-green-600 hover:bg-green-700 text-white text-lg font-black rounded-md shadow shadow-green-100 transition-all active:scale-[0.98]"
          >
            {isPending
              ? "Processing Order..."
              : `Confirm Order • $${grandTotal.toFixed(2)}`}
          </Button>
        </form>

        <aside className="space-y-6">
          <div className="dark:bg-slate-900 rounded-md border shadow-md border-slate-300 p-8 text-slate-700 dark:text-white  sticky top-24">
            <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
              <ShoppingBag className="text-green-600" /> Summary
            </h3>
            <Separator className="bg-slate-300 my-2" />
            <div className="space-y-6 max-h-87.5 overflow-y-auto mt-5 pr-2 custom-scrollbar">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start group"
                >
                  <div className="flex gap-4">
                    <div className="relative h-14 w-14 rounded border border-slate-500 dark:border-slate-300 overflow-hidden shrink-0">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-bold mt-1">
                        QTY: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                    $ {(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-8 bg-slate-300 dark:bg-white/10" />

            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
                <span>Cart Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
                <span>Delivery Fee</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-4 border-t border-slate-300 dark:border-white/10 mt-4">
                <span>Total</span>
                <span className="text-green-600">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-10 bg-white/5 border border-slate-300 dark:border-white/10 p-5 rounded-2xl">
              <div className="flex items-center gap-2 text-green-600 text-xs font-black uppercase tracking-widest mb-2">
                <ShieldCheck size={14} /> Secure Checkout
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your health data and payment information are encrypted and
                secured under medical privacy standards.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
