"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Pill,
  Truck,
  ShieldCheck,
  Clock,
} from "lucide-react";
import HomeSectionTitle from "./HomeSectionTitle";

const faqs = [
  {
    question: "How do I upload my prescription to MNA MediStore?",
    answer:
      "You can easily upload your prescription during the checkout process. Just click on the 'Upload Prescription' button, select the image or PDF file, and our licensed pharmacists will verify it before processing your order.",
    icon: <Pill className="text-blue-500" size={20} />,
  },
  {
    question: "Is the medicine sold here 100% authentic?",
    answer:
      "Yes, at MNA MediStore, we source all medicines directly from authorized manufacturers like Incepta, Square, and Beximco. Every medicine is stored in temperature-controlled environments to ensure maximum efficacy.",
    icon: <ShieldCheck className="text-emerald-500" size={20} />,
  },
  {
    question: "How long does the delivery take within Bangladesh?",
    answer:
      "We offer express delivery. Inside Dhaka, you will receive your medicine within 4-6 hours. For outside Dhaka, it usually takes 24-48 hours via our specialized courier partners.",
    icon: <Truck className="text-indigo-500" size={20} />,
  },
  {
    question: "Can I return a medicine if it's damaged?",
    answer:
      "If you receive a damaged or wrong medicine, you can return it instantly to our delivery person. Please ensure the seal is not broken. You can also contact our support within 24 hours for a full refund or replacement.",
    icon: <Clock className="text-amber-500" size={20} />,
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <HomeSectionTitle firstTitle="Common" lastTitle="Queries" />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`group rounded-2xl border transition-all duration-500 ${
                  isOpen
                    ? "bg-slate-50 dark:bg-slate-900/50 border-green-500 dark:border-green-800 shadow-xl shadow-green-500/5"
                    : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-green-100 dark:hover:border-green-900"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-7 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`transition-all duration-500 ${isOpen ? "scale-110" : "opacity-50 grayscale"}`}
                    >
                      {faq.icon}
                    </div>
                    <span
                      className={`text-lg font-bold transition-colors duration-300 ${
                        isOpen
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded-full transition-all duration-500 ${
                      isOpen
                        ? "bg-green-700 text-white rotate-180"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-8 pl-16 text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    <div className="w-full h-px bg-slate-200/50 dark:bg-slate-800/50 mb-6" />
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-0.5 bg-linear-to-r from-green-500 to-green-600 rounded-xl">
          <div className="bg-white dark:bg-slate-950 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">
                Need Urgent Help?
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Our pharmacists are online to assist you with prescriptions.
              </p>
            </div>
            <a
              href="tel:+880123456789"
              className="px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-600/20 active:scale-95"
            >
              Call Pharmacist Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
