import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Button, Chip, Typography, Rating, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { toggleFavorite } from '../store/favoritesSlice';
import { categoryLabel, money } from '../utils';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((s) => s.products.items.find((p) => p.id === id));
  const isFav = useAppSelector((s) => !!id && s.favorites.ids.includes(id));
  const [img, setImg] = useState(0);

  if (!product) return <Typography>Товар не найден. <Button component={RouterLink} to="/">В каталог</Button></Typography>;

  return (
    <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
      <Box>
        <Box component="img" src={product.images[img] ?? product.thumbnail} alt={product.title} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, maxHeight: 420, objectFit: 'contain' }} />
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {product.images.slice(0, 5).map((src, i) => (
            <Box key={src} component="img" src={src} alt="" onClick={() => setImg(i)}
              sx={{ width: 64, height: 64, objectFit: 'contain', bgcolor: 'background.paper', borderRadius: 1, cursor: 'pointer', border: i === img ? '2px solid #A8321F' : '2px solid transparent' }} />
          ))}
        </Stack>
      </Box>
      <Box>
        <Chip label={categoryLabel(product.category)} sx={{ mb: 1 }} />
        <Typography variant="h4" gutterBottom>{product.title}</Typography>
        {product.brand && <Typography color="text.secondary">Бренд: {product.brand}</Typography>}
        <Rating value={product.rating} precision={0.1} readOnly sx={{ my: 1 }} />
        <Typography variant="h4" color="primary" gutterBottom>{money(product.price)}</Typography>
        <Typography sx={{ mb: 2 }}>{product.description}</Typography>
        {product.stock !== undefined && <Typography color="text.secondary" sx={{ mb: 2 }}>В наличии: {product.stock} шт.</Typography>}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" size="large" onClick={() => dispatch(addToCart(product))}>В корзину</Button>
          <Button variant="outlined" size="large" onClick={() => dispatch(toggleFavorite(product.id))}>{isFav ? 'Убрать из избранного' : 'В избранное'}</Button>
        </Stack>
      </Box>
    </Box>
  );
}
