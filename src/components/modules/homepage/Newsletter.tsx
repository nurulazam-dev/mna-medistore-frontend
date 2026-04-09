"use client";

import { Button } from "@/components/ui/button";
import { Send, Mail, BellRing, ShieldCheck } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-12 px- overflow-hidden relative">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `,
        }}
      />

      {/* <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div> */}

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="bg-slate-200 dark:bg-slate-900/50 rounded-xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(#4f46e5 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                <BellRing size={14} />
                Stay Updated
              </div>

              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                Health tips & Tech <br />
                <span className="text-green-700">Updates in your Inbox.</span>
              </h2>

              <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto lg:mx-0">
                Join our community to get the latest healthcare news and tech
                insights from MNA ServiceHub.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <ShieldCheck size={16} className="text-indigo-500" /> No Spam,
                  Ever.
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <ShieldCheck size={16} className="text-indigo-500" />{" "}
                  Unsubscribe anytime.
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-xl p-2 rounded-xl border border-white/10 shadow-inner">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col md:flex-row items-center gap-2"
                >
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full dark:bg-slate-800/50 border border-slate-700 text-white text-sm rounded-xl px-14 py-5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-600/20 group"
                  >
                    Subscribe
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </button>
                </form>
              </div>

              <p className="text-center mt-6 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                Trusted by 50,000+ Professionals & Patients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
