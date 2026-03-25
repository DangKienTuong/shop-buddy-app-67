import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  stock: number;
  sku: string;
}

export default function ProductCard({ id, name, price, image_url, stock, sku }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image_url || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">SKU: {sku}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          <Button
            size="sm"
            variant="outline"
            disabled={stock <= 0}
            onClick={(e) => {
              e.preventDefault();
              addToCart(id);
            }}
          >
            <ShoppingCart className="mr-1 h-3 w-3" />
            {stock > 0 ? "Add" : "Out of stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
