import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { steps } from "@/components/shared/data";
import HomeSectionTitle from "./HomeSectionTitle";

export default function HowItWorks() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <HomeSectionTitle firstTitle="How It" lastTitle="Works" />

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-muted-foreground/20 -translate-y-1/2 hidden lg:block z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;

              return (
                <div key={idx} className="group flex flex-col items-center">
                  <div className="relative mb-8">
                    <div
                      className={`absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${step.bg}`}
                    />

                    <Card
                      className={`relative w-28 h-28 ${step.bg} ${step.border} border-2 rounded-lg flex items-center justify-center shadow-none group-hover:shadow-lg group-hover:-translate-y-2 transition-all duration-500 overflow-visible`}
                    >
                      <CardContent className="p-0 flex items-center justify-center">
                        <div
                          className={`${step.color} transition-transform duration-300 group-hover:scale-110`}
                        >
                          <IconComponent className="w-10 h-10" />
                        </div>
                      </CardContent>

                      <div className="absolute -top-2 -left-2">
                        <Badge className="h-8 w-8 rounded-xl flex items-center justify-center font-black p-0 border-2 border-background shadow-xl">
                          {idx + 1}
                        </Badge>
                      </div>
                    </Card>

                    {idx !== steps.length - 1 && (
                      <div className="absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2 hidden lg:block text-muted-foreground/30">
                        <ChevronRight size={32} strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  <div className="text-center max-w-50">
                    <h4 className="text-xl font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {idx !== steps.length - 1 && (
                    <div className="lg:hidden mt-8 h-12 w-0.5 bg-linear-to-b from-muted-foreground/20 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 px-6 py-4 bg-secondary/30 backdrop-blur-sm border border-border rounded-xl hover:bg-secondary/50 transition-colors cursor-default">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <p className="text-muted-foreground font-semibold text-sm tracking-wide">
              Average delivery time:{" "}
              <span className="text-foreground font-black">45 Minutes</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
