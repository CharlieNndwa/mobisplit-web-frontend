import { io, Socket } from "socket.io-client";

// This replaces the old ngrok tracking socket variable cleanly:
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";
const SOCKET_URL = BASE_URL.replace("https://", "wss://");

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

// Added default export to resolve warning[cite: 40]
export default socket;