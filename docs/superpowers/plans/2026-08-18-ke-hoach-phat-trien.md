# Kế hoạch phát triển dự án "Triết học Mác–Lênin · Không gian 3D"

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Khắc phục các điểm yếu đã phát hiện (bố cục cụm chồng lấn, lỗi logic, rò rỉ bộ nhớ, thiếu điều hướng/trắc nghiệm/tìm kiếm, mobile, offline, kiểm thử tự động) để trang web trở thành một công cụ học tập hoàn chỉnh, chạy mượt trên mọi thiết bị.

**Architecture:** Giữ nguyên kiến trúc hiện có (tĩnh, không build step: `index.html` + `data.js`/`main.js` + vendor Three.js). Mỗi task là một lát cắt độc lập, kiểm tra được bằng trình duyệt. Vùng code sửa trong `main.js` được khoanh theo comment đánh dấu `// ----------` sẵn có.

**Tech Stack:** HTML/CSS/JS thuần, Three.js (vendor, không nâng cấp — `outputEncoding`/`sRGBEncoding` khớp API cũ), localStorage, `document.fonts` API.

**Spec:** Không có spec riêng — phần **Phân tích hiện trạng** dưới đây chính là spec; các task bám sát từng phát hiện.

## Global Constraints

- **Không sửa** `js/vendor/three.min.js` và `js/vendor/OrbitControls.js`.
- Toàn bộ UI/nội dung bằng **tiếng Việt có dấu chuẩn**.
- Không thêm build step, không thêm dependency (kể cả CDN ngoài Google Fonts đã có).
- Loader fallback trong `index.html` (tự ẩn sau 2.5s) phải luôn hoạt động — không để màn hình loading kẹt vĩnh viễn.
- Thứ tự script trong `index.html`: vendor → `data.js` → `main.js` (không đổi).
- Node mới trong `data.js` phải có `pos` không chồng lấn và `sim` trỏ tới khóa hợp lệ trong `SIMS`.
- Sau mỗi task: mở trang trong trình duyệt (Chrome/Edge) xác minh loader biến mất, scene render, **không lỗi console**.

---

# PHÂN TÍCH HIỆN TRẠNG (spec của kế hoạch này)

## A. Lỗi logic đã xác định (độ ưu tiên cao)

| # | Lỗi | Vị trí | Hệ quả |
|---|-----|--------|--------|
| A1 | **Nút "Biện chứng duy vật" trên nav bay sai cụm.** `topicCenter()` map `materialist-dialectics` → tag `dialectics`, nhưng toàn bộ 12 nút của cụm này mang tag `materialist-dialectics` (3 nút tag `dialectics` là nút *lịch sử* phép biện chứng). `members.length === 0` → return null → bấm nút không bay đi đâu | `js/main.js:1276-1292` | Nút nav hỏng hoàn toàn |
| A2 | **`flyT` không reset** trong `flyTo()` — biến `flyT` được tăng dần ở vòng lặp; nếu gọi `flyTo` lần 2 khi animation cũ chưa hết, `flyT` đã > 0 → camera nhảy/đến nơi tức thì | `js/main.js:1129-1142` | Giật camera khi thao tác nhanh |
| A3 | **Rò rỉ sprite glow khi đổi hover nhanh.** `makeGlow()` tạo texture canvas mới mỗi lần; vòng lặp xóa glow cũ chạy ở `onPointerMove` nhưng nếu người dùng nhấn chọn node (mở info panel) khi đang hover, glow không bị xóa; ngoài ra texture trong sprite không được `dispose()` | `js/main.js:1231-1241`, `makeGlow` 283-302 | Rò rỉ GPU memory phiên dài |
| A4 | **`hist-cmv` lệch nội dung**: node `vi` = "Con người và vai trò sáng tạo lịch sử của quần chúng nhân dân" nhưng SIM title/caption lại là "Sứ mệnh lịch sử của giai cấp công nhân" | `js/data.js:387-396` vs `data.js:447` | Người học thấy nội dung không khớp |
| A5 | **`nodeColor()` crash nếu node thiếu `rule`.** `node.rule.indexOf(...)` — node nào bỏ sót `rule: ""` sẽ ném TypeError | `js/main.js:22-24` | Trang chết khi thêm node mới quên trường |

## B. Chất lượng code / hiệu năng

| # | Vấn đề | Vị trí |
|---|--------|--------|
| B1 | `main.js` là 1 IIFE 2547 dòng: scene + UI + sim + timeline + nav + keyboard trộn lẫn | toàn file |
| B2 | `animate()` gọi `Date.now()` ~10 lần/khung hình, tạo `Vector3/Euler` mới trong vòng lặp (electron, label fade) — GC pressure | `main.js:2316-2506` |
| B3 | SIM lượng–chất tạo `BoxGeometry` mới + dispose geometry cũ **mỗi khung hình** | `main.js:2071-2084` |
| B4 | `onPointerMove` raycast mọi mesh + traverse đổi emissiveIntensity toàn bộ node mỗi lần di chuột (raycast nên throttle) | `main.js:1206-1242` |
| B5 | `data.js`: các entry SIMS dạng spec bị nén thành 1 dòng JSON (~2-4 KB/dòng) — không review được | `data.js:420-447` |

## C. Tính năng còn thiếu (giá trị giáo dục)

- **C1. Không có điều hướng giữa các node**: không nút "Khái niệm trước / tiếp theo", không liên kết "xem thêm" giữa các khái niệm liên quan (ví dụ Lượng–Chất ↔ Điểm nút, Mâu thuẫn ↔ Nguồn gốc phát triển).
- **C2. Không có tìm kiếm**: 22 node mà không có ô gõ tên để nhảy tới.
- **C3. Không có chế độ học/trắc nghiệm**: dữ liệu `body`/`example` có sẵn, rất hợp để sinh câu hỏi ôn tập.
- **C4. Không lưu tiến độ**: localStorage chưa dùng — không nhớ node đã xem / câu đúng.
- **C5. Không có legend màu cụm chủ đề**: 5 màu node (đỏ/vàng/lục/lam…) không được chú thích ở đâu.
- **C6. Không có đường nối quan hệ** giữa các khái niệm trong 3D (chỉ có label + hình rời rạc).
- **C7. Timeline không liên kết node**: mục timeline (1845 Luận cương Feuerbach…) không trỏ tới node liên quan.
- **C8. Không có nút "Về tổng quan"** (reset camera) trên UI — chỉ có Esc.

## D. UX / Accessibility / Mobile

- **D1. Mobile panel chồng nhau**: `#info-panel` (phải) và `#sim-panel` (trái) đều rộng `min(320px, 100vw-20px)` trên màn < 860px → đè nhau; mở sim cùng lúc với info panel là vỡ bố cục.
- **D2. Font canvas race**: `makeLabel()` vẽ chữ "Be Vietnam Pro" khi scene dựng; font Google load async (`media="print"`) → lần load đầu nhãn có thể render bằng Segoe UI fallback.
- **D3. Không có focus management / aria**: panel mở ra không focus được bằng bàn phím, nút đóng không `aria-label`, modal không `role="dialog"`, không trap focus.
- **D4. Không hỗ trợ `prefers-reduced-motion`**: nền sao, node bob/rotate, dust chạy liên tục — người nhạy cảm chuyển động không tắt được.
- **D5. Text contrast thấp**: `--muted` rgba(...,0.62) trên nền panel; footer `.72rem`.

## E. Hạ tầng / phân phối

- **E1. Không có test** — CLAUDE.md xác nhận; main.js đã lộ sẵn các hook dev (`window.__mlnScene`, `__testOpenSim`, `__mlnSimState`) nhưng chưa có gì dùng chúng.
- **E2. Google Fonts là dependency ngoài duy nhất** — offline lần đầu (hoặc mạng chặn Google) → font fallback, canvas label xấu hẳn.
- **E3. Không có SEO/meta**: thiếu `meta description`, `og:*`, `theme-color`.
- **E4. Lỗi runtime chỉ hiện banner DOM** — không có cách kiểm tra tự động nào.

---

# LỘ TRÌNH 3 GIAI ĐOẠN

| Giai đoạn | Mục tiêu | Tasks |
|-----------|----------|-------|
| **1 — Sửa lỗi & ổn định** | Không còn lỗi logic, hết rò rỉ bộ nhớ, có test tự động tối thiểu | T1–T5 |
| **2 — Trải nghiệm học tập** | Điều hướng, tìm kiếm, legend, liên kết, tiến độ, mobile/accessibility | T6–T12 |
| **3 — Mở rộng** | Chế độ trắc nghiệm, liên kết timeline, đường nối 3D, offline/SEO, tách file | T13–T16 |

---

# GIAI ĐOẠN 1 — SỬA LỖI & ỔN ĐỊNH

### Task 1: Thiết lập công cụ kiểm tra tự động tối thiểu (headless browser)

