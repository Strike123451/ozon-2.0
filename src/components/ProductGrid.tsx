import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import type { Product } from '../types';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </Box>
  );
}
