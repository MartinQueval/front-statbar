import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import AddBarPage from './pages/AddBarPage';
import EditBarPage from './pages/EditBarPage';
import MapPage from './pages/MapPage';
import RankingPage from './pages/RankingPage';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ajouter" element={<AddBarPage />} />
            <Route path="/modifier/:id" element={<EditBarPage />} />
            <Route path="/carte" element={<MapPage />} />
            <Route path="/classement" element={<RankingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </Box>
    </Box>
  );
}

export default App;
