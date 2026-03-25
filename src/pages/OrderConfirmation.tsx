import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-12">
        <Card className="w-full text-center">
          <CardContent className="p-8 space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold text-foreground">Order Placed!</h1>
            <p className="text-muted-foreground">Your order has been placed successfully.</p>
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-sm font-medium text-foreground break-all">{id}</p>
            </div>
            <p className="text-sm text-muted-foreground">Payment: Cash on Delivery</p>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" asChild className="flex-1">
                <Link to="/orders">My Orders</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
