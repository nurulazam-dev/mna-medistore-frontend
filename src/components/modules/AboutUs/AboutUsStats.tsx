import { Truck, Users, Activity, Award } from "lucide-react";

export default function AboutUsStats() {
  const stats = [
    { label: "Happy Customers", value: "50k+", icon: Users },
    { label: "Medicines Available", value: "10k+", icon: Activity },
    { label: "Delivery Partners", value: "100+", icon: Truck },
    { label: "Quality Awards", value: "15+", icon: Award },
  ];
  return (
    <section className="py-12 bg-green-800 dark:bg-slate-900 text-slate-200 rounded-lg">
      <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center space-y-2">
            <div className="flex justify-center">
              <stat.icon className="size-9" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {stat.value}
            </h2>
            <p className="text-sm opacity-80 font-medium uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
