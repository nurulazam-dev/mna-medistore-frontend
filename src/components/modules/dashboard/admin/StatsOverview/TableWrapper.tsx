import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TableWrapper({ title, icon: Icon, children }: any) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-1 border-b">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Icon size={28} className="text-indigo-500" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
