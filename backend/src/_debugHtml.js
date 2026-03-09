import https from "https";
import axios from "axios";
import { load } from "cheerio";
import { writeFileSync } from "fs";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const axiosOpts = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  httpsAgent,
  timeout: 30000,
};

async function main() {
  const url = "https://hss.iitm.ac.in/faculty-members/";
  const { data } = await axios.get(url, axiosOpts);
  const $ = load(data);

  // Find all links to hss.iitm.ac.in (potential faculty links)
  const results = [];
  $("a").each((_, el) => {
    const href = $(el).attr("href") || "";
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (!href.includes("hss.iitm.ac.in/")) return;
    if (
      href.includes("wp-content") ||
      href.includes("faculty-members") ||
      !text ||
      text.length < 3 ||
      text.length > 80
    )
      return;
    if (
      text.toLowerCase().includes("faculty") ||
      text.toLowerCase().includes("visiting") ||
      text.toLowerCase().includes("department") ||
      text.toLowerCase().includes("hours")
    )
      return;

    // Find how the image and link relate
    const $a = $(el);
    const $parent = $a.parent();
    const $grandparent = $parent.parent();
    const $greatGP = $grandparent.parent();

    // Look for img in various ancestor levels
    let imgSrc = null;
    for (const $container of [
      $parent,
      $grandparent,
      $greatGP,
      $greatGP.parent(),
    ]) {
      const $img = $container.find("img").first();
      if ($img.length && $img.attr("src")) {
        imgSrc = $img.attr("src");
        break;
      }
    }

    results.push({
      name: text,
      href: href.substring(0, 80),
      imgFound: !!imgSrc,
      imgSrc: imgSrc ? imgSrc.substring(0, 80) : "NONE",
      parentTag: $parent.prop("tagName"),
      parentCls: ($parent.attr("class") || "").substring(0, 50),
      gpTag: $grandparent.prop("tagName"),
      gpCls: ($grandparent.attr("class") || "").substring(0, 50),
    });
  });

  writeFileSync(
    "src/_hss_debug.json",
    JSON.stringify(results.slice(0, 15), null, 2),
    "utf-8",
  );
  console.log("Wrote " + results.length + " faculty links");
  console.log("First 3:");
  results.slice(0, 3).forEach((r) => console.log(JSON.stringify(r)));
}

main().catch(console.error);
