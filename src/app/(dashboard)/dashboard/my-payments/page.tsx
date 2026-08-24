import {
  CreditCard,
  CircleCheckBig,
  CircleX,
  Clock3,
  Receipt,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { getMyPayments } from "../../_actions/getMyPayments";

export default async function MyPayments() {
  const result = await getMyPayments();
  const payments = result.data;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View all of your previous payments.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Receipt className="mb-4 h-14 w-14 text-muted-foreground" />
              <h3 className="text-lg font-semibold">No Payments Found</h3>
              <p className="text-muted-foreground">
                You haven't made any payments yet.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {payments.map((payment, index) => (
                    <TableRow key={payment.id}>
                      <TableCell>{index + 1}</TableCell>

                      <TableCell className="font-medium">
                        {payment.bookingId.slice(0, 8)}...
                      </TableCell>

                      <TableCell>
                        {payment.currency} {payment.amount}
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary">
                          {payment.provider}
                        </Badge>
                      </TableCell>

                      <TableCell>{payment.method}</TableCell>

                      <TableCell>
                        {payment.status === "PAID" && (
                          <Badge className="gap-1">
                            <CircleCheckBig className="h-3.5 w-3.5" />
                            Paid
                          </Badge>
                        )}

                        {payment.status === "PENDING" && (
                          <Badge
                            variant="secondary"
                            className="gap-1"
                          >
                            <Clock3 className="h-3.5 w-3.5" />
                            Pending
                          </Badge>
                        )}

                        {payment.status === "FAILED" && (
                          <Badge
                            variant="destructive"
                            className="gap-1"
                          >
                            <CircleX className="h-3.5 w-3.5" />
                            Failed
                          </Badge>
                        )}

                        {payment.status === "CANCELLED" && (
                          <Badge
                            variant="outline"
                            className="gap-1"
                          >
                            Cancelled
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell>
                        {/* {payment.transactionId ?? "-"} */}
                        {payment.stripeCustomerId ?? "-"}
                      </TableCell>

                      <TableCell>
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}