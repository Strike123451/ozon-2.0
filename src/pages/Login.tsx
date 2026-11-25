import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginThunk } from '../store/authSlice';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, loading, error } = useAppSelector((s) => s.auth);
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  if (token) return <Navigate to={from} replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await dispatch(loginThunk({ username, password }));
    if (loginThunk.fulfilled.match(res)) navigate(from, { replace: true });
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 380, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Вход</Typography>
      <Alert severity="info" sx={{ mb: 2 }}>Тестовый аккаунт DummyJSON: emilys / emilyspass</Alert>
      <Stack spacing={2}>
        <TextField label="Логин" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" size="large" disabled={loading}>{loading ? 'Входим…' : 'Войти'}</Button>
      </Stack>
    </Box>
  );
}
