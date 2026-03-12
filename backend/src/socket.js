import ChatMessage from "./models/ChatMessage.js";

export default function (io) {
  io.on("connection", (socket) => {
    console.log(`✅ Socket connected: ${socket.id}`);

    socket.on("join_prof", ({ profId }) => {
      console.log(`📍 User ${socket.id} joined prof_${profId}`);
      socket.join(`prof_${profId}`);
    });

    socket.on("send_message", async ({ profId, message }) => {
      try {
        if (!message || !profId) {
          console.warn("Received invalid message:", { profId, message });
          return;
        }
        console.log(
          `💬 Message from ${socket.id} for prof ${profId}: ${message}`,
        );
        // Persist message
        const msg = new ChatMessage({ prof: profId, message });
        await msg.save();
        console.log(`✅ Message saved to DB`);
        io.to(`prof_${profId}`).emit("new_message", {
          profId,
          message,
          createdAt: msg.createdAt,
        });
      } catch (err) {
        console.error("❌ Error saving message:", err);
        socket.emit("message_error", { error: err.message });
      }
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

    socket.on("disconnect", () => {
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });
}
