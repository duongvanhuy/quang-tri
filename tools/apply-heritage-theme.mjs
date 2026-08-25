import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const liveHtml = [
  "index.html",
  "404.html",
  ...fs
    .readdirSync(path.join(root, "pages"), { recursive: true })
    .filter((f) => f.endsWith(".html"))
    .map((f) => path.join("pages", f)),
];

const NEW_FONTS =
  "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Merriweather:ital,opsz,wght@0,18..144,400;0,18..144,700;1,18..144,400&display=swap";

const replacements = [
  [/#e2fffe/gi, "#F4EFE6"],
  [/#bee1e0/gi, "#E4D8C6"],
  [/#c6e9e9/gi, "#DDD0B8"],
  [/#ccefee/gi, "#E6D9C4"],
  [/#d7fafa/gi, "#F7F1E6"],
  [/#d2f5f4/gi, "#EFE6D6"],
  [/#002020/gi, "#2C221A"],
  [/#143535/gi, "#2A2118"],
  [/#610000/gi, "#6B2218"],
  [/#8b0000/gi, "#8A2E20"],
  [/rgba\(\s*226\s*,\s*255\s*,\s*254\s*,/g, "rgba(244, 239, 230,"],
  [/vec3\(0\.745,\s*0\.882,\s*0\.878\)/g, "vec3(0.894, 0.847, 0.776)"],
  [/vec3\(0\.38,\s*0\.0,\s*0\.0\)/g, "vec3(0.420, 0.133, 0.094)"],
];

for (const rel of liveHtml) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, "utf8");
  const before = html;

  html = html.replace(
    /https:\/\/fonts\.googleapis\.com\/css2\?family=EB\+Garamond[^"'>\s]*/g,
    NEW_FONTS
  );

  for (const [from, to] of replacements) {
    html = html.replace(from, to);
  }

  if (html !== before) {
    fs.writeFileSync(file, html);
    console.log("updated", rel);
  }
}
