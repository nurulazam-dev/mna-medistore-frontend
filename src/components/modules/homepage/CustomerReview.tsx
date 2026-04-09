import HomeSectionTitle from "./HomeSectionTitle";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reviewsData } from "@/components/shared/data";

export default function CustomerReview() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="max-w-7xl mx-auto">
        <HomeSectionTitle firstTitle="Customer" lastTitle="Review" />

        <div className="px-5 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[50%] lg:auto-cols-[33.333333%] gap-0 ml-0">
              {reviewsData.map((review) => (
                <CarouselItem key={review.id} className="pl-4 my-4">
                  <Card className="h-full group relative p-4 rounded-lg border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] hover:-translate-y-2 cursor-default">
                    <CardContent className="px-8 pt-2 flex flex-col justify-between h-full relative">
                      <Quote className="absolute -top-1 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/14 transition-colors" />

                      <div>
                        <div className="flex gap-1 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground"
                              }
                            />
                          ))}
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic mb-8">
                          "{review.comment}"
                        </p>
                      </div>

                      <div className="flex items-center gap-4 border-t pt-4">
                        <Avatar className="h-12 w-12 border-2 border-violet-600">
                          <AvatarImage src={review.image} alt={review.name} />
                          <AvatarFallback>{review.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="font-bold text-foreground leading-none mb-1">
                            {review.name}
                          </h5>
                          <span className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">
                            {review.role}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 h-12 w-12 border-none bg-background shadow-lg hover:bg-primary hover:text-white transition-all" />
              <CarouselNext className="absolute -right-12 h-12 w-12 border-none bg-background shadow-lg hover:bg-primary hover:text-white transition-all" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
