import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BarForm from '../components/BarForm';
import { createBar } from '../api/barApi';
import type { BarInput } from '../types/bar';

export default function AddBarPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: BarInput) => {
    setSubmitting(true);
    try {
      await createBar(data);
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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Ajouter un bar
      </Typography>
      <BarForm submitLabel="Enregistrer" submitting={submitting} onSubmit={handleSubmit} />
    </Container>
  );
}
