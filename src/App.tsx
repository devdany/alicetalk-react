import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAccessToken } from './utils/accessTokenManager'
import Chat from './pages/Chat';
import Home from './pages/Home';
import { accessTokenVar } from './apollo/cache';

function App() {
  React.useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      accessTokenVar(accessToken);
    } 
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
