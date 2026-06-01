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
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { listBars } from '../api/barApi';
import type { Bar } from '../types/bar';

const MEDALS = ['#FFD700', '#C0C0C0', '#CD7F32'];

export default function RankingPage() {
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
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Classement des bars
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && bars.length === 0 && (
        <Alert severity="info">Aucun bar pour l’instant. Ajoute-en un !</Alert>
      )}

      {!loading && !error && bars.length > 0 && (
        <Paper sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={60}>#</TableCell>
                <TableCell>Bar</TableCell>
                <TableCell align="center">Note</TableCell>
                <TableCell align="right">Moyenne</TableCell>
                <TableCell align="right" width={60}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bars.map((bar, idx) => (
                <TableRow key={bar._id} hover>
                  <TableCell>
                    {idx < 3 ? (
                      <EmojiEventsIcon sx={{ color: MEDALS[idx] }} />
                    ) : (
                      <Typography fontWeight={700}>{idx + 1}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>{bar.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Rating value={bar.moy} precision={0.1} max={5} readOnly />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${bar.moy.toFixed(2)} / 5`}
                      color={bar.moy >= 3.5 ? 'success' : bar.moy >= 2.5 ? 'primary' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Modifier / supprimer">
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
