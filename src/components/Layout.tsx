import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Badge, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import { STORE_NAME } from '../config';

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((n, i) => n + i.qty, 0));
  const favCount = useAppSelector((s) => s.favorites.ids.length);
  const user = useAppSelector((s) => s.auth.user);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h5" component={RouterLink} to="/" sx={{ color: 'text.primary', textDecoration: 'none', flexGrow: 1, letterSpacing: '0.02em' }}>
              {STORE_NAME}
            </Typography>
            <IconButton color="inherit" onClick={() => navigate('/favorites')} aria-label="Избранное">
              <Badge badgeContent={favCount} color="secondary"><FavoriteBorderIcon /></Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/cart')} aria-label="Корзина" sx={{ mr: 1 }}>
              <Badge badgeContent={cartCount} color="secondary"><ShoppingBagOutlinedIcon /></Badge>
            </IconButton>
            {user ? (
              <>
                <Button color="inherit" startIcon={<PersonOutlineIcon />} onClick={() => navigate('/profile')}>{user.firstName}</Button>
                <Button color="inherit" onClick={() => { dispatch(logout()); navigate('/'); }}>Выйти</Button>
              </>
            ) : (
              <Button variant="contained" onClick={() => navigate('/login')}>Войти</Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ py: { xs: 3, md: 5 }, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 3, textAlign: 'center', color: 'text.secondary', borderTop: '1px solid', borderColor: 'divider', fontSize: 14 }}>
        © {new Date().getFullYear()} {STORE_NAME}. Учебный проект, данные: dummyjson.com
      </Box>
    </Box>
  );
}
