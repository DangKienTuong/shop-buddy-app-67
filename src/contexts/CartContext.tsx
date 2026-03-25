import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image_url: string | null;
    sku: string;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  items: [],
  loading: false,
  totalItems: 0,
  totalPrice: 0,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  refreshCart: async () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, products(id, name, price, stock, image_url, sku)")
      .eq("user_id", user.id);

    if (!error && data) {
      setItems(
        data.map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          product: item.products,
        }))
      );
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: string, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    const existing = items.find((i) => i.product_id === productId);
    if (existing) {
      const newQty = existing.quantity + quantity;
      if (newQty > existing.product.stock) {
        toast.error(`Only ${existing.product.stock} items available`);
        return;
      }
      await supabase
        .from("cart_items")
        .update({ quantity: newQty })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("cart_items")
        .insert({ user_id: user.id, product_id: productId, quantity });
    }
    toast.success("Added to cart");
    await fetchCart();
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;
    const item = items.find((i) => i.product_id === productId);
    if (!item) return;
    if (quantity > item.product.stock) {
      toast.error(`Only ${item.product.stock} items available`);
      return;
    }
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", item.id);
    await fetchCart();
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);
    toast.success("Removed from cart");
    await fetchCart();
  };

  const clearCart = async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setItems([]);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);

  return (
    <CartContext.Provider
      value={{ items, loading, totalItems, totalPrice, addToCart, updateQuantity, removeFromCart, clearCart, refreshCart: fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
