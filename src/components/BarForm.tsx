import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Slider,
  Stack,
  Alert,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { NOTE_CATEGORIES, NOTE_CATEGORY_LABELS, NoteCategory } from '../types/bar';
import type { Bar, BarInput } from '../types/bar';
import LocationPicker from './LocationPicker';

interface Props {
  initial?: Bar;
  submitLabel: string;
  submitting: boolean;
  onSubmit: (data: BarInput) => void;
  extraActions?: React.ReactNode;
}

type NoteState = Record<NoteCategory, number>;

const DEFAULT_NOTE = 2.5;

function buildInitialNotes(initial?: Bar): NoteState {
  const base: NoteState = {
    [NoteCategory.DRINK]: DEFAULT_NOTE,
    [NoteCategory.AFFORDABILITY]: DEFAULT_NOTE,
    [NoteCategory.VIBES]: DEFAULT_NOTE,
    [NoteCategory.DECORATION]: DEFAULT_NOTE,
  };
  if (initial) {
    for (const n of initial.note) base[n.category] = n.value;
  }
  return base;
}

export default function BarForm({ initial, submitLabel, submitting, onSubmit, extraActions }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [lat, setLat] = useState<number | null>(initial?.lat ?? null);
  const [lng, setLng] = useState<number | null>(initial?.lng ?? null);
  const [notes, setNotes] = useState<NoteState>(() => buildInitialNotes(initial));
  const [error, setError] = useState<string | null>(null);

  const handleLocation = (newLat: number, newLng: number) => {
    setLat(Number(newLat.toFixed(6)));
    setLng(Number(newLng.toFixed(6)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || lat == null || lng == null) {
      setError('Renseigne le nom et clique sur la carte pour placer le bar.');
      return;
    }

    onSubmit({
      name: name.trim(),
      lat,
      lng,
      note: NOTE_CATEGORIES.map((category) => ({ category, value: notes[category] })),
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Nom du bar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Position sur la carte
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Clique sur la carte pour placer le bar.
            </Typography>
            <LocationPicker lat={lat} lng={lng} onChange={handleLocation} />
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Notes (0 à 5, par demi-point)
            </Typography>
            <Stack spacing={2}>
              {NOTE_CATEGORIES.map((cat) => (
                <Box key={cat}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{NOTE_CATEGORY_LABELS[cat]}</Typography>
                    <Typography fontWeight={700} color="primary">
                      {notes[cat].toFixed(1)}
                    </Typography>
                  </Box>
                  <Slider
                    value={notes[cat]}
                    onChange={(_, v) =>
                      setNotes((prev) => ({ ...prev, [cat]: v as number }))
                    }
                    min={0}
                    max={5}
                    step={0.5}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Box>
              ))}
            </Stack>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Box>{extraActions}</Box>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={submitting}
              size="large"
            >
              {submitting ? 'Enregistrement…' : submitLabel}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
