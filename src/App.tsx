import { Route, Routes } from 'react-router-dom';
import SimpleMusicLeaguePage from './music-league/pages/SimpleMusicLeaguePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SimpleMusicLeaguePage />} />
      <Route path="*" element={<SimpleMusicLeaguePage />} />
    </Routes>
  );
}

export default App;
