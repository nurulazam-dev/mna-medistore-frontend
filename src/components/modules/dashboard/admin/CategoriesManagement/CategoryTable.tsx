import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICategoryType } from "@/types";
import { PackageOpen } from "lucide-react";
import UpdateCategory from "./UpdateCategory";
import { formatDate, formatFullDate } from "@/lib/utils";

export default function CategoryTable({
  categories,
}: {
  categories: ICategoryType[];
}) {
  return (
    <div className="border rounded-md overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-15 text-center">#</TableHead>
            <TableHead className="min-w-37.5 text-center">
              Category Name
            </TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-center">Total Medicine</TableHead>
            {/* <TableHead className="w-75">Medicines</TableHead> */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.length > 0 ? (
            categories.map((category, index) => (
              <TableRow
                key={category?.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="text-center font-medium">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <span className="font-bold text-primary">
                    {category?.name}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs italic">
                  {formatFullDate(category?.createdAt)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="bg-primary/5">
                    {category?._count?.medicines ?? 0}
                  </Badge>
                </TableCell>
                {/* <TableCell>
                  <div className="flex flex-wrap gap-1.5 max-h-15 overflow-y-auto pr-2 scrollbar-hide">
                    {category?._count?.medicines && category?._count?.medicines > 0 ? (
                      category?._count?.medicines?.map((m: any) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0"
                        >
                          {m?.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground italic">
                        Not added medicine
                      </span>
                    )}
                  </div>
                </TableCell> */}
                <TableCell className="text-right">
                  <UpdateCategory category={category} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                  <PackageOpen className="h-8 w-8 opacity-20" />
                  <p>No categories found.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
