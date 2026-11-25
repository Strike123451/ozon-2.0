import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';

export default function Hero() {
  // Четыре товара с лучшим рейтингом — реальные фото из API
  const top = useAppSelector((s) => [...s.products.items].sort((a, b) => b.rating - a.rating).slice(0, 4));

  return (
    <Box sx={{ display: 'grid', gap: { xs: 3, md: 6 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '5fr 6fr' }, pb: 5, mb: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box>
        <Typography variant="h3" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
          Одежда, техника и товары для дома
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 440 }}>
          Выбирайте по категориям, сохраняйте понравившееся в избранное и оформляйте заказ после входа.
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.5 }}>
        {top.map((p) => (
          <Box key={p.id} component={RouterLink} to={`/product/${p.id}`} aria-label={p.title} sx={{ bgcolor: '#E4E3DE', border: '1px solid', borderColor: 'divider', display: 'block' }}>
            <Box component="img" src={p.thumbnail} alt={p.title} sx={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'contain', display: 'block' }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
