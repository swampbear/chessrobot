import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import io, { Socket } from 'socket.io-client';
import Home from './pages/home/Home';
import { SocketProvider } from './contextproviders/socket/SocketContext';
import { PieceColorProvider } from './contextproviders/pieceColor/PieceColorContext';
import Selection from './pages/selection/Selection';
import BoardConfig from './pages/boardconfig/BoardConfig';
import Game from './pages/game/Game';
import { Footer } from './components/footer/Footer';
import {AnimatePresence} from "framer-motion"
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    try {
      const socket = io('http://127.0.0.1:8080');

      setSocketInstance(socket);

      socket.on('connect', () => {
        console.log("Connected to flask-socket");
        socket.emit('message', { data: "I'm connected!" });
      });
      socket.on('json', (msg) => {
        console.log('JSON received:', msg);
      });
      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Router>
      <SocketProvider socket={socketInstance}>
        <PieceColorProvider>
          <ErrorBoundary fallback={<div>Problem with initiating main</div>}>
              <Main />
          </ErrorBoundary>
        </PieceColorProvider>
      </SocketProvider>
    </Router>
  );
}

function Main() {
  const location = useLocation();

  return (
    <>
       <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} /> {/* Add this line */}
        <Route path="/selection" element={<Selection />} />
        <Route path="/boardconfig" element={<BoardConfig />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;