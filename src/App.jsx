import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import SplashScreen from './components/home/SplashScreen';
import HomePage from './pages/HomePage';
import ReposPage from './pages/ReposPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import TasksPage from './pages/TasksPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const finishSplash = useCallback(() => setShowSplash(false), []);

  return (
    <AppProvider>
      {showSplash ? (
        <SplashScreen onFinish={finishSplash} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="repos" element={<ReposPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="tasks" element={<TasksPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </AppProvider>
  );
}

export default App;