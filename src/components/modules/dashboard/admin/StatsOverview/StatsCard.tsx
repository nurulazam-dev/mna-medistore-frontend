import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
  borderColor,
}: any) {
  return (
    <Card className={`${borderColor} shadow-sm`}>
      {/* <Card className="border-none shadow-sm"> */}
      <CardContent className="px-4 flex items-center justify-between">
        <div className="mr-3">
          <p className="text-lg font-bold text-muted-foreground uppercase">
            {title}
          </p>
          <h3 className="text-2xl font-black">{value}</h3>
        </div>
        <div className={`${bg} p-1 rounded`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );
}
