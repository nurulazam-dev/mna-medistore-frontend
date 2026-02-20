import { IUserType } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PackageOpen, ShieldCheck, ShieldX } from "lucide-react";
import ViewUser from "./ViewUser";
import { formatDate } from "@/lib/utils";
import AdminUpdateUser from "./AdminUpdateUser";

export default function UsersTable({
  users,
  meta,
}: {
  users: IUserType[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}) {
  const currentPage = meta?.page || 1;
  const limit = meta?.limit || 10;

  return (
    <div className="border rounded-md overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Address</TableHead>
            {/* <TableHead>Created</TableHead> */}
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.length > 0 ? (
            users.map((user, index) => (
              <TableRow
                key={user?.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="text-center font-medium">
                  {String((currentPage - 1) * limit + (index + 1)).padStart(
                    2,
                    "0",
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <div className="flex justify-center items-center">
                      {user?.emailVerified === true ? (
                        <ShieldCheck className="text-blue-600 w-5 h-5" />
                      ) : (
                        <ShieldX className="text-red-600 w-5 h-5" />
                      )}
                    </div>
                    <span className="font-semibold text-primary">
                      {user?.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{user?.name}</TableCell>

                <TableCell
                  className={`text-center font-semibold text-xs uppercase ${
                    user?.role === "ADMIN"
                      ? "text-violet-600"
                      : user?.role === "SELLER"
                        ? "text-amber-600"
                        : "text-emerald-600"
                  }`}
                >
                  {user?.role}
                </TableCell>

                <TableCell className="text-center">
                  {user?.phone ? user?.phone : "N/A"}
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1 max-h-15 overflow-y-auto  scrollbar-hide">
                    {user?.status === "ACTIVE" ? (
                      <Badge variant="outline" className="text-xs px-1.5 py-0">
                        ACTIVE
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="text-xs px-1.5 py-0"
                      >
                        INACTIVE
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {user?.address ? user?.address : "N/A"}
                </TableCell>

                <TableCell className="text-muted-foreground text-xs italic">
                  {formatDate(user?.createdAt)}
                </TableCell>

                <TableCell className="flex justify-center items-center gap-1">
                  <AdminUpdateUser user={user} />
                  <ViewUser user={user} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                  <PackageOpen className="h-8 w-8 opacity-20" />
                  <p>No user found.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
