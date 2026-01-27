import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  Linkedin,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const footerLinks = [
  {
    title: "Overview",
    href: "#",
  },
  {
    title: "Medicines",
    href: "/medicines",
  },
  {
    title: "Careers",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
];

const Footer = () => {
  return (
    <div className="flex flex-col">
      <footer className="border-t">
        <div className="mx-auto max-w-(--breakpoint-xl)">
          <div className="grid grid-cols-12 grid-rows-1 gap-5 p-4">
            {/* brand details part */}
            <div className="col-span-5">
              <div className="flex items-center gap-2">
                <Image
                  src="/mna-mediStore.png"
                  alt="Logo"
                  height={48}
                  width={48}
                  preload
                />
                <p className="font-bold text-2xl text-green-600">
                  MNA MediStore
                </p>
              </div>
              <p className="text-sm mb-3">Your Trusted Online Medicine Shop</p>
              {/* <Separator className="my-1" /> */}
              <p className="text-muted-foreground">
                MediStore is a e-commerce pharmacy/shop for purchasing
                over-the-counter (OTC) medicines. You can browse medicines, add
                to cart, and place orders.
              </p>
            </div>
            {/* Quick Link part */}
            <div className="col-span-2">
              <h6 className="font-bold text-xl">Quick Link :</h6>
              <ul className="mt-2">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      className="text-muted-foreground hover:text-foreground"
                      href={href}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Quick Link part */}
            <div className="col-span-2">
              <h6 className="font-bold text-xl">Quick Link :</h6>
              <ul className="mt-2">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      className="text-muted-foreground hover:text-foreground"
                      href={href}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* subscribe part */}
            <div className="w-full max-w-xs col-span-3">
              <h6 className="font-bold text-xl">Stay up to date</h6>
              <form className="my-6 flex items-center gap-2">
                <Input placeholder="Enter your email" type="email" />
                <Button>Subscribe</Button>
              </form>
              {/* logo */}
              <div className="flex pl-2 items-center gap-5 text-muted-foreground">
                <Link href="/" target="_blank">
                  <InstagramIcon className="h-5 w-5" />
                </Link>
                <Link href="/" target="_blank">
                  <FacebookIcon className="h-5 w-5" />
                </Link>
                <Link href="/" target="_blank">
                  <TwitterIcon className="h-5 w-5" />
                </Link>

                <Link href="/" target="_blank">
                  <YoutubeIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 py-3 sm:flex-row xl:px-0">
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                MNA MediStore
              </Link>
              . All rights reserved.
            </span>
            {/* logo */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span className="">Develop By :</span>
              <Link
                href="/"
                target="_blank"
                className="border rounded-full p-1"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="/"
                target="_blank"
                className="border rounded-full p-1"
              >
                <GithubIcon className="h-5 w-5" />
              </Link>
              <span>@nurulazam-dev</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
