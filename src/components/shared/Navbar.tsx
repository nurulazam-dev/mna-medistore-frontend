"use client";

import { Menu, LogOut, User, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";

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
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import CartDrawer from "../modules/order/CartDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUserType } from "@/types";

interface MenuItem {
  title: string;
  url: string;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/mna-mediStore.png",
    alt: "logo",
    title: "MediStore",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Medicines", url: "/medicines" },
    { title: "About Us", url: "/about-us" },
    { title: "Contact Us", url: "/contact-us" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
  },
  className,
}: Navbar1Props) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user as IUserType | undefined;
  // if (!user) return null;

  const getDashboardPath = () => {
    switch (user?.role) {
      case "ADMIN":
        return "/admin-dashboard/dashboard";
      case "SELLER":
        return "/seller-dashboard/dashboard";
      case "CUSTOMER":
        return "/dashboard/overview";
      default:
        return "/dashboard";
    }
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <section
      className={cn(
        "py-2 border-b border-b-lime-950 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* ===============
            Desktop Menu
        ================ */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-1">
              <Image
                src={logo.src}
                height={40}
                width={40}
                alt={logo.alt}
                preload
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-bold tracking-tighter">
                {logo.title}
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      )}
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <CartDrawer />
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "N/A"}
                      />
                      <AvatarFallback className="bg-primary/10">
                        <User className="size-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href={getDashboardPath()}
                      className="flex w-full items-center"
                    >
                      <LayoutDashboard className="mr-2 size-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:bg-destructive focus:text-white cursor-pointer"
                  >
                    <LogOut className="mr-2 size-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" size="lg">
                <Link href={auth.login.url}>{auth.login.title}</Link>
              </Button>
            )}
          </div>
        </nav>

        {/* ===========
          Mobile Menu
        ============= */}

        <div className="flex items-center justify-between px-2 lg:hidden">
          <Link href={logo.url} className="flex items-center gap-2">
            <Image src={logo.src} height={40} width={40} alt={logo.alt} />
            <span className="font-bold text-2xl">{logo.title}</span>
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2 text-2xl">
                    <Image src={logo.src} height={40} width={40} alt="logo" />
                    {logo.title}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-3 py-3 mx-5">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-md font-medium hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <ModeToggle />
                  {user ? (
                    <div className="flex flex-col gap-4">
                      <Link
                        href={getDashboardPath()}
                        className="flex justify-center w-full items-center border rounded-md hover:bg-green-600 py-1.5"
                      >
                        <LayoutDashboard className="mr-2 size-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full"
                      >
                        <LogOut className="mr-2 size-4" /> Log Out
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href={auth.login.url}>Login</Link>
                    </Button>
                  )}
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
