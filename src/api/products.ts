import { api } from './client';
import type { Product } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const mapRemote = (p: any): Product => ({
  id: String(p.id),
  title: p.title,
  description: p.description,
  category: p.category,
  price: p.price,
  rating: p.rating ?? 0,
  thumbnail: p.thumbnail,
  images: p.images?.length ? p.images : [p.thumbnail],
  brand: p.brand,
  stock: p.stock,
});

/** Все товары с бесплатного Fake API DummyJSON (limit=0 — без ограничения). */
export async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get('/products', { params: { limit: 0 } });
  return (data.products as any[]).map(mapRemote);
}
