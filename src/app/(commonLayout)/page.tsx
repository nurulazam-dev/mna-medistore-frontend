import Contact from "@/components/modules/homepage/Contact";
import CustomerReview from "@/components/modules/homepage/CustomerReview";
import Hero from "@/components/modules/homepage/Hero";
import HowItWorks from "@/components/modules/homepage/HowItWorks";
import KeyFeatures from "@/components/modules/homepage/KeyFeatures";
import MedicineCategories from "@/components/modules/homepage/MedicineCategories";

export default function Home() {
  return (
    <main>
      <Hero />
      <KeyFeatures />
      <MedicineCategories />
      <HowItWorks />
      <CustomerReview />
      <Contact />
    </main>
  );
}
