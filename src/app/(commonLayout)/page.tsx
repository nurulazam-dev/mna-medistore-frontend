import AboutUsStats from "@/components/modules/AboutUs/AboutUsStats";
import WhyChooseUs from "@/components/modules/AboutUs/WhyChooseUs";
import Contact from "@/components/modules/homepage/Contact";
import CustomerReview from "@/components/modules/homepage/CustomerReview";
import Hero from "@/components/modules/homepage/Hero";
import HowItWorks from "@/components/modules/homepage/HowItWorks";
import KeyFeatures from "@/components/modules/homepage/KeyFeatures";
import MedicineCategories from "@/components/modules/homepage/MedicineCategories";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-(--breakpoint-xl) px-6">
      <Hero />
      <KeyFeatures />
      <MedicineCategories />
      {/* <FeaturedProducts /> */}
      {/* <Certifications /> */}
      {/* <FlashSales /> */}
      {/* <HealthBlogs /> */}
      {/* <PartnerBrands /> */}
      {/* <Newsletter /> */}
      {/* <FAQSection /> */}
      <HowItWorks />
      <AboutUsStats />
      <WhyChooseUs />
      <CustomerReview />
      <Contact />
    </main>
  );
}
