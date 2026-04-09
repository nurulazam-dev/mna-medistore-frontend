import React from "react";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  FileText,
  BadgeCheck,
} from "lucide-react";
import HomeSectionTitle from "./HomeSectionTitle";

const certifications = [
  {
    title: "ISO 9001:2015 Certified",
    org: "Quality Management System",
    description:
      "International standard for quality management systems in healthcare services.",
    icon: <ShieldCheck className="text-emerald-500" size={32} />,
    id: "ISO-QMS-2026",
  },
  {
    title: "GDPR Compliant",
    org: "Data Privacy & Security",
    description:
      "Ensuring the highest level of security and privacy for patient and user data.",
    icon: <BadgeCheck className="text-indigo-500" size={32} />,
    id: "GDPR-MNA-09",
  },
  {
    title: "Licensed Pharmaceutical Distributor",
    org: "DGDA Bangladesh",
    description:
      "Authorized and licensed for distributing medicine and healthcare products.",
    icon: <Award className="text-amber-500" size={32} />,
    id: "DGDA-LIC-550",
  },
];

export default function Certifications() {
  return (
    <section className="py-12 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] border border-indigo-100 dark:border-indigo-900/50 mb-6 animate-pulse">
            <CheckCircle2 size={14} />
            Verified Excellence
          </span>
          <HomeSectionTitle firstTitle="Our" lastTitle="Certifications" />

          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base leading-relaxed">
            Leading the industry with globally recognized standards. We ensure
            security, quality, and professional compliance in every line of code
            and medical service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] hover:-translate-y-2 cursor-default"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-500" />

              <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:rotate-6 transition-transform duration-500">
                {cert.icon}
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {cert.title}
              </h3>

              <div className="text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-4 tracking-wide italic">
                {cert.org}
              </div>

              <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-10">
                {cert.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-tighter">
                    Credential ID
                  </p>
                  <code className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {cert.id}
                  </code>
                </div>

                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 transition-colors">
              <FileText size={18} />
            </div>
            Download Compliance & Audit Whitepaper (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}
