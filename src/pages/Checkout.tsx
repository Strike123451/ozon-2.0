import { useState, type FormEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCart } from '../store/cartSlice';
import { money } from '../utils';

export default function Checkout() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const [form, setForm] = useState({ name: user ? `${user.firstName} ${user.lastName}` : '', phone: '', address: '' });
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });
  const submit = (e: FormEvent) => { e.preventDefault(); dispatch(clearCart()); setDone(true); };

  if (done) {
    return (
      <Alert severity="success" action={<Button component={RouterLink} to="/" color="inherit">В каталог</Button>}>
        Заказ оформлен! Мы свяжемся с вами по телефону {form.phone}.
      </Alert>
    );
  }
  if (!items.length) return <Typography>Корзина пуста. <Button component={RouterLink} to="/">В каталог</Button></Typography>;

  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 480 }}>
      <Typography variant="h4" gutterBottom>Оформление заказа</Typography>
      <Stack spacing={2}>
        <TextField label="Имя" required value={form.name} onChange={set('name')} />
        <TextField label="Телефон" required value={form.phone} onChange={set('phone')} />
        <TextField label="Адрес доставки" required multiline minRows={2} value={form.address} onChange={set('address')} />
        <Typography variant="h6">К оплате: {money(total)}</Typography>
        <Button type="submit" variant="contained" size="large">Подтвердить заказ</Button>
      </Stack>
    </Box>
  );
}
