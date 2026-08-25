import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "assets", "images");
const URL_RE = /https:\/\/lh3\.googleusercontent\.com\/(?:aida-public|aida)\/[A-Za-z0-9_-]+/g;

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "stitch_qu_ng_tr_k_c_kh_t_v_ng" || name === "node_modules" || name === "assets") continue;
      out.push(...walk(full));
    } else if (name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

function collect(files) {
  const urls = new Set();
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    for (const m of html.matchAll(URL_RE)) urls.add(m[0]);
  }
  return [...urls];
}

async function download(url, dest, attempt = 1) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });
  if (res.status === 429 && attempt < 5) {
    await new Promise((r) => setTimeout(r, 1500 * attempt));
    return download(url, dest, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${url.slice(0, 80)}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

const files = walk(ROOT);
const urls = collect(files);
fs.mkdirSync(OUT, { recursive: true });

const map = {};
let i = 0;
for (const url of urls) {
  i += 1;
  const id = crypto.createHash("md5").update(url).digest("hex").slice(0, 10);
  const name = `img-${id}.jpg`;
  const dest = path.join(OUT, name);
  if (!fs.existsSync(dest) || fs.statSync(dest).size < 1000) {
    try {
      const len = await download(url, dest);
      console.log("ok", i, "/", urls.length, len, name);
    } catch (err) {
      console.log("fail", i, "/", urls.length, err.message);
      continue;
    }
    await new Promise((r) => setTimeout(r, 250));
  } else {
    console.log("skip", i, "/", urls.length, name);
  }
  map[url] = "assets/images/" + name;
}

function relFrom(file, assetPath) {
  const depth = path.relative(ROOT, path.dirname(file)).split(path.sep).filter(Boolean).length;
  return (depth ? "../".repeat(depth) : "") + assetPath;
}

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [url, assetPath] of Object.entries(map)) {
    if (html.includes(url)) {
      html = html.split(url).join(relFrom(file, assetPath));
      changed = true;
    }
  }
  if (!html.includes('name="referrer"')) {
    html = html.replace("<head>", '<head>\n<meta name="referrer" content="no-referrer"/>');
    changed = true;
  }
  html = html.replace(/<img(?![^>]*referrerpolicy=)/gi, '<img referrerpolicy="no-referrer"');
  if (changed) {
    fs.writeFileSync(file, html);
    console.log("updated", path.relative(ROOT, file));
  }
}

const ok = Object.keys(map).length;
console.log("localized", ok, "of", urls.length, "images");
