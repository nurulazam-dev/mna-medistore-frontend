import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeSectionTitle from "../homepage/HomeSectionTitle";

export default function AboutUsHero() {
  return (
    <section className="relative py-12 overflow-hidden border-b">
      <HomeSectionTitle firstTitle="About" lastTitle="Us" />
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-bold uppercase tracking-wider">
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Your Trusted Partner in{" "}
            <span className="text-primary">Health & Wellness</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Since 2020, we have been working tirelessly to deliver accurate and
            high-quality medicines to every corner of the country. Our mission
            is to bring healthcare to everyone's doorstep through the innovative
            use of technology.
          </p>
          <div className="flex gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/medicines">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact-us">Contact Support</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border">
          <Image
            src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1470&auto=format&fit=crop"
            alt="Pharmacy Professional"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
