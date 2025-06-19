export interface Product {
  product_id: number;
  name: string;
  description?: string;
  price_cents: number;
  image?: string;
  category?: string;
  sku?: string;
  created_at?: string;
  updated_at?: string;
}


export interface Address {
  address_id?: number;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  order_notes?: string;
}

export interface UserCookie {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  addresses: Address[];
  // any other fields...
}

export interface Profile {
  full_name: string;
  country: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
  email: string;
  order_notes: string;
  address_id: number;
};

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price_cents: number;
  status: string;
  updated_at?: string;
  product: Product;
};

export interface Order {
  order_id: number;
  items: OrderItem[];
};

export interface ApiResponse {
  data: Order[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}