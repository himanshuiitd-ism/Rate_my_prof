import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "https://rate-my-proff.onrender.com/";
export const socket = io(SOCKET_URL, { autoConnect: false });

export function joinProf(profId) {
  socket.emit("join_prof", { profId });
}
