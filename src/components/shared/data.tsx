import {
  Search,
  ShoppingCart,
  CreditCard,
  PackageCheck,
  UserRoundCheck,
  ShieldPlus,
  Truck,
  Clock,
  Pill,
  HeartPulse,
  UserCheck,
  Dna,
  Stethoscope,
  Tablets,
  Microscope,
  HeartCrack,
  Activity,
  Angry,
  PersonStanding,
} from "lucide-react";

export const reviewsData = [
  {
    id: 1,
    name: "Dr. Ariful Islam",
    role: "Licensed Pharmacist",
    image: "https://i.pravatar.cc/150?u=1",
    rating: 5,
    comment:
      "The delivery speed is incredible. As a healthcare professional, I'm impressed by their cold-chain maintenance for sensitive vaccines.",
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Regular Customer",
    image: "https://i.pravatar.cc/150?u=2",
    rating: 5,
    comment:
      "I've been ordering my monthly insulin for 6 months now. Their refill reminder feature is a lifesaver for busy people like me.",
  },
  {
    id: 3,
    name: "James Anderson",
    role: "Patient",
    image: "https://i.pravatar.cc/150?u=3",
    rating: 4,
    comment:
      "Very easy to upload prescriptions. Their pharmacists actually call to verify dosage if there's any confusion. Highly recommended!",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "Mother of Two",
    image: "https://i.pravatar.cc/150?u=4",
    rating: 5,
    comment:
      "The baby care section is extensive. I found diapers and baby supplements at a better price than my local pharmacy.",
  },
];

export const medicineCategories = [
  {
    name: "Antibiotics",
    items: "120+ Products",
    icon: Tablets,
    color: "text-blue-500",
  },
  {
    name: "Pain Relief",
    items: "80+ Products",
    icon: Angry,
    color: "text-pink-500",
  },
  {
    name: "Vitamins",
    items: "200+ Products",
    icon: Dna,
    color: "text-emerald-500",
  },
  {
    name: "Diabetes Care",
    items: "45+ Products",
    icon: Activity,
    color: "text-red-500",
  },

  {
    name: "Cardiac Care",
    items: "60+ Products",
    icon: HeartCrack,
    color: "text-orange-500",
  },
  {
    name: "Gastrointestinal",
    items: "30+ Products",
    icon: PersonStanding,
    color: "text-teal-500",
  },
  {
    name: "Dermatology",
    items: "50+ Products",
    icon: Microscope,
    color: "text-indigo-500",
  },
  {
    name: "Respiratory",
    items: "90+ Products",
    icon: Stethoscope,
    color: "text-purple-500",
  },
];

export const steps = [
  {
    title: "Search & Select",
    desc: "Find your medicine",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Add to Cart",
    desc: "Review your list",
    icon: ShoppingCart,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    title: "Auth Access",
    desc: "Register or Login",
    icon: UserRoundCheck,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    title: "Checkout",
    desc: "Confirm & Pay",
    icon: CreditCard,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    title: "Order Received",
    desc: "Doorstep Delivery",
    icon: PackageCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

export const features = [
  {
    title: "100% Authentic Meds",
    desc: "Directly sourced from top pharmaceutical brands with strict quality control.",
    icon: ShieldPlus,
    color: "border-t-emerald-500",
    iconColor: "text-emerald-500",
  },
  {
    title: "Rapid Express Delivery",
    desc: "Get your life-saving medicines at your doorstep within 60 minutes in metro areas.",
    icon: Truck,
    color: "border-t-blue-500",
    iconColor: "text-blue-500",
  },
  {
    title: "Pharmacist Consultation",
    desc: "Talk to our certified pharmacists for any dosage or medication queries 24/7.",
    icon: UserCheck,
    color: "border-t-indigo-500",
    iconColor: "text-indigo-500",
  },
  {
    title: "Easy Refill Plan",
    desc: "Never run out of meds. We'll automatically remind and restock your monthly prescriptions.",
    icon: Clock,
    color: "border-t-rose-500",
    iconColor: "text-rose-500",
  },
  {
    title: "Proper Storage Care",
    desc: "Temperature-controlled storage and packaging for sensitive vaccines and insulin.",
    icon: Pill,
    color: "border-t-amber-500",
    iconColor: "text-amber-500",
  },
  {
    title: "Digital Prescription",
    desc: "Securely store and access your medical history and prescriptions anytime, anywhere.",
    icon: HeartPulse,
    color: "border-t-purple-500",
    iconColor: "text-purple-500",
  },
];

export const footerLinks = [
  {
    section: "Quick Links :",
    items: [
      { label: "Medicines", path: "/medicines" },
      { label: "Cart", path: "/cart" },
      { label: "Orders", path: "/orders" },
      { label: "Profile", path: "/profile" },
    ],
  },
  {
    section: "Links :",
    items: [
      { label: "Careers", path: "/careers" },
      { label: "Help", path: "/help" },
      { label: "Privacy Policy", path: "/privacy-policy" },
    ],
  },
];
