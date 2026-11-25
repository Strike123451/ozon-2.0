import { Typography } from '@mui/material';
import ProductGrid from '../components/ProductGrid';
import { useAppSelector } from '../store/hooks';

export default function Favorites() {
  const products = useAppSelector((s) => s.products.items.filter((p) => s.favorites.ids.includes(p.id)));
  return (
    <>
      <Typography variant="h4" gutterBottom>Избранное</Typography>
      {products.length ? <ProductGrid products={products} /> : <Typography>Пока пусто. Добавляйте товары сердечком.</Typography>}
    </>
  );
}
