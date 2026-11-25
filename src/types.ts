export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
  brand?: string;
  stock?: number;
}
export interface CartItem { product: Product; qty: number }
export interface User {
  id: number; username: string; firstName: string; lastName: string; email: string; image: string;
}
