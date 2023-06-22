import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
