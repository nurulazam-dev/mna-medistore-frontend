import Image from "next/image";
import HomeSectionTitle from "../homepage/HomeSectionTitle";

export default function WhyChooseUs() {
  return (
    <section className="py-12 container mx-auto px-6">
      <HomeSectionTitle firstTitle="Why" lastTitle="Choose Us?" />
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <p className="text-muted-foreground italic border-l-4 border-primary pl-4">
              "We don't just sell medicines; we dream of building a healthier
              life for everyone."
            </p>
            <ul className="space-y-3">
              {[
                "Every order is verified and checked by licensed pharmacists.",
                "Temperature-controlled delivery bags are used for sensitive items.",
                "Our return and refund policy is simple and transparent.",
                "24/7 customer care and emergency support availability.",
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="size-2 bg-primary rounded-full" />
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-48 rounded-xl overflow-hidden border relative">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop"
                alt="Doctor"
                fill
                className="object-cover"
              />
            </div>
            <div className="h-64 rounded-xl overflow-hidden border relative">
              <Image
                src="https://res.cloudinary.com/mnaofficialbd/image/upload/v1770899290/medicines/Azithromycin_250mg_esifjy.jpg"
                alt="Medicine Storage"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="h-64 rounded-xl overflow-hidden border relative">
              <Image
                src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1374&auto=format&fit=crop"
                alt="Customer Support"
                fill
                className="object-cover"
              />
            </div>
            <div className="h-48 rounded-xl overflow-hidden border relative">
              <Image
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1479&auto=format&fit=crop"
                alt="Delivery"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