**Files:**
- Create: `tools/check.mjs` — script Node chạy headless Chrome/Edge, mở trang, chờ scene sẵn sàng, in kết quả ra console, exit code 0/1
- Modify: `.gitignore` (không thêm gì cần thiết — script chỉ dùng trình duyệt có sẵn)

**Interfaces:**
- Consumes: `index.html` (mở qua `file://` hoặc server tĩnh), các hook dev sẵn có `window.__mlnScene`, `window.__hideLoader`
- Produces: lệnh `node tools/check.mjs` — các task sau dùng thay cho việc mở trình duyệt thủ công; trả về exit code 1 nếu có lỗi

> Ghi chú: không thêm dependency npm. Dùng trình duyệt đã cài qua child process với `--headless --dump-dom` + console log capture bằng CDP đơn giản. Nếu máy không có Chrome/Edge ở path chuẩn, script in hướng dẫn và exit 2 (skip mềm).

- [x] **Step 1: Viết script kiểm tra**

```javascript
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
```

- [x] **Step 2: Tạo trang probe dùng hook dev**

Create: `test/probe.html`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>MLN Probe</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body>
  <!-- Probe: dựng lại đúng cấu trúc index.html + gom lỗi console vào __mlnErrors -->
  <div id="scene-container"></div>
  <div id="loader"><div class="loader-inner"><div class="loader-ring"></div>
    <h1>probe</h1><p>…</p><div class="loader-bar"><div class="loader-fill"></div></div></div></div>
  <script>
    window.__mlnErrors = [];
    window.addEventListener("error", function (ev) { window.__mlnErrors.push(ev.message); });
    (function () {
      var loader = document.getElementById("loader");
      function hide() { if (loader && !loader.classList.contains("gone")) loader.classList.add("gone"); }
      window.__hideLoader = hide;
      document.addEventListener("mln-ready", hide);
      setTimeout(hide, 2500);
    })();
  </script>
  <header id="titlebar"><div class="brand"><span class="brand-icon">◉</span><div><h1>p</h1><p>p</p></div></div>
    <nav class="top-nav"></nav>
    <div class="mobile-menu"><button id="hamburger" aria-label="menu">☰</button>
      <div id="mobile-nav" class="mobile-nav hidden"></div></div>
  </header>
  <div id="info-panel" class="hidden"><button id="info-close">✕</button><div id="info-content"></div></div>
  <div id="help" class="hidden"><div class="card"><button id="help-close">✕</button>
    <h2>Hướng dẫn</h2><ul id="help-list"></ul><button id="help-done">OK</button></div></div>
  <div id="sim-panel" class="hidden"><div class="sim-header"><h2 id="sim-title"></h2>
    <button id="sim-close">✕</button></div><canvas id="sim-canvas"></canvas>
    <div id="sim-caption"></div><div id="sim-controls"></div></div>
  <div id="timeline-modal" class="hidden"><div class="tl-card"><button id="timeline-close">✕</button>
    <h2 id="tl-title"></h2><p id="tl-intro"></p><div id="tl-eras"></div><div id="tl-track"></div></div></div>
  <footer id="footer"><span id="current-target"></span><span class="hint"></span></footer>

  <script src="../js/vendor/three.min.js"></script>
  <script src="../js/vendor/OrbitControls.js"></script>
  <script src="../js/data.js"></script>
  <script src="../js/main.js"></script>
  <script>
    // Kết quả cho headless đọc qua document title
    setTimeout(function () {
      const ok = !!window.__mlnScene && document.getElementById("loader").classList.contains("gone");
      document.title = "MLNCHECK:" + (ok ? "PASS" : "FAIL") + ":errs=" + window.__mlnErrors.length;
      if (window.__mlnErrors.length) console.log("ERRORS:", JSON.stringify(window.__mlnErrors));
    }, 3500);
  </script>
</body>
</html>
```

- [x] **Step 3: Hoàn thiện `tools/check.mjs` để đọc kết quả từ title**

Nối tiếp phần dưới của `tools/check.mjs` (sau Step 1) — chạy headless mở `test/probe.html` và đọc kết quả từ `<title>`:

```javascript
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
```

- [x] **Step 4: Chạy và xác nhận PASS trên code hiện tại**

Run: `node tools/check.mjs`
Expected: `Kết quả: PASS | lỗi console: 0`, exit code 0.

- [x] **Step 5: Commit**

```bash
git add tools/check.mjs test/probe.html
git commit -m "test: headless probe tự kiểm tra trang load không lỗi"
```

---

### Task 2: Sửa `topicCenter()` — nút "Biện chứng duy vật" bay đúng cụm (A1)

**Files:**
- Modify: `js/main.js:1276-1292` (hàm `topicCenter`)

**Interfaces:**
- Consumes: mảng `meshes` (mỗi mesh có `userData.node.tag`), `DATA` (5 khóa cụm)
- Produces: `topicCenter(topicKey)` trả về `Vector3 | null`; phải trả về tâm của 12 node `materialist-dialectics` khi `topicKey === "materialist-dialectics"`

- [x] **Step 1: Viết test con trong probe — mở rộng `test/probe.html`**

Thêm vào `<script>` cuối của `test/probe.html` (trước `setTimeout` chốt kết quả):

```html
<script src="../js/main.js"></script> <!-- đã có; KHÔNG thêm lần 2 -->
```

Thay vào đó, mở rộng hook kiểm tra trong **main.js** (khu dev hooks cuối file, ~2528):

```javascript
  window.__mlnTopicCenter = function (key) { return topicCenter(key); };
```

Và trong `test/probe.html`, thêm vào script đặt title:

```javascript
      const c = window.__mlnTopicCenter ? window.__mlnTopicCenter("materialist-dialectics") : null;
      const navOk = !!(c && (Math.abs(c.x) > 1 || Math.abs(c.y) > 1 || Math.abs(c.z) > 1));
      document.title = "MLNCHECK:" + (ok && navOk ? "PASS" : "FAIL") + ":errs=" + window.__mlnErrors.length;
```

- [x] **Step 2: Chạy test để thấy FAIL**

Run: `node tools/check.mjs`
Expected: `FAIL` (vì `topicCenter("materialist-dialectics")` hiện trả `null`).

- [x] **Step 3: Sửa `topicCenter`**

Thay toàn bộ hàm bằng logic trực tiếp, không map lòng vòng:

```javascript
  function topicCenter(topicKey) {
    // tag của node KHỚP 1-1 với khóa cụm trong DATA — không cần map ngoại lệ.
    // "materialist-dialectics" gồm 12 node mang tag đó (nguyên lý, phạm trù, quy luật);
    // 3 node lịch sử phép biện chứng mang tag "dialectics" thuộc về nút "Biện chứng".
    const members = meshes.filter(function (m) { return m.userData.node.tag === topicKey; });
    if (members.length === 0) return null;
    const c = new THREE.Vector3();
    members.forEach(function (m) { c.add(m.getWorldPosition(new THREE.Vector3())); });
    return c.divideScalar(members.length);
  }
```

- [x] **Step 4: Chạy test để thấy PASS**

Run: `node tools/check.mjs`
Expected: `PASS`, exit 0.

- [x] **Step 5: Kiểm tra thủ công nhanh**: mở trang, bấm nút "Biện chứng duy vật" — camera bay tới cụm 12 node (không đứng yên).

- [x] **Step 6: Commit**

```bash
git add js/main.js test/probe.html
git commit -m "fix: nút 'Biện chứng duy vật' bay đúng cụm node materialist-dialectics"
```

---

### Task 3: Sửa `flyTo()` reset `flyT` + hover glow cleanup (A2, A3)

**Files:**
- Modify: `js/main.js:1129-1142` (`flyTo`), `js/main.js:1231-1241` + `2304-2312` (hover glow), helper `makeGlow` 283-302

**Interfaces:**
- Consumes: `flyT`, `flyTarget` (module-level), `meshes[].userData.hoverGlow`
- Produces: hàm `clearHoverGlow(mesh)` dùng chung ở pointermove/pointerleave/closeSim; texture glow được dispose

- [x] **Step 1: Sửa `flyTo` — reset đồng hồ bay**

```javascript
  function flyTo(pos, lookAt) {
    flyStart = camera.position.clone();
    flyStartTarget = controls.target.clone();
    flyTarget = pos ? pos.clone() : null;
    flyTargetLook = lookAt ? lookAt.clone() : flyTarget;
    flyT = 0; // BUG-FIX: phải reset — nếu không, lần bay kế tiếp kế thừa flyT cũ và đến nơi tức thì
  }
```

- [x] **Step 2: Thêm helper xóa glow + dispose texture**

Đặt ngay sau `makeGlow`:

```javascript
  // Xóa quầng sáng hover của một node và giải phóng texture canvas của nó
  function clearHoverGlow(mesh) {
    const g = mesh.userData.hoverGlow;
    if (!g) return;
    nodeGroup.remove(g);
    if (g.material.map) g.material.map.dispose();
    g.material.dispose();
    mesh.userData.hoverGlow = null;
  }
