import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, IconButton, Rating, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { toggleFavorite } from '../store/favoritesSlice';
import { categoryLabel, money } from '../utils';
import type { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector((s) => s.favorites.ids.includes(product.id));

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ position: 'relative', bgcolor: '#E4E3DE' }}>
        <Box component={RouterLink} to={`/product/${product.id}`} sx={{ display: 'block' }}>
          <Box component="img" src={product.thumbnail} alt={product.title} loading="lazy" sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'contain', display: 'block' }} />
        </Box>
        <IconButton size="small" onClick={() => dispatch(toggleFavorite(product.id))} aria-label="В избранное" sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'background.paper' }}>
          {isFav ? <FavoriteIcon fontSize="small" color="secondary" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
      </Box>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 0.5, flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">{product.brand ? `${product.brand}, ` : ''}{categoryLabel(product.category).toLowerCase()}</Typography>
        <Typography component={RouterLink} to={`/product/${product.id}`} sx={{ color: 'text.primary', textDecoration: 'none', fontWeight: 600, lineHeight: 1.3 }}>
          {product.title}
        </Typography>
        <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ color: 'secondary.main' }} />
        <Box sx={{ mt: 'auto', pt: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{money(product.price)}</Typography>
          <Button variant="outlined" size="small" onClick={() => dispatch(addToCart(product))}>В корзину</Button>
        </Box>
      </Box>
    </Card>
  );
}
