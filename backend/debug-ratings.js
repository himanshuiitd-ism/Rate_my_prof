import "dotenv/config";
import { connect } from "mongoose";
import Rating from "./models/Rating.js";
import Professor from "./models/Professor.js";

async function debugRatings() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("No MONGO_URI in environment");
      process.exit(1);
    }

    await connect(mongoUri);
    console.log("Connected to MongoDB\n");

    // Find all professors
    const professors = await Professor.find();
    console.log(`Found ${professors.length} professors\n`);

    for (const prof of professors) {
      const ratings = await Rating.find({ prof: prof._id });

      if (ratings.length > 0) {
        console.log(`\n=== ${prof.name} ===`);
        console.log(`Total ratings: ${ratings.length}`);

        ratings.forEach((rating, index) => {
          console.log(`\nRating ${index + 1}:`);
          console.log("  Raw document:", JSON.stringify(rating, null, 2));
          console.log("  categories type:", typeof rating.categories);
          console.log(
            "  categories instanceof Map:",
            rating.categories instanceof Map,
          );

          if (rating.categories) {
            console.log("  categories keys:", Object.keys(rating.categories));
            console.log("  categories.score:", rating.categories.score);

            if (rating.categories instanceof Map) {
              console.log(
                "  Map entries:",
                Array.from(rating.categories.entries()),
              );
            }
          }
        });

        // Calculate average
        let total = 0;
        let count = 0;
        ratings.forEach((r) => {
          let score = null;
          if (r.categories && r.categories.score !== undefined) {
            score = r.categories.score;
          }
          if (score !== null && !isNaN(score)) {
            total += Number(score);
            count++;
          }
        });

        const avg = count > 0 ? total / count : null;
        console.log(`\nCalculated average: ${avg}`);
        console.log("---");
      }
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

debugRatings();
