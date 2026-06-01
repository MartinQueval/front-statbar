import { AppBar, Toolbar, Typography, Button, Box, Slide } from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/ajouter', label: 'Ajouter un bar' },
  { to: '/carte', label: 'Carte' },
  { to: '/classement', label: 'Classement' },
];

export default function NavBar() {
  return (
    <Slide in direction="down" timeout={500}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 4,
              cursor: 'default',
              transition: 'transform 0.3s ease',
              '&:hover .nav-logo': {
                transform: 'rotate(-15deg) scale(1.15)',
              },
              '&:hover .nav-title': {
                letterSpacing: '0.08em',
              },
            }}
          >
            <LocalBarIcon
              className="nav-logo"
              sx={{
                mr: 1,
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
            <Typography
              variant="h6"
              component="div"
              className="nav-title"
              sx={{
                fontWeight: 700,
                transition: 'letter-spacing 0.3s ease',
                letterSpacing: '0.02em',
              }}
            >
              StatBar
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {links.map(({ to, label, end }) => (
              <Button
                key={to}
                component={NavLink}
                to={to}
                end={end}
                color="inherit"
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background-color 0.25s ease, transform 0.2s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 6,
                    left: '50%',
                    width: 0,
                    height: 2,
                    backgroundColor: 'currentColor',
                    transition: 'width 0.3s ease, left 0.3s ease',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    transform: 'translateY(-2px)',
                  },
                  '&:hover::after': {
                    width: '60%',
                    left: '20%',
                  },
                  '&.active': {
                    backgroundColor: 'rgba(255,255,255,0.18)',
                  },
                  '&.active::after': {
                    width: '60%',
                    left: '20%',
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
