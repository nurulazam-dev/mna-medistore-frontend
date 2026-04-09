import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredProducts = [
  {
    id: "0097717f-7c24-48b2-835a-1e4eddf362c3",
    name: "Domperidone 10mg",
    description:
      "Anti-dopaminergic medicine used to treat nausea, vomiting, and stomach discomfort.",
    image:
      "https://res.cloudinary.com/mnaofficialbd/image/upload/v1770899292/medicines/Domperidone_10mg_escniy.webp",
    price: "5.80",
    manufacturer: "Janssen",
    rating: 4.8,
  },
  {
    id: "852649ef-b2b9-4867-8f78-acacfb9f1e71",
    name: "Insulin Glargine",
    description:
      "Long-acting basal insulin analogue, given once daily to manage diabetes effectively.",
    image:
      "https://res.cloudinary.com/mnaofficialbd/image/upload/v1770899286/medicines/Insulin_Glargine_kypsoj.jpg",
    price: "85.00",
    manufacturer: "Eli Lilly",
    rating: 4.9,
  },
  {
    id: "42f91e47-0588-4748-b446-307d60d9b12b",
    name: "Azithromycin 250mg",
    description:
      "Effective against a wide variety of bacterial infections with a short recovery course.",
    image:
      "https://res.cloudinary.com/mnaofficialbd/image/upload/v1770899290/medicines/Azithromycin_250mg_esifjy.jpg",
    price: "25.00",
    manufacturer: "Incepta Pharmaceuticals",
    rating: 4.7,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              Featured{" "}
              <span className="text-indigo-600 dark:text-indigo-500">
                Healthcare
              </span>{" "}
              Essentials
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Explore our top-rated medical supplies and medicines, verified for
              quality and safety by MNA Healthcare.
            </p>
          </div>
          <Link
            href="/medicines"
            className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400 group transition-all"
          >
            View All Products
            <ArrowRight
              size={20}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.2)] hover:-translate-y-2"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width={300}
                  height={200}
                />

                <div className="absolute top-5 left-5">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest shadow-sm dark:text-white border border-slate-100 dark:border-slate-700">
                    {product.manufacturer}
                  </span>
                </div>

                <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Button className="p-3 bg-white dark:bg-slate-900 rounded-full text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white transition-all transform translate-y-10 group-hover:translate-y-0 delay-0">
                    <Eye size={20} />
                  </Button>
                  <Button className="p-3 bg-white dark:bg-slate-900 rounded-full text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white transition-all transform translate-y-10 group-hover:translate-y-0 delay-[50ms]">
                    <ShoppingCart size={20} />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Price
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      ${product.price}
                    </span>
                  </div>

                  <Button className="px-6 py-3 rounded-lg bg-slate-900 dark:bg-green-600 text-white text-sm font-bold hover:bg-green-600 dark:hover:bg-indigo-800 transition-all shadow-lg active:scale-95">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
