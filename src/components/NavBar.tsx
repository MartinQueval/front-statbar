import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Slide,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Accueil', end: true, icon: <HomeIcon /> },
  { to: '/ajouter', label: 'Ajouter un bar', icon: <AddLocationAltIcon /> },
  { to: '/carte', label: 'Carte', icon: <MapIcon /> },
  { to: '/classement', label: 'Classement', icon: <EmojiEventsIcon /> },
];

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Slide in direction="down" timeout={500}>
        <AppBar position="static" color="primary" enableColorOnDark>
          <Toolbar>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: { xs: 1, md: 4 },
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

            {/* Desktop nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
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

            {/* Mobile hamburger */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton
                color="inherit"
                edge="end"
                aria-label="ouvrir le menu"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'rotate(90deg)' },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 260 } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalBarIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              StatBar
            </Typography>
          </Box>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            aria-label="fermer le menu"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ pt: 1 }}>
          {links.map(({ to, label, end, icon }) => (
            <ListItem key={to} disablePadding>
              <ListItemButton
                component={NavLink}
                to={to}
                end={end}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  transition: 'background-color 0.2s ease, padding-left 0.2s ease',
                  '&.active': {
                    backgroundColor: 'rgba(63, 86, 70, 0.12)',
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main',
                    pl: 1.5,
                  },
                  '&:hover': {
                    pl: 3,
                  },
                  '&.active:hover': {
                    pl: 2,
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
