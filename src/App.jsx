import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';

const App = () => {
  return (
    <Routes basename="/Communion-App">
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
};

export default App;
