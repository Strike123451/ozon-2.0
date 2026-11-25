import { useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, List, ListItemButton, ListItemText, MenuItem, Pagination, Slider, TextField, Typography } from '@mui/material';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { useAppSelector } from '../store/hooks';
import { categoryLabel } from '../utils';

const PAGE_SIZE = 12;
type Sort = 'default' | 'price-asc' | 'price-desc' | 'rating';

export default function Catalog() {
  const { items, status } = useAppSelector((s) => s.products);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<Sort>('default');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const reset = () => setPage(1);

  const categories = useMemo(() => Array.from(new Set(items.map((p) => p.category))), [items]);
  const top = useMemo(() => Math.ceil(Math.max(0, ...items.map((p) => p.price))), [items]);
  const limit = maxPrice ?? top;
  const count = (c: string) => items.filter((p) => c === 'all' || p.category === c).length;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = items.filter((p) =>
      (category === 'all' || p.category === category) &&
      p.price <= limit &&
      (!q || p.title.toLowerCase().includes(q) || (p.brand ?? '').toLowerCase().includes(q)),
    );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [items, query, category, sort, limit]);

  if (status === 'loading' || status === 'idle') return <Box sx={{ textAlign: 'center', mt: 8 }}><CircularProgress color="secondary" /></Box>;

  return (
    <>
      <Hero />
      {status === 'error' && <Alert severity="error" sx={{ mb: 2 }}>Не удалось загрузить товары с dummyjson.com. Проверьте интернет и обновите страницу.</Alert>}
      <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '240px 1fr' }, alignItems: 'start' }}>
        <Box component="aside" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Поиск по названию или бренду" size="small" value={query} onChange={(e) => { setQuery(e.target.value); reset(); }} />
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>Категории</Typography>
            <List dense disablePadding sx={{ maxHeight: 360, overflowY: 'auto' }}>
              {['all', ...categories].map((c) => (
                <ListItemButton key={c} selected={category === c} onClick={() => { setCategory(c); reset(); }} sx={{ borderRadius: 1, '&.Mui-selected': { bgcolor: 'rgba(168,50,31,0.1)' } }}>
                  <ListItemText primary={c === 'all' ? 'Все товары' : categoryLabel(c)} />
                  <Typography variant="body2" color="text.secondary">{count(c)}</Typography>
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Box>
            <Typography variant="h6">Цена до ${limit}</Typography>
            <Slider size="small" min={0} max={top} value={limit} onChange={(_, v) => { setMaxPrice(v as number); reset(); }} />
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h4">Каталог <Typography component="span" color="text.secondary" variant="h6">{visible.length} шт.</Typography></Typography>
            <TextField select label="Сортировка" size="small" value={sort} onChange={(e) => { setSort(e.target.value as Sort); reset(); }} sx={{ minWidth: 200 }}>
              <MenuItem value="default">По умолчанию</MenuItem>
              <MenuItem value="price-asc">Сначала дешёвые</MenuItem>
              <MenuItem value="price-desc">Сначала дорогие</MenuItem>
              <MenuItem value="rating">По рейтингу</MenuItem>
            </TextField>
          </Box>
          {visible.length ? (
            <>
              <ProductGrid products={visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)} />
              {visible.length > PAGE_SIZE && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination count={Math.ceil(visible.length / PAGE_SIZE)} page={page} onChange={(_, v) => setPage(v)} />
                </Box>
              )}
            </>
          ) : <Typography>Ничего не нашлось. Сбросьте фильтры или измените запрос.</Typography>}
        </Box>
      </Box>
    </>
  );
}
