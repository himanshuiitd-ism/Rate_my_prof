import { io } from "socket.io-client";

// Determine socket URL from API URL or environment variable
const getSocketURL = () => {
  const socketEnv = import.meta.env.VITE_SOCKET_URL;
  if (socketEnv) return socketEnv;

  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
  // Extract base URL from API URL
  try {
    const url = new URL(apiURL);
    return `${url.protocol}//${url.host}`;
  } catch {
    return "http://localhost:4000";
  }
};

export const socket = io(getSocketURL(), {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

export function joinProf(profId) {
  if (!socket.connected) {
    console.warn("Socket not connected yet, waiting...");
    socket.once("connect", () => {
      socket.emit("join_prof", { profId });
    });
  } else {
    socket.emit("join_prof", { profId });
  }
}
