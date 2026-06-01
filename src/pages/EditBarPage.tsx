import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import BarForm from '../components/BarForm';
import { getBar, updateBar, deleteBar } from '../api/barApi';
import type { Bar, BarInput } from '../types/bar';

export default function EditBarPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [bar, setBar] = useState<Bar | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getBar(id)
      .then(setBar)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: BarInput) => {
    if (!id) return;
    setSubmitting(true);
    try {
      await updateBar(id, data);
      navigate('/classement');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } }).response?.data?.error ??
        (err as Error).message;
      alert(message ?? 'Erreur inconnue');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setDeleting(true);
    try {
      await deleteBar(id);
      navigate('/classement');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } }).response?.data?.error ??
        (err as Error).message;
      alert(message ?? 'Erreur inconnue');
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Modifier un bar
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && bar && (
        <>
          <BarForm
            initial={bar}
            submitLabel="Mettre à jour"
            submitting={submitting}
            onSubmit={handleSubmit}
            extraActions={
              <Button
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => setConfirmOpen(true)}
                disabled={deleting}
              >
                Supprimer
              </Button>
            }
          />

          <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
            <DialogTitle>Supprimer ce bar ?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Cette action est définitive. « {bar.name} » sera retiré de la base.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmOpen(false)} disabled={deleting}>
                Annuler
              </Button>
              <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting}>
                {deleting ? 'Suppression…' : 'Supprimer'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
}
