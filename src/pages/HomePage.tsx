import { Container, Typography, Box, Card, CardContent, Grid, Button, Grow, Fade } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Fade in timeout={600}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            {t('home.welcome')}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {t('home.subtitle')}
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4}>
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <Grid key={c.to} size={{ xs: 12, md: 4 }}>
              <Grow in timeout={500 + idx * 200}>
                <Card
                  sx={{
                    height: '100%',
                    minHeight: 340,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                      '& .home-card-icon': {
                        transform: 'scale(1.15) rotate(-6deg)',
                      },
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Box
                      className="home-card-icon"
                      sx={{
                        mb: 2,
                        display: 'inline-flex',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <Icon color="primary" sx={{ fontSize: 72 }} />
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {t(`home.cards.${c.key}.title`)}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
                      {t(`home.cards.${c.key}.desc`)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      component={RouterLink}
                      to={c.to}
                      variant="contained"
                      fullWidth
                      size="large"
                    >
                      {t('home.cta')}
                    </Button>
                  </Box>
                </Card>
              </Grow>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
