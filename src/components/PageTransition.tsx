import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

// Replays a fade-in-up entrance on every route change by keying on the path.
export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <Box key={pathname} className="page-enter" sx={{ flexGrow: 1 }}>
      {children}
    </Box>
  );
}
