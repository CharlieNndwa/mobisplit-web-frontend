import { io, Socket } from "socket.io-client";

// Using 10.0.2.2 for Android Emulator or your local IP for physical devices
const SOCKET_URL = "https://daringly-tacky-anemic.ngrok-free.dev"; 

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

// Added default export to resolve warning[cite: 40]
export default socket;