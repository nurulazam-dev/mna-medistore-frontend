"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "http://localhost:3000/",
    src: "/mna-mediStore.png",
    alt: "logo",
    title: "MNA MediStore",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Medicines", url: "/medicines" },
    { title: "Cart", url: "/cart" },
    { title: "Checkout", url: "/checkout" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  return (
    <section className={cn("py-2 border-b border-b-lime-950", className)}>
      <div className="container mx-auto px-4">
        {/* ===============
            Desktop Menu
        ================ */}
        <nav className="hidden items-center justify-between lg:flex">
          <div>
            <Link href={logo.url} className="flex items-center gap-1">
              <Image
                src={logo.src}
                height={48}
                width={48}
                alt={logo.alt}
                preload
              />
              <span className="text-2xl font-bold tracking-tighter">
                {logo.title}
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="lg">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="lg">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
            <Button variant="ghost" size="lg" className="text-end">
              admin <br /> admin@...com
            </Button>
            <Button variant="outline" size="lg">
              Log Out
            </Button>
            <ModeToggle />
          </div>
        </nav>

        {/* ===========
          Mobile Menu
        ============= */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                className="max-h-8"
                height={32}
                width={32}
                alt={logo.alt}
              />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image
                        src={logo.src}
                        className="max-h-8"
                        height={32}
                        width={32}
                        alt={logo.alt}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <ModeToggle />
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar };
