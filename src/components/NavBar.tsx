import { useState, useRef, useLayoutEffect } from 'react';
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
  Select,
  MenuItem,
} from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, changeLanguage } from '../i18n';
import type { Language } from '../i18n';

const links = [
  { to: '/', labelKey: 'nav.home', end: true, icon: <HomeIcon /> },
  { to: '/ajouter', labelKey: 'nav.addBar', icon: <AddLocationAltIcon /> },
  { to: '/carte', labelKey: 'nav.map', icon: <MapIcon /> },
  { to: '/classement', labelKey: 'nav.ranking', icon: <EmojiEventsIcon /> },
];

// Compact dropdown for the desktop top bar.
function LanguageSelect() {
  const { t, i18n } = useTranslation();
  return (
    <Select<Language>
      value={(i18n.resolvedLanguage ?? 'custom') as Language}
      onChange={(e) => changeLanguage(e.target.value as Language)}
      size="small"
      variant="standard"
      disableUnderline
      aria-label={t('nav.language')}
      sx={{
        color: 'inherit',
        '& .MuiSelect-icon': { color: 'inherit' },
        '& .MuiSelect-select': { py: 0.5 },
      }}
    >
      {LANGUAGES.map((lng) => (
        <MenuItem key={lng} value={lng}>
          {t(`languages.${lng}`)}
        </MenuItem>
      ))}
    </Select>
  );
}

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sliding "magic line" indicator under the desktop nav links.
  const linksRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  const activeIndex = links.findIndex((l) =>
    l.end ? pathname === l.to : pathname.startsWith(l.to),
  );

  useLayoutEffect(() => {
    const measure = () => {
      const target = hovered ?? (activeIndex >= 0 ? activeIndex : null);
      const container = linksRef.current;
      if (target == null || !container) {
        setIndicator((i) => ({ ...i, visible: false }));
        return;
      }
      const items = container.querySelectorAll<HTMLElement>('.nav-item');
      const el = items[target];
      if (!el) {
        setIndicator((i) => ({ ...i, visible: false }));
        return;
      }
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [hovered, activeIndex, pathname, i18n.resolvedLanguage]);

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
            <Box
              ref={linksRef}
              onMouseLeave={() => setHovered(null)}
              sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, position: 'relative' }}
            >
              {links.map(({ to, labelKey, end }, idx) => (
                <Button
                  key={to}
                  className="nav-item"
                  component={NavLink}
                  to={to}
                  end={end}
                  color="inherit"
                  disableRipple
                  onMouseEnter={() => setHovered(idx)}
                  sx={{
                    px: 1,
                    minWidth: 'auto',
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    opacity: 0.8,
                    transition: 'opacity 0.25s ease',
                    '&:hover': { backgroundColor: 'transparent', opacity: 1 },
                    '&.active': { opacity: 1 },
                  }}
                >
                  {t(labelKey)}
                </Button>
              ))}
              {/* Single sliding underline that translates between tabs */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 4,
                  left: 0,
                  height: 2,
                  borderRadius: 2,
                  backgroundColor: 'currentColor',
                  pointerEvents: 'none',
                  width: indicator.width,
                  opacity: indicator.visible ? 1 : 0,
                  transform: `translateX(${indicator.left}px)`,
                  transition:
                    'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), width 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease',
                }}
              />
            </Box>

            {/* Desktop language selector (right) */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 'auto' }}>
              <LanguageSelect />
            </Box>

            {/* Mobile hamburger */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton
                color="inherit"
                edge="end"
                aria-label={t('nav.home')}
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
          <IconButton onClick={() => setDrawerOpen(false)} size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ pt: 1 }}>
          {links.map(({ to, labelKey, end, icon }) => (
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
                <ListItemText primary={t(labelKey)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="overline" color="text.secondary" sx={{ px: 2, pt: 1, display: 'block' }}>
          {t('nav.language')}
        </Typography>
        <List>
          {LANGUAGES.map((lng) => {
            const active = (i18n.resolvedLanguage ?? 'custom') === lng;
            return (
              <ListItem key={lng} disablePadding>
                <ListItemButton
                  selected={active}
                  onClick={() => {
                    changeLanguage(lng);
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemText primary={t(`languages.${lng}`)} />
                  {active && <CheckIcon fontSize="small" color="primary" />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
