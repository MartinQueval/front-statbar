import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Slider,
  Stack,
  Alert,
  Typography,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { NOTE_CATEGORIES, NoteCategory } from '../types/bar';
import type { Bar, BarInput } from '../types/bar';
import LocationPicker from './LocationPicker';
import { searchPlaces } from '../api/geocode';
import type { PlaceSuggestion } from '../api/geocode';

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
  const { t } = useTranslation();
  const [name, setName] = useState(initial?.name ?? '');
  const [lat, setLat] = useState<number | null>(initial?.lat ?? null);
  const [lng, setLng] = useState<number | null>(initial?.lng ?? null);
  const [notes, setNotes] = useState<NoteState>(() => buildInitialNotes(initial));
  const [error, setError] = useState<string | null>(null);

  // Place search (Photon) for the name field
  const [options, setOptions] = useState<PlaceSuggestion[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Debounced geocoding as the user types the bar name.
  useEffect(() => {
    const q = name.trim();
    if (q.length < 3) {
      setOptions([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const handle = setTimeout(async () => {
      const results = await searchPlaces(q);
      setOptions(results);
      setSearchLoading(false);
    }, 350);
    return () => clearTimeout(handle);
  }, [name]);

  const handleLocation = (newLat: number, newLng: number) => {
    setLat(Number(newLat.toFixed(6)));
    setLng(Number(newLng.toFixed(6)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || lat == null || lng == null) {
      setError(t('form.validation'));
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
          <Autocomplete<PlaceSuggestion, false, false, true>
            freeSolo
            options={options}
            filterOptions={(x) => x}
            inputValue={name}
            loading={searchLoading}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.name
            }
            isOptionEqualToValue={(option, value) =>
              typeof value !== 'string' && option.id === value.id
            }
            noOptionsText={t('form.noOptions')}
            onInputChange={(_, value, reason) => {
              if (reason === 'input' || reason === 'clear') setName(value);
            }}
            onChange={(_, value) => {
              if (value && typeof value !== 'string') {
                setName(value.name);
                setLat(value.lat);
                setLng(value.lng);
              }
            }}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.id}>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{option.name}</Typography>
                  {option.label !== option.name && (
                    <Typography variant="caption" color="text.secondary">
                      {option.label.replace(`${option.name} — `, '')}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('form.nameLabel')}
                required
                fullWidth
                helperText={t('form.nameHelper')}
                slotProps={{
                  ...params.slotProps,
                  input: {
                    ...params.slotProps.input,
                    endAdornment: (
                      <>
                        {searchLoading ? <CircularProgress color="inherit" size={18} /> : null}
                        {params.slotProps.input.endAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
          />

          <Box>
            <LocationPicker lat={lat} lng={lng} onChange={handleLocation} />
          </Box>

          <Box>
            <Stack spacing={2}>
              {NOTE_CATEGORIES.map((cat) => (
                <Box key={cat}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{t(`categories.${cat}`)}</Typography>
                    <Typography color="primary" sx={{ fontWeight: 700 }}>
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
              {submitting ? t('form.saving') : submitLabel}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
