import { useEffect, useMemo, useState } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { listBars } from '../api/barApi';
import { NOTE_CATEGORIES, NoteCategory } from '../types/bar';
import type { Bar } from '../types/bar';

const MEDALS = ['#FFD700', '#C0C0C0', '#CD7F32'];

type SortKey = 'moy' | NoteCategory;

function RankBadge({ index }: { index: number }) {
  if (index < 3) return <EmojiEventsIcon sx={{ color: MEDALS[index] }} />;
  return <Typography sx={{ fontWeight: 700 }}>{index + 1}</Typography>;
}

function moyColor(moy: number) {
  if (moy >= 3.5) return 'success' as const;
  if (moy >= 2.5) return 'primary' as const;
  return 'default' as const;
}

function sortValue(bar: Bar, key: SortKey): number {
  if (key === 'moy') return bar.moy;
  return bar.note.find((n) => n.category === key)?.value ?? 0;
}

export default function RankingPage() {
  const { t } = useTranslation();
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('moy');

  useEffect(() => {
    listBars()
      .then(setBars)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const sortedBars = useMemo(
    () => [...bars].sort((a, b) => sortValue(b, sortBy) - sortValue(a, sortBy)),
    [bars, sortBy],
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 1,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          {t('ranking.title')}
        </Typography>

        {!loading && !error && bars.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="sort-label">{t('ranking.sortBy')}</InputLabel>
            <Select
              labelId="sort-label"
              label={t('ranking.sortBy')}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
            >
              <MenuItem value="moy">{t('ranking.colAverage')}</MenuItem>
              {NOTE_CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {t(`categories.${cat}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

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
          {sortedBars.map((bar, idx) => (
            <Card
              key={bar._id}
              variant="outlined"
              className="reveal"
              style={{ animationDelay: `${Math.min(idx, 12) * 60}ms` }}
              sx={{
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 14px 34px rgba(31, 41, 36, 0.16)',
                },
              }}
            >
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
                    aria-label={`${t('editBar.title')} ${bar.name}`}
                    sx={{ color: 'primary.main' }}
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
          <Table sx={{ '& tbody tr:last-child td': { border: 0 } }}>
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
              {sortedBars.map((bar, idx) => (
                <TableRow
                  key={bar._id}
                  hover
                  className="reveal"
                  style={{ animationDelay: `${Math.min(idx, 14) * 45}ms` }}
                >
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
                        aria-label={`${t('editBar.title')} ${bar.name}`}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon />
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
