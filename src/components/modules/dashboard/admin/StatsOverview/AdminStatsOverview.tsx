"use client";

import {
  Users,
  DollarSign,
  Package,
  Activity,
  TrendingUp,
  Star,
  Award,
  UserPlus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICategoryType, IMedicineType, IOrderType, IUserType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import TableWrapper from "./TableWrapper";
import StatsCard from "./StatsCard";

export default function AdminStatsOverview({
  users,
  usersCount,
  categories,
  orders,
  medicines,
  medicinesCount,
}: {
  users: IUserType[];
  usersCount: number;
  categories: ICategoryType[];
  orders: IOrderType[];
  medicines: IMedicineType[];
  medicinesCount: number;
}) {
  const totalMedicines = medicinesCount;
  const totalRevenue = orders
    ?.filter((o) => o?.status !== "CANCELLED")
    .reduce((sum, o) => sum + Number(o?.total_amount), 0);

  const userRoleData = [
    { name: "Admin", value: users?.filter((u) => u?.role === "ADMIN")?.length },
    {
      name: "Seller",
      value: users?.filter((u) => u?.role === "SELLER")?.length,
    },
    {
      name: "Customer",
      value: users?.filter((u) => u?.role === "CUSTOMER")?.length,
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-[10px] font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const recentUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime(),
    )
    .slice(0, 5);

  const sellerRevenueMap: any = {};
  orders?.forEach((order) => {
    order?.items?.forEach((item: any) => {
      const sellerId = item?.sellerId;
      sellerRevenueMap[sellerId] =
        (sellerRevenueMap[sellerId] || 0) + Number(item?.sub_total);
    });
  });

  const topSellers = Object.entries(sellerRevenueMap)
    .map(([id, revenue]) => ({
      id,
      revenue: revenue as number,
      name: users?.find((u) => u?.id === id)?.name || "N/A",
    }))
    .sort((a, b) => b?.revenue - a?.revenue)
    .slice(0, 5);

  const medicineSalesMap: any = {};
  orders?.forEach((order) => {
    order?.items?.forEach((item: any) => {
      medicineSalesMap[item?.medicineId] =
        (medicineSalesMap[item?.medicineId] || 0) + item?.quantity;
    });
  });

  const topMedicines = Object.entries(medicineSalesMap)
    .map(([id, qty]) => ({
      id,
      qty: qty as number,
      name: medicines?.find((m) => m?.id === id)?.name || "N/A",
    }))
    .sort((a, b) => b?.qty - a?.qty)
    .slice(0, 5);

  const categorySalesMap: any = {};
  medicines?.forEach((med) => {
    const catName =
      categories?.find((c) => c?.id === med?.categoryId)?.name || "Others";
    categorySalesMap[catName] =
      (categorySalesMap[catName] || 0) + (medicineSalesMap[med?.id] || 0);
  });

  const topCategories = Object.entries(categorySalesMap)
    .map(([name, sales]) => ({ name, sales: sales as number }))
    .sort((a, b) => b?.sales - a?.sales)
    .slice(0, 5);

  const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

  const statsCardsData = [
    {
      title: "Total Revenue",
      value: `$ ${totalRevenue?.toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      borderColor: "border-l-4 border-l-indigo-500",
    },
    {
      title: "Total Users",
      value: usersCount,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      borderColor: "border-l-4 border-l-slate-300",
    },
    {
      title: "Total Medicines",
      value: totalMedicines,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
      borderColor: "border-l-4 border-l-amber-500",
    },
    {
      title: "Live Categories",
      value: categories?.length,
      icon: TrendingUp,
      color: "text-violet-600",
      bg: "bg-violet-50",
      borderColor: "border-l-4 border-l-emerald-500",
    },
  ];

  return (
    <div className="space-y-6 pb-5">
      <div className="grid gap-4 md:grid-cols-4">
        {statsCardsData?.map((item) => (
          <StatsCard
            key={item.title}
            title={item?.title}
            value={item?.value}
            icon={item?.icon}
            color={item?.color}
            bg={item?.bg}
            borderColor={item?.borderColor}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              User Segmentation (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoleData}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userRoleData?.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Top Categories by Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCategories} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  opacity={0.2}
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  fontSize={12}
                  width={80}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="sales"
                  fill="#8b5cf6"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TableWrapper title="Recent Registered Users" icon={UserPlus}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-green-500">User</TableHead>
                <TableHead className="text-green-500">Role</TableHead>
                <TableHead className="text-green-500">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers?.map((u) => (
                <TableRow key={u?.id}>
                  <TableCell>
                    <p className="font-medium text-xs">{u?.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {u?.email}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px]">
                      {u?.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[10px]">
                    {formatDate(u?.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        <TableWrapper title="Top Revenue Sellers" icon={Award}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-green-500">Seller Name</TableHead>
                <TableHead className="text-right text-green-500">
                  Revenue
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSellers?.map((s) => (
                <TableRow key={s?.id}>
                  <TableCell className="text-xs font-medium">
                    {s?.name}
                  </TableCell>
                  <TableCell className="text-right">
                    $ {s?.revenue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        <TableWrapper title="Top Selling Medicines" icon={Star}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-green-500">Medicine</TableHead>
                <TableHead className="text-right text-green-500">
                  Sold Qty
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topMedicines?.map((m) => (
                <TableRow key={m?.id}>
                  <TableCell className="text-xs font-medium">
                    {m?.name}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {m?.qty} units
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        <TableWrapper title="Category Performance" icon={Activity}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-green-500">Category</TableHead>
                <TableHead className="text-right text-green-500">
                  Impact Score
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCategories?.map((c) => (
                <TableRow key={c?.name}>
                  <TableCell className="text-xs font-medium">
                    {c?.name}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {c?.sales} sales
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    </div>
  );
}
