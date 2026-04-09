"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFromCart,
  addToCart,
  decreaseQuantity,
} from "@/redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-indigo-50 transition-colors"
        >
          <ShoppingCart className="h-6 w-6 text-slate-700" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l shadow-2xl">
        <SheetHeader className="p-6 border-b bg-slate-800">
          <SheetTitle className="flex items-center gap-2 text-xl font-black tracking-tight text-slate-200">
            <ShoppingBag className="text-green-600" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-slate-200 p-3 rounded-md border border-slate-100 shadow-sm transition-all hover:border-indigo-100"
                >
                  <div className="relative h-16 w-16 rounded dark:bg-slate-200 bg-slate-800 overflow-hidden shrink-0 border border-slate-400">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-contain p-1 transition-transform hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                        $ {Number(item.price).toFixed(2)} / unit
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-xl border-green-600 shadow-inner">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-xl hover:bg-indigo-50 text-slate-600"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          <Minus size={12} strokeWidth={3} />
                        </Button>
                        <span className="text-sm font-black w-8 text-center text-slate-700">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-xl hover:bg-indigo-50 text-slate-600"
                          onClick={() =>
                            dispatch(addToCart({ ...item, quantity: 1 }))
                          }
                        >
                          <Plus size={12} strokeWidth={3} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 border border-red-500 transition-colors"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className=" p-8 rounded-full border border-red-600">
                <ShoppingBag size={56} className="text-green-600" />
              </div>
              <div className="space-y-1 text-slate-700 dark:text-slate-400">
                <p className=" font-black text-lg">Your cart is empty</p>
                <p className=" text-sm">
                  Looks like you haven't added anything yet.
                </p>
              </div>
              <Button
                asChild
                className="rounded-md bg-green-600 px-8 py-6 font-bold text-white"
              >
                <Link href="/medicines">Explore Medicines</Link>
              </Button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-6  border-t flex-col sm:flex-col gap-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm font-medium dark:text-slate-400 text-slate-800">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-slate-600 dark:text-slate-300">
                <span>Total Amount</span>
                <span className="text-green-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-black text-base rounded-xl transition-all active:scale-[0.98]"
              asChild
            >
              <Link href="/checkout">Checkout Now</Link>
            </Button>
            <p className="text-[10px] text-center text-slate-600 dark:text-slate-400 uppercase tracking-widest font-black">
              Safe & Secure Payments
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
