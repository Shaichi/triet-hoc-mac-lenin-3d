/* =====================================================================
   TRIẾT HỌC MÁC–LÊNIN · WEB 3D
   Engine chính: Three.js scene, các nút khái niệm, nhãn, tương tác,
   và 3 mô phỏng trực quan cho 3 quy luật cơ bản của phép biện chứng.
   ===================================================================== */
(function () {
  "use strict";

  // ---------- Constants ----------
  const COLORS = {
    red: 0xe0222b,
    redDark: 0x8a151b,
    gold: 0xe8b54d,
    cream: 0xf2ede2,
    blue: 0x3f6fb5,
    green: 0x3f8e6a,
    gray: 0x9aa3b2
  };

  // Hệ số màu của node theo loại
  function nodeColor(node) {
    if (node.rule.indexOf("Quy luật") === 0) return COLORS.red;
    if (node.rule.indexOf("Cặp phạm trù") === 0) return 0xc98a2b;
    if (node.rule.indexOf("Nguyên lý") === 0) return 0xa03a3e;
    if (node.tag === "materialism") return 0xd94f52;
    if (node.tag === "dialectics") return 0xe8b54d;
    if (node.tag === "cognition") return 0x3f8e6a;
    if (node.tag === "practice") return 0x3f6fb5;
    return COLORS.gold;
  }

  // ---------- Build the node list ----------
  function buildNodes() {
    const list = [];
    // Cụm 1: Chủ nghĩa duy vật
    DATA.nodes.forEach(function (n) { list.push(n); });
    // Cụm 2: Lịch sử phép biện chứng
    DATA.dialecticHistoryNodes.forEach(function (n) { list.push(n); });
    // Cụm 3: Biện chứng duy vật (nguyên lý, phạm trù, quy luật)
    DATA.dialecticNodes.forEach(function (n) { list.push(n); });
    // Cụm 4: Nhận thức luận
    DATA.cognitionNodes.forEach(function (n) { list.push(n); });
    // Cụm 5: Duy vật lịch sử
    DATA.historyNodes.forEach(function (n) { list.push(n); });
    return list;
  }

  // ---------- THREE.js setup ----------
  const container = document.getElementById("scene-container");

  // Fail fast if WebGL is unavailable -> report cleanly instead of hanging
  function fatalError(msg) {
    document.getElementById("loader").classList.add("gone");
    const wrap = document.createElement("div");
    wrap.style.cssText = "position:fixed;inset:0;display:grid;place-items:center;background:#05060a;color:#f2ede2;font-family:'Be Vietnam Pro',Segoe UI,sans-serif;z-index:200;text-align:center;padding:20px;";
    wrap.innerHTML = "<div><h1 style='color:#e8b54d;font-size:1.3rem;margin-bottom:10px'>⚠ Không thể khởi tạo 3D</h1><p style='opacity:.8;font-size:.9rem;line-height:1.7'>" + msg + "</p></div>";
    document.body.appendChild(wrap);
  }

  if (typeof THREE === "undefined") {
    fatalError("Thư viện Three.js chưa được nạp. Hãy kiểm tra lại kết nối mạng hoặc refresh trang (Ctrl+F5).");
    return;
  }

  let scene, renderer;
  try {
    scene = new THREE.Scene();
    // Nền xanh-đen rất sâu của không gian liên sao; sương nhẹ tạo chiều sâu
    scene.fog = new THREE.FogExp2(0x04060d, 0.0011);
    scene.background = new THREE.Color(0x03050c);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (err) {
    fatalError("Trình duyệt không hỗ trợ WebGL hoặc đã tắt tăng tốc phần cứng.<br>Hãy thử trình duyệt khác (Chrome/Edge/Firefox mới nhất).");
    return;
  }

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 600);
  camera.position.set(0, 0, 138);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 18;
  controls.maxDistance = 320;
  controls.maxPolarAngle = Math.PI * 0.85;

  // ---------- Lights ----------
  scene.add(new THREE.AmbientLight(0xffffff, 1.3));
  const sun = new THREE.DirectionalLight(0xffffff, 1.3);
  sun.position.set(60, 90, 40);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0xe8b54d, 0.8);
  rim.position.set(-50, -20, -60);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 0.6);
  fill.position.set(0, -30, 30);
  scene.add(fill);

  // ---------- Vũ trụ nền: tinh vân + 3 lớp sao + dải Ngân Hà ----------
  // Toàn bộ là texture canvas sinh sẵn (một lần, CPU) + THREE.Points — cực nhẹ,
  // không tốn shader, không tải file ngoài.

  // Sprite chấm sáng mềm: đĩa radial gradient làm điểm ảnh ngôi sao
  function starSpriteTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.25, "rgba(255,255,255,.6)");
    grd.addColorStop(0.6, "rgba(255,255,255,.12)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.minFilter = THREE.LinearFilter;
    return t;
  }
  const starTex = starSpriteTexture();

  // Nhiệt độ màu sao thực tế: xanh nóng → trắng → vàng → cam/đỏ lạnh
  function starColor() {
    const r = Math.random();
    if (r < 0.12) return new THREE.Color().setHSL(0.62, 0.7, 0.82);      // xanh dương nóng
    if (r < 0.3) return new THREE.Color().setHSL(0.58, 0.35, 0.88);      // trắng-xanh
    if (r < 0.72) return new THREE.Color().setHSL(0.12, 0.06, 0.95);     // trắng ngà (đa số)
    if (r < 0.9) return new THREE.Color().setHSL(0.1, 0.45, 0.75);       // vàng
    return new THREE.Color().setHSL(0.05, 0.6, 0.62);                    // cam/đỏ
  }

  // Điểm ngẫu nhiên đều trên mặt cầu (phân bố đều, không dồn về 2 cực)
  function spherePoint(radius) {
    const u = Math.random() * 2 - 1;
    const th = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    return { x: radius * s * Math.cos(th), y: radius * u, z: radius * s * Math.sin(th) };
  }

  // Lớp 1 — sao xa: hàng nghìn chấm li ti, đứng im như bầu trời thật
  (function () {
    const N = 2600;
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const p = spherePoint(280 + Math.random() * 140);
      pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z;
      const c = starColor();
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const stars = new THREE.Points(geo, new THREE.PointsMaterial({
      size: 1.1, map: starTex, vertexColors: true, transparent: true,
      depthWrite: false, sizeAttenuation: true
    }));
    stars.renderOrder = -2;
    scene.add(stars);
  })();

  // Lớp 2 — sao gần + lấp lánh: to nhỏ ngẫu nhiên, nhóm này nhấp nháy chậm
  // bằng cách xoay sprite texture theo thời gian (rẻ, không cần shader)
  const twinkleMat = new THREE.PointsMaterial({
    size: 2.6, map: starTex, vertexColors: true, transparent: true, opacity: 0.9,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
  });
  const twinkleGroup = new THREE.Group();
  for (let k = 0; k < 3; k++) {
    const N = 260;
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const p = spherePoint(120 + Math.random() * 180);
      pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z;
      const c = starColor();
      const bright = 0.5 + Math.random() * 0.5;
      col[i * 3] = c.r * bright; col[i * 3 + 1] = c.g * bright; col[i * 3 + 2] = c.b * bright;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    twinkleGroup.add(new THREE.Points(geo, twinkleMat));
  }
  twinkleGroup.renderOrder = -1;
  scene.add(twinkleGroup);

  // Lớp 3 — dải Ngân Hà: vành đai sao dày hơn nén về mặt phẳng thiên hà
  (function () {
    const N = 1400;
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const tilt = new THREE.Euler(0.45, 0, 0.28); // nghiêng dải ngân hà cho tự nhiên
    const v = new THREE.Vector3();
    for (let i = 0; i < N; i++) {
      const th = Math.random() * Math.PI * 2;
      const radius = 300 + (Math.random() - 0.5) * 90;
      const spread = (Math.random() - 0.5) * 55;   // dày mỏng quanh mặt phẳng
      v.set(Math.cos(th) * radius, spread, Math.sin(th) * radius);
      v.applyEuler(tilt);
      pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
      // dải ngân hà ngả ấm (bụi sao dày nhìn vàng-nhạt)
      const c = starColor().lerp(new THREE.Color(0xffe9c4), 0.35);
      const dim = 0.35 + Math.random() * 0.4;
      col[i * 3] = c.r * dim; col[i * 3 + 1] = c.g * dim; col[i * 3 + 2] = c.b * dim;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const band = new THREE.Points(geo, new THREE.PointsMaterial({
      size: 1.6, map: starTex, vertexColors: true, transparent: true, opacity: 0.85,
      depthWrite: false, sizeAttenuation: true
    }));
    band.renderOrder = -2;
    scene.add(band);
  })();

  // ---------- Tinh vân màu (canvas procedural, cộng sáng, rất mờ) ----------
  function nebulaTexture(rgb) {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");
    // nhiều đám mây radial chồng nhau tạo hình khối mây khí tự nhiên
    for (let i = 0; i < 26; i++) {
      const x = 40 + Math.random() * 176;
      const y = 40 + Math.random() * 176;
      const r = 26 + Math.random() * 80;
      const a = 0.05 + Math.random() * 0.16;
      const grd = g.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, "rgba(" + rgb + "," + a + ")");
      grd.addColorStop(0.55, "rgba(" + rgb + "," + (a * 0.4) + ")");
      grd.addColorStop(1, "rgba(" + rgb + ",0)");
      g.fillStyle = grd;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.minFilter = THREE.LinearFilter;
    return t;
  }
  // 3 tinh vân: đỏ thẫm, xanh lam, tím — đặt rải rác quanh cảnh, cực mờ để nền sâu
  const nebulae = [
    { pos: [-140, 60, -220], size: 260, rgb: "224,70,80", rot: 0.00006 },
    { pos: [160, -50, -240], size: 300, rgb: "70,110,220", rot: -0.00005 },
    { pos: [-60, -90, 260], size: 240, rgb: "150,80,200", rot: 0.00007 }
  ];
  const nebSprites = nebulae.map(function (n) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: nebulaTexture(n.rgb), transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    sp.position.set(n.pos[0], n.pos[1], n.pos[2]);
    sp.scale.set(n.size, n.size, 1);
    sp.renderOrder = -3;
    scene.add(sp);
    return sp;
  });

  // ---------- Floating golden dust ----------
  const dustCount = 500;
  const dustPos = new Float32Array(dustCount * 3);
  const dustVel = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    // Push further out so they don't overlap the concept models
    const r = 60 + Math.random() * 130;
    const a = Math.random() * Math.PI * 2;
    dustPos[i * 3] = Math.cos(a) * r;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 90;
    dustPos[i * 3 + 2] = Math.sin(a) * r;
    dustVel[i] = 1.2 + Math.random() * 3.5;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xffdd8a, size: 0.9, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  scene.add(dust);

  // ---------- Glow sprite helper (additive radial gradient) ----------
  function makeGlow(color, size) {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(64, 64, 4, 64, 64, 64);
    grd.addColorStop(0, "rgba(255,255,255,.85)");
    grd.addColorStop(0.35, "rgba(255,255,255,.28)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(c),
      color: color,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    sp.scale.set(size, size, 1);
    return sp;
  }

  // Xóa quầng sáng hover của một node và giải phóng texture canvas của nó
  function clearHoverGlow(mesh) {
    const g = mesh.userData.hoverGlow;
    if (!g) return;
    nodeGroup.remove(g);
    if (g.material.map) g.material.map.dispose();
    g.material.dispose();
    mesh.userData.hoverGlow = null;
  }

  // ---------- Click burst + shockwave (particle explosion) ----------
  const BURST_N = 26;
  const bursts = [];
  const shockwaves = [];

  function burstAt(pos, color) {
    const arr = new Float32Array(BURST_N * 3);
    const vel = new Float32Array(BURST_N * 3);
    for (let i = 0; i < BURST_N; i++) {
      const dir = new THREE.Vector3(
        Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5
      ).normalize();
      const spd = 2.2 + Math.random() * 3.2;
      arr[i * 3] = pos.x; arr[i * 3 + 1] = pos.y; arr[i * 3 + 2] = pos.z;
      vel[i * 3] = dir.x * spd;
      vel[i * 3 + 1] = dir.y * spd;
      vel[i * 3 + 2] = dir.z * spd;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({
      color: color, size: 0.42, transparent: true, opacity: 1,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    scene.add(pts);
    // Giữ lại điểm nổ: particles có tọa độ TUYỆT ĐỐI, scale quanh gốc thế giới
    // sẽ làm cả đám hạt dịch chuyển sai vị trí nếu không bù trừ.
    bursts.push({ pts: pts, vel: vel, arr: arr, origin: pos.clone(), life: 0, maxLife: 1.15 });

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.72, 48),
      new THREE.MeshBasicMaterial({
        color: color, transparent: true, opacity: 0.85,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
      })
    );
    ring.position.copy(pos);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
    shockwaves.push({ mesh: ring, life: 0 });
  }

  // ---------- Central "kernel" (the heart of Marxist–Leninist dialectics) ----------
  const coreGroup = new THREE.Group();
  // Luminous red core sphere
  const coreSphere = new THREE.Mesh(
    new THREE.SphereGeometry(6, 48, 48),
    new THREE.MeshStandardMaterial({
      color: 0xe0222b, metalness: 0.4, roughness: 0.2,
      emissive: 0xe0222b, emissiveIntensity: 0.9
    })
  );
  coreGroup.add(coreSphere);
  // Two bright golden halo rings (bigger, glowing)
  const coreRing = new THREE.Mesh(
    new THREE.TorusGeometry(10, 0.18, 12, 72),
    new THREE.MeshStandardMaterial({ color: COLORS.gold, emissive: COLORS.gold, emissiveIntensity: 1.4 })
  );
  coreRing.rotation.x = Math.PI / 2.4;
  coreGroup.add(coreRing);
  const coreRing2 = coreRing.clone();
  coreRing2.rotation.x = -Math.PI / 3;
  coreRing2.scale.set(1.15, 1.15, 1);
  coreRing2.material.emissiveIntensity = 1.1;
  coreGroup.add(coreRing2);
  // Third thin ring for depth
  const coreRing3 = new THREE.Mesh(
    new THREE.TorusGeometry(12.5, 0.06, 8, 80),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5, transparent: true, opacity: 0.6 })
  );
  coreRing3.rotation.x = Math.PI / 1.7;
  coreGroup.add(coreRing3);
  // Strong glow around the core (much larger, unmistakable)
  coreGroup.add(makeGlow(0xe0222b, 75));
  coreGroup.add(makeGlow(0xe8b54d, 46));
  coreGroup.add(makeGlow(0xff5722, 30));
  scene.add(coreGroup);

  // ---------- Orbiting "moons" for each topic ----------
  const orbiterCount = 5;
  const orbiterLights = [];
  for (let i = 0; i < orbiterCount; i++) {
    const angle = (i / orbiterCount) * Math.PI * 2;
    const r = 46;
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 16, 16),
      new THREE.MeshStandardMaterial({ color: COLORS.cream, emissive: 0x445, emissiveIntensity: 0.25 })
    );
    p.userData.angle = angle;
    p.userData.radius = r;
    p.userData.speed = 0.0012 + i * 0.0002;
    scene.add(p);
    orbiterLights.push(p);
  }

  // ---------- Node group (concepts) ----------
  const nodeGroup = new THREE.Group();
  // nghiêng cùng mặt phẳng với dải Ngân Hà nền → các nút nằm trên một thiên hà xoắn
  nodeGroup.rotation.set(0.45, 0, 0.28);
  scene.add(nodeGroup);

  const nodes = buildNodes();
  const meshes = [];
  const labels = [];

  // CSS2D-style label via sprites (works without plugin, always faces camera)
  function makeLabel(text, subtitle, color) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Wrap long titles onto 2 lines to reduce overlap
    const TITLE_FONT = "700 42px 'Be Vietnam Pro', 'Segoe UI', sans-serif";
    ctx.font = TITLE_FONT;
    const titleLines = wrapText(ctx, text, 580);

    ctx.font = TITLE_FONT;
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 22;
    ctx.fillStyle = "#ffffff";
    const titleCenterY = subtitle ? 66 : 100;
    titleLines.forEach(function (line, i) {
      const y = titleCenterY + (i - (titleLines.length - 1) / 2) * 50;
      // viền tối quanh chữ cho dễ đọc trên nền sáng
      ctx.lineWidth = 8;
      ctx.strokeStyle = "rgba(0,0,0,0.6)";
      ctx.strokeText(line, 320, y);
      ctx.fillText(line, 320, y);
    });

    if (subtitle) {
      ctx.shadowBlur = 10;
      ctx.font = "600 30px 'Be Vietnam Pro', 'Segoe UI', sans-serif";
      ctx.fillStyle = "#ffd77a";
      ctx.strokeStyle = "rgba(0,0,0,0.85)";
      ctx.lineWidth = 6;
      ctx.strokeText(subtitle, 320, 158);
      ctx.fillText(subtitle, 320, 158);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.encoding = THREE.sRGBEncoding;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(14, titleLines.length > 1 ? 4.4 : 3.8, 1);
    return sprite;
  }

  // Split text into up to 2 lines that fit the canvas width
  function wrapText(ctx, text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let cur = "";
    for (let i = 0; i < words.length; i++) {
      const test = cur ? cur + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && cur) {
        lines.push(cur);
        cur = words[i];
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
    return lines.slice(0, 2);
  }

  // -------- Build a themed 3D model per node (mỗi nút một hình thù riêng, gắn với chủ đề) --------
  function nodeMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color: color, roughness: 0.45, metalness: 0,
      emissive: color, emissiveIntensity: 0.75
    });
  }
  // vật liệu "trắng sáng" dùng cho chi tiết phụ (vòng, mũi tên, dây nối…)
  function whiteMat(opacity) {
    return new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.85,
      transparent: true, opacity: opacity === undefined ? 0.8 : opacity
    });
  }
  // hình nón (dùng làm mũi tên)
  function cone(color, r, h) {
    return new THREE.Mesh(new THREE.ConeGeometry(r, h, 12), nodeMaterial(color));
  }

  function buildModel(node, color) {
    const id = node.id;
    const g = new THREE.Group();
    const S = 3.6; // base scale

    // ================= CHỦ NGHĨA DUY VẬT =================
    if (id === "material") {
      // Phạm trù vật chất: mạng tinh thể vật chất đặc + electron chuyển động (vật chất luôn vận động)
      const latticeMat = nodeMaterial(color);
      const n = 3, step = S * 0.62;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(S * 0.17, 12, 12), latticeMat);
        s.position.set((i - 1) * step, (j - 1) * step, (k - 1) * step);
        g.add(s);
      }
      const frame = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(step * 2.2, step * 2.2, step * 2.2)),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })
      );
      g.add(frame);
      for (let e = 0; e < 2; e++) {
        const el = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 10),
          new THREE.MeshStandardMaterial({ color: 0xffe9a0, emissive: 0xffcf5a, emissiveIntensity: 0.9 }));
        el.userData.orbit = e * Math.PI;
        el.userData.electronRing = true;
        el.userData.ringR = S * 1.35;
        el.userData.ringTilt = e === 0 ? 0.5 : -0.6;
        g.add(el);
        const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(circlePts(S * 1.35, 48, e === 0 ? 0.5 : -0.6, 0)),
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }));
        g.add(ring);
      }

    } else if (id === "consciousness") {
      // Ý thức: ngọn lửa tỏa sáng (thuộc tính phản ánh cao nhất, phi vật chất nhưng sống động)
      const flame = new THREE.Mesh(new THREE.ConeGeometry(S * 0.75, S * 2.1, 12), nodeMaterial(color));
      flame.position.y = S * 0.45;
      flame.userData.isFlame = true;
      g.add(flame);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(S * 0.34, S * 1.05, 10),
        new THREE.MeshStandardMaterial({ color: 0xffd98a, emissive: 0xffc35a, emissiveIntensity: 1 }));
      tip.position.y = S * 1.25;
      tip.userData.isFlame = true;
      g.add(tip);
      const base = new THREE.Mesh(new THREE.SphereGeometry(S * 0.55, 18, 18), nodeMaterial(color));
      base.position.y = -S * 0.55;
      g.add(base);

    } else if (id === "motion") {
      // Vận động: xoáy kép — phương thức tồn tại của vật chất, không đứng yên
      for (let b = 0; b < 2; b++) {
        const pts = [];
        for (let i = 0; i <= 64; i++) {
          const t = i / 64;
          const a = t * Math.PI * 3.4 + b * Math.PI;
          const r = S * 1.05;
          pts.push(new THREE.Vector3(Math.cos(a) * r, (t - 0.5) * S * 2.4, Math.sin(a) * r));
        }
        const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 72, 0.16, 8, false),
          nodeMaterial(color));
        g.add(tube);
      }
      const topArrow = cone(color, 0.42, 0.9);
      topArrow.position.y = S * 1.65;
      g.add(topArrow);
      const botArrow = cone(color, 0.42, 0.9);
      botArrow.position.y = -S * 1.65;
      botArrow.rotation.z = Math.PI;
      g.add(botArrow);

    } else if (id === "space-time") {
      // Không gian – Thời gian: lưới không-thời gian cong, nón ánh sáng & đường thế giới
      const grid = new THREE.Group();
      const lineMat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.5 });
      const half = S * 1.3, segs = 6;
      for (let i = 0; i <= segs; i++) {
        const u = -half + (i / segs) * half * 2;
        grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(u, -0.4, -half), new THREE.Vector3(u, 0.4, half)]), lineMat));
        grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-half, -0.4, u), new THREE.Vector3(half, 0.4, u)]), lineMat));
      }
      g.add(grid);
      const coneMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.6, transparent: true, opacity: 0.22 });
      const up = new THREE.Mesh(new THREE.ConeGeometry(S * 0.85, S * 1.5, 20, 1, true), coneMat);
      up.position.y = S * 0.8;
      g.add(up);
      const down = new THREE.Mesh(new THREE.ConeGeometry(S * 0.85, S * 1.5, 20, 1, true), coneMat);
      down.position.y = -S * 0.8;
      down.rotation.z = Math.PI;
      g.add(down);
      const worldline = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
        new THREE.Vector3(-S * 0.9, -S * 1.4, 0), new THREE.Vector3(0, -S * 0.2, S * 0.4),
        new THREE.Vector3(S * 0.4, S * 0.9, -S * 0.3), new THREE.Vector3(S * 0.7, S * 1.6, 0)
      ]), 32, 0.1, 8, false), whiteMat(0.9));
      g.add(worldline);

    } else if (id === "reflection") {
      // Phản ánh: gương + tia tới & tia phản xạ (thuộc tính chung của mọi dạng vật chất)
      const mirror = new THREE.Mesh(new THREE.CylinderGeometry(S * 1.0, S * 1.0, 0.18, 26),
        new THREE.MeshStandardMaterial({ color: 0xbfd4ff, emissive: 0x8fb0ff, emissiveIntensity: 0.55, roughness: 0.15, metalness: 0.6 }));
      mirror.rotation.z = Math.PI / 2;
      g.add(mirror);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(S * 1.0, 0.1, 8, 40), nodeMaterial(color));
      rim.rotation.y = Math.PI / 2;
      g.add(rim);
      const inRay = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, S * 1.7, 8), whiteMat(0.95));
      inRay.position.set(-S * 0.75, S * 0.85, 0);
      inRay.rotation.z = Math.PI / 3.6;
      g.add(inRay);
      const outRay = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, S * 1.7, 8), whiteMat(0.95));
      outRay.position.set(S * 0.75, S * 0.85, 0);
      outRay.rotation.z = -Math.PI / 3.6;
      g.add(outRay);

    // ================= LỊCH SỬ PHÉP BIỆN CHỨNG =================
    } else if (node.tag === "dialectics") {
      // Các hình thức lịch sử của phép biện chứng: bậc thang xoắn ốc đi lên (kế thừa & nâng cao)
      const idx = ["dialect-ancient", "dialect-idealist", "dialect-materialist-birth"].indexOf(id);
      for (let i = 0; i < 5; i++) {
        const t = i / 4;
        const a = t * Math.PI * 2.2 + idx * 0.9;
        const block = new THREE.Mesh(new THREE.BoxGeometry(S * 0.85, S * 0.42, S * 0.85), nodeMaterial(color));
        block.position.set(Math.cos(a) * S * 0.75, -S * 1.1 + i * S * 0.55, Math.sin(a) * S * 0.75);
        block.rotation.y = -a;
        g.add(block);
      }
      const peak = cone(idx === 2 ? 0xffd98a : color, 0.45, 1.0);
      peak.position.y = S * 1.55;
      g.add(peak);

    // ================= PHÉP BIỆN CHỨNG DUY VẬT: NGUYÊN LÝ =================
    } else if (id === "principle-materiality") {
      // Tính thống nhất vật chất: nhiều khối đa diện khác nhau cùng một màu, nối về một tâm
      const shapes = [
        new THREE.OctahedronGeometry(S * 0.42, 0), new THREE.DodecahedronGeometry(S * 0.4, 0),
        new THREE.IcosahedronGeometry(S * 0.42, 0), new THREE.BoxGeometry(S * 0.62, S * 0.62, S * 0.62),
        new THREE.TetrahedronGeometry(S * 0.5, 0)
      ];
      const mat = nodeMaterial(color);
      const pts = [];
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const p = new THREE.Vector3(Math.cos(a) * S * 1.25, Math.sin(a * 2) * S * 0.35, Math.sin(a) * S * 1.25);
        const m = new THREE.Mesh(shapes[i], mat);
        m.position.copy(p);
        g.add(m);
        pts.push(p);
      }
      for (let i = 0; i < 5; i++) {
        g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pts[i]]),
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })));
      }
      const heart = new THREE.Mesh(new THREE.SphereGeometry(S * 0.34, 16, 16), whiteMat(0.95));
      g.add(heart);

    } else if (id === "principle-connection") {
      // Mối liên hệ phổ biến: mạng lưới các mắt nối chằng chịt quanh tâm
      const pts = [];
      for (let i = 0; i < 9; i++) {
        const p = spherePt(S * 1.15, i * 2.39996323, Math.acos(1 - 2 * (i + 0.5) / 9));
        pts.push(p);
        const s = new THREE.Mesh(new THREE.SphereGeometry(S * 0.19, 12, 12), nodeMaterial(color));
        s.position.copy(p);
        g.add(s);
      }
      const linkMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28 });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        if ((i + j) % 3 === 0) g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([pts[i], pts[j]]), linkMat));
      }
      g.add(new THREE.Mesh(new THREE.SphereGeometry(S * 0.3, 16, 16), whiteMat(0.9)));

    } else if (id === "principle-development") {
      // Sự phát triển: mũi tên xoắn ốc đi lên, các vòng ngày càng mở rộng
      const pts = [];
      for (let i = 0; i <= 80; i++) {
        const t = i / 80;
        const a = t * Math.PI * 3;
        const r = S * (0.45 + t * 0.85);
        pts.push(new THREE.Vector3(Math.cos(a) * r, (t - 0.5) * S * 2.6, Math.sin(a) * r));
      }
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 90, 0.14, 8, false), nodeMaterial(color)));
      const arrow = cone(color, 0.5, 1.1);
      arrow.position.y = S * 1.75;
      g.add(arrow);

    // ================= CÁC CẶP PHẠM TRÙ =================
    } else if (id === "cat-universal-particular") {
      // Cái riêng & cái chung: tập hợp nhiều chấm, những chấm chung nối về một tâm phát sáng
      const positions = [];
      for (let i = 0; i < 10; i++) {
        const p = spherePt(S * 1.3, i * 2.1, Math.acos(1 - 2 * (i + 0.5) / 10));
        positions.push(p);
        const s = new THREE.Mesh(new THREE.SphereGeometry(S * 0.16, 10, 10), nodeMaterial(color));
        s.position.copy(p);
        g.add(s);
      }
      const linkMat = new THREE.LineBasicMaterial({ color: 0xffd98a, transparent: true, opacity: 0.55 });
      for (let i = 0; i < positions.length; i += 2) {
        g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([positions[i], new THREE.Vector3(0, 0, 0)]), linkMat));
      }
      g.add(new THREE.Mesh(new THREE.SphereGeometry(S * 0.35, 16, 16), whiteMat(0.95)));

    } else if (id === "cat-essence-phenomenon") {
      // Bản chất & hiện tượng: nhân phát sáng bên trong, lớp vỏ biến ảo bên ngoài
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(S * 0.6, 0),
        new THREE.MeshStandardMaterial({ color: 0xffd98a, emissive: 0xffbf3a, emissiveIntensity: 1 }));
      core.userData.isEssence = true;
      g.add(core);
      const shell = new THREE.Mesh(new THREE.SphereGeometry(S * 1.2, 24, 16),
        new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.16 }));
      g.add(shell);
      const shellWire = new THREE.Mesh(new THREE.SphereGeometry(S * 1.2, 10, 8),
        new THREE.MeshStandardMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.5 }));
      shellWire.userData.isPhenomenon = true;
      g.add(shellWire);

    } else if (id === "cat-necessity-contingency") {
      // Tất nhiên & ngẫu nhiên: trục thẳng vững chắc xuyên qua đám chấm rải ngẫu nhiên
      const axis = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, S * 3, 10), whiteMat(0.95));
      g.add(axis);
      const aTop = cone(color, 0.4, 0.9);
      aTop.position.y = S * 1.75;
      g.add(aTop);
      for (let i = 0; i < 9; i++) {
        const a = i * 2.4; // góc "ngẫu nhiên" cố định
        const rr = S * (0.55 + ((i * 37) % 60) / 100);
        const dot = new THREE.Mesh(new THREE.SphereGeometry(S * 0.13, 8, 8), nodeMaterial(color));
        dot.position.set(Math.cos(a) * rr, -S * 1.2 + ((i * 53) % 100) / 100 * S * 2.4, Math.sin(a) * rr);
        g.add(dot);
      }

    } else if (id === "cat-cause-effect") {
      // Nguyên nhân & kết quả: chuỗi domino nối nhau bằng mũi tên nhân quả
      const mat = nodeMaterial(color);
      for (let i = 0; i < 3; i++) {
        const d = new THREE.Mesh(new THREE.BoxGeometry(S * 0.32, S * 1.15, S * 0.85), mat);
        d.position.x = -S * 1.35 + i * S * 0.85;
        d.position.y = -S * 0.25;
        g.add(d);
      }
      for (let i = 0; i < 2; i++) {
        const ar = cone(0xffd98a, 0.3, 0.62);
        ar.position.set(-S * 0.93 + i * S * 0.85, S * 0.62, 0);
        ar.rotation.z = -Math.PI / 2;
        g.add(ar);
      }

    } else if (id === "cat-content-form") {
      // Nội dung & hình thức: khối cầu nội dung bên trong chiếc khung lập phương
      const content = new THREE.Mesh(new THREE.SphereGeometry(S * 0.82, 22, 22), nodeMaterial(color));
      content.userData.isContent = true;
      g.add(content);
      const form = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(S * 2.15, S * 2.15, S * 2.15)),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65 })
      );
      g.add(form);

    } else if (id === "cat-possibility-reality") {
      // Khả năng & hiện thực: chấm sáng "bay" từ bong bóng khả năng sang khối cầu hiện thực
      const bubble = new THREE.Mesh(new THREE.SphereGeometry(S * 0.62, 20, 14),
        new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.28 }));
      bubble.position.x = -S * 0.95;
      g.add(bubble);
      const bubbleWire = new THREE.Mesh(new THREE.SphereGeometry(S * 0.62, 8, 6),
        new THREE.MeshStandardMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.5 }));
      bubbleWire.position.x = -S * 0.95;
      g.add(bubbleWire);
      const real = new THREE.Mesh(new THREE.SphereGeometry(S * 0.55, 20, 20), nodeMaterial(color));
      real.position.x = S * 0.95;
      g.add(real);
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-S * 0.3, 0, 0), new THREE.Vector3(S * 0.35, 0, 0)]),
        new THREE.LineBasicMaterial({ color: 0xffd98a, transparent: true, opacity: 0.7 })));
      const spark = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), whiteMat(1));
      spark.userData.possibilityTravel = true;
      g.add(spark);

    // ================= BA QUY LUẬT CƠ BẢN =================
    } else if (id === "law-contradiction") {
      // Thống nhất & đấu tranh của các mặt đối lập: hai khối đối chọi cùng một nhân chung
      const a = new THREE.Mesh(new THREE.TetrahedronGeometry(S * 0.85, 0), nodeMaterial(color));
      a.position.x = -S * 0.85;
      g.add(a);
      const b = new THREE.Mesh(new THREE.TetrahedronGeometry(S * 0.85, 0), nodeMaterial(color));
      b.position.x = S * 0.85;
      b.rotation.y = Math.PI;
      b.userData.isHot = true; // mặt đối lập "nóng" — nhấp nháy nhẹ
      g.add(b);
      const link = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, S * 1.15, 8), whiteMat(0.9));
      link.rotation.z = Math.PI / 2;
      g.add(link);
      const core = new THREE.Mesh(new THREE.SphereGeometry(S * 0.3, 14, 14), whiteMat(0.95));
      core.userData.isEssence = true;
      g.add(core);

    } else if (id === "law-quantity-quality") {
      // Lượng – Chất: cột "lượng" dâng dần trong khung, chạm ngưỡng → vòng "chất" bùng sáng
      const frame = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(S * 0.95, S * 2.2, S * 0.95)),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
      );
      frame.position.y = -S * 0.1;
      g.add(frame);
      const fill = new THREE.Mesh(new THREE.BoxGeometry(S * 0.78, 1, S * 0.78), nodeMaterial(color));
      fill.userData.isFill = true;
      fill.userData.baseY = -S * 1.15;
      g.add(fill);
      const halo = new THREE.Mesh(new THREE.TorusGeometry(S * 1.45, 0.09, 8, 44), whiteMat(0.45));
      halo.rotation.x = Math.PI / 2;
      halo.position.y = S * 0.95;
      halo.userData.isThreshold = true;
      g.add(halo);

    } else if (id === "law-negation") {
      // Phủ định của phủ định: các lớp vỏ kế tiếp nhau, lớp mới nở ra từ trong lớp cũ
      const layerDefs = [
        { r: S * 0.55, wire: false, op: 1 },
        { r: S * 0.95, wire: true, op: 0.6 },
        { r: S * 1.35, wire: true, op: 0.32 }
      ];
      for (let i = 0; i < 3; i++) {
        const ld = layerDefs[i];
        const geo = new THREE.IcosahedronGeometry(ld.r, 0);
        const m = ld.wire
          ? new THREE.MeshStandardMaterial({ color: color, wireframe: true, transparent: true, opacity: ld.op })
          : nodeMaterial(color);
        const layer = new THREE.Mesh(geo, m);
        layer.userData.negLayer = true;
        layer.userData.negBase = ld.r;
        layer.userData.negIdx = i;
        g.add(layer);
      }
      const arrow = cone(0xffd98a, 0.4, 0.9);
      arrow.position.y = S * 1.9;
      g.add(arrow);

    // ================= LÝ LUẬN NHẬN THỨC =================
    } else if (id === "cog-practice-basis") {
      // Thực tiễn là cơ sở & động lực của nhận thức: nền móng vững + bánh răng quay nâng quả cầu nhận thức
      const base = new THREE.Mesh(new THREE.BoxGeometry(S * 2.4, S * 0.5, S * 1.6), nodeMaterial(color));
      base.position.y = -S * 1.05;
      g.add(base);
      const gear = buildGear(color, S * 0.85);
      gear.position.set(0, S * 0.15, 0);
      gear.userData.isGear = true;
      g.add(gear);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(S * 0.5, 18, 18), whiteMat(0.9));
      orb.position.y = S * 1.35;
      g.add(orb);

    } else if (id === "cog-process") {
      // Biện chứng của quá trình nhận thức: vòng tròn khép kín với 2 mũi tên ngược chiều
      const ring = new THREE.Mesh(new THREE.TorusGeometry(S * 1.15, 0.13, 10, 48), nodeMaterial(color));
      g.add(ring);
      const ar1 = cone(color, 0.42, 0.95);
      ar1.position.set(S * 1.15, 0.35, 0);
      ar1.rotation.z = Math.PI; // hướng xuống
      g.add(ar1);
      const ar2 = cone(0xffd98a, 0.42, 0.95);
      ar2.position.set(-S * 1.15, 0.35, 0); // hướng lên
      g.add(ar2);
      g.add(new THREE.Mesh(new THREE.SphereGeometry(S * 0.32, 14, 14), whiteMat(0.9)));

    } else if (id === "cog-sensuous") {
      // Nhận thức cảm tính: đôi mắt — tri giác trực tiếp, sinh động
      const eye = new THREE.Mesh(new THREE.SphereGeometry(S * 0.85, 24, 18),
        new THREE.MeshStandardMaterial({ color: 0xf4efe6, emissive: 0xd9d2c2, emissiveIntensity: 0.35 }));
      eye.scale.set(1.25, 0.8, 0.8);
      g.add(eye);
      const iris = new THREE.Mesh(new THREE.SphereGeometry(S * 0.38, 18, 18), nodeMaterial(color));
      iris.position.z = S * 0.55;
      iris.userData.isIris = true;
      g.add(iris);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(S * 0.17, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x0a0c12, emissive: 0x0a0c12, emissiveIntensity: 0.4 }));
      pupil.position.z = S * 0.82;
      pupil.userData.isIris = true;
      g.add(pupil);
      const lid = new THREE.Mesh(new THREE.SphereGeometry(S * 0.92, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
        new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.4 }));
      lid.scale.set(1.25, 0.8, 0.8);
      g.add(lid);

    } else if (id === "cog-rational") {
      // Nhận thức lý tính: lăng kính — ánh sáng kinh nghiệm đi vào, tách thành khái niệm sáng rõ
      const prism = new THREE.Mesh(new THREE.CylinderGeometry(S * 0.8, S * 0.8, S * 1.3, 3),
        new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.75, roughness: 0.2 }));
      prism.rotation.z = Math.PI / 2;
      g.add(prism);
      const beamIn = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, S * 1.5, 8), whiteMat(0.9));
      beamIn.position.set(-S * 1.45, 0, 0);
      beamIn.rotation.z = Math.PI / 2;
      g.add(beamIn);
      for (let i = 0; i < 3; i++) {
        const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, S * 1.5, 8),
          new THREE.MeshStandardMaterial({
            color: [0xffd98a, 0x9fd0ff, 0xffa3a8][i], emissive: [0xffbf3a, 0x5aa8ff, 0xff6a72][i],
            emissiveIntensity: 0.9, transparent: true, opacity: 0.9
          }));
        beam.position.set(S * 1.35, (i - 1) * 0.62, 0);
        beam.rotation.z = Math.PI / 2 - (i - 1) * 0.16;
        g.add(beam);
      }

    } else if (id === "cog-return-practice") {
      // Nhận thức quay về thực tiễn: vòng cung mũi tên từ quả cầu nhận thức trở lại nền thực tiễn
      const ground = new THREE.Mesh(new THREE.BoxGeometry(S * 2.2, S * 0.4, S * 1.4), nodeMaterial(color));
      ground.position.y = -S * 1.1;
      g.add(ground);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(S * 0.5, 18, 18), whiteMat(0.9));
      orb.position.set(-S * 0.8, S * 0.9, 0);
      g.add(orb);
      const arcPts = [];
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        arcPts.push(new THREE.Vector3(-S * 0.8 + t * S * 1.9, S * 0.9 - t * t * S * 1.7, 0));
      }
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arcPts), 40, 0.11, 8, false), nodeMaterial(color)));
      const ar = cone(color, 0.4, 0.85);
      ar.position.set(S * 1.05, -S * 0.62, 0);
      ar.rotation.z = Math.PI / 1.4;
      g.add(ar);

    // ================= CHỦ NGHĨA DUY VẬT LỊCH SỬ =================
    } else if (id === "hist-productive-force") {
      // Lực lượng sản xuất: bánh răng — động cơ của sản xuất
      const gear = buildGear(color, S * 1.05);
      gear.userData.isGear = true;
      g.add(gear);
      const hub = new THREE.Mesh(new THREE.SphereGeometry(S * 0.3, 14, 14), whiteMat(0.9));
      g.add(hub);

    } else if (id === "hist-relations") {
      // Quan hệ sản xuất: chuỗi các mắt xích ràng buộc với nhau
      for (let i = 0; i < 3; i++) {
        const link = new THREE.Mesh(new THREE.TorusGeometry(S * 0.62, 0.16, 10, 30), nodeMaterial(color));
        link.position.x = (i - 1) * S * 0.95;
        link.rotation.y = i % 2 === 0 ? 0 : Math.PI / 2;
        g.add(link);
      }

    } else if (id === "hist-base-superstructure") {
      // Cơ sở hạ tầng & kiến trúc thượng tầng: nền móng nhiều lớp đỡ tòa tháp vươn cao
      const baseMat = nodeMaterial(color);
      for (let i = 0; i < 3; i++) {
        const slab = new THREE.Mesh(new THREE.BoxGeometry(S * (2.3 - i * 0.25), S * 0.42, S * (1.6 - i * 0.18)), baseMat);
        slab.position.y = -S * 1.25 + i * S * 0.46;
        g.add(slab);
      }
      const towerMat = new THREE.MeshStandardMaterial({ color: 0xffd98a, emissive: 0xffbf3a, emissiveIntensity: 0.7, roughness: 0.45 });
      const tower = new THREE.Mesh(new THREE.BoxGeometry(S * 0.62, S * 1.9, S * 0.62), towerMat);
      tower.position.y = S * 0.75;
      g.add(tower);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(S * 0.55, S * 0.7, 4), towerMat);
      roof.position.y = S * 2.0;
      roof.rotation.y = Math.PI / 4;
      g.add(roof);

    } else if (id === "hist-sos-form") {
      // Hình thái kinh tế – xã hội: bậc thang lịch sử tiến lên, đỉnh là đỉnh cao
      const mat = nodeMaterial(color);
      for (let i = 0; i < 5; i++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(S * 0.9, S * 0.4, S * 0.9), mat);
        step.position.set(-S * 1.1 + i * S * 0.55, -S * 1.1 + i * S * 0.55, 0);
        g.add(step);
      }
      const star = cone(0xffd98a, 0.45, 0.95);
      star.position.set(S * 1.35, S * 1.5, 0);
      g.add(star);

    } else if (id === "hist-class-struggle") {
      // Giai cấp & đấu tranh giai cấp: hai khối đối kháng va vào nhau, tia lửa ở giữa
      const left = new THREE.Mesh(new THREE.BoxGeometry(S * 0.95, S * 1.5, S * 0.95), nodeMaterial(color));
      left.position.x = -S * 1.0;
      left.rotation.z = -0.12;
      left.userData.isClash = true;
      g.add(left);
      const right = new THREE.Mesh(new THREE.BoxGeometry(S * 0.95, S * 1.5, S * 0.95), nodeMaterial(color));
      right.position.x = S * 1.0;
      right.rotation.z = 0.12;
      right.userData.isClash = true;
      g.add(right);
      const flash = new THREE.Mesh(new THREE.OctahedronGeometry(S * 0.4, 0), whiteMat(1));
      flash.userData.isFlash = true;
      g.add(flash);

    } else if (id === "hist-cmv") {
      // Quần chúng nhân dân: đám đông những con người cùng hướng lên, ngôi sao dẫn đường
      const mat = nodeMaterial(color);
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const person = new THREE.Group();
        const body = new THREE.Mesh(new THREE.CylinderGeometry(S * 0.16, S * 0.22, S * 0.75, 10), mat);
        const head = new THREE.Mesh(new THREE.SphereGeometry(S * 0.16, 12, 12), mat);
        head.position.y = S * 0.55;
        person.add(body); person.add(head);
        const rr = S * (i % 2 === 0 ? 1.05 : 0.62);
        person.position.set(Math.cos(a) * rr, -S * 0.55, Math.sin(a) * rr);
        g.add(person);
      }
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(S * 0.42, 0),
        new THREE.MeshStandardMaterial({ color: 0xffd98a, emissive: 0xffbf3a, emissiveIntensity: 1 }));
      star.position.y = S * 1.25;
      star.userData.isEssence = true;
      g.add(star);

    } else {
      // Fallback: khối bát diện
      const o = new THREE.Mesh(new THREE.OctahedronGeometry(S, 0), nodeMaterial(color));
      g.add(o);
    }

    // gán kind theo id để animation phân biệt từng mô hình
    g.userData.kind = id;
    g.traverse(function (child) {
      if (child.userData.kind === undefined) child.userData.kind = id;
    });

    return g;
  }

  // bánh răng: đĩa + răng bao quanh (lực lượng sản xuất, thực tiễn)
  function buildGear(color, r) {
    const gear = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(r, r, r * 0.45, 24), nodeMaterial(color));
    disc.rotation.x = Math.PI / 2;
    gear.add(disc);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(r * 0.26, r * 0.42, r * 0.42), nodeMaterial(color));
      tooth.position.set(Math.cos(a) * (r + r * 0.12), Math.sin(a) * (r + r * 0.12), 0);
      tooth.rotation.z = a;
      gear.add(tooth);
    }
    return gear;
  }

  // điểm phân bố đều trên mặt cầu (công thức Fibonacci sphere)
  function spherePt(r, azimuth, polar) {
    return new THREE.Vector3(
      r * Math.sin(polar) * Math.cos(azimuth),
      r * Math.cos(polar),
      r * Math.sin(polar) * Math.sin(azimuth)
    );
  }

  function circlePts(r, n, rotX, rotY) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      const p = new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
      p.applyEuler(new THREE.Euler(rotX, rotY, 0));
      pts.push(p);
    }
    return pts;
  }

  // Viền đen quanh mỗi mô hình: phóng to hình ra xa tâm toàn cục một chút
  // rồi vẽ bằng mặt trong (BackSide) → phần vỏ nhô ra khỏi bề mặt = đường viền đen rõ nét
  const outlineMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    toneMapped: false
  });
  const OUTLINE_GROW = 0.28; // độ dày viền (đơn vị thế giới)

  function addOutlines(root) {
    root.updateMatrixWorld(true);
    const center = new THREE.Box3().setFromObject(root).getCenter(new THREE.Vector3());
    const solids = [];
    root.traverse(function (o) {
      if (o.isMesh && !o.userData.noOutline) solids.push(o);
    });
    solids.forEach(function (o) {
      const outline = new THREE.Mesh(o.geometry, outlineMat);
      o.add(outline); // con của mesh → tự co giãn theo hover
      // ép outline phình ra xa tâm mô hình đúng OUTLINE_GROW (tính trong hệ toạ độ cục bộ của mesh)
      const toCenter = o.worldToLocal(center.clone());
      if (toCenter.lengthSq() < 0.001) {
        // khối nằm đúng tâm → chỉ cần phóng to
        outline.scale.set(1.12, 1.12, 1.12);
      } else {
        const grow = OUTLINE_GROW / toCenter.length();
        outline.scale.set(1 + grow, 1 + grow, 1 + grow);
        outline.position.copy(toCenter.normalize().multiplyScalar(-OUTLINE_GROW));
      }
    });
  }

  nodes.forEach(function (node) {
    const pos = new THREE.Vector3(node.pos[0], node.pos[1], node.pos[2]);
    const color = nodeColor(node);
    const isLaw = node.rule.indexOf("Quy luật") === 0;

    // Themed model per node
    const kind = node.id; // mỗi nút một hình thù riêng theo chủ đề

    const model = buildModel(node, color);
    addOutlines(model); // viền đen toàn bộ khối đặc của mô hình
    // Model sits at LOCAL ORIGIN inside the wrapper mesh (no extra position offset!)
    const mesh = new THREE.Group();
    mesh.add(model);
    mesh.position.copy(pos);   // only the wrapper carries the world position
    mesh.userData.node = node;
    mesh.userData.color = color;
    mesh.userData.isLaw = isLaw;
    mesh.userData.kind = kind;

    nodeGroup.add(mesh);
    meshes.push(mesh);

    // Per-model glow so every object visibly glows on the dark backdrop
    const ambientGlow = makeGlow(color, 13);
    ambientGlow.position.copy(pos);
    nodeGroup.add(ambientGlow);
    mesh.userData.ambientGlow = ambientGlow;

    // Label — sit a fixed distance below the model's BOTTOM (measured via bounding box)
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const bottomYLocal = box.min.y;                       // bottom relative to model origin
    const label = makeLabel(node.vi, node.rule, color);
    label.position.set(pos.x, pos.y + bottomYLocal - 2.4, pos.z);
    label.userData.node = node;
    nodeGroup.add(label);
    labels.push(label);
    mesh.userData.label = label;

    // (bỏ đường nối về tâm cho gọn cảnh)
  });

  // ---------- Camera fly-to ----------
  let flyTarget = null;
  let flyTargetLook = null;
  let flyStart = null;
  let flyStartTarget = null;
  let flyT = 0;
  const FLY_DURATION = 900;

  function flyTo(pos, lookAt) {
    flyStart = camera.position.clone();
    flyStartTarget = controls.target.clone();
    flyTarget = pos ? pos.clone() : null;
    flyTargetLook = lookAt ? lookAt.clone() : flyTarget;
    flyT = 0;
  }

  // Về lại trọng tâm ban đầu: hạt nhân ở giữa trang
  function resetCamera() {
    flyTo(new THREE.Vector3(0, 0, 138), new THREE.Vector3(0, 0, 0));
  }

  // ---------- Raycasting for node picking ----------
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  // Build a flat list of every clickable mesh inside the node groups
  const clickables = [];
  meshes.forEach(function (m) {
    m.traverse(function (child) {
      if (child.isMesh) clickables.push(child);
    });
  });

  function findNodeFromHit(hit) {
    let obj = hit.object;
    while (obj && !obj.userData.node) obj = obj.parent;
    return obj; // the node Group (or null)
  }

  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartT = 0;

  function onPointerDown(e) {
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStartT = Date.now();
  }

  function onPointerUp(e) {
    // Ignore if this was actually a drag (camera rotation), not a tap
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    if (Math.abs(dx) + Math.abs(dy) > 8 || (Date.now() - dragStartT) > 500) return;

    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickables, false);
    if (hits.length > 0) {
      const nodeGroupHit = findNodeFromHit(hits[0]);
      if (!nodeGroupHit) return;
      const node = nodeGroupHit.userData.node;
      showInfo(node);
      // Lấy toạ độ THẾ GIỚI thực của mô hình (nodeGroup đang nghiêng)
      // rồi đặt camera nhìn về phía nó theo hướng gần vuông góc mặt đĩa thiên hà
      // → mô hình luôn ở đúng tâm khung hình, không bị lệch
      const target = nodeGroupHit.getWorldPosition(new THREE.Vector3());
      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(nodeGroup.quaternion);
      const dir = target.clone().sub(controls.target).normalize();
      const up = dir.dot(normal) >= 0 ? normal : normal.clone().negate();
      const camDir = up.clone().add(dir.multiplyScalar(0.4)).normalize();
      const viewDist = nodeGroupHit.userData.isLaw ? 26 : 21;
      flyTo(target.clone().add(camDir.multiplyScalar(viewDist)), target);
      burstAt(target, nodeGroupHit.userData.color);
    }
  }

  function onPointerMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickables, false);
    renderer.domElement.style.cursor = hits.length ? "pointer" : "grab";

    const hovered = hits.length ? findNodeFromHit(hits[0]) : null;
    meshes.forEach(function (m) {
      const isHover = (m === hovered);
      // intensity per child material
      m.traverse(function (child) {
        if (child.isMesh && child.material && child.material.emissiveIntensity !== undefined) {
          child.material.emissiveIntensity = isHover
            ? 1.0
            : (m.userData.isLaw ? 0.75 : 0.6);
        }
      });
      // scale-up on hover
      const targetScale = isHover ? 1.14 : 1;
      m.scale.x += (targetScale - m.scale.x) * 0.18;
      m.scale.y += (targetScale - m.scale.y) * 0.18;
      m.scale.z += (targetScale - m.scale.z) * 0.18;
    });
    // hover glow ring: xóa glow cũ TRƯỚC khi thêm glow mới (tránh rò rỉ mỗi lần rê chuột)
    meshes.forEach(function (m) { if (m !== hovered) clearHoverGlow(m); });
    if (hovered && !hovered.userData.hoverGlow) {
      hovered.userData.hoverGlow = makeGlow(hovered.userData.color, 11);
      nodeGroup.add(hovered.userData.hoverGlow);
    }
  }

  // ---------- UI: info panel ----------
  const infoPanel = document.getElementById("info-panel");
  const infoContent = document.getElementById("info-content");

  function showInfo(node) {
    const simLink = node.sim ? '<div class="sim-launch"><button class="sim-btn sim-play" data-sim="' + node.sim + '">▶ Mở mô phỏng trực quan</button></div>' : "";
    infoContent.innerHTML =
      '<span class="info-tag">' + (node.rule || "Khái niệm") + '</span>' +
      '<div class="info-vi">' + node.vi + '</div>' +
      '<div class="info-rule">' + node.rule + '</div>' +
      '<div class="info-body">' + node.body + '</div>' +
      '<div class="info-example"><span class="lbl">Ví dụ minh họa</span>' + node.example + '</div>' +
      simLink;
    infoPanel.classList.remove("hidden");

    const btn = infoContent.querySelector('[data-sim]');
    if (btn) btn.addEventListener("click", function () { openSim(btn.dataset.sim); });

    document.getElementById("current-target").textContent = "Đang xem: " + node.vi;
  }

  function hideInfo(reset) {
    meshes.forEach(clearHoverGlow); // đóng panel → xóa glow còn treo
    infoPanel.classList.add("hidden");
    document.getElementById("current-target").textContent = "Nhấp vào các hình khối 3D để khám phá các khái niệm";
    if (reset) resetCamera();
  }

  document.getElementById("info-close").addEventListener("click", function () { hideInfo(true); });

  // ---------- Nav buttons ----------
  // Trung tâm các cụm được TÍNH TRỰC TIẾP từ toạ độ thế giới của các nút
  // (không hard-code — luôn đúng dù bố cục dải ngân hà thay đổi)
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

  // Banner giới thiệu cụm chủ đề (title/desc trong data.js) khi nhảy tới chủ đề
  let topicBanner = null;
  let topicBannerTimer = 0;
  function showTopicBanner(topic) {
    if (!topicBanner) {
      topicBanner = document.createElement("div");
      topicBanner.id = "topic-banner";
      document.body.appendChild(topicBanner);
    }
    topicBanner.innerHTML = "<h2></h2><p></p>";
    topicBanner.querySelector("h2").textContent = topic.title;
    topicBanner.querySelector("p").textContent = topic.desc;
    topicBanner.classList.add("show");
    clearTimeout(topicBannerTimer);
    topicBannerTimer = setTimeout(function () { topicBanner.classList.remove("show"); }, 6500);
  }

  // Bay tới cụm chủ đề + hiển thị banner mô tả
  function flyToTopic(topicKey) {
    const c = topicCenter(topicKey);
    if (!c) return;
    // góc quay MỚI cho mỗi lần ấn: nhìn cụm từ hướng vuông góc mặt đĩa thiên hà
    // → toàn bộ nút trong cụm trải đều trong khung hình
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(nodeGroup.quaternion);
    flyTo(c.clone().add(normal.multiplyScalar(64)), c);
    const topic = DATA[topicKey];
    if (topic) showTopicBanner(topic);
  }

  document.querySelectorAll(".nav-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.id === "btn-timeline" || btn.id === "btn-timeline-mobile") return; // handled below
      document.querySelectorAll(".nav-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      hideInfo();
      closeMobileMenu();
      flyToTopic(btn.dataset.topic);
    });
  });

  // ---------- Mobile hamburger menu ----------
  const mobileNav = document.getElementById("mobile-nav");
  function closeMobileMenu() { mobileNav.classList.add("hidden"); }
  document.getElementById("hamburger").addEventListener("click", function (e) {
    e.stopPropagation();
    mobileNav.classList.toggle("hidden");
  });
  document.addEventListener("click", function (e) {
    if (!mobileNav.classList.contains("hidden") && !e.target.closest(".mobile-menu")) {
      closeMobileMenu();
    }
  });

  // ---------- Timeline lịch sử ----------
  const timelineModal = document.getElementById("timeline-modal");
  const tlTitle = document.getElementById("tl-title");
  const tlIntro = document.getElementById("tl-intro");
  const tlEras = document.getElementById("tl-eras");
  const tlTrack = document.getElementById("tl-track");

  function renderTimeline() {
    tlTitle.textContent = TIMELINE.title;
    tlIntro.textContent = TIMELINE.intro;

    buildTimelineEraTabs();
    filterTimeline(0);
  }

  function buildTimelineEraTabs() {
    tlEras.innerHTML = "";
    TIMELINE.eras.forEach(function (era, i) {
      const tab = document.createElement("button");
      tab.className = "tl-era-tag" + (i === 0 ? " active" : "");
      // Đặt màu kỷ nguyên trên CHÍNH tab để .tl-era-tag.active đọc được var(--era)
      tab.style.setProperty("--era", "#" + era.color.toString(16).padStart(6, "0"));
      tab.textContent = era.era + " · " + era.label;
      tab.dataset.index = i;
      tab.addEventListener("click", function () {
        document.querySelectorAll(".tl-era-tag").forEach((b) => b.classList.remove("active"));
        tab.classList.add("active");
        filterTimeline(i);
      });
      tlEras.appendChild(tab);
    });
  }

  function filterTimeline(idx) {
    const era = TIMELINE.eras[idx];
    tlTrack.innerHTML = "";
    era.items.forEach(function (item) {
      const div = document.createElement("div");
      div.className = "tl-item";
      div.innerHTML =
        '<span class="tl-year">' + item.year + '</span>' +
        '<h3>' + item.title + '</h3>' +
        '<p>' + item.text + '</p>';
      tlTrack.appendChild(div);
    });
    // color the active era tab spine accent
    tlTrack.style.setProperty("--era", "#" + era.color.toString(16).padStart(6, "0"));
  }

  function openTimeline() {
    renderTimeline();
    timelineModal.classList.remove("hidden");
    closeMobileMenu();
  }
  document.getElementById("btn-timeline").addEventListener("click", openTimeline);
  document.getElementById("btn-timeline-mobile").addEventListener("click", openTimeline);
  function hideTimeline() {
    timelineModal.classList.add("hidden");
    resetCamera();
  }
  document.getElementById("timeline-close").addEventListener("click", hideTimeline);
  timelineModal.addEventListener("click", function (e) {
    if (e.target === timelineModal) hideTimeline();
  });

  // ---------- Simulation panel (3 laws) ----------
  const simPanel = document.getElementById("sim-panel");
  const simCaption = document.getElementById("sim-caption");
  const simTitle = document.getElementById("sim-title");
  const simControls = document.getElementById("sim-controls");
  document.getElementById("sim-close").addEventListener("click", closeSim);

  let sim = null;        // current sim instance
  let simAnim = null;    // its update fn
  let simResize = null;  // window resize handler of the active sim (removed on close)
  let playing = false;

  function openSim(id) {
    const conf = SIMS[id];
    if (!conf) return;
    simTitle.textContent = conf.title;
    simCaption.innerHTML = conf.caption;
    // Play button
    simControls.innerHTML =
      '<button class="sim-btn sim-play" id="sim-play">⏸ Tạm dừng</button>' +
      '<button class="sim-btn" id="sim-reset">↺ Làm lại</button>';
    document.getElementById("sim-play").addEventListener("click", function () {
      playing = !playing;
      this.textContent = playing ? "⏸ Tạm dừng" : "▶ Tiếp tục";
    });
    document.getElementById("sim-reset").addEventListener("click", function () {
      if (sim && sim.reset) { sim.reset(); playing = true; }
    });

    simPanel.classList.remove("hidden");
    playing = true;
    // Lấy canvas HIỆN TẠI (có thể là canvas của renderer lần mở trước)
    buildSim(conf, document.getElementById("sim-canvas"));
  }

  function closeSim() {
    meshes.forEach(clearHoverGlow); // đóng panel → xóa glow còn treo
    simPanel.classList.add("hidden");
    if (sim && sim.dispose) sim.dispose();
    sim = null;
    cancelAnimationFrame(simAnim);
    simAnim = null;
    if (simResize) {
      window.removeEventListener("resize", simResize);
      simResize = null;
    }
    resetCamera();
  }

  // Build a per-simulation scene (own renderer on the small canvas)
  function buildSim(conf, canvas) {
    if (sim && sim.dispose) sim.dispose();

    const W = canvas.clientWidth, H = canvas.clientHeight;
    // preserveDrawingBuffer: giữ buffer để compositor/chụp màn hình đọc được
    // khung hình vừa render (không có nó, canvas dễ đen trên một số môi trường)
    const renderer2 = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer2.setSize(W, H);
    // KHÔNG nhét canvas của renderer VÀO canvas gốc — con của <canvas> là
    // "fallback content", trình duyệt hỗ trợ canvas sẽ ẩn nó → mô phỏng đen.
    // Thay thẳng chính phần tử canvas, giữ id để CSS (#sim-canvas) vẫn áp.
    const newCanvas = renderer2.domElement;
    newCanvas.id = canvas.id;
    canvas.replaceWith(newCanvas);

    const scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0x080b12);
    const cam2 = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    const camDist = conf.camDist || 20;
    cam2.position.set(0, camDist * 0.16, camDist);
    cam2.lookAt(0, 0, 0);

    scene2.add(new THREE.AmbientLight(0xffffff, 0.7));
    const d = new THREE.DirectionalLight(0xffffff, 0.8);
    d.position.set(6, 10, 8);
    scene2.add(d);

    const state = { t: 0, renderer: renderer2, scene: scene2, camera: cam2, canvas: canvas };

    if (conf.type === "contradiction") initContradiction(state);
    else if (conf.type === "quantityQuality") initQuantityQuality(state);
    else if (conf.type === "negation") initNegation(state);
    else if (conf.spec) buildSpecSim(state, conf.spec);

    sim = state;
    window.__mlnSimState = state; // hook kiểm tra/dev: cho phép đọc t và update()

    // Giải phóng WebGL context khi đóng/mở sim khác — trình duyệt giới hạn số
    // context (khoảng 16), không dispose thì mở nhiều lần canvas sẽ đen
    state.dispose = function () { renderer2.dispose(); };

    // start loop (only re-schedules while this sim is still active)
    cancelAnimationFrame(simAnim);
    // tính dt theo thời gian THỰC (giây) — tốc độ mô phỏng không phụ thuộc
    // tần số khung hình (màn 60Hz hay 120Hz+ đều chạy cùng nhịp)
    let lastNow = performance.now();
    function loop(now) {
      if (sim !== state) return;            // stop when another/close replaced it
      const dt = Math.min(0.05, ((now || performance.now()) - lastNow) / 1000);
      lastNow = now || performance.now();
      if (playing && state.update) state.update(dt);
      state.renderer.render(state.scene, state.camera);
      simAnim = requestAnimationFrame(loop);
    }
    simAnim = requestAnimationFrame(loop);

    // resize (thay listener cũ thay vì cộng dồn — tránh rò rỉ khi mở/đóng nhiều lần)
    if (simResize) window.removeEventListener("resize", simResize);
    simResize = function () {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      state.renderer.setSize(w, h);
      state.camera.aspect = w / h;
      state.camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", simResize);
  }

  // ---------- Trợ giúp chung cho các mô phỏng ----------
  // Nhãn chữ (sprite canvas) dùng TRONG khung mô phỏng — chữ to, viền đen rõ
  function simText(text, opts) {
    const o = opts || {};
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    const font = (o.bold ? "800 " : "600 ") + (o.size || 56) + "px 'Be Vietnam Pro','Segoe UI',sans-serif";
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 12;
    ctx.strokeStyle = "rgba(0,0,0,0.85)";
    ctx.shadowColor = "rgba(0,0,0,0.9)";
    ctx.shadowBlur = 14;
    ctx.strokeText(text, 256, 64);
    ctx.fillStyle = o.color || "#ffffff";
    ctx.fillText(text, 256, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.encoding = THREE.sRGBEncoding;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    const k = o.scale || 1;
    sprite.scale.set(5.6 * k, 1.4 * k, 1);
    return sprite;
  }

  // Mũi tên 3D (thân trụ + đầu nón) hướng lên trên, màu color — dùng cho chỉ dẫn
  // (giữ lại cho các sim sau; hiện chưa dùng)
  function simArrow(color, len, from) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 0.45 });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, len, 10), mat);
    shaft.position.y = len / 2;
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.7, 12), mat);
    head.position.y = len + 0.3;
    g.add(shaft); g.add(head);
    if (from) g.position.copy(from);
    return g;
  }

  // Người kéo co đơn giản (đầu + thân + 2 tay), màu color, nghiêng về phía facing
  function simPerson(color, facing) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 0.35 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.46, 1.5, 14), mat);
    body.position.y = 0.75;
    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 18, 18), mat);
    headMesh.position.y = 1.85;
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.3, 10), mat);
    arm.rotation.z = Math.PI / 2 * 0.75;
    arm.position.set(facing * 0.55, 1.25, 0);
    const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.9, 10), mat);
    leg1.position.set(-0.25, -0.35, 0); leg1.rotation.z = facing * 0.35;
    const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.9, 10), mat);
    leg2.position.set(0.25, -0.35, 0); leg2.rotation.z = facing * 0.5;
    g.add(body); g.add(headMesh); g.add(arm); g.add(leg1); g.add(leg2);
    g.rotation.z = -facing * 0.28; // ngả người kéo
    return g;
  }

  // Cập nhật phần chú thích theo giai đoạn (HTML)
  function setSimCaption(html) { simCaption.innerHTML = html; }

  // ================= KHUNG MÔ PHỎNG KHAI BÁO (dùng chung cho mọi node) =================
  // spec: { camDist, parts: [{shape, pos, scale, color, spin, spinAxis, label:{t,p},
  //                            motion:{type,...}, phases:[{at, label, scale, color, hide}]}] }
  // shapes: sphere|box|cone|cyl|torus|ico|octa|ring|line|label|person|plant|seed
  // motions: bob | spin | pulse | orbit {r, speed, phase, y} | flow {a, b, speed, phase, fade}
  function makePart(spec, scene) {
    const col = spec.color != null ? spec.color : 0xffffff;
    let obj;
    if (spec.shape === "label") {
      obj = simText(spec.text, { color: spec.textColor || spec.c || "#ffffff", scale: spec.scale || 1, bold: !!spec.bold, size: spec.size });
    } else if (spec.shape === "person") {
      obj = simPerson(col, spec.facing || 1);
    } else if (spec.shape === "plant") {
      obj = new THREE.Group();
      const pm = new THREE.MeshStandardMaterial({ color: 0x7a5230 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 1.6, 10), pm);
      trunk.position.y = 0.8;
      const leaf = new THREE.MeshStandardMaterial({ color: 0x6bbf59, emissive: 0x6bbf59, emissiveIntensity: 0.15 });
      const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 1), leaf);
      crown.position.y = 2.0;
      const l1 = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.9, 8), leaf);
      l1.position.set(0.5, 1.3, 0); l1.rotation.z = -0.9;
      const l2 = l1.clone(); l2.position.set(-0.5, 1.05, 0.1); l2.rotation.z = 0.9;
      obj.add(trunk); obj.add(crown); obj.add(l1); obj.add(l2);
    } else if (spec.shape === "seed") {
      obj = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 14), new THREE.MeshStandardMaterial({ color: 0xc9a34e, emissive: 0xc9a34e, emissiveIntensity: 0.2 }));
      obj.scale.set(1, 1.3, 1);
    } else if (spec.shape === "arrow") {
      // mũi tên chỉ hướng (nguyên nhân→kết quả, đi lên, chuyển hoá...)
      obj = simArrow(col, spec.len || 2.2);
    } else if (spec.shape === "ring") {
      obj = new THREE.Mesh(new THREE.TorusGeometry(spec.r || 2, spec.tube || 0.09, 10, 48), new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.3, transparent: true, opacity: spec.opacity != null ? spec.opacity : 1 }));
      obj.rotation.x = spec.tiltX != null ? spec.tiltX : Math.PI / 2;
    } else if (spec.shape === "line") {
      const pts = (spec.points || [[-3, 0, 0], [3, 0, 0]]).map(function (p) { return new THREE.Vector3(p[0], p[1], p[2] || 0); });
      obj = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: spec.opacity != null ? spec.opacity : 1 }));
    } else {
      const mat = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: spec.emissive != null ? spec.emissive : 0.3, transparent: spec.opacity != null, opacity: spec.opacity != null ? spec.opacity : 1 });
      if (spec.shape === "box") obj = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), mat);
      else if (spec.shape === "cone") obj = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.7, 16), mat);
      else if (spec.shape === "cyl") obj = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.8, 16), mat);
      else if (spec.shape === "torus") obj = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.4, 12, 36), mat);
      else if (spec.shape === "ico") obj = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 0), mat);
      else if (spec.shape === "octa") obj = new THREE.Mesh(new THREE.OctahedronGeometry(1.0), mat);
      else obj = new THREE.Mesh(new THREE.SphereGeometry(0.95, 24, 24), mat); // sphere mặc định
    }
    if (spec.pos) obj.position.set(spec.pos[0], spec.pos[1], spec.pos[2] || 0);
    if (spec.rotation) obj.rotation.set(spec.rotation[0] || 0, spec.rotation[1] || 0, spec.rotation[2] || 0);
    const sc = spec.scale || 1;
    if (spec.shape === "seed") obj.scale.set(sc, sc * 1.3, sc); else obj.scale.setScalar(sc);
    scene.add(obj);
    if (spec.label) {
      const lbl = simText(spec.label.t, { color: spec.label.c || "#ffffff", scale: spec.label.s || 0.8 });
      lbl.position.set(0, spec.label.p != null ? spec.label.p : 1.9, 0);
      obj.add(lbl);
      if (obj.userData) obj.userData.simLabel = lbl;
    }
    return obj;
  }

  // Áp dụng 1 trạng thái lên vật liệu (đơn hoặc nhóm mesh) — dùng chung
  // cho build/pha/khung hình của mô phỏng khai báo
  function setMat(o, st) {
    const apply = function (m) {
      if (st.color) m.color.copy(st.color);
      if (st.emissive != null && m.emissive) m.emissive.setHex(st.emissive);
      if (st.opacity != null) { m.transparent = true; m.opacity = st.opacity; }
    };
    if (o.material) apply(o.material);
    else if (o.traverse) o.traverse(function (ch) { if (ch.material) apply(ch.material); });
  }

  function buildSpecSim(state, spec) {
    // ---------- dựng các part ----------
    // Các mốc pha của từng part là KEYFRAME: giữa hai mốc, vị trí, tỉ lệ,
    // góc xoay, độ mờ đục, màu sắc và nhãn chữ được NỘI SUY mềm thay vì
    // nhảy đột ngột — cảnh "kể chuyện" chuyển động liên tục.
    const parts = [];
    spec.parts.forEach(function (ps) {
      const obj = makePart(ps, state.scene);
      const it = {
        o: obj, m: ps.motion || null, shape: ps.shape,
        bp: new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z),
        bs: ps.scale || 1,
        baseLabel: ps.label ? ps.label.t : null,
        lbl: obj.userData.simLabel || null,
        lblColor: ps.label ? (ps.label.c || "#ffffff") : "#ffffff",
        lblScale: ps.label ? (ps.label.s || 0.8) : 0.8,
        _txt: ps.label ? ps.label.t : (ps.shape === "label" ? ps.text : null),
        _lblDirty: false
      };
      if (ps.phases) {
        it.keys = ps.phases.slice().sort(function (a, b) { return a.at - b.at; });
        // trạng thái cơ sở (khung 0 ảo nếu keyframe đầu không ở mốc 0)
        let mat = obj.material || null;
        if (!mat && obj.traverse) obj.traverse(function (ch) { if (!mat && ch.material) mat = ch.material; });
        const st0 = {
          at: 0,
          pos: it.bp.toArray(),
          scale: it.bs,
          rot: ps.rotation ? [(ps.rotation[0] || 0), (ps.rotation[1] || 0), (ps.rotation[2] || 0)] : [0, 0, 0],
          opacity: ps.opacity != null ? ps.opacity : (mat && mat.transparent && mat.opacity != null ? mat.opacity : 1),
          color: ps.color != null ? ps.color : (mat && mat.color ? mat.color.getHex() : 0xffffff),
          hide: false, label: it.baseLabel
        };
        if (!it.keys.length || it.keys[0].at > 0.0001) it.keys = [st0].concat(it.keys);
        // chuẩn hoá: keyframe đầu kế thừa trạng thái cơ sở, các keyframe sau
        // kế thừa keyframe trước (kể cả khi keyframe đầu nằm đúng mốc 0)
        for (let i = 0; i < it.keys.length; i++) {
          const prev = i === 0 ? st0 : it.keys[i - 1], k = it.keys[i];
          if (k.pos == null) k.pos = prev.pos;
          if (k.scale == null) k.scale = prev.scale;
          if (k.rot == null) k.rot = prev.rot;
          if (k.opacity == null) k.opacity = prev.opacity;
          if (k.color == null) k.color = prev.color;
          if (k.hide === undefined) k.hide = prev.hide;
          if (k.label === undefined) k.label = prev.label;
        }
        it._colA = new THREE.Color(); it._colB = new THREE.Color();
      }
      if (it.m && it.m.type === "flow") {
        it.m.va = new THREE.Vector3(it.m.a[0], it.m.a[1], it.m.a[2]);
        it.m.vb = new THREE.Vector3(it.m.b[0], it.m.b[1], it.m.b[2]);
      }
      parts.push(it);
    });

    const smooth = function (u) { return u * u * (3 - 2 * u); };

    // nội suy giữa 2 keyframe bao quanh cycle rồi áp lên object
    function keyPose(p, cycle) {
      const ks = p.keys;
      let k0 = ks[0], k1 = ks[ks.length - 1];
      for (let i = ks.length - 1; i >= 0; i--) {
        if (cycle >= ks[i].at) { k0 = ks[i]; k1 = (i + 1 < ks.length) ? ks[i + 1] : ks[i]; break; }
      }
      const span = Math.max(0.0001, k1.at - k0.at);
      const u = (k0 === k1) ? 1 : Math.min(1, Math.max(0, (cycle - k0.at) / span));
      const e = smooth(u);
      const o = p.o;
      o.position.set(
        k0.pos[0] + (k1.pos[0] - k0.pos[0]) * e,
        k0.pos[1] + (k1.pos[1] - k0.pos[1]) * e,
        k0.pos[2] + (k1.pos[2] - k0.pos[2]) * e
      );
      const sc = Math.max(0.001, k0.scale + (k1.scale - k0.scale) * e);
      if (p.shape === "seed") o.scale.set(sc, sc * 1.3, sc); else o.scale.setScalar(sc);
      o.rotation.set(
        k0.rot[0] + (k1.rot[0] - k0.rot[0]) * e,
        k0.rot[1] + (k1.rot[1] - k0.rot[1]) * e,
        k0.rot[2] + (k1.rot[2] - k0.rot[2]) * e
      );
      const op = k0.opacity + (k1.opacity - k0.opacity) * e;
      p._colA.setHex(k0.color); p._colB.setHex(k1.color);
      p._colA.lerp(p._colB, e);
      setMat(o, { opacity: op, color: p._colA, emissive: p._colA });
      o.visible = (u < 0.5 ? !k0.hide : !k1.hide);
      const wantLabel = (u < 0.5) ? k0.label : k1.label;
      if (wantLabel !== p._txt) { p._txt = wantLabel; p._lblDirty = true; }
    }

    // đổi texture nhãn khi chữ thay đổi (tránh vẽ lại mỗi khung hình)
    function refreshLabels() {
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (!p._lblDirty || !p.lbl) continue;
        p._lblDirty = false;
        if (p._txt != null) {
          const ns = simText(p._txt, { color: p.lblColor, scale: p.lblScale });
          if (p.lbl.material.map) p.lbl.material.map.dispose();
          p.lbl.material.map = ns.material.map;
          ns.material.map = null; // chuyển quyền sở hữu texture, tránh dispose kép
          ns.material.dispose();
          p.lbl.material.needsUpdate = true;
        }
      }
    }

    // chuyển động "vật lý" cộng thêm lên tư thế keyframe
    function move(p, t, dt) {
      const m = p.m; if (!m) return;
      const o = p.o, bp = p.bp;
      if (m.type === "bob") o.position.y += Math.sin(t * (m.speed || 1.5) + (m.phase || 0)) * (m.amp || 0.35);
      else if (m.type === "spin") {
        const ax = m.axis || "y", v = (m.speed || 0.8) * dt;
        if (ax === "y") o.rotation.y += v; else if (ax === "x") o.rotation.x += v; else o.rotation.z += v;
      }
      else if (m.type === "pulse") {
        const f = 1 + Math.sin(t * (m.speed || 2) + (m.phase || 0)) * (m.amp || 0.18);
        o.scale.multiplyScalar(f);
      }
      else if (m.type === "orbit") {
        const a = t * (m.speed || 0.6) + (m.phase || 0);
        o.position.set(bp.x + Math.cos(a) * m.r, bp.y + Math.sin(a * (m.wob || 1)) * (m.y || 0), bp.z + Math.sin(a) * m.r);
      }
      else if (m.type === "flow") {
        const pr = (t * (m.speed || 0.18) + (m.phase || 0)) % 1;
        o.position.lerpVectors(m.va, m.vb, pr);
        if (o.material && m.fade !== false) o.material.opacity = Math.sin(pr * Math.PI);
      }
    }

    state.state = { t: 0, phase: -1 };
    state.reset = function () { state.state.t = 0; state.state.phase = -1; };
    // hook kiểm tra/dev: cho phép nhảy tới từng mốc pha
    state.debug = { type: "spec", period: spec.period || 14, at: (spec.phases || []).map(function (p) { return p.at; }) };

    // pha sắp xếp giảm dần theo mốc "at" để vòng lặp tìm pha khớp mốc đầu tiên
    const phasesSorted = (spec.phases || []).slice().sort(function (a, b) { return b.at - a.at; });

    state.update = function (dt) {
      const st = state.state;
      st.t += dt;
      const period = spec.period || 14;
      const cycle = (st.t % period) / period;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (p.keys) keyPose(p, cycle);
        move(p, st.t, dt);
      }
      refreshLabels();
      // xác định pha hiện tại theo mốc cycle
      let idx = -1;
      for (let i = 0; i < phasesSorted.length; i++) { if (cycle >= phasesSorted[i].at) { idx = i; break; } }
      if (idx >= 0 && idx !== st.phase) { st.phase = idx; setSimCaption(phasesSorted[idx].caption); }
    };
  }

  // ================= SIM 1: MÂU THUẪN — hai đội kéo co =================
  function initContradiction(s) {
    // Hai "mặt đối lập" cụ thể hoá bằng 2 đội kéo co:
    // cùng nắm chung 1 sợi dây (thống nhất) nhưng kéo ngược chiều (đấu tranh)
    const RED = 0xe0222b, GOLD = 0xe8b54d;

    // nền đất
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(20, 0.3, 6),
      new THREE.MeshStandardMaterial({ color: 0x1d2433 })
    );
    ground.position.y = -2.6;
    s.scene.add(ground);
    // vạch giữa sân
    const midLine = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.34, 6),
      new THREE.MeshStandardMaterial({ color: 0xf2ede2, emissive: 0xf2ede2, emissiveIntensity: 0.4 })
    );
    midLine.position.y = -2.6;
    s.scene.add(midLine);

    // đội đỏ (bên trái, 2 người) và đội vàng (bên phải, 2 người)
    const teamA = new THREE.Group();
    const a1 = simPerson(RED, 1); a1.position.set(-0.9, -2.45, -0.9);
    const a2 = simPerson(RED, 1); a2.position.set(-2.4, -2.45, 0.9);
    teamA.add(a1); teamA.add(a2);
    const teamB = new THREE.Group();
    const b1 = simPerson(GOLD, -1); b1.position.set(0.9, -2.45, -0.9);
    const b2 = simPerson(GOLD, -1); b2.position.set(2.4, -2.45, 0.9);
    teamB.add(b1); teamB.add(b2);
    s.scene.add(teamA); s.scene.add(teamB);

    // dây thừng nối 2 đội (điểm giữa gắn cờ đỏ — cờ qua vạch = thắng 1 hiệp)
    const rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 1, 8),
      new THREE.MeshStandardMaterial({ color: 0xc9b58a })
    );
    rope.rotation.z = Math.PI / 2;
    s.scene.add(rope);
    const flagPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8),
      new THREE.MeshStandardMaterial({ color: 0xf2ede2 })
    );
    const flagCloth = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.42, 0.04),
      new THREE.MeshStandardMaterial({ color: 0xe0222b, emissive: 0xe0222b, emissiveIntensity: 0.5 })
    );
    flagCloth.position.set(0.35, 0.34, 0);
    flagPole.add(flagCloth);
    s.scene.add(flagPole);

    // quầng sáng "thống nhất": 2 mặt cùng chung 1 chỉnh thể (sợi dây)
    const unityGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 })
    );
    s.scene.add(unityGlow);

    // nhãn
    const lblA = simText("Mặt đối lập A", { color: "#ff5b63", scale: 0.8 });
    lblA.position.set(-2.6, 0.6, 0);
    const lblB = simText("Mặt đối lập B", { color: "#ffd77a", scale: 0.8 });
    lblB.position.set(2.6, 0.6, 0);
    const lblUnity = simText("Cùng chung một chỉnh thể", { color: "#ffffff", scale: 0.7 });
    lblUnity.position.set(0, 2.9, 0);
    s.scene.add(lblA); s.scene.add(lblB); s.scene.add(lblUnity);

    const phases = [
      "<b>Thống nhất:</b> hai mặt đối lập cùng tồn tại trong <b>một chỉnh thể</b> — cùng nắm chung sợi dây, nương tựa và quy định lẫn nhau.",
      "<b>Đấu tranh:</b> hai mặt tác động, bài trừ, kéo ngược chiều nhau — cờ đỏ dao động quanh vạch giữa.",
      "<b>Chuyển hóa:</b> đấu tranh lên đến đỉnh điểm → thế cân bằng bị phá vỡ, chỉnh thể chuyển sang <b>trạng thái mới</b>. Rồi mâu thuẫn mới lại bắt đầu."
    ];
    s.state = { t: 0, teamA: teamA, teamB: teamB, rope: rope, flag: flagPole, glow: unityGlow, phase: -1, phases: phases };
    s.reset = function () { s.state.t = 0; s.state.phase = -1; };

    s.update = function (dt) {
      const st = s.state;
      st.t += dt; // thời gian thực (giây)
      // chu kỳ 12 giây: thống nhất → đấu tranh tăng dần → đỉnh điểm → chuyển hóa
      const cycle = (st.t % 12) / 12;
      // độ "lợi thế" dao động, biên độ lớn dần về cuối chu kỳ
      const intensity = Math.min(1, cycle * 1.6);
      const swing = Math.sin(st.t * 2.2) * (0.4 + intensity * 2.2);
      // đỉnh điểm: cờ vượt hẳn về 1 bên
      const climax = cycle > 0.78 ? (cycle - 0.78) / 0.22 : 0;
      const flagX = swing + climax * 3.2 * (Math.sin(st.t * 2.2) >= 0 ? 1 : -1);

      // dây căng giữa 2 đội, điểm giữa theo cờ
      st.teamA.position.x = -3.2 - Math.max(0, -flagX) * 0.25;
      st.teamB.position.x = 3.2 + Math.max(0, flagX) * 0.25;
      // dây căng ngang nối 2 tay kéo (trục dọc của trụ = scale.y, xoay 90° sang ngang)
      const ax = st.teamA.position.x + 1.3, bx = st.teamB.position.x - 1.3;
      st.rope.scale.set(1, Math.max(0.5, bx - ax), 1);
      st.rope.rotation.set(0, 0, Math.PI / 2);
      st.rope.position.set((ax + bx) / 2, -1.1, 0);
      st.flag.position.set(flagX, -1.1, 0);
      st.glow.position.set(flagX, -1.1, 0);
      st.glow.material.opacity = 0.08 + 0.1 * (1 - intensity);
      // 2 đội gồng người theo nhịp kéo
      st.teamA.rotation.z = Math.sin(st.t * 2.2) * 0.06 * intensity;
      st.teamB.rotation.z = Math.sin(st.t * 2.2 + Math.PI) * 0.06 * intensity;

      // chú thích theo giai đoạn
      const phaseIdx = cycle < 0.3 ? 0 : (cycle < 0.78 ? 1 : 2);
      if (phaseIdx !== st.phase) {
        st.phase = phaseIdx;
        setSimCaption(st.phases[phaseIdx]);
      }
    };
  }

  // ================= SIM 2: LƯỢNG – CHẤT — đun nước đổi trạng thái =================
  function initQuantityQuality(s) {
    // Thí nghiệm đun nước kinh điển: nhiệt độ (LƯỢNG) tăng dần →
    // vượt điểm nút 0°C / 100°C thì xảy ra BƯỚC NHẢY: RẮN → LỎNG → KHÍ (CHẤT đổi)
    const ICE = 0x9fd8f5, WATER = 0x2f7fd6, STEAM = 0xe8ecf2;

    // bếp + ngọn lửa
    const stove = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.6, 3.2),
      new THREE.MeshStandardMaterial({ color: 0x2b3242 })
    );
    stove.position.set(-1.5, -3.3, 0);
    s.scene.add(stove);
    const flames = [];
    for (let i = 0; i < 3; i++) {
      const f = new THREE.Mesh(
        new THREE.ConeGeometry(0.35, 0.9, 10),
        new THREE.MeshStandardMaterial({ color: 0xff8c2e, emissive: 0xff5e1a, emissiveIntensity: 0.9 })
      );
      f.position.set(-2.6 + i * 1.1, -2.5, 0);
      s.scene.add(f);
      flames.push(f);
    }

    // bình chứa (thành kính trong suốt)
    const potWall = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 4, 2.6),
      new THREE.MeshStandardMaterial({ color: 0xbcd4e6, transparent: true, opacity: 0.12, side: THREE.DoubleSide })
    );
    potWall.position.set(-1.5, -0.7, 0);
    s.scene.add(potWall);
    const potEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(4.2, 4, 2.6)),
      new THREE.LineBasicMaterial({ color: 0x9db8cc })
    );
    potEdge.position.copy(potWall.position);
    s.scene.add(potEdge);

    // khối nước (đổi hình dạng + màu theo trạng thái)
    const water = new THREE.Mesh(
      new THREE.BoxGeometry(3.9, 2.2, 2.3),
      new THREE.MeshStandardMaterial({ color: ICE, emissive: ICE, emissiveIntensity: 0.25, transparent: true, opacity: 0.92 })
    );
    water.position.set(-1.5, -1.5, 0);
    s.scene.add(water);

    // hạt phân tử (24 hạt) — rắn: xếp hàng; lỏng: trượt; khí: bay loạn
    const molecules = [];
    for (let i = 0; i < 24; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5 })
      );
      const ix = i % 4, iy = Math.floor(i / 4) % 3, iz = Math.floor(i / 12);
      m.userData.grid = new THREE.Vector3(ix, iy, iz);
      m.userData.rand = new THREE.Vector3((i * 37) % 10, (i * 53) % 10, (i * 71) % 10);
      s.scene.add(m);
      molecules.push(m);
    }

    // hơi nước bay lên (8 hạt khí)
    const steams = [];
    for (let i = 0; i < 8; i++) {
      const st = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 12, 12),
        new THREE.MeshStandardMaterial({ color: STEAM, emissive: STEAM, emissiveIntensity: 0.3, transparent: true, opacity: 0 })
      );
      st.userData.phase = i / 8;
      s.scene.add(st);
      steams.push(st);
    }

    // nhiệt kế bên phải
    const thX = 5.2;
    const thTube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 6.4, 12),
      new THREE.MeshStandardMaterial({ color: 0x9db8cc, transparent: true, opacity: 0.35 })
    );
    thTube.position.set(thX, 0.2, 0);
    s.scene.add(thTube);
    const thBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xe0222b, emissive: 0xe0222b, emissiveIntensity: 0.5 })
    );
    thBulb.position.set(thX, -3.2, 0);
    s.scene.add(thBulb);
    const mercury = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 1, 10),
      new THREE.MeshStandardMaterial({ color: 0xe0222b, emissive: 0xe0222b, emissiveIntensity: 0.6 })
    );
    mercury.position.set(thX, -3.2, 0);
    s.scene.add(mercury);
    // vạch điểm nút
    function mark(y, txt, color) {
      const mk = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.06, 0.06), new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 0.6 }));
      mk.position.set(thX + 0.85, y, 0);
      s.scene.add(mk);
      const lb = simText(txt, { color: "#" + color.toString(16).padStart(6, "0"), scale: 0.62 });
      lb.position.set(thX + 2.9, y, 0);
      s.scene.add(lb);
    }
    mark(-2.1, "0°C · điểm nút", 0x7ec8f0);
    mark(0.9, "100°C · điểm nút", 0xff8c2e);

    // nhãn trạng thái
    const lblQ = simText("LƯỢNG (nhiệt độ)", { color: "#ffd77a", scale: 0.7 });
    lblQ.position.set(thX, 3.9, 0);
    const lblState = simText("RẮN", { color: "#bfe9ff", scale: 0.85 });
    lblState.position.set(-1.5, 3.3, 0);
    s.scene.add(lblQ); s.scene.add(lblState);

    const phases = [
      "<b>Lượng đổi, chất chưa đổi:</b> nhiệt độ tăng dần nhưng nước vẫn ở thể <b>rắn</b> — các phân tử xếp hàng ngay ngắn.",
      "<b>Bước nhảy 0°C:</b> lượng tích lũy vượt điểm nút → <b>chất đổi</b>: băng tan thành <b>nước lỏng</b>, các phân tử bắt đầu trượt lên nhau.",
      "<b>Bước nhảy 100°C:</b> lượng tiếp tục đổi vượt điểm nút → <b>chất đổi</b>: nước sôi hóa <b>hơi</b>, phân tử bay tự do. Chất mới mở ra cách biến đổi lượng mới."
    ];
    s.state = { t: 0, water: water, molecules: molecules, steams: steams, flames: flames, mercury: mercury, lblState: lblState, phase: -1, phases: phases };
    s.reset = function () { s.state.t = 0; s.state.phase = -1; };

    s.update = function (dt) {
      const st = s.state;
      st.t += dt / 26; // hết một vòng trong 26 giây
      const cycle = st.t % 1; // 0-0.4 rắn→tan; 0.4-0.75 lỏng→sôi; 0.75-1 khí
      // đồng hồ "nhanh" riêng cho các hiệu ứng trang trí (lửa nhấp nháy,
      // phân tử dao động...) — không bị chậm theo chu kỳ pha
      st.ft = (st.ft || 0) + dt;
      const T = cycle * 130; // "nhiệt độ" biểu kiến -10..120
      const melt = Math.min(1, Math.max(0, (cycle - 0.25) / 0.2));   // tiến độ tan
      const boil = Math.min(1, Math.max(0, (cycle - 0.6) / 0.2));    // tiến độ sôi

      // ngọn lửa bập bùng
      st.flames.forEach(function (f, i) {
        f.scale.y = 0.8 + Math.sin(st.ft * 9 + i * 2) * 0.25;
        f.rotation.y += 0.1;
      });

      // khối nước: rắn gọn vuông → lỏng thấp loang → khí biến mất
      const solidH = 2.2 * (1 - melt * 0.55);
      const liqH = Math.max(0.05, (2.2 * 0.55 + melt * 2.2 * 0.45) * (1 - boil));
      if (cycle < 0.45) {
        st.water.geometry.dispose();
        st.water.geometry = new THREE.BoxGeometry(3.9, solidH, 2.3);
        st.water.position.y = -2.7 + solidH / 2;
        st.water.material.color.setHex(ICE);
        st.water.material.emissive.setHex(ICE);
      } else {
        st.water.geometry.dispose();
        st.water.geometry = new THREE.BoxGeometry(3.9, Math.max(0.08, liqH * (1 + Math.sin(st.ft * 3) * 0.04)), 2.3);
        st.water.position.y = -2.7 + Math.max(0.08, liqH) / 2;
        st.water.material.color.setHex(WATER);
        st.water.material.emissive.setHex(WATER);
        st.water.material.opacity = 0.92 - boil * 0.55;
      }

      // phân tử: rắn = mạng tinh thể, lỏng = trượt, khí = bay lên
      st.molecules.forEach(function (m, i) {
        const g = m.userData.grid, r = m.userData.rand;
        if (cycle < 0.35) {
          m.position.set(-2.9 + g.x * 0.95, -2.2 + g.y * 0.8, -0.6 + g.z * 1.1);
        } else if (cycle < 0.7) {
          const j = Math.min(1, (cycle - 0.35) / 0.15);
          m.position.set(
            -2.9 + g.x * 0.95 + Math.sin(st.ft * 3 + r.x) * 0.5 * j,
            -2.2 + g.y * 0.8 + Math.cos(st.ft * 2.6 + r.y) * 0.4 * j - j * 0.6,
            -0.6 + g.z * 1.1 + Math.sin(st.ft * 2.2 + r.z) * 0.4 * j
          );
        } else {
          const k = Math.min(1, (cycle - 0.7) / 0.2);
          m.position.set(
            -2.9 + g.x * 0.95 + Math.sin(st.ft * 4 + r.x) * 1.6 * k,
            -2 + ((r.y * 37 % 10) / 10) * 4.5 * k + Math.sin(st.ft * 5 + r.y) * 0.6 * k,
            -0.6 + g.z * 1.1 + Math.cos(st.ft * 3.5 + r.z) * 1.2 * k
          );
        }
      });

      // hơi bốc lên khi sôi
      st.steams.forEach(function (p, i) {
        const pr = (st.ft * 0.25 + p.userData.phase) % 1;
        const vis = boil > 0.15 ? Math.sin(pr * Math.PI) : 0;
        p.material.opacity = vis * 0.75;
        p.position.set(-3.2 + (i % 4) * 1.1 + Math.sin(st.ft * 2 + i) * 0.35, 1.4 + pr * 3.4, (i > 3 ? 0.5 : -0.5));
      });

      // nhiệt kế + nhãn
      const mercH = 0.6 + (T + 10) / 130 * 5.4;
      st.mercury.scale.y = mercH;
      st.mercury.position.y = -3.2 + mercH / 2;
      const stateTxt = cycle < 0.4 ? "RẮN" : (cycle < 0.75 ? "LỎNG" : "KHÍ");
      const stateCol = cycle < 0.4 ? "#bfe9ff" : (cycle < 0.75 ? "#7db8ff" : "#ffffff");
      if (st.lblState.userData.txt !== stateTxt) {
        st.lblState.userData.txt = stateTxt;
        st.lblState.material.map.dispose();
        const nx = simText(stateTxt, { color: stateCol, scale: 0.85 });
        st.lblState.material.map = nx.material.map;
        nx.material.map = null; // chuyển quyền sở hữu texture, tránh bị dispose kép
        nx.material.dispose();
        st.lblState.material.needsUpdate = true;
      }

      const phaseIdx = cycle < 0.4 ? 0 : (cycle < 0.75 ? 1 : 2);
      if (phaseIdx !== st.phase) {
        st.phase = phaseIdx;
        setSimCaption(st.phases[phaseIdx]);
      }
    };
  }

  // ================= SIM 3: PHỦ ĐỊNH CỦA PHỦ ĐỊNH — hạt → cây → nhiều hạt =================
  function initNegation(s) {
    // Ví dụ kinh điển của Ăngghen: hạt đại mạch bị phủ định thành cây,
    // cây bị phủ định → nhiều hạt mới hơn, ở TRÌNH ĐỘ CAO HƠN → đường xoáy ốc đi lên
    const SEED = 0xc98a2b, LEAF = 0x3f8e6a;

    // đường xoáy ốc đi lên (cao hơn = trình độ cao hơn)
    const spiral = [];
    const N = 60;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const ang = t * Math.PI * 2.6;
      const dMat = new THREE.MeshStandardMaterial({
        color: 0xe8b54d, emissive: 0xe8b54d, emissiveIntensity: 0.3,
        transparent: true, opacity: 0.55
      });
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), dMat);
      d.position.set(Math.cos(ang) * 3.4, -3.4 + t * 7.6, Math.sin(ang) * 2.2);
      s.scene.add(d);
      spiral.push(d);
    }

    // chặng 1: hạt giống (gốc xoáy)
    const seed = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 20, 20),
      new THREE.MeshStandardMaterial({ color: SEED, emissive: 0x6b4a15, emissiveIntensity: 0.4 })
    );
    seed.scale.set(1, 1.3, 1);
    seed.position.copy(spiral[0].position);
    s.scene.add(seed);
    const lblSeed = simText("KHẲNG ĐỊNH: hạt giống", { color: "#ffd77a", scale: 0.72 });
    lblSeed.position.set(-4.6, -3.4, 0);
    s.scene.add(lblSeed);

    // chặng 2: cây lớn lên giữa vòng xoáy
    const plant = new THREE.Group();
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.3, 3.2, 12),
      new THREE.MeshStandardMaterial({ color: 0x6b4a15 })
    );
    trunk.position.y = 1.6;
    const crown = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshStandardMaterial({ color: LEAF, emissive: 0x2d6a4f, emissiveIntensity: 0.45 })
    );
    crown.position.y = 3.9;
    const leafL = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.4, 8), crown.material);
    leafL.position.set(-0.9, 2.4, 0); leafL.rotation.z = 0.9;
    const leafR = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.4, 8), crown.material);
    leafR.position.set(0.9, 2.8, 0); leafR.rotation.z = -0.9;
    plant.add(trunk); plant.add(crown); plant.add(leafL); plant.add(leafR);
    plant.position.set(0, 0.4, 0);
    plant.scale.set(0.05, 0.05, 0.05);
    s.scene.add(plant);
    const lblPlant = simText("PHỦ ĐỊNH 1: cây (phủ định hạt)", { color: "#7ddb9f", scale: 0.72 });
    lblPlant.position.set(4.9, 0.4, 0);
    s.scene.add(lblPlant);

    // chặng 3: nhiều hạt mới trên đỉnh xoáy (toả chùm)
    const newSeeds = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const ns = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 14, 14),
        new THREE.MeshStandardMaterial({ color: SEED, emissive: 0x6b4a15, emissiveIntensity: 0.4 })
      );
      ns.scale.set(1, 1.3, 1);
      const a = (i / 7) * Math.PI * 2;
      ns.position.set(Math.cos(a) * (i === 0 ? 0 : 1.05), (i === 0 ? 0 : 0.35) + (i % 2) * 0.5, Math.sin(a) * (i === 0 ? 0 : 0.8));
      newSeeds.add(ns);
    }
    const top = spiral[spiral.length - 1].position;
    newSeeds.position.set(top.x, top.y + 0.4, top.z);
    newSeeds.scale.set(0.05, 0.05, 0.05);
    s.scene.add(newSeeds);
    const lblNew = simText("PHỦ ĐỊNH 2: hạt mới, nhiều hơn", { color: "#ffd77a", scale: 0.72 });
    lblNew.position.set(-4.6, 4.9, 0);
    s.scene.add(lblNew);
    const lblUp = simText("Trình độ cao hơn ↟", { color: "#ffffff", scale: 0.66 });
    lblUp.position.set(0, 6.3, 0);
    s.scene.add(lblUp);

    const phases = [
      "<b>Khẳng định:</b> hạt giống tồn tại ở trạng thái ban đầu (đáy đường xoáy).",
      "<b>Phủ định lần 1:</b> hạt bị phủ định — nảy mầm thành <b>cây</b>. Cái cũ mất đi, cái mới ra đời nhưng kế thừa vật chất của cái cũ.",
      "<b>Phủ định lần 2 (phủ định của phủ định):</b> cây ra hoa kết <b>nhiều hạt mới</b> — trở lại hình thức ban đầu nhưng <b>số lượng nhiều hơn, chất lượng cao hơn</b>, ở đỉnh đường xoáy. Phát triển đi lên theo đường xoáy ốc, không theo vòng tròn khép kín."
    ];
    s.state = { t: 0, spiral: spiral, seed: seed, plant: plant, newSeeds: newSeeds, phase: -1, phases: phases };
    s.reset = function () { s.state.t = 0; s.state.phase = -1; };

    s.update = function (dt) {
      const st = s.state;
      st.t += dt / 16; // hết một vòng trong 16 giây
      const cycle = st.t % 1;

      // cây lớn lên ở chặng giữa, giữ nguyên khi kết thúc
      const grow = Math.min(1, Math.max(0, (cycle - 0.12) / 0.3));
      const ease = grow * grow * (3 - 2 * grow);
      st.plant.scale.setScalar(0.05 + ease * 0.95);
      st.plant.rotation.y = ease * 0.6;
      // cây ra hạt ở chặng cuối
      const seedGrow = Math.min(1, Math.max(0, (cycle - 0.55) / 0.3));
      const ease2 = seedGrow * seedGrow * (3 - 2 * seedGrow);
      st.newSeeds.scale.setScalar(0.05 + ease2 * 0.95);
      st.newSeeds.rotation.y += 0.01;

      // xung sáng chạy dọc đường xoáy theo tiến trình câu chuyện
      const head = cycle * st.spiral.length;
      st.spiral.forEach(function (d, i) {
        const ahead = i - head;
        const on = ahead > -7 && ahead < 1;
        d.material.emissiveIntensity = on ? 1.4 : 0.3;
        d.material.opacity = on ? 1 : 0.55;
      });
      st.seed.scale.set(cycle < 0.25 ? 1 : Math.max(0.25, 1 - (cycle - 0.25) * 2), 1.3, 1);

      const phaseIdx = cycle < 0.18 ? 0 : (cycle < 0.55 ? 1 : 2);
      if (phaseIdx !== st.phase) {
        st.phase = phaseIdx;
        setSimCaption(st.phases[phaseIdx]);
      }
    };
  }

  // ---------- Keyboard & help ----------
  const help = document.getElementById("help");
  document.getElementById("help-close").addEventListener("click", function () { help.classList.add("hidden"); });
  document.getElementById("help-done").addEventListener("click", function () { help.classList.add("hidden"); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "h" || e.key === "H") help.classList.toggle("hidden");
    if (e.key === "Escape") {
      help.classList.add("hidden");
      // Chỉ kéo camera về trung tâm nếu thật sự đang xem cái gì đó — tránh "giật" cảnh khi nhấn Esc vu vơ
      const somethingOpen =
        !infoPanel.classList.contains("hidden") ||
        !simPanel.classList.contains("hidden") ||
        !timelineModal.classList.contains("hidden");
      if (somethingOpen) {
        hideInfo();
        closeSim();
        hideTimeline();
      }
    }
  });

  // Show the right interaction hints per device (touch vs mouse)
  const isTouch = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
  document.querySelectorAll("#help-list li[data-kind]").forEach(function (li) {
    li.style.display = (isTouch && li.dataset.kind === "touch") || (!isTouch && li.dataset.kind === "mouse")
      ? ""
      : "none";
  });
  if (isTouch) {
    // hide keyboard hints entirely on touch devices
    var kbd = document.querySelectorAll("#footer kbd, #footer .hint");
    kbd.forEach(function (el) { el.style.display = "none"; });
  }

  // Open help on first load after a short delay
  setTimeout(function () { help.classList.remove("hidden"); }, 1400);

  // ---------- Events ----------
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointerup", onPointerUp);
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  // Rời canvas phải xóa hẳn glow hover, nếu không nó "đóng băng" trên node cuối
  renderer.domElement.addEventListener("pointerleave", function () {
    meshes.forEach(clearHoverGlow);
  });

  // ---------- Main loop ----------
  let frameCount = 0;
  function animate() {
    requestAnimationFrame(animate);
    frameCount++;

    // Hide loader once we've drawn enough frames to know the scene is live
    if (frameCount === 3) onRenderReady();

    // fly-to animation
    if (flyTarget) {
      flyT += 16 / FLY_DURATION;
      const ease = easeInOutCubic(Math.min(flyT, 1));
      camera.position.lerpVectors(flyStart, flyTarget, ease);
      controls.target.lerpVectors(flyStartTarget, flyTargetLook, ease);
      controls.update();
      if (flyT >= 1) {
        // ép đúng điểm cuối — tránh damping của OrbitControls kéo lệch điểm đích
        camera.position.copy(flyTarget);
        controls.target.copy(flyTargetLook);
        flyTarget = null;
      }
    } else {
      controls.update();
    }

    // core rotation
    coreRing.rotation.z += 0.004;
    coreRing2.rotation.y += 0.004;
    coreSphere.rotation.y += 0.002;

    // orbiters
    orbiterLights.forEach(function (o) {
      o.userData.angle += o.userData.speed;
      o.position.x = Math.cos(o.userData.angle) * o.userData.radius;
      o.position.z = Math.sin(o.userData.angle) * o.userData.radius;
    });

    // node gentle bob + rotation + hover glow follows node
    meshes.forEach(function (m, i) {
      const t = Date.now() * 0.001;
      m.rotation.x = Math.sin(t * 0.4 + i) * 0.05;
      m.rotation.y = t * 0.04 + i * 0.01;   // much slower self-rotation
      // model-specific internal motion (chuyển động riêng của từng hình thù)
      const tNow = Date.now() * 0.001;
      m.traverse(function (child) {
        if (child.userData.electronRing) {                       // electron quanh mạng vật chất
          child.userData.orbit += 0.02;
          const a = child.userData.orbit;
          const r = child.userData.ringR;
          const p = new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
          p.applyEuler(new THREE.Euler(child.userData.ringTilt, 0, 0));
          child.position.copy(p);
        }
        if (child.userData.isFlame) {                            // ngọn lửa ý thức lay động
          child.scale.y = 1 + Math.sin(tNow * 4.2 + child.position.y) * 0.09;
        }
        if (child.userData.isGear) child.rotation.z += 0.02;      // bánh răng quay
        if (child.userData.isEssence) {                           // nhân phát sáng nhấp nháy
          child.rotation.y += 0.015;
          if (child.material && child.material.emissiveIntensity !== undefined) {
            child.material.emissiveIntensity = 0.9 + Math.sin(tNow * 3 + child.id * 0.7) * 0.3;
          }
        }
        if (child.userData.isPhenomenon) child.rotation.y -= 0.01; // lớp hiện tượng xoay ngược
        if (child.userData.isContent) {                            // nội dung phập phồng trong khung
          const s = 1 + Math.sin(tNow * 2.2) * 0.08;
          child.scale.set(s, s, s);
        }
        if (child.userData.possibilityTravel) {                    // chấm sáng khả năng → hiện thực
          const p = (tNow * 0.35) % 1.3;
          child.position.x = -3.6 * 0.95 + p * (3.6 * 1.9);
          child.material.opacity = p > 1 ? 1 - (p - 1) / 0.3 : 1;
        }
        if (child.userData.isHot) {                                // mặt đối lập "nóng" nhấp nháy
          if (child.material && child.material.emissiveIntensity !== undefined) {
            child.material.emissiveIntensity = 0.75 + Math.sin(tNow * 5) * 0.35;
          }
        }
        if (child.userData.isFill) {                               // cột lượng dâng lên rồi hạ xuống
          const p = (tNow * 0.22) % 1;
          const h = 0.3 + p * 6.9;
          child.scale.y = h;
          child.position.y = child.userData.baseY + h / 2;
        }
        if (child.userData.isThreshold) {                          // vòng chất bùng sáng khi lượng chạm ngưỡng
          const p = (tNow * 0.22) % 1;
          const near = Math.max(0, 1 - Math.abs(p - 0.92) / 0.12);
          child.material.emissiveIntensity = 0.4 + near * 1.4;
          const s = 1 + near * 0.12;
          child.scale.set(s, s, s);
        }
        if (child.userData.negLayer) {                             // lớp phủ định nở ra kế tiếp nhau
          const idx = child.userData.negIdx;
          const p = Math.max(0, Math.min(1, ((tNow * 0.18) - idx * 0.22 + 10) % 1.4 / 0.5));
          const s = 0.85 + p * 0.2;
          child.scale.set(s, s, s);
          child.rotation.y += 0.004 * (idx + 1);
        }
        if (child.userData.isIris) {                               // con mắt liếc qua lại
          child.position.x = Math.sin(tNow * 1.4) * 0.7;
        }
        if (child.userData.isClash) {                              // hai giai cấp áp sát nhau rồi lùi ra
          const baseX = child.position.x > 0 ? 1 : -1;
          child.position.x = baseX * (3.6 * 1.0 - Math.abs(Math.sin(tNow * 1.6)) * 0.55);
        }
        if (child.userData.isFlash) {                              // tia lửa giữa hai khối
          child.material.emissiveIntensity = 0.6 + Math.abs(Math.sin(tNow * 1.6)) * 1.6;
          const s = 0.7 + Math.abs(Math.sin(tNow * 1.6)) * 0.6;
          child.scale.set(s, s, s);
          child.rotation.y += 0.05;
        }
      });
      if (m.userData.hoverGlow) {
        m.userData.hoverGlow.position.copy(m.position);
        m.userData.hoverGlow.material.opacity = 0.5 + Math.sin(t * 3 + i) * 0.2;
      }
      if (m.userData.ambientGlow) {
        m.userData.ambientGlow.position.copy(m.position);
        m.userData.ambientGlow.material.opacity = 0.32 + Math.sin(t * 1.6 + i) * 0.12;
      }

      // Fade label based on distance and screen-edge visibility
      const lbl = m.userData.label;
      if (lbl) {
        const worldPos = new THREE.Vector3();
        lbl.getWorldPosition(worldPos);
        const dist = camera.position.distanceTo(worldPos);
        // fade far labels so the front ones stay readable
        let alpha = THREE.MathUtils.clamp(1 - (dist - 55) / 45, 0, 1);
        // fade labels near screen edge
        const screenPos = worldPos.clone().project(camera);
        const edgeFade = THREE.MathUtils.clamp(1 - Math.max(Math.abs(screenPos.x), Math.abs(screenPos.y)) * 0.9, 0, 1);
        alpha *= edgeFade;
        lbl.material.opacity = alpha;
      }
    });
    labels.forEach(function (l) { l.material.rotation = 0; });

    // floating golden dust: gentle rotation as a whole cloud
    dust.rotation.y += 0.00035;
    dust.rotation.x = Math.sin(Date.now() * 0.0001) * 0.03;

    // lấp lánh sao: xoay sprite điểm ảnh chậm → các sao "nháy" đổi độ sáng;
    // tinh vân trôi cực chậm cho cảm giác không gian sống
    twinkleMat.map.rotation += 0.0009;
    for (let ni = 0; ni < nebSprites.length; ni++) {
      nebSprites[ni].material.rotation += nebulae[ni].rot;
    }

    // update click bursts (particles + shockwaves)
    for (let k = bursts.length - 1; k >= 0; k--) {
      const b = bursts[k];
      b.life += 0.028;
      const scale = 1 / (1 + b.life * 1.8);
      const attr = b.pts.geometry.getAttribute("position");
      for (let i = 0; i < attr.count; i++) {
        attr.array[i * 3] += b.vel[i * 3] * 0.05;
        attr.array[i * 3 + 1] += b.vel[i * 3 + 1] * 0.05;
        attr.array[i * 3 + 2] += b.vel[i * 3 + 2] * 0.05;
        b.vel[i * 3 + 1] -= 0.012; // gravity bob
      }
      attr.needsUpdate = true;
      b.pts.material.opacity = Math.max(0, 1 - b.life);
      const s = scale * 2.2;
      b.pts.scale.setScalar(s); // thu nhỏ quanh TÂM điểm nổ (tọa độ tuyệt đối)
      b.pts.position.copy(b.origin).multiplyScalar(1 - s);
      if (b.life >= b.maxLife) {
        scene.remove(b.pts);
        b.pts.geometry.dispose();
        b.pts.material.dispose();
        bursts.splice(k, 1);
      }
    }
    for (let s = shockwaves.length - 1; s >= 0; s--) {
      const r = shockwaves[s];
      r.life += 0.05;
      r.mesh.scale.setScalar(1 + r.life * 7);
      r.mesh.material.opacity = Math.max(0, 0.85 - r.life * 1.2);
      if (r.life >= 1) {
        scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
        shockwaves.splice(s, 1);
      }
    }

    // pulsing glow on core
    const pulse = 1 + Math.sin(Date.now() * 0.002) * 0.14;
    coreRing.material.emissiveIntensity = 0.7 + Math.sin(Date.now() * 0.003) * 0.3;

    renderer.render(scene, camera);
  }

  function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  // ---------- Resize ----------
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---------- Loader (handled by inline script; just signal readiness) ----------
  function hideLoader() {
    // Prefer the global exposed by the inline <script> in index.html
    if (typeof window.__hideLoader === "function") { window.__hideLoader(); return; }
    document.dispatchEvent(new CustomEvent("mln-ready"));
    // last-resort DOM fallback
    var l = document.getElementById("loader");
    if (l) l.classList.add("gone");
  }
  function onRenderReady() { hideLoader(); }

  // lộ scene cho công cụ kiểm tra/dev (vô hại với người dùng)
  window.__mlnScene = scene;
  window.__mlnCamera = camera;
  window.__mlnControls = controls;
  window.__testOpenSim = function (id) {
    // nhận trực tiếp khoá sim ("contradiction"...) HOẶC id nút ("law-contradiction"...)
    try {
      if (SIMS[id]) { openSim(id); window.__mlnOpenResult = "ok:" + id; return; }
      const n = nodes.find(function (x) { return x.id === id; });
      if (n && n.sim) openSim(n.sim);
      window.__mlnOpenResult = n && n.sim ? "ok:" + n.sim : "ok:no-node";
    } catch (e) {
      window.__mlnOpenResult = "ERR:" + (e && e.message);
    }
  };
  window.__testCloseSim = function () { closeSim(); };
  window.__mlnTopicCenter = function (key) { return topicCenter(key); };

  // Start
  animate();
})();
