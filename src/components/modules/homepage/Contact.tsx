import {
  LucideSend,
  MailIcon,
  MapPinIcon,
  MessageCircle,
  PhoneIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HomeSectionTitle from "./HomeSectionTitle";

const Contact = () => (
  <div className="flex min-h-screen items-center justify-center py-12">
    <div className="">
      <HomeSectionTitle firstTitle="Contact" lastTitle="Us" />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-14">
        <div className="w-full max-w-lg mx-auto">
          <div>
            <h2 className="font-semibold text-2xl tracking-tight md:text-3xl">
              Chat with our friendly team!
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-md">
              We&apos;d love to hear from you. Please fill out this form or
              shoot us an email.
            </p>
          </div>
          <div className="flex items-center gap-3 my-3 border rounded p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
              <MailIcon />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Email :</h3>
              <Link
                className="font-normal text-primary"
                href="mailto:contact@medistore.com"
              >
                contact@medistore.com
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 my-3 border rounded p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
              <MessageCircle />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Live chat</h3>
              <Link className="font-normal text-primary" href="#">
                Start new chat
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 my-3 border rounded p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
              <MapPinIcon />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Office</h3>
              <Link
                className="font-normal text-primary"
                href="https://map.google.com"
                target="_blank"
              >
                MediStore Market, Raojan <br /> Chattogram
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 my-3 border rounded p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
              <PhoneIcon />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Phone</h3>
              <Link
                className="font-normal text-primary"
                href="tel:+88 0172 123-3215"
              >
                +88 0172 123-3215
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Card className="relative isolate rounded shadow lg:ms-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex justify-center items-center gap-3 text-xl">
                Send Us
                <LucideSend />
              </CardTitle>
              <CardDescription>
                We&apos;d love to hear from you. Please fill out this form.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <form>
                <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      className="mt-2 h-10 bg-white shadow-none"
                      id="firstName"
                      placeholder="First name"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      className="mt-2 h-10 bg-white shadow-none"
                      id="lastName"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className="mt-2 h-10 bg-white shadow-none"
                      id="email"
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      className="mt-2 bg-white shadow-none"
                      id="message"
                      placeholder="Message"
                      rows={6}
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Checkbox className="bg-background" id="acceptTerms" />
                    <Label className="gap-0" htmlFor="acceptTerms">
                      You agree to our
                      <Link className="ml-1 underline" href="#">
                        terms and conditions
                      </Link>
                      <span>.</span>
                    </Label>
                  </div>
                </div>
                <Button className="mt-6 w-full" size="lg">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full h-64 rounded-xl mt-7 overflow-hidden border duration-500">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301!2d90.3910!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAzLjIiTiA5MMKwMjMnMjcuNiJF!5e0!3m2!1sen!2sbd!4v1625000000000"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
);

export default Contact;
