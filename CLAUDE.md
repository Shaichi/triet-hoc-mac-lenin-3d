# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Trang web tĩnh **"Triết học Mác–Lênin · Không gian 3D"**: trực quan hóa các khái niệm triết học bằng Three.js (hình khối 3D, mô phỏng quy luật, timeline lịch sử). Toàn bộ UI/nội dung bằng **tiếng Việt**.

## Cấu trúc
- `index.html` — trang duy nhất; loader có fallback tự ẩn sau 2.5s (độc lập với main.js) + banner hiển thị lỗi runtime
- `js/vendor/` — `three.min.js`, `OrbitControls.js` (thư viện bên thứ ba, **không sửa**)
- `js/data.js` — toàn bộ nội dung, định nghĩa 3 global: `DATA`, `SIMS`, `TIMELINE`
- `js/main.js` (~2500 dòng) — scene Three.js + toàn bộ UI
- `css/style.css` — toàn bộ styling

## Kiến trúc
- **`DATA`**: 5 cụm chủ đề (`materialism`, `dialectics`…) + 5 mảng node (`nodes`, `dialecticHistoryNodes`, `dialecticNodes`, `cognitionNodes`, `historyNodes`). `buildNodes()` trong main.js nối 5 mảng này thành danh sách node. Mỗi node: `id`, `tag` (cụm), `vi` (tên), `body`/`example` (HTML), `pos: [x,y,z]` (tọa độ 3D), `sim` (khóa trong `SIMS`).
- **`SIMS`** có 2 loại mô phỏng:
  - `type: "contradiction" | "quantityQuality" | "negation"` — 3 sim canvas 2D viết tay cho 3 quy luật cơ bản (main.js: `Simulation panel`, ~1412–2260).
  - `type: "spec"` — mô phỏng khai báo bằng JSON: `spec.parts[]` (shape: sphere/box/cone/plant/person/arrow/…), `spec.phases[]` (caption theo thời điểm), `motion` (orbit/bob/pulse/flow/spin), `pos`/`hide` theo phase. Thêm sim mới = thêm entry vào `SIMS`, không cần sửa main.js.
- **`main.js`** là một IIFE lớn, các khu vực đánh dấu bằng comment `// ----------`: nền vũ trụ (sao, tinh vân, bụi), node mesh + label sprite (vẽ chữ bằng canvas texture), raycasting chọn node, camera fly-to, info panel, sim panel, timeline modal, nav/hamburger, main loop.
- Nhãn 3D **không dùng CSS2DRenderer** — được render thành sprite từ canvas 2D (`makeLabel()`), nên đổi font/cỡ chữ phải sửa hàm đó.

## Chạy & kiểm tra
- Không có build step, không package.json. Mở trực tiếp `index.html` hoặc phục vụ tĩnh: `npx serve .` (hoặc `python -m http.server`)
- Kiểm tra bằng trình duyệt (Chrome/Edge); lỗi runtime hiện ở banner đỏ trên cùng màn hình

## Quy tắc
- Không có hệ thống test — sau khi sửa, phải mở trang trong trình duyệt để xác minh (loader biến mất, scene render, không lỗi console)
- Giữ loader fallback trong `index.html` hoạt động: không được để màn hình loading kẹt vĩnh viễn
- Nội dung mới phải khớp cấu trúc `data.js` hiện có và dùng tiếng Việt có dấu chuẩn; node mới cần `pos` không chồng lấn và `sim` trỏ tới khóa hợp lệ trong `SIMS`
- Vendor scripts load trước `data.js` và `main.js` — đừng đổi thứ tự trong `index.html`
