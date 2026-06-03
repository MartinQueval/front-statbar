import { Container, Typography, Box, Card, Grid, Button, Grow, Fade } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cards = [
  { to: '/ajouter', icon: AddLocationAltIcon, key: 'add' },
  { to: '/carte', icon: MapIcon, key: 'map' },
  { to: '/classement', icon: EmojiEventsIcon, key: 'ranking' },
] as const;

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Fade in timeout={600}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 900, fontSize: { xs: '2.1rem', md: '3.75rem' } }}
          >
            {t('home.welcome')}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ fontSize: { xs: '1.05rem', md: '1.5rem' } }}
          >
            {t('home.subtitle')}
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <Grid key={c.to} size={{ xs: 12, md: 4 }}>
              <Grow in timeout={500 + idx * 200}>
                <Card
                  sx={{
                    height: '100%',
                    minHeight: { md: 340 },
                    display: 'flex',
                    // Mobile: icon left, text right. Desktop: stacked column.
                    flexDirection: { xs: 'row', md: 'column' },
                    alignItems: { xs: 'center', md: 'stretch' },
                    gap: { xs: 2, md: 0 },
                    p: 2,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: { md: 'translateY(-8px)' },
                      boxShadow: 8,
                      '& .home-card-icon': {
                        transform: 'scale(1.12) rotate(-6deg)',
                      },
                    },
                  }}
                >
                  <Box
                    className="home-card-icon"
                    sx={{
                      display: 'inline-flex',
                      flexShrink: 0,
                      mb: { md: 2 },
                      alignSelf: { md: 'center' },
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <Icon color="primary" sx={{ fontSize: { xs: 46, md: 72 } }} />
                  </Box>

                  <Box
                    sx={{
                      flexGrow: 1,
                      minWidth: 0,
                      textAlign: { xs: 'left', md: 'center' },
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {t(`home.cards.${c.key}.title`)}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' } }}
                    >
                      {t(`home.cards.${c.key}.desc`)}
                    </Typography>
                  </Box>

                  <Button
                    component={RouterLink}
                    to={c.to}
                    variant="contained"
                    size="large"
                    aria-label={t(`home.cards.${c.key}.title`)}
                    sx={{
                      flexShrink: 0,
                      alignSelf: { xs: 'center', md: 'stretch' },
                      mt: { md: 2 },
                      width: { md: '100%' },
                      minWidth: { xs: 0 },
                    }}
                  >
                    <ArrowForwardIcon />
                  </Button>
                </Card>
              </Grow>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
