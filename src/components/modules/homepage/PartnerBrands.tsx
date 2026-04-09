import HomeSectionTitle from "./HomeSectionTitle";

const brands = [
  {
    name: "Janssen",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Janssen_Pharmaceuticals_logo.svg",
  },
  {
    name: "Novartis",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Novartis_logo.svg",
  },
  {
    name: "Sanofi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Sanofi_logo.svg",
  },
  {
    name: "GSK",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/03/GlaxoSmithKline_logo.svg",
  },
  { name: "Beximco", logo: "https://www.beximco.com/img/logo.png" },
  { name: "Square", logo: "https://www.squarepharma.com.bd/images/logo.png" },
];

export default function PartnerBrands() {
  return (
    <section className="py-12">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-3">
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base leading-relaxed">
            Powering Health with Technology
          </p>
          <HomeSectionTitle firstTitle="Trusted" lastTitle="Partners" />
        </div>

        <div className="relative overflow-hidden w-full">
          <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white dark:from-[#020617] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white dark:from-[#020617] to-transparent z-10"></div>

          <div className="animate-scroll">
            {brands.concat(brands).map((brand, index) => (
              <div
                key={index}
                className="mx-12 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 md:h-14 w-auto object-contain dark:brightness-200 dark:contrast-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
