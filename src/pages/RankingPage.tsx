import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Rating,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { listBars } from '../api/barApi';
import type { Bar } from '../types/bar';

const MEDALS = ['#FFD700', '#C0C0C0', '#CD7F32'];

function RankBadge({ index }: { index: number }) {
  if (index < 3) return <EmojiEventsIcon sx={{ color: MEDALS[index] }} />;
  return <Typography sx={{ fontWeight: 700 }}>{index + 1}</Typography>;
}

function moyColor(moy: number) {
  if (moy >= 3.5) return 'success' as const;
  if (moy >= 2.5) return 'primary' as const;
  return 'default' as const;
}

export default function RankingPage() {
  const { t } = useTranslation();
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listBars()
      .then((data) => setBars([...data].sort((a, b) => b.moy - a.moy)))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        {t('ranking.title')}
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && bars.length === 0 && (
        <Alert severity="info">{t('ranking.empty')}</Alert>
      )}

      {/* Mobile: stacked cards */}
      {!loading && !error && bars.length > 0 && (
        <Stack spacing={2} sx={{ mt: 2, display: { xs: 'flex', md: 'none' } }}>
          {bars.map((bar, idx) => (
            <Card key={bar._id} variant="outlined">
              <CardContent sx={{ pb: '16px !important' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                    <RankBadge index={idx} />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {bar.name}
                    </Typography>
                  </Box>
                  <IconButton
                    component={RouterLink}
                    to={`/modifier/${bar._id}`}
                    size="small"
                    aria-label={`Modifier ${bar.name}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Rating value={bar.moy} precision={0.1} max={5} readOnly size="small" />
                  <Chip
                    size="small"
                    label={`${bar.moy.toFixed(2)} / 5`}
                    color={moyColor(bar.moy)}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Desktop: table */}
      {!loading && !error && bars.length > 0 && (
        <Paper sx={{ mt: 2, display: { xs: 'none', md: 'block' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={60}>{t('ranking.colRank')}</TableCell>
                <TableCell>{t('ranking.colBar')}</TableCell>
                <TableCell align="center">{t('ranking.colNote')}</TableCell>
                <TableCell align="right">{t('ranking.colAverage')}</TableCell>
                <TableCell align="right" width={60}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bars.map((bar, idx) => (
                <TableRow key={bar._id} hover>
                  <TableCell>
                    <RankBadge index={idx} />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>{bar.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Rating value={bar.moy} precision={0.1} max={5} readOnly />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${bar.moy.toFixed(2)} / 5`}
                      color={moyColor(bar.moy)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={t('ranking.editTooltip')}>
                      <IconButton
                        component={RouterLink}
                        to={`/modifier/${bar._id}`}
                        size="small"
                        aria-label={`Modifier ${bar.name}`}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
