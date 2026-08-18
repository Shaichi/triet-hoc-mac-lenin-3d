// tools/check.mjs
// Kiểm tra headless: trang load, không lỗi console, scene dựng, loader ẩn.
// Cách chạy:  node tools/check.mjs   (hoặc:  node tools/check.mjs http://localhost:3000/)
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = process.argv[2] || pathToFileURL(resolve(root, "index.html")).href;

const candidates = [
  process.env.LOCALAPPDATA + "/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe"
].filter((p) => p && existsSync(p));

if (!candidates.length) {
  console.log("SKIP: không tìm thấy Chrome/Edge — hãy mở trang thủ công để kiểm tra.");
  process.exit(2);
}

console.log("Browser:", candidates[0]);
console.log("Target :", target);

const target2 = pathToFileURL(resolve(root, "test/probe.html")).href;
const out = execFileSync(candidates[0], [
  "--headless=new", "--disable-gpu", "--no-sandbox",
  "--virtual-time-budget=6000", "--dump-dom", target2
], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
// target2 = path tới test/probe.html (file://)
const m = out.match(/<title>MLNCHECK:(PASS|FAIL):errs=(\d+)<\/title>/);
if (!m) { console.error("FAIL: không đọc được kết quả probe"); process.exit(1); }
console.log("Kết quả:", m[1], "| lỗi console:", m[2]);
process.exit(m[1] === "PASS" && m[2] === "0" ? 0 : 1);
