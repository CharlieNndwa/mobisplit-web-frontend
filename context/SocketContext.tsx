// context/SocketContext.tsx - 🪙 REFACTORED PRODUCTION DYNAMIC HANDSHAKE CONTEXT
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connectWithAuth: (userId: string, role: 'rider' | 'driver', category?: string) => void;
  disconnectSocket: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  connectWithAuth: () => {},
  disconnectSocket: () => {},
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";
  const cleanUrl = apiUrl.trim();

  const socketRef = useRef<Socket | null>(null);
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWithAuth = (userId: string, role: 'rider' | 'driver', category?: string) => {
    if (socketRef.current?.connected) {
      return;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    if (!cleanUrl) return;

    const newSocket = io(cleanUrl, {
      transports: ['websocket'],
      autoConnect: true,
      query: { userId, role, category: category || "" },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = newSocket;
    setSocketInstance(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log(`🪙 Real-time socket established successfully: Room context applied [${role}]`);

      // 🧊 ATOMIC STATE PROPAGATION HANDSHAKE
      // Emit an explicit initialization confirmation check right inside the connection vector path
      newSocket.emit("user:sync_onboarding_state", { userId, role });
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('🪙 Real-time socket dropped tracking channel cleanly.');
    });
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.off();
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocketInstance(null);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ 
      socket: socketInstance, 
      isConnected, 
      connectWithAuth, 
      disconnectSocket 
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);