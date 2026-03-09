import { connect, disconnect } from "mongoose";
import Professor from "./models/Professor.js";
import "dotenv/config";

async function run() {
  await connect(process.env.MONGO_URI);

  const depts = await Professor.aggregate([
    { $match: { college: "IIT Madras" } },
    {
      $group: {
        _id: "$department",
        total: { $sum: 1 },
        withPhoto: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $ne: ["$photoUrl", null] },
                  { $ne: ["$photoUrl", ""] },
                  { $gt: [{ $type: "$photoUrl" }, "missing"] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  let totalAll = 0;
  let totalPhoto = 0;
  for (const d of depts) {
    const m = d.total - d.withPhoto;
    totalAll += d.total;
    totalPhoto += d.withPhoto;
    console.log(
      d._id +
        " | " +
        d.withPhoto +
        "/" +
        d.total +
        " | " +
        (m > 0 ? m + " missing" : "ALL GOOD"),
    );
  }
  console.log("--- TOTAL: " + totalPhoto + "/" + totalAll);

  // Cleanup junk
  await Professor.deleteMany({
    name: { $in: ["Our Contact", "Indian Institute of Technology Madras"] },
    college: "IIT Madras",
  });

  await disconnect();
}
run();
