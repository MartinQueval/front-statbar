import { createTheme, alpha } from '@mui/material/styles';

const PRIMARY = '#3f5646';
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: PRIMARY },
    secondary: { main: '#bb9457' },
    background: { default: '#eef1ec', paper: 'rgba(255, 255, 255, 0.72)' },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"TT Drugs", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 700,
    // Big display titles use Black (900), section titles use Bold (700).
    h1: { fontWeight: 900 },
    h2: { fontWeight: 900 },
    h3: { fontWeight: 900 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 400 },
    subtitle2: { fontWeight: 700 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 700 },
    overline: { fontWeight: 700 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.55)',
          backgroundImage: 'none',
          transition: `box-shadow 0.3s ${EASE}, transform 0.3s ${EASE}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 30px rgba(31, 41, 36, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: `transform 0.2s ${EASE}, box-shadow 0.2s ${EASE}, background-color 0.2s ${EASE}`,
          '&.MuiButton-containedPrimary:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 20px ${alpha(PRIMARY, 0.35)}`,
          },
          '&.MuiButton-outlined:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          backgroundColor: 'rgba(255, 255, 255, 0.82)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { transition: `transform 0.2s ${EASE}` },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { transition: `transform 0.2s ${EASE}, background-color 0.2s ${EASE}` },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.55)',
          transition: `box-shadow 0.2s ${EASE}, background-color 0.2s ${EASE}`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(PRIMARY, 0.22),
            transition: `border-color 0.2s ${EASE}`,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(PRIMARY, 0.45),
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: `0 0 0 4px ${alpha(PRIMARY, 0.14)}`,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: PRIMARY,
            borderWidth: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { '&.Mui-focused': { color: PRIMARY } },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: { color: PRIMARY },
        iconHover: { color: PRIMARY },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: { height: 6, padding: '14px 0' },
        rail: { opacity: 0.28, backgroundColor: PRIMARY },
        track: { border: 'none' },
        thumb: {
          width: 22,
          height: 14,
          borderRadius: 7,
          backgroundColor: PRIMARY,
          border: '2px solid #fff',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
          transition: `box-shadow 0.2s ${EASE}`,
          '&:hover, &.Mui-focusVisible': {
            boxShadow: `0 0 0 8px ${alpha(PRIMARY, 0.16)}`,
          },
          '&.Mui-active': {
            boxShadow: `0 0 0 12px ${alpha(PRIMARY, 0.22)}`,
          },
        },
        valueLabel: {
          backgroundColor: PRIMARY,
          borderRadius: 8,
          fontWeight: 600,
        },
        mark: { backgroundColor: alpha(PRIMARY, 0.35) },
        markActive: { backgroundColor: '#fff', opacity: 0.85 },
      },
    },
  },
});

export default theme;
