import React, { createContext, useContext, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // Pull cleanly from your Expo public environment variable
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || "";
  
  // Clean any accidental whitespace safely before initializing
  const cleanUrl = apiUrl.trim();

  const socket = useRef<Socket | null>(null);

  if (!socket.current && cleanUrl) {
    socket.current = io(cleanUrl, {
      transports: ['websocket'],
      autoConnect: true,
    });
  }

  useEffect(() => {
    return () => { 
      if (socket.current) {
        socket.current.disconnect(); 
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);