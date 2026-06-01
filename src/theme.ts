import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3f5646' },
    secondary: { main: '#bb9457' },
    background: { default: '#f7f3ee' },
  },
  shape: { borderRadius: 10 },
});

export default theme;