```

- [x] **Step 3: Thay 3 chỗ xóa glow thủ công bằng helper**

Trong `onPointerMove` (khối `// hover glow ring`):

```javascript
    meshes.forEach(function (m) { if (m !== hovered) clearHoverGlow(m); });
```

Trong listener `pointerleave`:

```javascript
  renderer.domElement.addEventListener("pointerleave", function () {
    meshes.forEach(clearHoverGlow);
  });
```

Và trong `showInfo()` (dòng đầu hàm) để chọn node không để lại glow đóng băng: KHÔNG — giữ glow khi chọn node là đúng UX. Nhưng thêm vào `closeSim()` và `hideInfo()`:

```javascript
    meshes.forEach(clearHoverGlow); // đóng panel → xóa glow còn treo
```

- [x] **Step 4: Chạy test**

Run: `node tools/check.mjs`
Expected: `PASS`.

- [x] **Step 5: Kiểm tra thủ công**: rê chuột qua lại giữa 2 node nhanh, sau đó rời chuột khỏi canvas — không glow nào còn treo; bấm chọn node rồi Esc — glow biến mất.

- [x] **Step 6: Commit**

```bash
git add js/main.js
git commit -m "fix: reset flyT khi đổi đích bay; dispose hover-glow tránh rò rỉ texture"
```

---

### Task 4: Chống crash `nodeColor` khi thiếu `rule` + khớp nội dung node `hist-cmv` (A4, A5)

**Files:**
- Modify: `js/main.js:21-30` (`nodeColor`)
- Modify: `js/data.js:447` (SIM `hist-cmv`) — sửa title/caption khớp node, hoặc tách SIM mới; chọn phương án **sửa SIM khớp node** (giữ node là chuẩn vì đúng sách giáo khoa)

**Interfaces:**
- Consumes: `node.rule` (string), `SIMS["hist-cmv"]`
- Produces: `nodeColor(node)` an toàn với node không có `rule`; SIM `hist-cmv` nói về quần chúng nhân dân

- [x] **Step 1: Sửa `nodeColor` phòng thủ**

```javascript
  function nodeColor(node) {
    const rule = node.rule || ""; // phòng thủ: node thêm sau này có thể quên trường rule
    if (rule.indexOf("Quy luật") === 0) return COLORS.red;
    if (rule.indexOf("Cặp phạm trù") === 0) return 0xc98a2b;
    if (rule.indexOf("Nguyên lý") === 0) return 0xa03a3e;
    if (node.tag === "materialism") return 0xd94f52;
    if (node.tag === "dialectics") return 0xe8b54d;
    if (node.tag === "cognition") return 0x3f8e6a;
    if (node.tag === "practice") return 0x3f6fb5;
    return COLORS.gold;
  }
```

- [x] **Step 2: Sửa SIM `hist-cmv` khớp node**

Trong `js/data.js`, thay `"hist-cmv": {...}` bằng spec mới giữ nguyên cấu trúc parts (đám đông + ngôi sao) nhưng sửa lời dẫn:

```javascript
  "hist-cmv": {"title":"Mô phỏng · Quần chúng nhân dân sáng tạo lịch sử","camDist":18,"caption":"Quần chúng nhân dân — những người lao động — là chủ thể sáng tạo lịch sử: làm ra của cải, văn hóa và cách mạng.","spec":{"period":12,"phases":[{"at":0,"caption":"<b>Quần chúng nhân dân</b> — đông đảo người lao động — làm ra mọi của cải vật chất và tinh thần của xã hội."},{"at":0.4,"caption":"Họ là <b>động lực của lịch sử</b>: phát triển lực lượng sản xuất, sáng tạo văn hóa, là lực lượng của mọi cuộc cách mạng."},{"at":0.75,"caption":"<b>Quần chúng là chủ thể sáng tạo lịch sử</b>. Cá nhân kiệt xuất có vai trò lớn, nhưng chỉ phát huy được khi dựa vào quần chúng."}],"parts":[{"shape":"person","pos":[0,-1.8,0],"color":15222861,"scale":1.05,"motion":{"type":"bob","amp":0.12},"phases":[{"at":0}]},{"shape":"person","pos":[-2.2,-1.8,0],"color":15222861,"scale":0.9,"motion":{"type":"bob","amp":0.12,"phase":0.7},"phases":[{"at":0,"pos":[-2.2,-1.8,0]},{"at":0.4,"pos":[-1.4,-1.8,0]}]},{"shape":"person","pos":[2.2,-1.8,0],"color":15222861,"scale":0.9,"motion":{"type":"bob","amp":0.12,"phase":1.4},"phases":[{"at":0,"pos":[2.2,-1.8,0]},{"at":0.4,"pos":[1.4,-1.8,0]}]},{"shape":"person","pos":[-4.2,-1.8,0],"color":15222861,"scale":0.75,"motion":{"type":"bob","amp":0.12,"phase":2.1},"phases":[{"at":0,"pos":[-4.2,-1.8,0]},{"at":0.4,"pos":[-2.5,-1.8,0]}]},{"shape":"person","pos":[4.2,-1.8,0],"color":15222861,"scale":0.75,"motion":{"type":"bob","amp":0.12,"phase":2.8},"phases":[{"at":0,"pos":[4.2,-1.8,0]},{"at":0.4,"pos":[2.5,-1.8,0]}]},{"shape":"label","pos":[0,-3.3,0],"text":"người lao động — đông đảo, sáng tạo","textColor":"#e8b54d","scale":0.58,"phases":[{"at":0}]},{"shape":"cyl","pos":[-5,1,0],"color":5661038,"scale":0.7,"motion":{"type":"spin","axis":"y","speed":1},"label":{"t":"sản xuất","p":1.8,"s":0.55},"phases":[{"at":0}]},{"shape":"ico","pos":[5,1,0],"color":9072586,"scale":0.6,"motion":{"type":"bob","amp":0.2},"label":{"t":"văn hóa","c":"#c9b6f0","p":1.6,"s":0.55},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.14,"motion":{"type":"flow","a":[0,0.2,0],"b":[0,2.6,0],"speed":0.35,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.14,"motion":{"type":"flow","a":[-1.2,0.2,0],"b":[0,2.6,0],"speed":0.3,"phase":0.4,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.14,"motion":{"type":"flow","a":[1.2,0.2,0],"b":[0,2.6,0],"speed":0.3,"phase":0.8,"fade":true},"phases":[{"at":0}]},{"shape":"octa","pos":[0,3.2,0],"color":15250765,"emissive":0.9,"scale":0.9,"motion":{"type":"spin","speed":1.3},"label":{"t":"lịch sử do quần chúng sáng tạo","c":"#e8b54d","p":1.9,"s":0.7},"phases":[{"at":0,"hide":true},{"at":0.75,"hide":false}]}]},"type":"spec"},
```

- [x] **Step 3: Chạy test**

Run: `node tools/check.mjs`
Expected: `PASS`.

- [x] **Step 4: Kiểm tra thủ công**: mở node "Con người và vai trò sáng tạo lịch sử…" → mở mô phỏng → caption nói về quần chúng nhân dân (không phải giai cấp công nhân).

- [x] **Step 5: Commit**

```bash
git add js/main.js js/data.js
git commit -m "fix: nodeColor an toàn khi thiếu rule; SIM hist-cmv khớp nội dung node"
```

---

### Task 5: Chờ font trước khi vẽ nhãn 3D (D2)

**Files:**
- Modify: `js/main.js` — bọc phần dựng node (`nodes.forEach(...)` tại 1086-1126) vào hàm `buildAllNodes()` gọi sau khi font sẵn sàng; giữ loader hiện cho tới lúc đó

**Interfaces:**
- Consumes: `document.fonts` API, `window.__hideLoader`
- Produces: nhãn sprite luôn vẽ bằng "Be Vietnam Pro" khi font đã tải; nếu font lỗi, fallback sau 2.5s của loader vẫn hoạt động

- [x] **Step 1: Bọc khối dựng node thành hàm**

Chuyển khối `nodes.forEach(function (node) { ... });` (main.js:1086-1126) vào:

```javascript
  function buildAllNodes() {
    nodes.forEach(function (node) {
      // ... (giữ nguyên nội dung khối hiện có)
    });
  }
```

Lưu ý: `clickables` được xây từ `meshes` ở 1153-1158 — cũng phải chuyển vào cuối `buildAllNodes()`:

```javascript
    meshes.forEach(function (m) {
      m.traverse(function (child) { if (child.isMesh) clickables.push(child); });
    });
```

(và sửa khai báo `const clickables = [];` lên trước hàm).

- [x] **Step 2: Gọi sau khi font sẵn sàng**

Thay vị trí cũ bằng:

