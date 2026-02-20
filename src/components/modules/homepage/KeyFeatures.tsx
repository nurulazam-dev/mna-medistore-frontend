import { features } from "@/components/shared/data";
import HomeSectionTitle from "./HomeSectionTitle";

export default function KeyFeatures() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12 ">
      <div className="container mx-auto px-4">
        <HomeSectionTitle firstTitle="Key" lastTitle="features" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`group bg-slate-200 dark:bg-slate-700 px-10 py-4 rounded-xl border-slate-100 shadow-sm border-t-8 ${item.color} hover:shadow-md hover:shadow-indigo-50 transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div
                  className={`${item.iconColor} mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold dark:text-slate-300 text-slate-800 mb-3 group-hover:text-indigo-600">
                  {item.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  LEARN MORE <span className="text-lg">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
