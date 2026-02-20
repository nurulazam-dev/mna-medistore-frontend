import { medicineCategories } from "@/components/shared/data";
import HomeSectionTitle from "./HomeSectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function MedicineCategories() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div className="max-w-7xl mx-auto px-4">
        <HomeSectionTitle firstTitle="Medicine" lastTitle="Category" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicineCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Link href={`/category/${category.name.toLowerCase()}`} key={idx}>
                <Card className="group shadow bg-secondary/20 hover:bg-secondary/50 transition-all duration-300 cursor-pointer overflow-hidden relative">
                  <CardContent className="px-8 flex flex-col items-center justify-center text-center">
                    <div
                      className={`mb-4 w-16 h-16 rounded-xl bg-background flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                    >
                      <Icon className={`w-9 h-9 ${category.color}`} />
                    </div>

                    <h4 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {category.items}
                    </p>

                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/20 transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
