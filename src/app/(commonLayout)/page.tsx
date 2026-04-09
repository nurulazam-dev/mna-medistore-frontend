import AboutUsStats from "@/components/modules/AboutUs/AboutUsStats";
import WhyChooseUs from "@/components/modules/AboutUs/WhyChooseUs";
import Certifications from "@/components/modules/homepage/Certifications";
import Contact from "@/components/modules/homepage/Contact";
import CustomerReview from "@/components/modules/homepage/CustomerReview";
import FAQSection from "@/components/modules/homepage/FAQSection";
import FeaturedProducts from "@/components/modules/homepage/FeaturedProducts";
import Hero from "@/components/modules/homepage/Hero";
import HowItWorks from "@/components/modules/homepage/HowItWorks";
import KeyFeatures from "@/components/modules/homepage/KeyFeatures";
import MedicineCategories from "@/components/modules/homepage/MedicineCategories";
import Newsletter from "@/components/modules/homepage/Newsletter";
import PartnerBrands from "@/components/modules/homepage/PartnerBrands";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-(--breakpoint-xl) px-6">
      <Hero />
      <MedicineCategories />
      <KeyFeatures />
      <FeaturedProducts />
      <AboutUsStats />
      <WhyChooseUs />
      <Certifications />
      <HowItWorks />
      <CustomerReview />
      <PartnerBrands />
      {/* <HealthBlogs /> */}
      <FAQSection />
      <Newsletter />
      <Contact />
    </main>
  );
}
