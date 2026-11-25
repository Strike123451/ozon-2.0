import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart, setQty } from '../store/cartSlice';
import { money } from '../utils';

export default function Cart() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  if (!items.length) {
    return <Typography>Корзина пуста. <Button component={RouterLink} to="/">В каталог</Button></Typography>;
  }
  return (
    <>
      <Typography variant="h4" gutterBottom>Корзина</Typography>
      {items.map(({ product, qty }) => (
        <Paper key={product.id} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box component="img" src={product.thumbnail} alt="" sx={{ width: 72, height: 72, objectFit: 'contain', bgcolor: 'background.paper', borderRadius: 1 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography component={RouterLink} to={`/product/${product.id}`} sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>{product.title}</Typography>
            <Typography color="text.secondary">{money(product.price)}</Typography>
          </Box>
          <TextField type="number" size="small" value={qty} sx={{ width: 80 }} slotProps={{ htmlInput: { min: 1 } }}
            onChange={(e) => dispatch(setQty({ id: product.id, qty: Number(e.target.value) || 1 }))} />
          <Typography sx={{ width: 90, textAlign: 'right' }}>{money(product.price * qty)}</Typography>
          <IconButton onClick={() => dispatch(removeFromCart(product.id))} aria-label="Удалить"><DeleteIcon /></IconButton>
        </Paper>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Typography variant="h5">Итого: {money(total)}</Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/checkout')}>Оформить заказ</Button>
      </Box>
    </>
  );
}