```javascript
  // Vẽ nhãn CHỈ KHI font đã tải — nếu không, canvas label lần load đầu
  // sẽ dùng font fallback (chữ khác hẳn thiết kế). document.fonts có sẵn
  // ở mọi trình duyệt hiện đại; fallback timeout phòng khi font lỗi.
  function whenFontReady(cb) {
    if (!document.fonts || !document.fonts.ready) { cb(); return; }
    let done = false;
    const go = function () { if (!done) { done = true; cb(); } };
    document.fonts.ready.then(go);
    setTimeout(go, 2500); // không giữ loader quá fallback 2.5s của index.html
  }
  whenFontReady(function () {
    buildAllNodes();
    animate(); // chuyển lời gọi animate() về đây
  });
```

Xóa lời gọi `animate();` ở cuối file (dòng 2546) — nay nằm trong callback. Loader vẫn tự ẩn sau 2.5s nhờ inline script dù có chuyện gì xảy ra.

- [x] **Step 3: Chạy test**

Run: `node tools/check.mjs`
Expected: `PASS` (probe có fallback loader 2.5s nên vẫn pass kể cả khi headless không tải được font Google).

- [x] **Step 4: Kiểm tra thủ công**: Ctrl+F5 trang với mạng bật — nhãn hiện đúng font Be Vietnam Pro ngay từ khung đầu (không chớp font khác). Thử ngắt mạng, tải lại từ cache — loader vẫn biến mất ≤ 2.5s.

- [x] **Step 5: Commit**

```bash
git add js/main.js
git commit -m "fix: chờ font Be Vietnam Pro trước khi vẽ nhãn canvas 3D"
```

---

# GIAI ĐOẠN 2 — TRẢI NGHIỆM HỌC TẬP

### Task 6: Legend màu cụm chủ đề + nút "Về tổng quan" (C5, C8)

**Files:**
- Modify: `index.html` — thêm khối legend trong `<footer>`; thêm nút reset cạnh footer hint
- Modify: `css/style.css` — style legend
- Modify: `js/main.js` — render legend từ `DATA` (không hard-code), gắn nút reset với `resetCamera()`

**Interfaces:**
- Consumes: `DATA` (title/color của 5 cụm), `resetCamera()`
- Produces: legend DOM `#legend` sinh động từ dữ liệu; bấm legend = bay tới cụm (dùng `flyToTopic`)

- [x] **Step 1: Thêm HTML**

Trong `index.html`, thay `<footer id="footer">...` bằng:

```html
<footer id="footer">
  <div id="legend" aria-label="Chú thích màu các cụm chủ đề"></div>
  <span id="current-target">Nhấp vào các hình khối 3D để khám phá các khái niệm</span>
  <span class="hint"><button id="btn-overview" class="footer-btn" title="Về lại toàn cảnh">⌂ Tổng quan</button> · Nhấn <kbd>H</kbd> để xem hướng dẫn</span>
</footer>
```

- [x] **Step 2: Sinh legend từ DATA trong main.js**

Thêm sau khối `// ---------- Nav buttons ----------`:

```javascript
  // Legend màu cụm chủ đề — sinh từ DATA, bấm vào bay tới cụm như nav
  (function buildLegend() {
    const legend = document.getElementById("legend");
    if (!legend) return;
    const topics = ["materialism", "dialectics", "materialist-dialectics", "cognition", "practice"];
    topics.forEach(function (key) {
      const t = DATA[key];
      if (!t) return;
      const b = document.createElement("button");
      b.className = "legend-item";
      const hex = "#" + t.color.toString(16).padStart(6, "0");
      b.innerHTML = '<span class="legend-dot" style="background:' + hex + ';box-shadow:0 0 8px ' + hex + '"></span><span>' + t.title + '</span>';
      b.title = t.desc;
      b.addEventListener("click", function () { hideInfo(); flyToTopic(key); });
      legend.appendChild(b);
    });
    document.getElementById("btn-overview").addEventListener("click", function () {
      hideInfo(true);
      document.querySelectorAll(".nav-btn").forEach(function (x) { x.classList.remove("active"); });
    });
  })();
```

- [x] **Step 3: CSS**

```css
/* ---------- Legend cụm chủ đề (footer trái) ---------- */
#legend { display: flex; gap: 6px; flex-wrap: wrap; pointer-events: auto; }
.legend-item {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 10px; border: 1px solid rgba(242,237,226,.16);
  border-radius: 999px; background: rgba(13,17,28,.55);
  color: var(--muted); font-family: inherit; font-size: .68rem;
  cursor: pointer; transition: all .2s; backdrop-filter: blur(6px);
}
.legend-item:hover { color: var(--cream); border-color: rgba(242,237,226,.4); transform: translateY(-1px); }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex: 0 0 auto; }
.footer-btn {
  border: 1px solid rgba(242,237,226,.25); background: rgba(13,17,28,.55);
  color: var(--cream); font-family: inherit; font-size: .72rem;
  padding: 4px 10px; border-radius: 999px; cursor: pointer; transition: all .2s;
}
.footer-btn:hover { border-color: var(--gold); color: var(--gold); }
@media (max-width: 860px) { #legend { display: none; } }
```

- [x] **Step 4: Chạy test + kiểm tra thủ công**

Run: `node tools/check.mjs` → `PASS`. Mở trang: legend 5 chấm màu hiện ở góc trái dưới, bấm "Nhận thức luận duy vật biện chứng" camera bay tới cụm; bấm ⌂ Tổng quan camera về tâm.

- [x] **Step 5: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: legend màu 5 cụm chủ đề + nút Về tổng quan"
```

---

### Task 7: Điều hướng node "Trước / Tiếp theo" + liên kết liên quan (C1)

**Files:**
- Modify: `js/data.js` — thêm trường `related: [ids]` cho node (bắt đầu với 3 quy luật + các cặp phạm trù)
- Modify: `js/main.js` — nút prev/next trong info panel; hàm `selectNodeById(id)` dùng chung cho raycast click, legend, search sau này

**Interfaces:**
- Consumes: danh sách node từ `buildNodes()` (thứ tự cố định), `node.related` (mảng id tùy chọn)
- Produces: `selectNodeById(id)` — hiển thị info + bay camera (tái sử dụng logic của `onPointerUp`); mỗi info panel có nút "← Trước / Sau →" và khối "Liên quan"

- [x] **Step 1: Thêm `related` vào data.js**

Ví dụ thêm vào node `law-contradiction`:

```javascript
      related: ["law-quantity-quality", "law-negation", "principle-development"],
```

Thêm tương tự cho `law-quantity-quality` (`related: ["law-contradiction", "law-negation"]`), `law-negation` (`related: ["law-contradiction", "law-quantity-quality"]`), `cog-sensuous` (`related: ["cog-rational", "cog-process"]`), `cog-rational` (`related: ["cog-sensuous", "cog-return-practice"]`), `cat-cause-effect` (`related: ["cat-necessity-contingency", "cat-essence-phenomenon"]`).

- [x] **Step 2: Tách logic chọn node thành `selectNodeById`**

Trong `main.js`, thêm cạnh `showInfo`:

```javascript
  const nodeIndex = {}; // id -> node Group, xây một lần sau buildAllNodes
  // (xây trong buildAllNodes: meshes.forEach(m => nodeIndex[m.userData.node.id] = m))

  function selectNodeById(id) {
    const m = nodeIndex[id];
    if (!m) return;
    const node = m.userData.node;
    showInfo(node);
    const target = m.getWorldPosition(new THREE.Vector3());
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(nodeGroup.quaternion);
    const dir = target.clone().sub(controls.target).normalize();
    const up = dir.dot(normal) >= 0 ? normal : normal.clone().negate();
    const camDir = up.clone().add(dir.multiplyScalar(0.4)).normalize();
    const viewDist = m.userData.isLaw ? 26 : 21;
    flyTo(target.clone().add(camDir.multiplyScalar(viewDist)), target);
    burstAt(target, m.userData.color);
  }
