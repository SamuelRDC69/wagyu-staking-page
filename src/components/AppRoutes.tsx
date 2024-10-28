// src/components/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Leaderboard from '../Leaderboard/Leaderboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/leaderboard" element={<Leaderboard />} />
  </Routes>
);

export default AppRoutes;
