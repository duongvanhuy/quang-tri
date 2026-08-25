import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (name === "stitch_qu_ng_tr_k_c_kh_t_v_ng" || name === "node_modules" || name === "assets") continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) out.push(...walk(full));
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

const OLD = `<link href="assets/css/base.css" rel="stylesheet"/>
<script src="assets/js/theme.js"></script>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>`;

const OLD2 = (prefix) =>
  `<link href="${prefix}assets/css/base.css" rel="stylesheet"/>
<script src="${prefix}assets/js/theme.js"></script>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>`;

const NEW = (prefix) =>
  `<link href="${prefix}assets/css/base.css" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com/3.4.16?plugins=forms,container-queries"></script>
<script src="${prefix}assets/js/theme.js"></script>`;

for (const file of walk(ROOT)) {
  let html = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, file);
  const depth = rel.split(path.sep).length - 1;
  const prefix = depth === 0 ? "" : "../".repeat(depth);
  const next = html
    .replace(OLD2(prefix), NEW(prefix))
    .replace(
      /<script src="https:\/\/cdn\.tailwindcss\.com\?plugins=forms,container-queries"><\/script>/g,
      `<script src="https://cdn.tailwindcss.com/3.4.16?plugins=forms,container-queries"></script>`
    );
  if (next !== html) {
    fs.writeFileSync(file, next);
    console.log("fixed", rel);
  } else {
    console.log("skip", rel);
  }
}