```

Sửa `onPointerUp`: thay phần sau `if (!nodeGroupHit) return;` bằng `selectNodeById(nodeGroupHit.userData.node.id); return;`.

- [x] **Step 3: Nút prev/next + liên quan trong `showInfo`**

Cuối `showInfo`, trước khi gán `innerHTML`, tính:

```javascript
  function showInfo(node) {
    const idx = nodes.indexOf(node);
    const prevN = nodes[(idx - 1 + nodes.length) % nodes.length];
    const nextN = nodes[(idx + 1) % nodes.length];
    const relHtml = (node.related || []).length
      ? '<div class="info-related"><span class="lbl">Liên quan</span>' +
        node.related.map(function (rid) {
          const rn = nodes.find(function (x) { return x.id === rid; });
          return rn ? '<button class="rel-link" data-node="' + rid + '">→ ' + rn.vi + '</button>' : "";
        }).join("") + "</div>"
      : "";
    const navHtml =
      '<div class="info-nav">' +
      '<button class="sim-btn" data-nav="prev">← ' + prevN.vi + '</button>' +
      '<button class="sim-btn" data-nav="next">' + nextN.vi + ' →</button>' +
      '</div>';
    // ... innerHTML cũ + navHtml + relHtml
```

Gắn sự kiện sau khi set `innerHTML`:

```javascript
    infoContent.querySelectorAll("[data-nav]").forEach(function (b) {
      b.addEventListener("click", function () { selectNodeById(b.dataset.nav === "prev" ? prevN.id : nextN.id); });
    });
    infoContent.querySelectorAll(".rel-link").forEach(function (b) {
      b.addEventListener("click", function () { selectNodeById(b.dataset.node); });
    });
```

- [x] **Step 4: CSS**

```css
.info-nav { display: flex; gap: 8px; margin-top: 14px; }
.info-nav .sim-btn { flex: 1; font-size: .7rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.info-related { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
.info-related .lbl { font-size: .66rem; text-transform: uppercase; letter-spacing: .08em; color: var(--gold); font-weight: 700; }
.rel-link {
  text-align: left; padding: 7px 10px; border-radius: 8px; cursor: pointer;
  border: 1px solid rgba(242,237,226,.15); background: rgba(242,237,226,.05);
  color: var(--cream); font-family: inherit; font-size: .76rem; transition: all .2s;
}
.rel-link:hover { border-color: var(--gold); color: var(--gold); }
```

- [x] **Step 5: Chạy test + thủ công**

`node tools/check.mjs` → `PASS`. Thủ công: chọn node bất kỳ, bấm "Sau →" liên tục đi hết 22 node không lỗi; trong node "Quy luật mâu thuẫn" bấm liên kết nhảy sang "Quy luật lượng – chất".

- [x] **Step 6: Commit**

```bash
git add js/data.js js/main.js css/style.css
git commit -m "feat: điều hướng trước/sau giữa các node + liên kết khái niệm liên quan"
```

---

### Task 8: Hộp tìm kiếm khái niệm (C2)

**Files:**
- Modify: `index.html` — thêm nút 🔍 + panel tìm kiếm
- Modify: `css/style.css`
- Modify: `js/main.js` — logic lọc theo `vi` + `rule`, không cần gõ dấu vẫn khớp (normalize `String.prototype.normalize("NFD")`)

**Interfaces:**
- Consumes: `nodes` (id/vi/rule), `selectNodeById()` (Task 7)
- Produces: `#search-panel` với input + danh sách kết quả; Enter/click kết quả → `selectNodeById` + đóng panel

- [x] **Step 1: HTML** — thêm trong `<header id="titlebar">` sau `.brand`:

```html
<div class="search-wrap">
  <button id="btn-search" class="nav-btn" title="Tìm khái niệm (phím /)">🔍 Tìm kiếm</button>
  <div id="search-panel" class="hidden">
    <input id="search-input" type="text" placeholder="Gõ tên khái niệm… (vd: mâu thuẫn)" autocomplete="off" />
    <div id="search-results"></div>
  </div>
</div>
```

- [x] **Step 2: JS trong main.js**

```javascript
  // ---------- Tìm kiếm khái niệm ----------
  const searchPanel = document.getElementById("search-panel");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  function vnFold(s) { // bỏ dấu tiếng Việt để khớp kiểu gõ không dấu
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  }
  function runSearch(q) {
    const f = vnFold(q.trim());
    searchResults.innerHTML = "";
    if (!f) return;
    const hits = nodes.filter(function (n) {
      return vnFold(n.vi).indexOf(f) !== -1 || vnFold(n.rule || "").indexOf(f) !== -1;
    }).slice(0, 8);
    if (!hits.length) {
      searchResults.innerHTML = '<div class="search-empty">Không tìm thấy khái niệm phù hợp</div>';
      return;
    }
    hits.forEach(function (n) {
      const b = document.createElement("button");
      b.className = "rel-link";
      b.innerHTML = "<b>" + n.vi + "</b><small>" + (n.rule || DATA[n.tag].title) + "</small>";
      b.addEventListener("click", function () {
        searchPanel.classList.add("hidden");
        selectNodeById(n.id);
      });
      searchResults.appendChild(b);
    });
  }
  document.getElementById("btn-search").addEventListener("click", function () {
    searchPanel.classList.toggle("hidden");
    if (!searchPanel.classList.contains("hidden")) { searchInput.value = ""; runSearch(""); searchInput.focus(); }
  });
  searchInput.addEventListener("input", function () { runSearch(searchInput.value); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
      e.preventDefault();
      searchPanel.classList.remove("hidden");
      searchInput.focus();
    }
    if (e.key === "Escape") searchPanel.classList.add("hidden");
  });
```

- [x] **Step 3: CSS**

```css
.search-wrap { position: relative; pointer-events: auto; }
#search-panel {
  position: absolute; top: 52px; right: 0; width: min(340px, 84vw);
  padding: 12px; background: rgba(13,17,28,.96); border: 1px solid var(--panel-border);
  border-radius: 12px; backdrop-filter: blur(14px); box-shadow: 0 16px 50px rgba(0,0,0,.6);
  display: flex; flex-direction: column; gap: 8px; z-index: 60;
}
#search-panel.hidden { display: none; }
#search-input {
  padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(242,237,226,.25);
  background: rgba(242,237,226,.06); color: var(--cream); font-family: inherit; font-size: .85rem;
}
#search-input:focus { outline: none; border-color: var(--gold); }
#search-results { display: flex; flex-direction: column; gap: 6px; max-height: 300px; overflow-y: auto; }
#search-results small { display: block; opacity: .6; margin-top: 2px; }
.search-empty { font-size: .78rem; color: var(--muted); padding: 6px 4px; }
@media (max-width: 860px) { .search-wrap { margin-right: 44px; } }
```

- [x] **Step 4: Test**: `node tools/check.mjs` → `PASS`. Thủ công: gõ "mau thuan" (không dấu) → ra "Quy luật thống nhất và đấu tranh của các mặt đối lập"; phím `/` mở tìm kiếm từ bất cứ đâu.

- [x] **Step 5: Commit**

```bash
git add index.html js/main.js css/style.css
git commit -m "feat: tìm kiếm khái niệm, khớp cả kiểu gõ không dấu"
```

---

### Task 9: Lưu tiến độ học bằng localStorage (C4)

**Files:**
- Modify: `js/main.js` — module `progress`: đọc/ghi `mln-progress-v1` `{ visited: {id: timestamp} }`; đánh dấu node đã xem trên label (chấm nhỏ) + footer hiển thị "Đã khám phá X/22"

**Interfaces:**
- Consumes: `selectNodeById`/`showInfo` (điểm đánh dấu), `meshes`, `nodes.length`
- Produces: `window.__mlnProgress()` trả object tiến độ (hook test); nhãn node đã xem có chấm ✓ vàng

- [x] **Step 1: Module tiến độ trong main.js** (đặt trước `showInfo`):

```javascript
  // ---------- Tiến độ học (localStorage) ----------
  const PROGRESS_KEY = "mln-progress-v1";
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { visited: {} }; }
    catch (e) { return { visited: {} }; }
  }
  const progress = loadProgress();
  function markVisited(id) {
    if (progress.visited[id]) return;
    progress.visited[id] = Date.now();
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch (e) { /* private mode */ }
    updateProgressUI();
    const m = nodeIndex[id];
    if (m && m.userData.label) addVisitedBadge(m);
  }
  function addVisitedBadge(mesh) { // chấm vàng nhỏ góc nhãn
    if (mesh.userData.visitedBadge) return;
    const lbl = mesh.userData.label;
    const dot = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0xe8b54d, transparent: true, opacity: 0.95, depthWrite: false }));
    dot.scale.set(0.9, 0.9, 1);
    dot.position.set(lbl.position.x + 6.5, lbl.position.y + 1.4, lbl.position.z);
    nodeGroup.add(dot);
    mesh.userData.visitedBadge = dot;
  }
  function updateProgressUI() {
    const n = Object.keys(progress.visited).length;
    const el = document.getElementById("progress-count");
    if (el) el.textContent = "Đã khám phá " + n + "/" + nodes.length + " khái niệm";
  }
  window.__mlnProgress = function () { return progress; };
```

- [x] **Step 2: Gọi `markVisited` trong `showInfo`** (dòng đầu): `markVisited(node.id);`

Gọi `updateProgressUI()` + vẽ badge cho node đã lưu từ trước, trong `buildAllNodes()` cuối hàm:

```javascript
    updateProgressUI();
    meshes.forEach(function (m) { if (progress.visited[m.userData.node.id]) addVisitedBadge(m); });
```

- [x] **Step 3: HTML + CSS**: thêm `<span id="progress-count"></span>` cạnh `#current-target` trong footer; CSS `.progress-count { color: var(--gold); }` (dùng class qua `id` selector cũng được: `#progress-count { color: var(--gold); margin-left: 8px; }`).

- [x] **Step 4: Test + thủ công**: `node tools/check.mjs` → PASS. Mở trang chọn 2 node, F5 → footer hiện "Đã khám phá 2/22", 2 node có chấm vàng. Xóa localStorage trong DevTools để reset.

- [x] **Step 5: Commit**

```bash
git add js/main.js index.html css/style.css
git commit -m "feat: lưu tiến độ khám phá khái niệm bằng localStorage"
```

---

### Task 10: Mobile — panel không chồng nhau (D1)

**Files:**
- Modify: `css/style.css` — media query `max-width: 860px`: info panel và sim panel chiếm đáy màn hình, cao tối đa 45vh, bo góc trên; sim panel mở thì info panel tự đóng
- Modify: `js/main.js` — trong `openSim`: nếu info panel đang mở thì đóng (không reset camera); tương tự `showInfo` đóng sim panel

**Interfaces:**
- Consumes: `#info-panel`, `#sim-panel`, `hideInfo()`, `closeSim()`
- Produces: trên màn ≤860px không bao giờ 2 panel đè nhau

- [x] **Step 1: JS loại trừ lẫn nhau**

Trong `openSim`, thêm dòng đầu (sau `if (!conf) return;`):

```javascript
    infoPanel.classList.add("hidden"); // mobile: hai panel không chồng nhau
```

Trong `showInfo`, thêm dòng đầu:

```javascript
    if (!simPanel.classList.contains("hidden")) closeSim(); // nhưng closeSim reset camera → cần biến thể không reset
```

Vì `closeSim()` gọi `resetCamera()` (main.js:1457), tách thành:

```javascript
  function closeSim(keepCamera) {
    simPanel.classList.add("hidden");
    if (sim && sim.dispose) sim.dispose();
    sim = null;
    cancelAnimationFrame(simAnim);
    simAnim = null;
    if (simResize) { window.removeEventListener("resize", simResize); simResize = null; }
    if (!keepCamera) resetCamera();
  }
```

Và `showInfo` dùng `closeSim(true)`; listener `#sim-close` giữ `closeSim()` (tức `closeSim(false)`).

- [x] **Step 2: CSS mobile**

```css
@media (max-width: 860px) {
  #info-panel {
    top: auto; bottom: 0; right: 0; left: 0; width: 100%;
    max-height: 46vh; border-radius: 16px 16px 0 0;
    animation: slide-up .28s ease;
  }
  #sim-panel {
    top: auto; bottom: 0; right: 0; left: 0; width: 100%;
    max-height: 54vh; border-radius: 16px 16px 0 0;
  }
  @keyframes slide-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
}
```

(Xóa dòng `#info-panel { width: min(320px, calc(100vw - 20px)); right: 10px; }` và `#sim-panel { ... left: 10px; }` cũ trong media query 860px.)

- [x] **Step 3: Test trên thiết bị giả lập**: mở Chrome DevTools → Toggle device (iPhone 12) → chọn node → panel trượt từ đáy lên; bấm "Mở mô phỏng" → info đóng, sim hiện đáy màn.

- [x] **Step 4: Commit**

```bash
git add css/style.css js/main.js
git commit -m "fix(mobile): panel đáy màn hình, info và sim loại trừ lẫn nhau"
```

---

### Task 11: Accessibility — focus, aria, phím tắt (D3)

**Files:**
- Modify: `index.html` — `aria-label` cho các nút ✕/☰, `role="dialog" aria-modal="true"` cho help/timeline modal
- Modify: `js/main.js` — focus vào panel khi mở, trả focus về canvas khi đóng, Esc đóng theo thứ tự trên-cùng-trước, các nút panel có thể Tab tới

**Interfaces:**
- Consumes: DOM panel hiện có
- Produces: người dùng bàn phím mở/đóng/điều hướng được toàn bộ UI; screen reader đọc được tên nút

- [x] **Step 1: HTML aria**

```html
<div id="info-panel" class="hidden" role="dialog" aria-label="Nội dung khái niệm">
<button id="info-close" title="Đóng" aria-label="Đóng bảng khái niệm">✕</button>
<div id="help" class="hidden" role="dialog" aria-modal="true" aria-label="Hướng dẫn sử dụng">
<div id="timeline-modal" class="hidden" role="dialog" aria-modal="true" aria-label="Dòng thời gian lịch sử">
<button id="hamburger" class="hamburger" aria-label="Mở menu chủ đề" aria-expanded="false">☰</button>
```

- [x] **Step 2: JS focus management** — thêm sau khối Keyboard hiện có:

```javascript
  // Accessibility: focus khi mở panel, Esc đóng cái trên cùng trước
  function focusIn(el) { const f = el.querySelector("button, input, [tabindex]"); if (f) f.focus(); }
  const openPanels = function () {
    return [timelineModal, simPanel, infoPanel, help, searchPanel, mobileNav].filter(
      function (el) { return el && !el.classList.contains("hidden"); });
  };
```

Sửa handler `keydown` Escape hiện có: thay khối `if (e.key === "Escape") {...}` bằng:

```javascript
    if (e.key === "Escape") {
      const open = openPanels();
      if (!open.length) return;
      const top = open[0]; // thứ tự mảng: timeline > sim > info > help > search > menu
      if (top === timelineModal) hideTimeline();
      else if (top === simPanel) closeSim();
      else if (top === infoPanel) hideInfo(true);
      else if (top === help) help.classList.add("hidden");
      else if (top === searchPanel) searchPanel.classList.add("hidden");
      else if (top === mobileNav) closeMobileMenu();
    }
```

Thêm `focusIn(infoPanel)` cuối `showInfo`; `focusIn(simPanel)` cuối `openSim`; `focusIn(help)` khi mở help; `renderer.domElement.focus()` sau mỗi đóng panel (thêm `tabindex="-1"` cho canvas qua `renderer.domElement.tabIndex = -1;` sau `container.appendChild`).

- [x] **Step 3: aria-expanded cho hamburger**: trong listener hamburger, `this.setAttribute("aria-expanded", String(!mobileNav.classList.contains("hidden")))`.

- [x] **Step 4: Test thủ công**: Tab qua nav → mở node bằng click → Tab trong info panel → Esc đóng panel → focus về canvas. Screen reader (NVDA nếu có) đọc tên nút đóng.

- [x] **Step 5: Commit**

```bash
git add index.html js/main.js
git commit -m "feat(a11y): aria-label, role dialog, focus management, Esc theo thứ tự panel"
```

---

### Task 12: Hỗ trợ `prefers-reduced-motion` + cải thiện contrast (D4, D5)

**Files:**
- Modify: `css/style.css` — nâng độ mờ chữ muted, thêm media query giảm animation CSS
- Modify: `js/main.js` — đọc `matchMedia("(prefers-reduced-motion: reduce)")`; khi bật: tắt node bob/self-rotation, dust, twinkle, burst; giữ render tĩnh

**Interfaces:**
- Consumes: `window.matchMedia`
- Produces: biến `REDUCED` đọc một lần; mọi hiệu ứng chuyển động nền tôn trọng nó

- [x] **Step 1: JS** — thêm gần Constants:

```javascript
  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

Trong `animate()`, bọc các dòng chuyển động nền:

```javascript
    if (!REDUCED) {
      // core rotation + orbiters + dust + twinkle + node bob/rotation
      ...
    }
```

Cụ thể: bọc khối `coreRing.rotation...`, khối orbiters, khối `meshes.forEach` chỉ giữ phần fade label (tách phần rotation/traverse animation vào `if (!REDUCED)`), khối dust/twinkle/nebula. Bỏ gọi `burstAt` trong `selectNodeById` khi `REDUCED` (`if (!REDUCED) burstAt(...)`).

- [x] **Step 2: CSS**

```css
:root { --muted: rgba(242, 237, 226, 0.78); } /* tăng từ .62 */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  .loader-fill { width: 100%; }
}
```

- [x] **Step 3: Test**: DevTools → Rendering → Emulate CSS `prefers-reduced-motion: reduce` → cảnh đứng yên, node vẫn chọn được, label vẫn fade theo khoảng cách.

- [x] **Step 4: Commit**

```bash
git add js/main.js css/style.css
git commit -m "feat: tôn trọng prefers-reduced-motion; tăng contrast chữ phụ"
```

---

# GIAI ĐOẠN 3 — MỞ RỘNG

### Task 13: Chế độ ôn tập trắc nghiệm (C3)

**Files:**
- Modify: `index.html` — nút "✎ Ôn tập" trên nav + mobile nav; modal `#quiz-modal`
- Modify: `css/style.css`
- Modify: `js/main.js` — sinh câu hỏi từ `nodes`: hỏi `vi` → chọn đáp án đúng trong 3 node cùng `tag`; theo dõi số câu đúng vào progress

**Interfaces:**
- Consumes: `nodes`, `progress` (Task 9), cấu trúc modal giống timeline
- Produces: phiên 10 câu ngẫu nhiên, chọn đáp án → hiện đúng/sai + giải thích ngắn (`example`), kết thúc hiện điểm, lưu `progress.quizBest`

- [x] **Step 1: HTML**

```html
<button class="nav-btn" id="btn-quiz">✎ Ôn tập</button> <!-- thêm vào .top-nav và #mobile-nav -->

<div id="quiz-modal" class="hidden" role="dialog" aria-modal="true" aria-label="Ôn tập trắc nghiệm">
  <div class="tl-card quiz-card">
    <button id="quiz-close" aria-label="Đóng ôn tập">✕</button>
    <h2>✎ Ôn tập nhanh</h2>
    <p id="quiz-status"></p>
    <div id="quiz-body"></div>
  </div>
</div>
```

- [x] **Step 2: JS engine quiz** (trong main.js, sau khối timeline):

```javascript
  // ---------- Quiz ôn tập (sinh từ dữ liệu node, không hard-code câu hỏi) ----------
  const quizModal = document.getElementById("quiz-modal");
  let quizQ = [], quizIdx = 0, quizScore = 0;

  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function makeQuiz() {
    // Câu hỏi dạng: mô tả (body rút gọn) → chọn tên khái niệm đúng trong 4 phương án cùng cụm
    quizQ = shuffle(nodes.slice()).slice(0, 10).map(function (n) {
      const sameTag = nodes.filter(function (x) { return x.tag === n.tag && x.id !== n.id; });
      const wrong = shuffle(sameTag.slice()).slice(0, 3).map(function (x) { return x.vi; });
      while (wrong.length < 3) { // cụm ít node thì lấy node cụm khác
        const other = nodes[Math.floor(Math.random() * nodes.length)];
        if (other.id !== n.id && wrong.indexOf(other.vi) === -1) wrong.push(other.vi);
      }
      return { q: stripHtml(n.example), answer: n.vi, options: shuffle([n.vi].concat(wrong)), explain: n.vi };
    });
    quizIdx = 0; quizScore = 0;
  }
  function stripHtml(html) { const d = document.createElement("div"); d.innerHTML = html; return d.textContent || ""; }

  function renderQuizQ() {
    const body = document.getElementById("quiz-body");
    document.getElementById("quiz-status").textContent = "Câu " + (quizIdx + 1) + "/" + quizQ.length + " · Đúng: " + quizScore;
    const q = quizQ[quizIdx];
    body.innerHTML = '<p class="quiz-q">Ví dụ sau minh họa cho khái niệm nào?<br><i>“' + q.q + '”</i></p>';
    q.options.forEach(function (opt) {
      const b = document.createElement("button");
      b.className = "quiz-opt"; b.textContent = opt;
      b.addEventListener("click", function () {
        const ok = opt === q.answer;
        if (ok) quizScore++;
        b.classList.add(ok ? "quiz-right" : "quiz-wrong");
        body.querySelectorAll(".quiz-opt").forEach(function (x) {
          x.disabled = true;
          if (x.textContent === q.answer) x.classList.add("quiz-right");
        });
        const next = document.createElement("button");
        next.className = "btn-primary quiz-next"; next.textContent = quizIdx + 1 < quizQ.length ? "Câu tiếp →" : "Xem kết quả";
        next.addEventListener("click", function () {
          quizIdx++;
          if (quizIdx < quizQ.length) renderQuizQ(); else renderQuizEnd();
        });
        body.appendChild(next);
      });
      body.appendChild(b);
    });
  }
  function renderQuizEnd() {
    const best = Math.max(progress.quizBest || 0, quizScore);
    progress.quizBest = best;
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch (e) {}
    document.getElementById("quiz-status").textContent = "";
    document.getElementById("quiz-body").innerHTML =
      '<div class="quiz-score">' + quizScore + "/" + quizQ.length + '</div>' +
      '<p>' + (quizScore >= 8 ? "Xuất sắc! Bạn nắm vững các khái niệm." : quizScore >= 5 ? "Khá tốt — hãy khám phá thêm các node còn sai." : "Hãy bay qua các cụm chủ đề một lượt rồi thử lại nhé.") + '</p>' +
      '<button class="btn-primary quiz-next" id="quiz-again">↺ Làm lại</button>';
    document.getElementById("quiz-again").addEventListener("click", function () { makeQuiz(); renderQuizQ(); });
  }
  function openQuiz() { makeQuiz(); renderQuizQ(); quizModal.classList.remove("hidden"); closeMobileMenu(); focusIn(quizModal); }
  document.getElementById("btn-quiz").addEventListener("click", openQuiz);
  document.getElementById("quiz-close").addEventListener("click", function () { quizModal.classList.add("hidden"); });
  quizModal.addEventListener("click", function (e) { if (e.target === quizModal) quizModal.classList.add("hidden"); });
```

(Thêm `quizModal` vào đầu mảng `openPanels()` của Task 11, và xử lý Esc: `else if (top === quizModal) quizModal.classList.add("hidden");`)

- [x] **Step 3: CSS**

```css
#quiz-modal { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; background: rgba(5,6,10,.78); backdrop-filter: blur(10px); }
#quiz-modal.hidden { display: none; }
.quiz-card { width: min(680px, 92vw); height: auto; max-height: min(78vh, 640px); }
#quiz-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border: 0; border-radius: 50%; background: rgba(242,237,226,.12); color: var(--cream); cursor: pointer; }
.quiz-q { font-size: .9rem; line-height: 1.65; margin-bottom: 16px; }
.quiz-q i { color: var(--gold); display: block; margin-top: 8px; }
.quiz-opt {
  display: block; width: 100%; text-align: left; margin-bottom: 8px;
  padding: 11px 14px; border-radius: 10px; cursor: pointer;
  border: 1px solid rgba(242,237,226,.18); background: rgba(242,237,226,.05);
  color: var(--cream); font-family: inherit; font-size: .84rem; transition: all .15s;
}
.quiz-opt:hover:not(:disabled) { border-color: var(--gold); }
.quiz-opt:disabled { cursor: default; opacity: .85; }
.quiz-right { border-color: #6bbf59 !important; background: rgba(107,191,89,.16) !important; }
.quiz-wrong { border-color: var(--red) !important; background: rgba(224,34,43,.16) !important; }
.quiz-next { margin-top: 14px; padding: 10px 18px; border: 0; border-radius: 10px; background: linear-gradient(135deg, var(--red), var(--red-dark)); color: #fff; font-family: inherit; font-weight: 600; cursor: pointer; }
.quiz-score { font-size: 2.4rem; font-weight: 700; color: var(--gold); text-align: center; margin: 10px 0; }
```

- [x] **Step 4: Test + thủ công**: `node tools/check.mjs` → PASS; mở quiz, làm hết 10 câu, điểm hiển thị đúng, "Làm lại" sinh bộ câu mới.

- [x] **Step 5: Commit**

```bash
git add index.html js/main.js css/style.css
git commit -m "feat: chế độ ôn tập trắc nghiệm sinh từ dữ liệu node"
```

---

### Task 14: Timeline liên kết node (C7)

**Files:**
- Modify: `js/data.js` — thêm trường `node: <id>` vào item timeline khi có node tương ứng
- Modify: `js/main.js` — `filterTimeline` render nút "Xem khái niệm 3D →" khi item có `node`; bấm → đóng timeline + `selectNodeById`

**Interfaces:**
- Consumes: `TIMELINE.eras[].items[].node` (mới), `selectNodeById`
- Produces: cầu nối timeline ↔ không gian 3D

- [x] **Step 1: data.js** — thêm vào các item:

```javascript
{ year: "1845", title: "Luận cương về Feuerbach", ..., node: "cog-practice-basis" }, // nhấn mạnh thực tiễn
{ year: "1846", title: "Hệ tư tưởng Đức", ..., node: "hist-sos-form" },
{ year: "1848", title: "Tuyên ngôn Đảng Cộng sản", ..., node: "hist-class-struggle" },
{ year: "1867", title: "Tư bản · Quyển I", ..., node: "hist-relations" },
{ year: "1909", title: "Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán", ..., node: "material" },
{ year: "1917", title: "Cách mạng Tháng Mười Nga", ..., node: "hist-class-struggle" }
```

- [x] **Step 2: main.js `filterTimeline`**

```javascript
    era.items.forEach(function (item) {
      const div = document.createElement("div");
      div.className = "tl-item";
      div.innerHTML =
        '<span class="tl-year">' + item.year + '</span>' +
        '<h3>' + item.title + '</h3>' +
        '<p>' + item.text + '</p>';
      if (item.node) {
        const link = document.createElement("button");
        link.className = "rel-link tl-node-link";
        link.textContent = "→ Xem khái niệm 3D";
        link.addEventListener("click", function () {
          timelineModal.classList.add("hidden");
          selectNodeById(item.node);
        });
        div.appendChild(link);
      }
      tlTrack.appendChild(div);
    });
```

Và sửa `hideTimeline()` — chỉ reset camera khi đóng bằng ✕/overlay, không reset khi nhảy node: tách `hideTimeline` thành đóng thuần + listener riêng gọi reset:

```javascript
  function hideTimeline(reset) {
    timelineModal.classList.add("hidden");
    if (reset !== false) resetCamera();
  }
  // listener close/overlay gọi hideTimeline(); Esc (Task 11) gọi hideTimeline();
```

- [x] **Step 3: CSS**: `.tl-node-link { margin-top: 6px; width: fit-content; }`

- [x] **Step 4: Test + thủ công**: mở Lịch sử → era 1848–1883 → item "Tư bản" có nút → bấm → timeline đóng, bay tới node Quan hệ sản xuất.

- [x] **Step 5: Commit**

```bash
git add js/data.js js/main.js css/style.css
git commit -m "feat: liên kết mục timeline với khái niệm 3D tương ứng"
```

---

### Task 15: Đường nối quan hệ giữa các cụm trong 3D (C6)

**Files:**
- Modify: `js/main.js` — vẽ đường cong mờ nối các node cùng cụm về tâm cụm (sinh từ dữ liệu, không hard-code); độ mờ theo khoảng cách camera; bật/tắt bằng nút legend

**Interfaces:**
- Consumes: `meshes`, `topicCenter` (Task 2), nodeGroup
- Produces: 5 chùm đường cong CatmullRom từ node → tâm cụm, material additive mờ; toggle `#btn-links`

- [x] **Step 1: JS sinh đường nối** — thêm sau `buildAllNodes()` call (trong callback `whenFontReady`):

```javascript
  // ---------- Đường nối cụm (toggle được) ----------
  const linkGroup = new THREE.Group();
  nodeGroup.add(linkGroup);
  let linksVisible = false;

  function buildClusterLinks() {
    ["materialism", "dialectics", "materialist-dialectics", "cognition", "practice"].forEach(function (key) {
      const c = topicCenter(key);
      if (!c) return;
      const local = nodeGroup.worldToLocal(c.clone()); // tọa độ cục bộ trong nodeGroup
      const members = meshes.filter(function (m) { return m.userData.node.tag === key; });
      const color = DATA[key] ? DATA[key].color : 0xffffff;
      members.forEach(function (m) {
        const p = m.position; // cục bộ trong nodeGroup
        const mid = p.clone().lerp(local, 0.5).add(new THREE.Vector3(0, 0, 4)); // vòng cung nhẹ
        const curve = new THREE.CatmullRomCurve3([p.clone(), mid, local.clone()]);
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
        const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
          color: color, transparent: true, opacity: 0.16,
          blending: THREE.AdditiveBlending, depthWrite: false
        }));
        linkGroup.add(line);
      });
    });
    linkGroup.visible = false;
  }

  window.__mlnToggleLinks = function (on) {
    linksVisible = on === undefined ? !linkGroup.visible : on;
    linkGroup.visible = linksVisible;
    return linksVisible;
  };
```

Gọi `buildClusterLinks()` trong `whenFontReady` ngay sau `buildAllNodes()`.

- [x] **Step 2: Nút toggle trong footer** (cạnh nút Tổng quan):

```html
<button id="btn-links" class="footer-btn" title="Hiện/ẩn đường nối các cụm">⧉ Liên kết</button>
```

```javascript
  document.getElementById("btn-links").addEventListener("click", function () {
    window.__mlnToggleLinks();
    this.classList.toggle("active", linkGroup.visible);
  });
```

CSS: `.footer-btn.active { border-color: var(--gold); color: var(--gold); }`

- [x] **Step 3: Test + thủ công**: `node tools/check.mjs` → PASS; bấm "⧉ Liên kết" → 5 chùm đường cong màu hiện ra nối node về tâm cụm; bấm lại → ẩn.

- [x] **Step 4: Commit**

```bash
git add js/main.js index.html css/style.css
git commit -m "feat: đường nối 3D giữa node và tâm cụm, bật/tắt được"
```

---

### Task 16: Offline font + SEO meta (E2, E3)

**Files:**
- Create: `css/fonts.css` + `fonts/` (woff2 Be Vietnam Pro 400/600/700 — tải từ Google Fonts một lần, commit vào repo)
- Modify: `index.html` — thêm meta description/og/theme-color; nạp `fonts.css` như fallback khi link Google không load được

**Interfaces:**
- Consumes: file font tĩnh (không CDN)
- Produces: trang offline hoàn toàn (mở bằng file:// không mạng vẫn đúng font); trang chia sẻ có preview đẹp

- [x] **Step 1: Tải font về repo** (làm thủ công một lần trên máy có mạng):

Truy cập `https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&display=swap` bằng Chrome (UA desktop), lấy URL `.woff2` (latin + latin-ext), tải về `fonts/` đặt tên `be-vietnam-pro-400.woff2` v.v. Tạo `css/fonts.css`:

```css
/* Font dự phòng offline — chỉ dùng khi Google Fonts không tải được.
   Nạp SAU style.css; nếu Google đã nạp @font-face cùng tên, trình duyệt
   dùng nguồn đầu tiên thành công, file này chỉ là fallback. */
@font-face {
  font-family: "Be Vietnam Pro";
  font-style: normal; font-weight: 400; font-display: swap;
  src: local("Be Vietnam Pro"), url("../fonts/be-vietnam-pro-400.woff2") format("woff2");
}
@font-face {
  font-family: "Be Vietnam Pro";
  font-style: normal; font-weight: 600; font-display: swap;
  src: local("Be Vietnam Pro"), url("../fonts/be-vietnam-pro-600.woff2") format("woff2");
}
@font-face {
  font-family: "Be Vietnam Pro";
  font-style: normal; font-weight: 700; font-display: swap;
  src: local("Be Vietnam Pro"), url("../fonts/be-vietnam-pro-700.woff2") format("woff2");
}
```

Trong `index.html` thêm sau `<link rel="stylesheet" href="css/style.css" />`:

```html
<link rel="stylesheet" href="css/fonts.css" />
```

- [x] **Step 2: SEO meta** trong `<head>`:

```html
<meta name="description" content="Trực quan hóa triết học Mác–Lênin bằng không gian 3D tương tác: 5 cụm chủ đề, 22 khái niệm, mô phỏng 3 quy luật cơ bản và dòng thời gian lịch sử." />
<meta name="theme-color" content="#05060a" />
<meta property="og:title" content="Triết học Mác–Lênin · Không gian 3D" />
<meta property="og:description" content="Khám phá phép biện chứng duy vật qua hình khối 3D và mô phỏng tương tác." />
<meta property="og:type" content="website" />
```

- [x] **Step 3: Test offline**: DevTools → Network → Offline → tải lại (trang đã cache) → font đúng, scene chạy. Kiểm tra `view-source` có đủ meta.

- [x] **Step 4: Commit**

```bash
git add css/fonts.css fonts/ index.html
git commit -m "feat: font offline dự phòng + meta description/og/theme-color"
```

---

# Tự kiểm tra chéo (Self-Review)

**1. Phủ spec:** A1→T2 · A2→T3 · A3→T3 · A4→T4 · A5→T4 · B1→(ghi nhận; tách file là tùy chọn sau T16, không nằm trong phạm vi vì rủi ro regression lớn với 1 IIFE đang chạy — nếu muốn, làm riêng một kế hoạch refactor) · B2/B3/B4→ghi nhận là tối ưu tùy chọn, không đưa task riêng vì chưa có bằng chứng giật trên máy thường (YAGNI; probe headless sẽ phát hiện nếu thành vấn đề) · B5→không sửa (data 1 dòng là lựa chọn nén có chủ đích; sim mới vẫn thêm được bằng cách copy entry) · C1→T7 · C2→T8 · C3→T13 · C4→T9 · C5→T6 · C6→T15 · C7→T14 · C8→T6 · D1→T10 · D2→T5 · D3→T11 · D4→T12 · D5→T12 · E1→T1 · E2→T16 · E3→T16 · E4→T1 (banner lỗi giữ nguyên, probe gom lỗi console).

**2. Placeholder:** không có "TBD/implement later"; mọi bước code đều có khối code thật. Riêng Step 1 Task 16 yêu cầu tải font thủ công — đây là thao tác ngoài code duy nhất, có hướng dẫn cụ thể.

**3. Nhất quán tên:** `selectNodeById` (T7) được T8/T13/T14 dùng đúng tên; `closeSim(keepCamera)` (T10) khớp lời gọi trong T11; `nodeIndex` xây trong `buildAllNodes` (T7 step 2) đúng nơi T9 dùng; `progress.quizBest` (T13) nối với `PROGRESS_KEY`/`progress` của T9; `topicCenter` sửa ở T2 được T15 dùng; `REDUCED` (T12) chỉ dùng trong main.js; `openPanels` (T11) được T13 mở rộng.

**Rủi ro & lưu ý khi thực thi:**
- Task 5 (chờ font) thay đổi thời điểm `animate()` bắt đầu — phải chạy probe và mở trình duyệt thật để chắc chắn loader không kẹt (fallback 2.5s trong index.html là lưới an toàn, không sửa nó).
- Task 7 refactor `onPointerUp` — giữ lại hiệu ứng burst và logic góc camera y hệt khi chuyển vào `selectNodeById`.
- Mỗi task kết thúc bằng `node tools/check.mjs` + mở trình duyệt thật (CLAUDE.md bắt buộc xác minh bằng trình duyệt).
