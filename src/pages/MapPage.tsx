import { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress, Alert, Chip } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { barIcon } from '../components/barIcon';
import { listBars } from '../api/barApi';
import type { Bar } from '../types/bar';

const DEFAULT_CENTER: LatLngExpression = [49.4431, 1.0993]; // Rouen
const DEFAULT_ZOOM = 15;

export default function MapPage() {
  const { t } = useTranslation();
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listBars()
      .then(setBars)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const center: LatLngExpression = DEFAULT_CENTER;
  const zoom = DEFAULT_ZOOM;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        {t('map.title')}
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Box sx={{ height: '70vh', borderRadius: 2, overflow: 'hidden' }}>
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {bars.map((bar) => (
              <Marker key={bar._id} position={[bar.lat, bar.lng]} icon={barIcon}>
                <Popup>
                  <Box sx={{ minWidth: 180 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                      {bar.name}
                    </Typography>
                    <Chip
                      size="small"
                      color="primary"
                      label={t('map.average', { value: bar.moy.toFixed(2) })}
                      sx={{ mb: 1 }}
                    />
                    <Box>
                      {bar.note.map((n) => (
                        <Typography key={n.category} variant="caption" sx={{ display: 'block' }}>
                          {t(`categories.${n.category}`)} : {n.value}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      )}
    </Container>
  );
}
