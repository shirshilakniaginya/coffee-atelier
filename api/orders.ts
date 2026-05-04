import { pb } from "@/lib/pocketbase";

interface CartItem {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  sum: number;
}

interface CreateOrderParams {
  customer_name: string;
  phone: string;
  email?: string;
  comment?: string;
  cart: CartItem[];
}

export async function createOrder({ customer_name, phone, email, comment, cart }: CreateOrderParams) {
  const total = cart.reduce((acc, item) => acc + item.sum, 0);

  const data = {
    customer_name,
    phone,
    email: email || "",
    comment: comment || "",
    total,
    status: "new",
    items_json: JSON.stringify(cart),
  };

  return await pb.collection("orders").create(data);
}
