import ChatMessage from "./models/ChatMessage.js";

export default function (io) {
  io.on("connection", (socket) => {
    socket.on("join_prof", ({ profId }) => {
      socket.join(`prof_${profId}`);
    });

    socket.on("send_message", async ({ profId, message }) => {
      if (!message || !profId) return;
      // Persist message
      const msg = new ChatMessage({ prof: profId, message });
      await msg.save();
      io.to(`prof_${profId}`).emit("new_message", {
        profId,
        message,
        createdAt: msg.createdAt,
      });
    });

    socket.on("send_rating", async ({ profId, categories, comment }) => {
      // For immediate real-time feedback, forward event. Ratings are stored via REST API.
      io.to(`prof_${profId}`).emit("prof_update", {
        profId,
        categories,
        comment,
        ts: Date.now(),
      });
    });
  });
}
