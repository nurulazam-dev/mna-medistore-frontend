import AboutUsHero from "@/components/modules/AboutUs/AboutUsHero";
import AboutUsStats from "@/components/modules/AboutUs/AboutUsStats";
import WhyChooseUs from "@/components/modules/AboutUs/WhyChooseUs";

export default function AboutUsPage() {
  return (
    <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6">
      <AboutUsHero />
      <AboutUsStats />
      <WhyChooseUs />
    </div>
  );
}
