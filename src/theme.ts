import { createTheme } from '@mui/material';

export const tokens = {
  stone: '#EBEBE7',   // фон страницы
  paper: '#F7F7F4',   // карточки
  ink: '#1D2830',     // основной текст и тёмные элементы
  steel: '#5B6B75',   // второстепенный текст
  line: '#CBCDC8',    // границы
  lacquer: '#A8321F', // акцент: красный акцент
};

const display = '"Oswald", "Arial Narrow", sans-serif';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.ink },
    secondary: { main: tokens.lacquer },
    background: { default: tokens.stone, paper: tokens.paper },
    text: { primary: tokens.ink, secondary: tokens.steel },
    divider: tokens.line,
  },
  shape: { borderRadius: 2 },
  typography: {
    fontFamily: '"Golos Text", system-ui, sans-serif',
    h3: { fontFamily: display, fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.1 },
    h4: { fontFamily: display, fontWeight: 600, letterSpacing: '0.01em' },
    h5: { fontFamily: display, fontWeight: 500 },
    h6: { fontFamily: display, fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { borderRadius: 2 } } },
    MuiPaper: { defaultProps: { variant: 'outlined' }, styleOverrides: { root: { borderColor: tokens.line } } },
    MuiCard: { defaultProps: { variant: 'outlined' } },
    MuiAppBar: { defaultProps: { elevation: 0 } },
    MuiChip: { styleOverrides: { root: { borderRadius: 2 } } },
    MuiSlider: { styleOverrides: { root: { color: tokens.lacquer } } },
    MuiCssBaseline: { styleOverrides: { 'a:focus-visible, button:focus-visible': { outline: `2px solid ${tokens.lacquer}`, outlineOffset: 2 } } },
  },
});
