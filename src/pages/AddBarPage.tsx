import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BarForm from '../components/BarForm';
import { createBar } from '../api/barApi';
import type { BarInput } from '../types/bar';

export default function AddBarPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      alert(message ?? t('common.unknownError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        {t('addBar.title')}
      </Typography>
      <BarForm submitLabel={t('form.save')} submitting={submitting} onSubmit={handleSubmit} />
    </Container>
  );
}
