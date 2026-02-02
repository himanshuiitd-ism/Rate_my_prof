import "dotenv/config";
import { connect, disconnect } from "mongoose";
import Professor from "./src/models/Professor.js";
import ChatMessage from "./src/models/ChatMessage.js";

async function addMessages() {
  await connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const profs = await Professor.find().limit(10);
  console.log(`Found ${profs.length} professors`);

  for (const prof of profs) {
    const numMessages = Math.floor(Math.random() * 15) + 5; // 5-20 messages

    for (let i = 0; i < numMessages; i++) {
      await ChatMessage.create({
        prof: prof._id,
        message: `Test message ${i + 1} for ${prof.name}`,
      });
    }
    console.log(`✅ Added ${numMessages} messages to ${prof.name}`);
  }

  await disconnect();
  console.log("\n✅ Done! Refresh your frontend to see the changes.");
}

addMessages().catch(console.error);
