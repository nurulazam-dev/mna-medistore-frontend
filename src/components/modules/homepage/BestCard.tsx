"use client";

import { MapPin, Clock, PhoneCall } from "lucide-react";

const BestCard = () => {
  const cardData = [
    {
      id: 1,
      title: "Our Location",
      desc: "Raozan, Chattogram, BD.",
      gradient:
        "from-white to-green-500 dark:from-slate-900 dark:to-emerald-900/20",
      border: "dark:border-emerald-800/50",
      icon: <MapPin className="text-green-600 dark:text-green-400" size={40} />,
    },
    {
      id: 2,
      title: "Opening Hours",
      desc: "24/7 Every day, every time.",
      gradient:
        "from-violet-200 to-green-200 dark:from-slate-900 dark:to-blue-900/20",
      border: "dark:border-blue-800/50",
      icon: <Clock className="text-blue-600 dark:text-blue-400" size={40} />,
    },
    {
      id: 3,
      title: "Contact Us Now",
      desc: "+88 01800-123456",
      gradient:
        "from-green-500 to-white dark:from-slate-900 dark:to-teal-900/20",
      border: "dark:border-teal-800/50",
      icon: (
        <PhoneCall className="text-indigo-700 dark:text-indigo-400" size={40} />
      ),
    },
  ];

  return (
    <section className="max-w-5xl container mx-auto mt-12 mb-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((data) => (
          <div
            key={data.id}
            className={`flex items-center gap-6 p-4 dark:rounded dark:border ${data.border} bg-linear-to-r ${data.gradient} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
          >
            <div className="shrink-0 w-16 h-16 rounded-md bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {data.icon}
            </div>

            <div className="flex flex-col">
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-1">
                {data.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                {data.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestCard;
