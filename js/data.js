/* =====================================================================
   DỮ LIỆU TRIẾT HỌC MÁC–LÊNIN
   Các khái niệm, quy luật và cặp phạm trù được sắp xếp theo 5 cụm chủ đề.
   Mỗi node có: id, tag (cụm), vi (tên tiếng Việt),
   rule (nếu thuộc quy luật), body (nội dung chính), example (ví dụ), sim (id mô phỏng).
   ===================================================================== */

const DATA = {
  // ---- CỤM 1: CHỦ NGHĨA DUY VẬT ----
  materialism: {
    title: "Chủ nghĩa duy vật",
    desc: "Quan niệm rằng vật chất có trước, ý thức có sau; vật chất quyết định ý thức.",
    color: 0xd94f52
  },
  nodes: [
    {
      id: "material",
      sim: "material",
      tag: "materialism",
      vi: "Phạm trù vật chất",

      rule: "",
      body: "<p>Trong triết học Mác–Lênin, <b>vật chất</b> là phạm trù triết học rộng nhất dùng để chỉ <b>thực tại khách quan</b> — cái tồn tại bên ngoài và không phụ thuộc vào ý thức con người. Định nghĩa của Lênin: <i>“Vật chất là một phạm trù triết học dùng để chỉ thực tại khách quan, được đem lại cho con người trong cảm giác, được cảm giác của chúng ta chép lại, chụp lại, phản ánh và tồn tại không lệ thuộc vào cảm giác.”</i></p><p>Vật chất có hai thuộc tính cơ bản: <b>vận động</b> (phương thức tồn tại) và <b>không gian – thời gian</b> (hình thức tồn tại). Vật chất vô hạn, vô tận, vận động vĩnh viễn.</p>",
      example: "Nước, đá, ánh sáng, trường điện từ, xã hội loài người… đều là các dạng tồn tại của vật chất. Dù con người có biết hay không, chúng vẫn tồn tại khách quan.",
      pos: [22.0, 18.0, 5.0]
    },
    {
      id: "consciousness",
      sim: "consciousness",
      tag: "materialism",
      vi: "Ý thức",

      rule: "",
      body: "<p><b>Ý thức</b> là sản phẩm cao nhất của vật chất, thuộc tính phản ánh của bộ não con người — một dạng vật chất có tổ chức cao. Ý thức phản ánh hiện thực khách quan vào trong đầu óc con người.</p><p>Nguồn gốc của ý thức gồm: nguồn gốc tự nhiên (bộ não người + thế giới khách quan) và nguồn gốc xã hội (lao động + ngôn ngữ). Bản chất của ý thức là <b>hình ảnh chủ quan của thế giới khách quan</b>.</p>",
      example: "Cùng một sự kiện, mỗi người có nhận thức khác nhau — đó là do ý thức mang tính chủ quan, nhưng nội dung của nó là khách quan.",
      pos: [38.0, 10.0, -5.0]
    },
    {
      id: "motion",
      sim: "motion",
      tag: "materialism",
      vi: "Vận động",

      rule: "",
      body: "<p><b>Vận động</b> là mọi sự biến đổi nói chung, là phương thức tồn tại của vật chất. Không có vật chất không vận động và không có vận động ngoài vật chất.</p><p>Có <b>5 hình thức vận động</b> cơ bản: cơ học, vật lý, hóa học, sinh học và xã hội. Hình thức vận động cao bao hàm và xuất phát từ hình thức thấp hơn. Vận động là tuyệt đối, đứng im là tương đối.</p>",
      example: "Trái Đất tự quay (cơ học) → phân tử dao động (vật lý) → phản ứng trao đổi chất (hóa học) → tế bào sinh trưởng (sinh học) → đổi mới phương thức sản xuất (xã hội).",
      pos: [6.0, 36.0, 5.0]
    },
    {
      id: "space-time",
      sim: "space-time",
      tag: "materialism",
      vi: "Không gian – Thời gian",

      rule: "",
      body: "<p><b>Không gian</b> và <b>thời gian</b> là hình thức tồn tại của vật chất. Không gian biểu thị tính quảng tính (chỗ đứng, kích thước, kết cấu), thời gian biểu thị tính kế tiếp nhau, tính trường tồn của vật chất.</p><p>Cả hai đều mang tính khách quan, gắn liền với vật chất vận động. Chúng vừa vô hạn vừa có tính tương đối (theo Thuyết tương đối của Einstein).</p>",
      example: "Một sự kiện lịch sử bao giờ cũng xảy ra ở một nơi chốn cụ thể (không gian) và một thời điểm nhất định (thời gian).",
      pos: [28.0, 42.0, -4.0]
    },
    {
      id: "reflection",
      sim: "reflection",
      tag: "materialism",
      vi: "Phản ánh",

      rule: "",
      body: "<p><b>Phản ánh</b> là thuộc tính chung của mọi dạng vật chất: một hệ vật chất này tác động lên hệ vật chất khác để lại “dấu vết” tương ứng. Đây là nền tảng để lý giải nguồn gốc của ý thức.</p><p>Phản ánh phát triển từ thấp đến cao: phản ánh vật lý, hóa học → phản ánh sinh học (tính kích thích, tính cảm ứng, phản xạ) → phản ánh tâm lý động vật → <b>phản ánh ý thức</b> ở con người.</p>",
      example: "Đá in dấu bước chân (phản ánh vật lý), hoa hướng dương quay về phía mặt trời (phản ánh sinh học), con người nhận thức và cải tạo thế giới (phản ánh ý thức).",
      pos: [-14.0, 50.0, 6.0]
    }
  ],

  // ---- CỤM 2: PHÉP BIỆN CHỨNG (GENERAL) ----
  // Lịch sử phát triển của phép biện chứng: ba hình thức cơ bản.
  dialecticHistoryNodes: [
    {
      id: "dialect-ancient",
      sim: "dialect-ancient",
      tag: "dialectics",
      vi: "Phép biện chứng thời cổ đại",

      rule: "Hình thức lịch sử 1",
      body: "<p>Phép biện chứng xuất hiện ngay từ triết học cổ đại phương Đông và phương Hy Lạp, khi con người nhìn thế giới trong <b>sự vận động và liên hệ</b>, nhưng chủ yếu bằng <b>trực quan, chất phác</b>, chưa có chứng minh khoa học.</p><p>Những đại diện tiêu biểu: Hêraclit với tư tưởng “mọi vật đều trôi đi”, sự thống nhất và đấu tranh của các mặt đối lập; triết học Phật giáo với cái nhìn về vô thường và nhân duyên.</p>",
      example: "Câu nói nổi tiếng của Hêraclit: “Không ai tắm hai lần trên cùng một dòng sông” — mọi sự vật đều không ngừng biến đổi.",
      pos: [2.0, -36.0, 6.0]
    },
    {
      id: "dialect-idealist",
      sim: "dialect-idealist",
      tag: "dialectics",
      vi: "Phép biện chứng duy tâm cổ điển Đức",

      rule: "Hình thức lịch sử 2",
      body: "<p>Phép biện chứng duy tâm cổ điển Đức, đỉnh cao là hệ thống của <b>Hêghen</b> (1770–1831), lần đầu tiên trình bày toàn bộ giới tự nhiên, lịch sử và tư duy dưới dạng một <b>quá trình vận động, phát triển không ngừng</b>, với các quy luật và phạm trù được hệ thống hóa.</p><p>Hạn chế căn bản: đó là biện chứng của <b>ý niệm tuyệt đối</b> — tư duy sinh ra hiện thực, tức biện chứng “đội lộn ngược”. Mác và Ăngghen đã kế thừa “hạt nhân hợp lý” và cải tạo nó trên nền tảng duy vật.</p>",
      example: "Hêghen xây dựng hệ thống quy luật lượng – chất, phủ định của phủ định… nhưng coi chúng là quy luật vận động của “tinh thần” chứ không phải của thế giới vật chất.",
      pos: [18.0, -58.0, -5.0]
    },
    {
      id: "dialect-materialist-birth",
      sim: "dialect-materialist-birth",
      tag: "dialectics",
      vi: "Sự ra đời của phép biện chứng duy vật",

      rule: "Hình thức lịch sử 3 · Đỉnh cao",
      body: "<p><b>Phép biện chứng duy vật</b> do C. Mác và Ph. Ăngghen sáng lập, là hình thức cao nhất của phép biện chứng: kế thừa “hạt nhân hợp lý” của Hêghen nhưng đặt trên nền tảng <b>duy vật</b> — biện chứng của bản thân thế giới vật chất, không phải của ý niệm.</p><p>Sự ra đời của nó là một <b>cách mạng trong triết học</b>, trở thành phương pháp luận khoa học cho nhận thức và cải tạo thế giới.</p>",
      example: "Mác “lật ngược” phép biện chứng của Hêghen: không phải ý niệm quyết định hiện thực, mà chính hiện thực vật chất là nguồn gốc của mọi sự vận động và phát triển.",
      pos: [48.0, -28.0, 4.5]
    }
  ],

  dialectics: {
    title: "Phép biện chứng",
    desc: "Phép biện chứng là khoa học về các quy luật phổ biến của sự vận động và phát triển.",
    color: 0xe8b54d
  },
  // ---- CỤM 3: PHÉP BIỆN CHỨNG DUY VẬT ----
  "materialist-dialectics": {
    title: "Phép biện chứng duy vật",
    desc: "Phép biện chứng duy vật gồm 2 nguyên lý, 6 cặp phạm trù và 3 quy luật cơ bản.",
    color: 0xe8b54d
  },
  dialecticNodes: [
    // ========== NGUYÊN LÝ ==========
    {
      id: "principle-materiality",
      sim: "principle-materiality",
      tag: "materialist-dialectics",
      vi: "Nguyên lý về tính thống nhất vật chất của thế giới",

      rule: "Nguyên lý của CNDVBC",
      body: "<p><b>Thế giới thống nhất ở tính vật chất.</b> Thế giới này chỉ có một bản chất duy nhất là vật chất; thế giới vật chất là cái có trước, ý thức là cái có sau, thuộc tính của dạng vật chất có tổ chức cao.</p><p>Từ đó suy ra: mọi hiện tượng đều có nguyên nhân vật chất; con người có thể nhận thức và cải tạo thế giới.</p>",
      example: "Từ vũ trụ bao la, sự sống, cho đến tư duy — tất cả đều biểu hiện của vật chất vận động. Không có “thế giới tinh thần” tách rời vật chất.",
      pos: [-36.0, 34.0, 6.0]
    },
    {
      id: "principle-connection",
      sim: "principle-connection",
      tag: "materialist-dialectics",
      vi: "Nguyên lý về mối liên hệ phổ biến",

      rule: "Nguyên lý 1",
      body: "<p>Mọi sự vật, hiện tượng trong thế giới <b>đều liên hệ, tác động, chuyển hóa lẫn nhau</b>. Các mối liên hệ mang tính <b>khách quan, phổ biến, đa dạng</b>.</p><p>Yêu cầu phương pháp: <b>quan điểm toàn diện</b> (xem xét mọi mặt, mọi mối liên hệ), chống quan điểm phiến diện, một chiều.</p>",
      example: "Giá dầu tăng → chi phí vận tải tăng → giá hàng hóa tăng → lạm phát → lãi suất điều chỉnh… Một sự kiện kéo theo chuỗi hệ quả.",
      pos: [-60.0, 18.0, -4.0]
    },
    {
      id: "principle-development",
      sim: "principle-development",
      tag: "materialist-dialectics",
      vi: "Nguyên lý về sự phát triển",

      rule: "Nguyên lý 2",
      body: "<p><b>Phát triển</b> là vận động theo khuynh hướng đi lên: cái mới ra đời, cái cũ mất đi, sự vật chuyển từ thấp đến cao, từ kém hoàn thiện đến hoàn thiện hơn.</p><p>Phát triển là <b>quá trình khách quan, phổ biến</b>. Yêu cầu phương pháp: <b>quan điểm phát triển</b> — ủng hộ cái mới, nhìn xa trông rộng, chống tư tưởng bảo thủ trì trệ.</p>",
      example: "Nền kinh tế nông nghiệp → công nghiệp → kinh tế tri thức. Mỗi giai đoạn là bước phát triển mới từ giai đoạn trước.",
      pos: [-68.0, -22.0, 4.0]
    },
    // ========== CẶP PHẠM TRÙ ==========
    {
      id: "cat-universal-particular",
      sim: "cat-universal-particular",
      tag: "materialist-dialectics",
      vi: "Cái riêng và cái chung",

      rule: "Cặp phạm trù",
      body: "<p><b>Cái riêng</b> là phạm trù chỉ một sự vật, hiện tượng nhất định; <b>cái chung</b> là phạm trù chỉ những mặt, thuộc tính giống nhau ở nhiều sự vật.</p><p>Quan hệ: cái chung tồn tại trong cái riêng, thông qua cái riêng mà biểu hiện; cái riêng bao hàm cái chung. Không có cái chung thuần túy tách rời cái riêng.</p>",
      example: "“Cá” (cái chung) chỉ tồn tại qua từng con cá cụ thể (cái riêng). Mỗi con cá vừa có đặc điểm riêng, vừa mang thuộc tính chung của loài.",
      pos: [68.0, 16.0, 5.5]
    },
    {
      id: "cat-essence-phenomenon",
      sim: "cat-essence-phenomenon",
      tag: "materialist-dialectics",
      vi: "Bản chất và hiện tượng",

      rule: "Cặp phạm trù",
      body: "<p><b>Bản chất</b> là cái tất yếu, quy định sự vật; <b>hiện tượng</b> là biểu hiện ra bên ngoài của bản chất.</p><p>Bản chất được bộc lộ qua hiện tượng nhưng không đồng nhất với hiện tượng. Nhận thức phải đi sâu từ hiện tượng đến bản chất, từ bản chất ít sâu đến bản chất sâu hơn.</p>",
      example: "Giá cả hàng hóa dao động quanh giá trị (bản chất) do quan hệ cung – cầu (hiện tượng). Nhìn giá cả chưa đủ, phải hiểu giá trị và quy luật giá trị.",
      pos: [68.0, 40.0, -3.0]
    },
    {
      id: "cat-necessity-contingency",
      sim: "cat-necessity-contingency",
      tag: "materialist-dialectics",
      vi: "Tất nhiên và ngẫu nhiên",

      rule: "Cặp phạm trù",
      body: "<p><b>Tất nhiên</b> là cái do những nguyên nhân cơ bản quyết định, tất yếu xảy ra đúng như thế; <b>ngẫu nhiên</b> là cái không do nguyên nhân cơ bản quyết định, có thể xảy ra hay không.</p><p>Ngẫu nhiên là hình thức biểu hiện của tất nhiên; tất nhiên thông qua vô số ngẫu nhiên mà bộc lộ. Cần dựa vào tất nhiên, đồng thời chuẩn bị cho ngẫu nhiên.</p>",
      example: "Trong gieo hạt, hạt nảy mầm thành cây là tất nhiên; con nào bị sâu ăn, mưa lớn cuốn đi là ngẫu nhiên.",
      pos: [34.0, 76.0, 5.5]
    },
    {
      id: "cat-cause-effect",
      sim: "cat-cause-effect",
      tag: "materialist-dialectics",
      vi: "Nguyên nhân và kết quả",

      rule: "Cặp phạm trù",
      related: ["cat-necessity-contingency", "cat-essence-phenomenon"],
      body: "<p><b>Nguyên nhân</b> là phạm trù chỉ sự tác động lẫn nhau giữa các mặt trong một sự vật gây ra biến đổi nhất định; <b>kết quả</b> là những biến đổi xuất hiện do tác động đó.</p><p>Nguyên nhân sinh ra kết quả, kết quả tác động trở lại nguyên nhân. Cùng một nguyên nhân có thể gây nhiều kết quả và ngược lại.</p>",
      example: "Bỏ bê học tập (nguyên nhân) → thi trượt (kết quả). Thi trượt (giờ là nguyên nhân) → động lực học lại chăm chỉ hơn (kết quả mới).",
      pos: [-48.0, -62.0, 5.0]
    },
    {
      id: "cat-content-form",
      sim: "cat-content-form",
      tag: "materialist-dialectics",
      vi: "Nội dung và hình thức",

      rule: "Cặp phạm trù",
      body: "<p><b>Nội dung</b> là tổng hợp các mặt, các quá trình tạo nên sự vật; <b>hình thức</b> là phương thức tồn tại, biểu hiện của nội dung.</p><p>Nội dung quyết định hình thức; hình thức tác động trở lại nội dung. Hình thức thường chậm hơn nội dung, đến lúc không phù hợp thì phải thay đổi.</p>",
      example: "Một cuốn tiểu thuyết: câu chuyện (nội dung) quyết định cách kể (hình thức). Nếu nội dung đổi mới mà hình thức cũ, người đọc sẽ chán.",
      pos: [-24.0, -78.0, -4.0]
    },
    {
      id: "cat-possibility-reality",
      sim: "cat-possibility-reality",
      tag: "materialist-dialectics",
      vi: "Khả năng và hiện thực",

      rule: "Cặp phạm trù",
      body: "<p><b>Khả năng</b> là cái hiện chưa có nhưng sẽ xuất hiện trong tương lai nếu điều kiện thích hợp; <b>hiện thực</b> là cái hiện đang tồn tại, đang là.</p><p>Khả năng và hiện thực chuyển hóa cho nhau. Nhận thức phải dựa trên hiện thực, đồng thời tính tới các khả năng và tạo điều kiện biến khả năng thành hiện thực.</p>",
      example: "Hạt giống (khả năng) → gặp đất tốt, nước, ánh sáng → mầm cây (hiện thực). Hiện thực mới lại mở ra khả năng ra hoa kết trái.",
      pos: [-18.0, -96.0, 4.0]
    },
    // ========== QUY LUẬT (3 quy luật cơ bản) ==========
    {
      id: "law-contradiction",
      tag: "materialist-dialectics",
      vi: "Quy luật thống nhất và đấu tranh của các mặt đối lập",

      rule: "Quy luật cơ bản 1 · Hạt nhân của phép biện chứng",
      related: ["law-quantity-quality", "law-negation", "principle-development"],
      body: "<p>Mọi sự vật đều tồn tại những <b>mặt đối lập</b> vừa thống nhất vừa đấu tranh với nhau. <b>Thống nhất</b> là sự liên hệ, quy định, gắn bó lẫn nhau; <b>đấu tranh</b> là sự bài trừ, phủ định lẫn nhau.</p><p>Đấu tranh của các mặt đối lập là <b>nguồn gốc, động lực của sự vận động và phát triển</b>. Quy luật này là <i>“hạt nhân”</i> của phép biện chứng duy vật.</p><p>Ý nghĩa phương pháp: phải nhận thức và giải quyết mâu thuẫn, phân biệt mâu thuẫn cơ bản và không cơ bản, mâu thuẫn chủ yếu và thứ yếu, mặt chủ yếu và thứ yếu.</p>",
      example: "Trong một tế bào luôn diễn ra đồng hóa (tổng hợp) và dị hóa (phân giải) — hai mặt đối lập đấu tranh nhau, là nguồn sống của tế bào. Giai cấp công nhân và tư sản trong xã hội tư bản cũng vậy.",
      sim: "contradiction",
      pos: [6.0, -88.0, -5.0]
    },
    {
      id: "law-quantity-quality",
      tag: "materialist-dialectics",
      vi: "Quy luật lượng – chất (chuyển hóa những thay đổi về lượng thành những thay đổi về chất)",

      rule: "Quy luật cơ bản 2",
      related: ["law-contradiction", "law-negation"],
      body: "<p><b>Lượng</b> là tính quy định khách quan biểu thị quy mô, tốc độ, nhịp điệu; <b>chất</b> là tính quy định khách quan biểu thị tính quy định, cấu trúc của sự vật, cái mà nhờ đó sự vật là nó chứ không phải cái khác.</p><p>Quy luật: <b>lượng đổi → chất đổi</b>. Lượng tích lũy dần đến điểm nút (độ), vượt điểm nút gây bước nhảy làm thay đổi về chất; chất mới lại mở ra lượng mới.</p><p>Vận dụng: tích lũy dần từng ngày, chuẩn bị cho bước nhảy; tránh cả tư tưởng nóng vội và trì trệ bảo thủ.</p>",
      example: "Nước: tăng dần nhiệt độ (lượng) từ 0°C đến 100°C (điểm nút) → bước nhảy → nước sôi thành hơi (chất mới). Học tập mỗi ngày một ít (lượng) đủ lâu sẽ tạo nên kiến thức mới (chất).",
      sim: "quantity-quality",
      pos: [28.0, -94.0, 4.5]
    },
    {
      id: "law-negation",
      tag: "materialist-dialectics",
      vi: "Quy luật phủ định của phủ định",

      rule: "Quy luật cơ bản 3",
      related: ["law-contradiction", "law-quantity-quality"],
      body: "<p><b>Phủ định biện chứng</b> không phải là xóa bỏ hoàn toàn mà là sự phủ định gắn với sự kế thừa (vừa phủ định vừa giữ lại cái hợp lý).</p><p>Quy luật: quá trình phát triển đi theo đường <b>“xoáy ốc”</b> — khẳng định → phủ định → phủ định của phủ định, kết thúc bằng một trình độ cao hơn. Cái mới ra đời nhưng vẫn giữ lại cái tích cực của cái cũ.</p><p>Vận dụng: kế thừa có phê phán; không phủ định sạch trơn lịch sử, cũng không bảo thủ nguyên xi.</p>",
      example: "Hạt lúa → (phủ định) → cây lúa → (phủ định của phủ định) → hạt lúa mới. Hạt mới nhiều hơn, tốt hơn hạt ban đầu — sự phát triển như đường xoáy ốc đi lên.",
      sim: "negation",
      pos: [50.0, -76.0, -5.0]
    }
  ],

  // ---- CỤM 4: NHẬN THỨC LUẬN ----
  cognition: {
    title: "Nhận thức luận duy vật biện chứng",
    desc: "Nhận thức là quá trình phản ánh hiện thực khách quan, bắt nguồn từ thực tiễn.",
    color: 0x3f8e6a
  },
  cognitionNodes: [
    {
      id: "cog-practice-basis",
      sim: "cog-practice-basis",
      tag: "cognition",
      vi: "Thực tiễn là cơ sở, động lực của nhận thức",

      rule: "",
      body: "<p><b>Thực tiễn</b> là toàn bộ hoạt động vật chất có mục đích, mang tính lịch sử – xã hội của con người nhằm cải tạo tự nhiên và xã hội.</p><p>Thực tiễn đóng vai trò là <b>cơ sở</b> (nhận thức bắt nguồn từ thực tiễn), <b>động lực</b> (thực tiễn đặt ra nhu cầu), <b>mục đích</b> và <b>tiêu chuẩn chân lý</b> của nhận thức.</p>",
      example: "Muốn biết quả ớt cay, phải nếm; muốn biết bơi, phải xuống nước. “Học đi đôi với hành” chính là tinh thần này.",
      pos: [-40.0, 68.0, 5.0]
    },
    {
      id: "cog-process",
      sim: "cog-process",
      tag: "cognition",
      vi: "Biện chứng của quá trình nhận thức",

      rule: "",
      body: "<p>Nhận thức đi từ <b>cảm tính</b> đến <b>lý tính</b>, rồi từ nhận thức lý tính quay về <b>kiểm nghiệm bằng thực tiễn</b>. Đó là chu trình: <i>thực tiễn → nhận thức → thực tiễn mới → nhận thức sâu hơn…</i></p><p>Nhận thức cảm tính là giai đoạn trực quan, sinh động; nhận thức lý tính là giai đoạn trừu tượng, khái quát, nắm bản chất. Hai giai đoạn gắn bó, chuyển hóa lẫn nhau.</p>",
      example: "Thấy trời nhiều mây đen, lạnh (cảm tính) → nhận ra sắp mưa (lý tính) → ra ngoài kiểm tra (thực tiễn) → xác nhận hoặc điều chỉnh nhận thức.",
      pos: [-64.0, 88.0, -4.0]
    },
    {
      id: "cog-sensuous",
      sim: "cog-sensuous",
      tag: "cognition",
      vi: "Nhận thức cảm tính",

      rule: "",
      related: ["cog-rational", "cog-process"],
      body: "<p>Nhận thức cảm tính là giai đoạn nhận thức <b>trực quan, sinh động</b>: con người tiếp xúc trực tiếp với sự vật qua cảm giác, tri giác, biểu tượng.</p><p>Nó phản ánh những mặt bên ngoài, từng thuộc tính riêng lẻ của sự vật. Đây là cơ sở, là điểm xuất phát của nhận thức nhưng chưa nắm được bản chất.</p>",
      example: "Nhìn thấy màu đỏ, ngửi thấy mùi thơm, sờ thấy mát lạnh của một quả táo — đó là những hình ảnh cảm tính.",
      pos: [-76.0, 46.0, 5.0]
    },
    {
      id: "cog-rational",
      sim: "cog-rational",
      tag: "cognition",
      vi: "Nhận thức lý tính",

      rule: "",
      related: ["cog-sensuous", "cog-return-practice"],
      body: "<p>Nhận thức lý tính là giai đoạn nhận thức <b>trừu tượng, khái quát</b>: dựa trên tài liệu cảm tính mà phân tích, tổng hợp, khái niệm hóa, phán đoán, suy lý.</p><p>Nhận thức lý tính nắm được bản chất, quy luật, tính tất yếu của sự vật — cao hơn hẳn cảm tính nhưng không tách rời cảm tính.</p>",
      example: "Sau khi quan sát nhiều quả táo, con người khái quát: “Táo là loại quả giàu chất xơ” — đó là nhận thức lý tính.",
      pos: [-98.0, 62.0, -4.0]
    },
    {
      id: "cog-return-practice",
      sim: "cog-return-practice",
      tag: "cognition",
      vi: "Nhận thức quay về thực tiễn",

      rule: "",
      body: "<p>Nhận thức lý tính <b>phải quay về thực tiễn</b> để kiểm nghiệm, vận dụng và phát triển. Đây là giai đoạn quan trọng nhất: nhận thức mà không áp dụng thì vô nghĩa.</p><p>Thực tiễn là <b>tiêu chuẩn khách quan duy nhất của chân lý</b>. Chân lý là tri thức phù hợp với hiện thực và được thực tiễn kiểm nghiệm.</p>",
      example: "Lý thuyết bơi trên sách chỉ đúng khi bạn xuống nước và bơi được. Thành công hay thất bại trong thực tiễn là thước đo chân lý.",
      pos: [-108.0, 16.0, 3.5]
    }
  ],

  // ---- CỤM 5: CHỦ NGHĨA DUY VẬT LỊCH SỬ ----
  practice: {
    title: "Chủ nghĩa duy vật lịch sử & thực tiễn",
    desc: "Vận dụng quan điểm duy vật biện chứng vào đời sống xã hội và lịch sử.",
    color: 0x3f6fb5
  },
  historyNodes: [
    {
      id: "hist-productive-force",
      sim: "hist-productive-force",
      tag: "practice",
      vi: "Lực lượng sản xuất",

      rule: "",
      body: "<p><b>Lực lượng sản xuất</b> là toàn bộ những năng lực thực tiễn của con người trong quá trình sản xuất ra của cải vật chất, gồm <b>người lao động</b> (đóng vai trò quyết định) và <b>tư liệu sản xuất</b> (công cụ lao động, đối tượng lao động).</p><p>Lực lượng sản xuất là nền tảng của xã hội; công cụ lao động là thước đo trình độ chinh phục tự nhiên của con người.</p>",
      example: "Từ cuốc, cày (nông nghiệp) → máy hơi nước (cách mạng công nghiệp) → robot, AI (cách mạng 4.0) — trình độ công cụ thay đổi toàn bộ xã hội.",
      pos: [96.0, -24.0, 5.0]
    },
    {
      id: "hist-relations",
      sim: "hist-relations",
      tag: "practice",
      vi: "Quan hệ sản xuất",

      rule: "",
      body: "<p><b>Quan hệ sản xuất</b> là quan hệ giữa người với người trong quá trình sản xuất, gồm: quan hệ <b>sở hữu</b> tư liệu sản xuất (cơ bản nhất), quan hệ <b>tổ chức quản lý</b> và quan hệ <b>phân phối</b> sản phẩm.</p><p>Quan hệ sản xuất phù hợp với trình độ lực lượng sản xuất sẽ thúc đẩy phát triển; khi không phù hợp, nó trở thành xiềng xích và phải thay đổi.</p>",
      example: "Lực lượng sản xuất công nghiệp hóa cao đòi hỏi quan hệ sản xuất cởi mở, phân phối công bằng — nếu quan hệ cũ kìm hãm, xã hội sẽ diễn ra biến đổi.",
      pos: [116.0, -6.0, -4.0]
    },
    {
      id: "hist-base-superstructure",
      sim: "hist-base-superstructure",
      tag: "practice",
      vi: "Cơ sở hạ tầng và kiến trúc thượng tầng",

      rule: "",
      body: "<p><b>Cơ sở hạ tầng</b> là toàn bộ quan hệ sản xuất hợp thành kết cấu kinh tế của xã hội; <b>kiến trúc thượng tầng</b> là toàn bộ những quan điểm, thiết chế chính trị – pháp lý… xây dựng trên cơ sở đó.</p><p>Quan hệ: cơ sở hạ tầng <b>quyết định</b> kiến trúc thượng tầng; kiến trúc thượng tầng <b>tác động trở lại</b> cơ sở hạ tầng.</p>",
      example: "Kinh tế thị trường phát triển (hạ tầng) kéo theo hệ thống pháp luật, nhà nước pháp quyền hiện đại (thượng tầng) được đổi mới cho phù hợp.",
      pos: [104.0, 18.0, 3.0]
    },
    {
      id: "hist-sos-form",
      sim: "hist-sos-form",
      tag: "practice",
      vi: "Hình thái kinh tế – xã hội",

      rule: "",
      body: "<p><b>Hình thái kinh tế – xã hội</b> là một phạm trù chỉ xã hội ở từng giai đoạn phát triển nhất định, là hệ thống thống nhất giữa lực lượng sản xuất, quan hệ sản xuất và kiến trúc thượng tầng.</p><p>Sự phát triển của các hình thái là một <b>quá trình lịch sử – tự nhiên</b>, tất yếu đi theo quy luật: cộng sản nguyên thủy → chiếm hữu nô lệ → phong kiến → tư bản → cộng sản chủ nghĩa.</p>",
      example: "Việc chuyển từ xã hội phong kiến sang tư bản không phải ngẫu nhiên, mà là kết quả tất yếu của sự phát triển lực lượng sản xuất và đấu tranh giai cấp.",
      pos: [124.0, 40.0, -4.5]
    },
    {
      id: "hist-class-struggle",
      sim: "hist-class-struggle",
      tag: "practice",
      vi: "Giai cấp và đấu tranh giai cấp",

      rule: "",
      body: "<p><b>Giai cấp</b> là những tập đoàn người có địa vị khác nhau trong hệ thống sản xuất, do quan hệ với tư liệu sản xuất quy định. <b>Đấu tranh giai cấp</b> là cuộc đấu tranh giữa các giai cấp đối kháng.</p><p>Đấu tranh giai cấp là một trong những <b>động lực phát triển của xã hội có giai cấp</b>; đỉnh cao của nó là cách mạng xã hội — thay đổi quan hệ sản xuất cũ bằng quan hệ sản xuất mới.</p>",
      example: "Cuộc Cách mạng Tháng Mười Nga 1917 là đỉnh cao của đấu tranh giai cấp, thay đổi toàn bộ quan hệ sản xuất và kiến trúc thượng tầng nước Nga.",
      pos: [86.0, 60.0, 3.5]
    },
    {
      id: "hist-cmv",
      sim: "hist-cmv",
      tag: "practice",
      vi: "Con người và vai trò sáng tạo lịch sử của quần chúng nhân dân",

      rule: "",
      body: "<p><b>Con người</b> là thực thể thống nhất giữa mặt tự nhiên và mặt xã hội, vừa là sản phẩm vừa là chủ thể của lịch sử.</p><p><b>Quần chúng nhân dân</b> — những người lao động sản xuất — là <b>chủ thể sáng tạo lịch sử</b>: quyết định sự phát triển của lực lượng sản xuất, của văn hóa và các cuộc cách mạng. Cá nhân kiệt xuất có vai trò quan trọng nhưng chỉ thúc đẩy trong khuôn khổ quần chúng quyết định.</p>",
      example: "Kim tự tháp Ai Cập, Vạn Lý Trường Thành, những cuộc đổi mới vĩ đại — đều do hàng triệu người lao động làm nên, không phải của riêng cá nhân nào.",
      pos: [106.0, 84.0, -3.5]
    }
  ]
};

/* =====================================================================
   MÔ TẢ CÁC MÔ PHỎNG TƯƠNG TÁC (quy luật + khái niệm)
   ===================================================================== */
const SIMS = {
  // 1) Quy luật thống nhất & đấu tranh của các mặt đối lập
  contradiction: {
    title: "Mô phỏng · Quy luật mâu thuẫn",
    caption: "Màu <span style='color:#e0222b'>đỏ</span> (mặt đối lập A) và màu <span style='color:#e8b54d'>vàng</span> (mặt đối lập B) cùng tồn tại trong một chỉnh thể. Chúng vừa <b>thống nhất</b> (quy định, nương tựa lẫn nhau) vừa <b>đấu tranh</b> (tác động, bài trừ). Khi đấu tranh lên đến đỉnh điểm, chỉnh thể chuyển hóa thành một trạng thái mới.",
    type: "contradiction",
    palette: [0xe0222b, 0xe8b54d, 0xf2ede2],
    camDist: 15
  },
  // 2) Quy luật lượng – chất
  "quantity-quality": {
    title: "Mô phỏng · Quy luật lượng – chất",
    caption: "Số lượng hạt đang tích lũy dần — <b>lượng đổi</b>. Ở mỗi mức nhiệt độ (điểm nút), xảy ra <b>bước nhảy</b>: trạng thái rắn → lỏng → khí, tức <b>chất đổi</b>. Chất mới lại mở ra những biến đổi về lượng mới.",
    type: "quantityQuality",
    palette: [0x3f6fb5, 0x7ec8f0, 0xf2ede2],
    camDist: 17
  },
    "material": {"title":"Mô phỏng · Vật chất","camDist":18,"caption":"Vật chất là thực tại khách quan — tồn tại độc lập với ý thức, vận động không ngừng trong không gian và thời gian.","spec":{"period":12,"phases":[{"at":0,"caption":"Vật chất gồm mọi dạng tồn tại <b>khách quan</b>: mặt trời, trái đất, dòng nước… — chúng có thật, <b>không do ai sáng tạo ra</b>."},{"at":0.4,"caption":"Thuộc tính cố hữu của vật chất là <b>vận động</b>: trái đất quay quanh mặt trời, nước chảy — mọi dạng vật chất đều vận động không ngừng."},{"at":0.75,"caption":"<b>Nhắm mắt lại, mọi thứ vẫn còn đó</b>: vật chất tồn tại độc lập với ý thức — ý thức chỉ là hình ảnh của nó trong bộ não."}],"parts":[{"shape":"sphere","pos":[-4.6,1.4,0],"color":15250765,"emissive":0.9,"scale":1.2,"motion":{"type":"pulse","amp":0.06,"speed":3},"label":{"t":"mặt trời","c":"#e8b54d","p":2.1,"s":0.65},"phases":[{"at":0}]},{"shape":"sphere","pos":[-1.6,-0.8,0],"color":4882372,"scale":0.85,"motion":{"type":"bob","amp":0.18},"label":{"t":"trái đất","c":"#7ec8f0","p":1.8,"s":0.65},"phases":[{"at":0}]},{"shape":"sphere","pos":[1.4,-1.1,0],"color":3112918,"scale":0.6,"motion":{"type":"bob","amp":0.22,"phase":1.2},"label":{"t":"dòng nước","c":"#7ec8f0","p":1.7,"s":0.65},"phases":[{"at":0}]},{"shape":"sphere","color":15920610,"scale":0.14,"motion":{"type":"flow","a":[-1.6,0.4,0],"b":[-4,1.2,0],"speed":0.15,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15920610,"scale":0.14,"motion":{"type":"flow","a":[1.4,-0.2,0],"b":[-1.4,-0.4,0],"speed":0.15,"phase":0.5,"fade":true},"phases":[{"at":0}]},{"shape":"label","pos":[0,3.2,0],"text":"thực tại khách quan — không do ai sáng tạo ra","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]},{"shape":"person","pos":[4.6,-0.6,0],"facing":-1,"label":{"t":"ý thức","c":"#e8b54d","p":2.8,"s":0.7},"phases":[{"at":0,"scale":1},{"at":0.75,"scale":0.55,"pos":[4.6,-1.3,0]}]},{"shape":"label","pos":[0,-3.8,0],"text":"nhắm mắt lại, vật chất vẫn tồn tại — nó không phụ thuộc ý thức","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "consciousness": {"title":"Mô phỏng · Ý thức","camDist":16,"caption":"Ý thức là hình ảnh chủ quan của thế giới khách quan — bộ não phản ánh hiện thực chứ không sao chép nguyên xi.","spec":{"period":12,"phases":[{"at":0,"caption":"Thế giới khách quan — <b>cây, mặt trời, dòng sông</b> — tác động vào giác quan. Đây là <b>nguồn gốc khách quan</b> của ý thức."},{"at":0.4,"caption":"<b>Bộ não</b> — dạng vật chất cao nhất — tiếp nhận và chế biến các tác động ấy. Ý thức là thuộc tính của bộ não."},{"at":0.75,"caption":"Kết quả: <b>hình ảnh chủ quan</b> — cùng một cái cây nhưng mỗi người hình dung một khác. Nội dung là khách quan, cách thể hiện là chủ quan, sáng tạo."}],"parts":[{"shape":"plant","pos":[-4.8,-1.6,0],"scale":0.85,"label":{"t":"cây","p":3.2,"s":0.6},"phases":[{"at":0}]},{"shape":"sphere","pos":[-3.4,2.6,0],"color":15250765,"emissive":0.8,"scale":0.6,"motion":{"type":"pulse"},"label":{"t":"mặt trời","c":"#e8b54d","p":1.6,"s":0.6},"phases":[{"at":0}]},{"shape":"ring","pos":[-3.4,-2.6,0],"r":0.9,"color":3112918,"label":{"t":"sông","c":"#7ec8f0","p":0.4,"s":0.6},"phases":[{"at":0}]},{"shape":"sphere","color":15920610,"scale":0.16,"motion":{"type":"flow","a":[-4,-0.4,0],"b":[-1.2,0.4,0],"speed":0.3,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15920610,"scale":0.16,"motion":{"type":"flow","a":[-3,1.8,0],"b":[-1,0.7,0],"speed":0.3,"phase":0.35,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15920610,"scale":0.16,"motion":{"type":"flow","a":[-2.8,-1.8,0],"b":[-1,0,0],"speed":0.3,"phase":0.7,"fade":true},"phases":[{"at":0}]},{"shape":"ico","pos":[-0.4,0.4,0],"color":14647200,"scale":1.15,"motion":{"type":"pulse","amp":0.1,"speed":2},"label":{"t":"bộ não","c":"#f2c7d6","p":2.1,"s":0.75},"phases":[{"at":0}]},{"shape":"arrow","pos":[1.5,-0.6,0],"rotation":[0,0,-1.3],"color":8308976,"len":1.4,"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false}]},{"shape":"sphere","pos":[3.8,0.4,0],"color":15250765,"emissive":0.7,"scale":1.1,"motion":{"type":"pulse"},"label":{"t":"ý thức","c":"#e8b54d","p":2,"s":0.85},"phases":[{"at":0,"hide":true},{"at":0.75,"hide":false}]},{"shape":"plant","pos":[3.8,-1.4,0],"scale":0.3,"opacity":0.6,"label":{"t":"hình ảnh trong đầu","c":"#c9d4e8","p":3,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.75,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"ý thức = hình ảnh chủ quan của thế giới khách quan","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "motion": {"title":"Mô phỏng · Vận động","camDist":18,"caption":"Vận động là phương thức tồn tại của vật chất, gồm 5 hình thức cơ bản.","spec":{"period":14,"phases":[{"at":0,"caption":"<b>Vận động là phương thức tồn tại của vật chất</b> — không có vật chất không vận động; đứng im chỉ là tạm thời, tương đối."},{"at":0.45,"caption":"Năm hình thức từ thấp đến cao: <b>cơ học → vật lý → hóa học → sinh học → xã hội</b>. Mỗi hình thức có vật mang riêng."},{"at":0.78,"caption":"Hình thức cao <b>bao hàm</b> hình thức thấp nhưng <b>không quy về</b> chúng: sự sống không chỉ là các phản ứng hóa học, xã hội không chỉ là sinh học."}],"parts":[{"shape":"sphere","pos":[-4.4,-2.2,0],"color":8308976,"scale":0.8,"motion":{"type":"orbit","r":0.8,"speed":2.4},"label":{"t":"cơ học","c":"#7ec8f0","p":1.9,"s":0.6},"phases":[{"at":0}]},{"shape":"ico","pos":[-2.2,-1,0],"color":9072586,"scale":0.75,"motion":{"type":"pulse","amp":0.22,"speed":3},"label":{"t":"vật lý","c":"#c9b6f0","p":1.9,"s":0.6},"phases":[{"at":0}]},{"shape":"octa","pos":[0,0.1,0],"color":7061337,"scale":0.75,"motion":{"type":"spin","speed":1.6},"label":{"t":"hóa học","c":"#8fd08a","p":1.9,"s":0.6},"phases":[{"at":0}]},{"shape":"plant","pos":[2.2,-0.4,0],"scale":0.7,"motion":{"type":"bob","amp":0.2,"speed":1.2},"label":{"t":"sinh học","p":3.2,"s":0.6},"phases":[{"at":0}]},{"shape":"person","pos":[4.4,-0.2,0],"motion":{"type":"bob","amp":0.18,"speed":1},"label":{"t":"xã hội","c":"#e8b54d","p":2.8,"s":0.65},"phases":[{"at":0}]},{"shape":"arrow","pos":[-3.4,-2.9,0],"rotation":[0,0,-1.15],"color":10134450,"len":1.3,"phases":[{"at":0,"hide":true},{"at":0.45,"hide":false}]},{"shape":"arrow","pos":[-1.2,-1.8,0],"rotation":[0,0,-1.15],"color":10134450,"len":1.3,"phases":[{"at":0,"hide":true},{"at":0.5,"hide":false}]},{"shape":"arrow","pos":[1.1,-0.7,0],"rotation":[0,0,-1.15],"color":10134450,"len":1.3,"phases":[{"at":0,"hide":true},{"at":0.55,"hide":false}]},{"shape":"arrow","pos":[3.3,0.4,0],"rotation":[0,0,-1.15],"color":10134450,"len":1.3,"phases":[{"at":0,"hide":true},{"at":0.6,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"thấp → cao: cao bao hàm thấp, không quy về thấp","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "space-time": {"title":"Mô phỏng · Không gian và thời gian","camDist":18,"caption":"Không gian và thời gian là hình thức tồn tại của vật chất, không tách rời vật chất vận động.","spec":{"period":12,"phases":[{"at":0,"caption":"<b>Không gian</b>: mọi vật đều chiếm một vị trí, có kích thước và đứng trong tương quan với các vật khác — lưới tọa độ của thế giới."},{"at":0.45,"caption":"<b>Thời gian</b>: mọi vật đều tồn tại trong <b>trước – sau, nhanh – chậm</b>; quá khứ → hiện tại → tương lai trôi đi một chiều."},{"at":0.75,"caption":"Không gian, thời gian <b>gắn chặt với vật chất vận động</b> — không có vật chất tồn tại ngoài không gian, thời gian; và ngược lại."}],"parts":[{"shape":"line","points":[[-5.5,-2,0],[5.5,-2,0]],"color":2897232,"phases":[{"at":0}]},{"shape":"line","points":[[-5.5,0,0],[5.5,0,0]],"color":2897232,"phases":[{"at":0}]},{"shape":"line","points":[[-5.5,2,0],[5.5,2,0]],"color":2897232,"phases":[{"at":0}]},{"shape":"line","points":[[-3.6,-2.8,0],[-3.6,2.8,0]],"color":2897232,"phases":[{"at":0}]},{"shape":"line","points":[[0,-2.8,0],[0,2.8,0]],"color":2897232,"phases":[{"at":0}]},{"shape":"line","points":[[3.6,-2.8,0],[3.6,2.8,0]],"color":2897232,"phases":[{"at":0}]},{"shape":"label","pos":[-4.9,3.1,0],"text":"không gian","textColor":"#7ec8f0","scale":0.62,"phases":[{"at":0}]},{"shape":"label","pos":[0,-3.1,0],"text":"quá khứ","textColor":"#c9d4e8","scale":0.55,"phases":[{"at":0}]},{"shape":"label","pos":[2.7,-3.1,0],"text":"hiện tại","textColor":"#e8b54d","scale":0.55,"phases":[{"at":0}]},{"shape":"label","pos":[5,-3.1,0],"text":"tương lai","textColor":"#c9d4e8","scale":0.55,"phases":[{"at":0}]},{"shape":"sphere","pos":[-5,-1.95,0],"color":3112918,"scale":0.45,"phases":[{"at":0,"pos":[-5,-1.95,0]},{"at":0.45,"pos":[0,-1.95,0]},{"at":0.75,"pos":[0,0,0]},{"at":1,"pos":[0,1.95,0]}]},{"shape":"line","points":[[-5,-2.35,0],[5,-2.35,0]],"color":15250765,"phases":[{"at":0,"hide":true},{"at":0.45,"hide":false}]},{"shape":"label","pos":[5,-2.35,0],"text":"dòng thời gian","textColor":"#e8b54d","scale":0.55,"phases":[{"at":0,"hide":true},{"at":0.45,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"vật chất vận động trong không gian, theo thời gian","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "reflection": {"title":"Mô phỏng · Phản ánh","camDist":18,"caption":"Phản ánh là thuộc tính của vật chất, phát triển từ thấp đến cao: cơ lý → sinh học → ý thức.","spec":{"period":13,"phases":[{"at":0,"caption":"Cấp thấp nhất — <b>phản ánh cơ học, vật lý</b>: bàn chân ấn xuống bùn để lại <b>vết hằn</b>; vật vô sinh chỉ in dấu tác động một cách thụ động."},{"at":0.4,"caption":"Cao hơn — <b>phản ánh sinh học</b>: cây <b>hướng về phía mặt trời</b>; sinh vật cảm ứng, phản ứng có chọn lọc với môi trường."},{"at":0.75,"caption":"Cao nhất — <b>phản ánh năng động, sáng tạo</b> của con người: nhìn hiện thực rồi <b>chủ động đặt câu hỏi, tìm lời giải</b> trong đầu."}],"parts":[{"shape":"label","pos":[0,3.4,0],"text":"phản ánh: thuộc tính chung của mọi dạng vật chất","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]},{"shape":"box","pos":[-4.6,-1.6,0],"color":3752282,"scale":1.2,"label":{"t":"vật vô sinh","p":1.8,"s":0.6},"phases":[{"at":0}]},{"shape":"sphere","pos":[-4.6,0.6,0],"color":10134450,"scale":0.5,"phases":[{"at":0,"pos":[-4.6,0.6,0]},{"at":0.3,"pos":[-4.6,-1.2,0]}]},{"shape":"label","pos":[-4.6,-3,0],"text":"→ in vết hằn","textColor":"#c9d4e8","scale":0.55,"phases":[{"at":0}]},{"shape":"sphere","pos":[0,3.1,0],"color":15250765,"emissive":0.8,"scale":0.7,"motion":{"type":"pulse"},"label":{"t":"mặt trời","c":"#e8b54d","p":1.7,"s":0.6},"phases":[{"at":0}]},{"shape":"plant","pos":[0,-1.8,0],"scale":0.9,"phases":[{"at":0,"rotation":[0,0,0.4]},{"at":0.4,"rotation":[0,0,-0.3]}]},{"shape":"label","pos":[0,-3,0],"text":"→ hướng về ánh sáng","textColor":"#8fd08a","scale":0.55,"phases":[{"at":0}]},{"shape":"person","pos":[4.6,-1.6,0],"facing":-1,"label":{"t":"con người","c":"#e8b54d","p":2.8,"s":0.65},"phases":[{"at":0}]},{"shape":"ico","pos":[4.6,1.6,0],"color":14647200,"scale":0.45,"motion":{"type":"pulse","amp":0.25,"speed":2.5},"label":{"t":"? → !","p":1.4,"s":0.7},"phases":[{"at":0,"hide":true},{"at":0.75,"hide":false}]},{"shape":"label","pos":[4.6,-3,0],"text":"→ sáng tạo trong đầu","textColor":"#f2c7d6","scale":0.55,"phases":[{"at":0}]}]},"type":"spec"},
  "dialect-ancient": {"title":"Mô phỏng · Phép biện chứng cổ đại","camDist":16,"caption":"Heraclitus: 'Không ai tắm hai lần trên cùng một dòng sông' — vạn vật trôi đi, biến đổi không ngừng.","spec":{"period":12,"phases":[{"at":0,"caption":"<b>Heraclitus</b> đứng bên dòng sông: nước <b>chảy không ngừng</b>, không khoảnh khắc nào dòng sông còn là chính nó của khoảnh khắc trước."},{"at":0.45,"caption":"'<b>Không ai tắm hai lần trên cùng một dòng sông</b>' — vì cả dòng sông lẫn người tắm đều đã khác đi. Vạn vật <b>trôi đi, biến đổi không ngừng</b>."},{"at":0.8,"caption":"Phép biện chứng cổ đại nhìn thế giới trong <b>tính chỉnh thể và vận động</b> — nhưng bằng trực quan chất phác, chưa có chứng minh khoa học."}],"parts":[{"shape":"label","pos":[0,3.3,0],"text":"\"panta rhei\" — vạn vật đều trôi","textColor":"#7ec8f0","scale":0.65,"phases":[{"at":0}]},{"shape":"box","pos":[0,-2.6,0],"color":3112918,"scale":2.2,"opacity":0.5,"label":{"t":"dòng sông","c":"#7ec8f0","p":-1.5,"s":0.75},"phases":[{"at":0}]},{"shape":"sphere","color":10475765,"scale":0.14,"motion":{"type":"flow","a":[-6,-2.2,0.6],"b":[6,-2.2,0.6],"speed":0.35,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":10475765,"scale":0.14,"motion":{"type":"flow","a":[-6,-2.6,-0.4],"b":[6,-2.6,-0.4],"speed":0.3,"phase":0.3,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":10475765,"scale":0.14,"motion":{"type":"flow","a":[-6,-3,0.2],"b":[6,-3,0.2],"speed":0.4,"phase":0.65,"fade":true},"phases":[{"at":0}]},{"shape":"person","pos":[3.2,0.4,0],"facing":-1,"color":15920610,"label":{"t":"Heraclitus","c":"#e8b54d","p":2.8,"s":0.75},"phases":[{"at":0,"pos":[3.2,0.4,0]},{"at":0.45,"pos":[1.2,-0.9,0]},{"at":0.8,"pos":[-1.5,-0.9,0]}]},{"shape":"label","pos":[3.2,-4,0],"text":"nước cũ đã trôi đi — đây là dòng nước mới","textColor":"#c9d4e8","scale":0.58,"phases":[{"at":0,"hide":true},{"at":0.45,"hide":false}]}]},"type":"spec"},
  "dialect-idealist": {"title":"Mô phỏng · Phép biện chứng duy tâm","camDist":16,"caption":"Phép biện chứng duy tâm: biện chứng của ý niệm bị 'đội lộn ngược' — coi tinh thần sinh ra hiện thực.","spec":{"period":12,"phases":[{"at":0,"caption":"<b>Phép biện chứng duy tâm</b> (đỉnh cao là Hegel): khám phá ra <b>biện chứng của tư duy</b> — khái niệm vận động, mâu thuẫn, chuyển hóa."},{"at":0.45,"caption":"Nhưng nó bị '<b>đội lộn ngược</b>': coi <b>ý niệm sinh ra hiện thực</b> — tinh thần đứng trên đỉnh, sinh ra nhà cửa, cây cối, con người bên dưới."},{"at":0.8,"caption":"Thực tế thì ngược lại: hiện thực sinh ra ý niệm. Cần <b>lật lại</b> — đặt phép biện chứng đứng trên nền thế giới vật chất."}],"parts":[{"shape":"cone","pos":[0,0.8,0],"rotation":[0,0,3.14],"color":9072586,"scale":1.9,"motion":{"type":"bob","amp":0.2},"label":{"t":"biện chứng của ý niệm","c":"#c9b6f0","p":-2.3,"s":0.65},"phases":[{"at":0}]},{"shape":"sphere","pos":[0,3.2,0],"color":15250765,"emissive":0.7,"scale":0.8,"motion":{"type":"pulse"},"label":{"t":"ý niệm tuyệt đối","c":"#e8b54d","p":1.8,"s":0.7},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.13,"motion":{"type":"flow","a":[0,2.6,0],"b":[-3.4,-2.2,0],"speed":0.16,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.13,"motion":{"type":"flow","a":[0,2.6,0],"b":[0,-2.2,0],"speed":0.16,"phase":0.33,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.13,"motion":{"type":"flow","a":[0,2.6,0],"b":[3.4,-2.2,0],"speed":0.16,"phase":0.66,"fade":true},"phases":[{"at":0}]},{"shape":"box","pos":[-3.4,-2.6,0],"color":10134450,"scale":0.6,"label":{"t":"nhà cửa","p":1.4,"s":0.55},"phases":[{"at":0}]},{"shape":"plant","pos":[0,-2.9,0],"scale":0.55,"phases":[{"at":0}]},{"shape":"person","pos":[3.4,-2.5,0],"scale":0.8,"phases":[{"at":0}]},{"shape":"label","pos":[0,-4.1,0],"text":"chiếc tháp đội lộn ngược: tinh thần sinh ra hiện thực?","textColor":"#c9b6f0","scale":0.6,"phases":[{"at":0,"hide":true},{"at":0.45,"hide":false}]}]},"type":"spec"},
  "dialect-materialist-birth": {"title":"Mô phỏng · Sự ra đời của phép biện chứng duy vật","camDist":17,"caption":"Từ biện chứng duy tâm 'đội lộn ngược' đến phép biện chứng duy vật đứng vững trên nền vật chất.","spec":{"period":13,"phases":[{"at":0,"caption":"Xuất phát điểm: phép biện chứng <b>duy tâm</b> — chiếc tháp <b>đứng trên đỉnh</b>, coi ý niệm sinh ra hiện thực."},{"at":0.4,"caption":"<b>Bước ngoặt của Mác – Ăngghen</b>: lật ngược chiếc tháp lại — biện chứng không phải của ý niệm mà của <b>bản thân thế giới vật chất</b>."},{"at":0.75,"caption":"Kết quả: <b>phép biện chứng duy vật</b> — đứng vững trên nền vật chất; thống nhất chủ nghĩa duy vật với phép biện chứng."}],"parts":[{"shape":"cone","pos":[0,0.6,0],"rotation":[0,0,3.14],"color":9072586,"scale":2,"phases":[{"at":0,"rotation":[0,0,3.14],"color":9072586},{"at":0.4,"rotation":[0,0,1.57],"color":8308976},{"at":0.75,"rotation":[0,0,0],"color":4165226}]},{"shape":"sphere","pos":[0,3.2,0],"color":15250765,"emissive":0.6,"scale":0.7,"label":{"t":"ý niệm","c":"#e8b54d","p":1.7,"s":0.7},"phases":[{"at":0,"pos":[0,3.2,0],"label":"ý niệm"},{"at":0.4,"pos":[3.2,1,0],"label":"đang lật ngược…"},{"at":0.75,"pos":[0,-2.6,0],"label":"vật chất","color":5677130}]},{"shape":"box","pos":[0,-3.1,0],"color":3752282,"scale":2.4,"label":{"t":"nền vật chất","c":"#c9d4e8","p":-1.4,"s":0.6},"phases":[{"at":0}]},{"shape":"label","pos":[0,-4.4,0],"text":"thống nhất chủ nghĩa duy vật và phép biện chứng","textColor":"#8fd08a","scale":0.6,"phases":[{"at":0,"hide":true},{"at":0.75,"hide":false}]}]},"type":"spec"},
  "principle-materiality": {"title":"Mô phỏng · Nguyên lý về tính thống nhất vật chất của thế giới","camDist":18,"caption":"Thế giới thống nhất ở tính vật chất: muôn vàn sự vật chỉ là những dạng tồn tại khác nhau của vật chất.","spec":{"period":13,"phases":[{"at":0,"caption":"Muôn vàn sự vật muôn hình vạn trạng: <b>đá, nước, cây, ngôi sao, con người</b>… hình dạng và tính chất khác nhau."},{"at":0.45,"caption":"Nhưng tất cả chỉ là <b>những dạng tồn tại khác nhau của cùng một thế giới vật chất</b> — không có gì 'siêu vật chất'."},{"at":0.78,"caption":"Ngay cả ý thức cũng là thuộc tính của <b>một dạng vật chất đặc biệt — bộ não</b>. Thế giới thống nhất ở tính vật chất."}],"parts":[{"shape":"sphere","color":15250765,"emissive":0.55,"scale":1.3,"motion":{"type":"pulse","amp":0.05},"label":{"t":"vật chất","c":"#e8b54d","p":2.3,"s":0.8},"phases":[{"at":0}]},{"shape":"ico","color":10134450,"scale":0.55,"motion":{"type":"orbit","r":3.4,"speed":0.9},"label":{"t":"đá","p":1.4,"s":0.55},"phases":[{"at":0}]},{"shape":"sphere","color":3112918,"scale":0.5,"motion":{"type":"orbit","r":4.2,"speed":0.7,"phase":1.3},"label":{"t":"nước","c":"#7ec8f0","p":1.4,"s":0.55},"phases":[{"at":0}]},{"shape":"plant","scale":0.45,"motion":{"type":"orbit","r":5,"speed":0.55,"phase":2.6},"label":{"t":"cây","p":3,"s":0.55},"phases":[{"at":0}]},{"shape":"octa","color":15771196,"scale":0.5,"motion":{"type":"orbit","r":5.8,"speed":0.42,"phase":3.9},"label":{"t":"sao","c":"#f0a63c","p":1.4,"s":0.55},"phases":[{"at":0}]},{"shape":"person","scale":0.5,"motion":{"type":"orbit","r":6.6,"speed":0.33,"phase":5.2},"label":{"t":"con người","p":3,"s":0.55},"phases":[{"at":0}]},{"shape":"ring","r":6.6,"color":2897232,"opacity":0.25,"phases":[{"at":0}]},{"shape":"label","pos":[0,-3.8,0],"text":"muôn dạng khác nhau — cùng một bản chất vật chất","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "principle-connection": {"title":"Mô phỏng · Nguyên lý về mối liên hệ phổ biến","camDist":18,"caption":"Các sự vật liên hệ, ràng buộc, quy định lẫn nhau — không gì tồn tại cô lập.","spec":{"period":13,"phases":[{"at":0,"caption":"Xăng tăng giá — tưởng là chuyện riêng, nhưng nó <b>đẩy chi phí vận tải lên</b>: không sự vật nào tồn tại cô lập."},{"at":0.3,"caption":"Vận tải đắt → <b>hàng hóa tăng giá</b> → người mua chịu thiệt → ngân hàng phải <b>tăng lãi suất</b>… một mắt xích kéo theo cả chuỗi."},{"at":0.75,"caption":"Mối liên hệ mang tính <b>khách quan, phổ biến, đa dạng</b>: bên trong – bên ngoài, chủ yếu – thứ yếu, tất nhiên – ngẫu nhiên…"}],"parts":[{"shape":"cyl","pos":[-5.2,0.6,0],"color":15771196,"scale":0.8,"label":{"t":"giá xăng","c":"#f0a63c","p":1.9,"s":0.6},"phases":[{"at":0,"pos":[-5.2,0.6,0]},{"at":0.25,"pos":[-5.2,1.4,0]}]},{"shape":"box","pos":[-2.6,0.4,0],"color":8308976,"scale":0.8,"label":{"t":"vận tải","c":"#7ec8f0","p":1.9,"s":0.6},"phases":[{"at":0,"pos":[-2.6,0.4,0]},{"at":0.4,"pos":[-2.6,1,0]}]},{"shape":"box","pos":[0,0.2,0],"color":7061337,"scale":0.8,"label":{"t":"hàng hóa","c":"#8fd08a","p":1.9,"s":0.6},"phases":[{"at":0,"pos":[0,0.2,0]},{"at":0.55,"pos":[0,0.8,0]}]},{"shape":"person","pos":[2.6,-0.2,0],"scale":0.8,"label":{"t":"người mua","p":2.9,"s":0.6},"phases":[{"at":0,"pos":[2.6,-0.2,0]},{"at":0.68,"pos":[2.6,-0.7,0]}]},{"shape":"octa","pos":[5.2,-0.6,0],"color":9072586,"scale":0.7,"label":{"t":"lãi suất","c":"#c9b6f0","p":1.9,"s":0.6},"phases":[{"at":0,"pos":[5.2,-0.6,0]},{"at":0.8,"pos":[5.2,0,0]}]},{"shape":"arrow","pos":[-4.2,0.2,0],"rotation":[0,0,-1.57],"color":15920610,"len":1.1,"phases":[{"at":0,"hide":true},{"at":0.15,"hide":false}]},{"shape":"arrow","pos":[-1.55,0,0],"rotation":[0,0,-1.57],"color":15920610,"len":1.1,"phases":[{"at":0,"hide":true},{"at":0.32,"hide":false}]},{"shape":"arrow","pos":[1.1,-0.3,0],"rotation":[0,0,-1.57],"color":15920610,"len":1.1,"phases":[{"at":0,"hide":true},{"at":0.48,"hide":false}]},{"shape":"arrow","pos":[3.7,-0.7,0],"rotation":[0,0,-1.57],"color":15920610,"len":1.1,"phases":[{"at":0,"hide":true},{"at":0.62,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"kéo một mắt xích — cả chuỗi chuyển động","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "principle-development": {"title":"Mô phỏng · Nguyên lý về sự phát triển","camDist":18,"caption":"Phát triển là khuynh hướng đi lên: cái cũ mất đi, cái mới ra đời, ngày càng hoàn thiện hơn.","spec":{"period":12,"phases":[{"at":0,"caption":"Ban đầu là <b>xe kéo tay</b> thô sơ — chậm, nặng nhọc, năng suất thấp."},{"at":0.35,"caption":"Cái cũ mất đi, cái mới ra đời: <b>xe máy</b> thay xe kéo — nhanh hơn, tiện hơn, đi xa hơn."},{"at":0.7,"caption":"Rồi <b>ô tô</b> thay xe máy: chở nhiều hơn, xa hơn nữa. Phát triển là <b>khuynh hướng đi lên</b> — có quanh co nhưng luôn tiến về phía trước."}],"parts":[{"shape":"box","pos":[-4.4,-1.4,0],"color":10134450,"scale":0.9,"label":{"t":"xe kéo tay","p":1.6,"s":0.6},"phases":[{"at":0,"pos":[-4.4,-1.4,0]},{"at":0.35,"scale":0.4,"opacity":0.4}]},{"shape":"cyl","pos":[0,-1.2,0],"color":8308976,"scale":0.85,"label":{"t":"xe máy","c":"#7ec8f0","p":1.8,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.35,"hide":false,"scale":0.85},{"at":0.7,"scale":0.4,"opacity":0.4}]},{"shape":"box","pos":[4.4,-1,0],"color":7061337,"scale":1.15,"motion":{"type":"bob","amp":0.12},"label":{"t":"ô tô","c":"#8fd08a","p":1.7,"s":0.7},"phases":[{"at":0,"hide":true},{"at":0.7,"hide":false}]},{"shape":"arrow","pos":[-2.4,-1.9,0],"rotation":[0,0,-1.57],"color":15920610,"len":1.5,"phases":[{"at":0,"hide":true},{"at":0.2,"hide":false}]},{"shape":"arrow","pos":[2,-1.9,0],"rotation":[0,0,-1.57],"color":15920610,"len":1.5,"phases":[{"at":0,"hide":true},{"at":0.55,"hide":false}]},{"shape":"person","pos":[-5.4,-0.6,0],"facing":1,"scale":0.8,"phases":[{"at":0,"pos":[-5.4,-0.6,0]},{"at":0.35,"pos":[-0.9,-0.4,0]},{"at":0.7,"pos":[3.3,-0.2,0]}]},{"shape":"label","pos":[0,-3.8,0],"text":"cái mới ra đời tất yếu thay thế cái cũ — con đường xoáy ốc đi lên","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "cat-universal-particular": {"title":"Mô phỏng · Cái chung và cái riêng","camDist":17,"caption":"Cái chung tồn tại trong cái riêng, biểu hiện qua cái riêng; cái riêng phong phú hơn cái chung.","spec":{"period":12,"phases":[{"at":0,"caption":"<b>Cái chung</b> — 'hoa' nói chung — không trôi nổi đâu đó mà <b>nằm ngay trong</b> từng bông hoa riêng: hoa hồng, hoa sen, hoa cúc."},{"at":0.45,"caption":"<b>Cái riêng phong phú hơn cái chung</b>: ngoài 'tính hoa', hoa hồng còn có gai, hoa sen mọc trong đầm, hoa cúc nở mùa thu."},{"at":0.78,"caption":"Cái chung <b>sâu sắc hơn</b> cái riêng (nắm bản chất); hai mặt <b>chuyển hóa</b> lẫn nhau trong nhận thức và thực tiễn."}],"parts":[{"shape":"sphere","color":15250765,"emissive":0.5,"scale":1.1,"motion":{"type":"pulse","amp":0.06},"label":{"t":"cái chung: hoa","c":"#e8b54d","p":2.1,"s":0.75},"phases":[{"at":0}]},{"shape":"plant","pos":[-4.6,-1.8,0],"scale":0.85,"label":{"t":"hoa hồng","c":"#ff8f88","p":3.2,"s":0.65},"phases":[{"at":0,"pos":[-4.6,-1.8,0]},{"at":0.45,"pos":[-2.6,-1.8,0]}]},{"shape":"plant","pos":[0,-2,0],"scale":0.95,"label":{"t":"hoa sen","c":"#f2c7d6","p":3.2,"s":0.65},"phases":[{"at":0,"pos":[0,-2,0]},{"at":0.45,"pos":[0,-1.9,0]}]},{"shape":"plant","pos":[4.6,-1.8,0],"scale":0.85,"label":{"t":"hoa cúc","c":"#f0a63c","p":3.2,"s":0.65},"phases":[{"at":0,"pos":[4.6,-1.8,0]},{"at":0.45,"pos":[2.6,-1.8,0]}]},{"shape":"sphere","color":15250765,"scale":0.13,"motion":{"type":"flow","a":[-2.6,-0.4,0],"b":[-0.4,0.3,0],"speed":0.2,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.13,"motion":{"type":"flow","a":[0,-0.6,0],"b":[0,0.2,0],"speed":0.2,"phase":0.35,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.13,"motion":{"type":"flow","a":[2.6,-0.4,0],"b":[0.4,0.3,0],"speed":0.2,"phase":0.7,"fade":true},"phases":[{"at":0}]},{"shape":"label","pos":[-3.6,1.6,0],"text":"+ gai","textColor":"#ff8f88","scale":0.55,"phases":[{"at":0,"hide":true},{"at":0.45,"hide":false}]},{"shape":"label","pos":[0,2.2,0],"text":"+ đầm nước","textColor":"#f2c7d6","scale":0.55,"phases":[{"at":0,"hide":true},{"at":0.5,"hide":false}]},{"shape":"label","pos":[3.6,1.6,0],"text":"+ mùa thu","textColor":"#f0a63c","scale":0.55,"phases":[{"at":0,"hide":true},{"at":0.55,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"chung nằm trong riêng — riêng phong phú hơn chung","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "cat-essence-phenomenon": {"title":"Mô phỏng · Bản chất và hiện tượng","camDist":16,"caption":"Bản chất ẩn bên trong, hiện ra qua muôn vàn hiện tượng bề ngoài.","spec":{"period":12,"phases":[{"at":0,"caption":"Một <b>ngọn lửa</b> — bản chất là <b>phản ứng cháy</b> — ẩn bên trong, chưa ai nhìn thẳng được nó."},{"at":0.4,"caption":"Cùng bản chất ấy <b>hiện ra thành muôn vàn hiện tượng</b>: tỏa hơi ấm, phát ánh sáng, sinh ra khói."},{"at":0.75,"caption":"Nhận thức phải đi <b>từ hiện tượng vào bản chất</b>: thấy ấm, thấy sáng, thấy khói → hiểu ra đó là sự cháy."}],"parts":[{"shape":"cone","pos":[0,-1.6,0],"color":15771196,"emissive":0.6,"scale":1.2,"motion":{"type":"pulse","amp":0.08,"speed":3},"label":{"t":"ngọn lửa","c":"#f0a63c","p":2,"s":0.7},"phases":[{"at":0}]},{"shape":"label","pos":[0,-3.4,0],"text":"bản chất: phản ứng cháy (ẩn bên trong)","textColor":"#e8b54d","scale":0.58,"phases":[{"at":0}]},{"shape":"sphere","color":15222861,"scale":0.2,"motion":{"type":"flow","a":[-0.2,-0.9,0],"b":[-3.4,1.2,0],"speed":0.22,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.2,"motion":{"type":"flow","a":[0,-0.7,0],"b":[0,1.6,0],"speed":0.22,"phase":0.35,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":10134450,"scale":0.2,"motion":{"type":"flow","a":[0.2,-0.9,0],"b":[3.4,1.2,0],"speed":0.22,"phase":0.7,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","pos":[-3.8,1.6,0],"color":15222861,"emissive":0.4,"scale":0.7,"label":{"t":"hơi ấm","c":"#ff8f88","p":1.7,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false}]},{"shape":"octa","pos":[0,2.1,0],"color":15250765,"emissive":0.7,"scale":0.6,"motion":{"type":"spin","speed":1.5},"label":{"t":"ánh sáng","c":"#e8b54d","p":1.7,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.48,"hide":false}]},{"shape":"ico","pos":[3.8,1.6,0],"color":10134450,"scale":0.6,"motion":{"type":"bob","amp":0.25},"label":{"t":"khói","p":1.7,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.56,"hide":false}]},{"shape":"person","pos":[5,-1.4,0],"facing":-1,"scale":0.85,"phases":[{"at":0}]},{"shape":"label","pos":[5,-3,0],"text":"từ hiện tượng → hiểu bản chất","textColor":"#c9d4e8","scale":0.55,"phases":[{"at":0,"hide":true},{"at":0.75,"hide":false}]}]},"type":"spec"},
  "cat-necessity-contingency": {"title":"Mô phỏng · Tất nhiên và ngẫu nhiên","camDist":16,"caption":"Tất nhiên nảy sinh từ điều kiện cơ bản; ngẫu nhiên là biểu hiện cụ thể của tất nhiên.","spec":{"period":11,"phases":[{"at":0,"caption":"Gieo <b>3 hạt giống</b> — mỗi hạt rơi theo một <b>đường ngẫu nhiên</b> khác nhau: lệch trái, bật lên, lượn vòng."},{"at":0.5,"caption":"Nhưng cả ba đều <b>tất nhiên nảy mầm</b>: cùng một quy luật bên trong quy định đích đến. Ngẫu nhiên chỉ là <b>hình thức biểu hiện</b> của tất nhiên."},{"at":0.85,"caption":"Tất nhiên <b>vạch đường đi cho mình</b> xuyên qua vô số ngẫu nhiên; nhận thức phải xuyên qua ngẫu nhiên để nắm tất nhiên."}],"parts":[{"shape":"seed","color":13214542,"scale":0.5,"phases":[{"at":0,"pos":[-2.6,2.6,0]},{"at":0.18,"pos":[-1.9,0.8,0]},{"at":0.36,"pos":[-2.9,-0.8,0]},{"at":0.5,"pos":[-2,-2.4,0]}]},{"shape":"seed","color":13214542,"scale":0.5,"phases":[{"at":0,"pos":[0,2.6,0]},{"at":0.2,"pos":[0.9,1.2,0]},{"at":0.34,"pos":[-0.6,-0.4,0]},{"at":0.5,"pos":[0.1,-2.4,0]}]},{"shape":"seed","color":13214542,"scale":0.5,"phases":[{"at":0,"pos":[2.6,2.6,0]},{"at":0.15,"pos":[3.1,1,0]},{"at":0.32,"pos":[1.7,-0.6,0]},{"at":0.5,"pos":[2.1,-2.4,0]}]},{"shape":"ring","pos":[0,-2.5,0],"r":3.3,"color":7061337,"opacity":0.5,"label":{"t":"tất nhiên: đều nảy mầm","c":"#8fd08a","p":-0.9,"s":0.65},"phases":[{"at":0}]},{"shape":"plant","pos":[-2,-2.6,0],"scale":0.35,"phases":[{"at":0,"hide":true},{"at":0.62,"hide":false,"scale":0.35},{"at":0.85,"scale":0.55}]},{"shape":"plant","pos":[0.1,-2.6,0],"scale":0.35,"phases":[{"at":0,"hide":true},{"at":0.68,"hide":false,"scale":0.35},{"at":0.85,"scale":0.6}]},{"shape":"plant","pos":[2.1,-2.6,0],"scale":0.35,"phases":[{"at":0,"hide":true},{"at":0.74,"hide":false,"scale":0.35},{"at":0.85,"scale":0.55}]},{"shape":"label","pos":[0,-3.8,0],"text":"đường đi ngẫu nhiên — đích đến tất yếu","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "cat-cause-effect": {"title":"Mô phỏng · Nguyên nhân và kết quả","camDist":18,"caption":"Mỗi hiện tượng đều do nguyên nhân sinh ra; quan hệ nhân quả là mắt xích không dứt.","spec":{"period":13,"phases":[{"at":0,"caption":"<b>Mưa lớn kéo dài</b> (nguyên nhân) — nguyên nhân bao giờ cũng <b>có trước</b>, là sự tác động gây ra biến đổi."},{"at":0.3,"caption":"Mưa lớn → <b>ngập lụt</b>: kết quả theo sau nguyên nhân, do nguyên nhân sinh ra."},{"at":0.55,"caption":"Ngập lụt → <b>mất mùa</b>: kết quả này lại trở thành <b>nguyên nhân</b> của kết quả khác — chuỗi nhân quả không dứt."},{"at":0.8,"caption":"Con người đắp đê, trị thủy — <b>kết quả tác động trở lại</b> nguyên nhân; quan hệ nhân quả mang tính biện chứng, không một chiều."}],"parts":[{"shape":"ico","pos":[-5,2.4,0],"color":10134450,"scale":1.3,"motion":{"type":"bob","amp":0.15},"label":{"t":"mưa lớn","p":2.2,"s":0.7},"phases":[{"at":0}]},{"shape":"sphere","color":8308976,"scale":0.15,"motion":{"type":"flow","a":[-4.7,1.4,0],"b":[-4.7,-1.6,0],"speed":0.55,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":8308976,"scale":0.15,"motion":{"type":"flow","a":[-4.3,1.4,0],"b":[-4.5,-1.6,0],"speed":0.55,"phase":0.4,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":8308976,"scale":0.15,"motion":{"type":"flow","a":[-5.1,1.4,0],"b":[-4.9,-1.6,0],"speed":0.55,"phase":0.8,"fade":true},"phases":[{"at":0}]},{"shape":"box","pos":[-1.8,-1.8,0],"color":3112918,"scale":1.1,"opacity":0.8,"label":{"t":"ngập lụt","c":"#7ec8f0","p":1.7,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.3,"hide":false}]},{"shape":"arrow","pos":[-3.6,-1.2,0],"rotation":[0,0,-1.57],"color":15920610,"len":1.3,"phases":[{"at":0,"hide":true},{"at":0.22,"hide":false}]},{"shape":"plant","pos":[1.2,-1.7,0],"scale":0.8,"rotation":[0,0,2.4],"color":9075258,"label":{"t":"mất mùa","p":2.8,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.55,"hide":false}]},{"shape":"arrow","pos":[-0.5,-1.4,0],"rotation":[0,0,-1.57],"color":15920610,"len":1.3,"phases":[{"at":0,"hide":true},{"at":0.48,"hide":false}]},{"shape":"box","pos":[4.4,-1.6,0],"color":9071178,"scale":1,"label":{"t":"đắp đê","c":"#e8b54d","p":1.7,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.8,"hide":false}]},{"shape":"line","points":[[4.4,-0.4,0],[4.4,2.6,0],[-5,3.6,0]],"color":15250765,"opacity":0.7,"phases":[{"at":0,"hide":true},{"at":0.85,"hide":false}]},{"shape":"label","pos":[0,3.6,0],"text":"kết quả tác động trở lại nguyên nhân","textColor":"#e8b54d","scale":0.55,"phases":[{"at":0,"hide":true},{"at":0.85,"hide":false}]}]},"type":"spec"},
  "cat-content-form": {"title":"Mô phỏng · Nội dung và hình thức","camDist":16,"caption":"Nội dung quyết định hình thức; khi nội dung vượt quá, hình thức cũ vỡ ra nhường chỗ cho hình thức mới.","spec":{"period":12,"phases":[{"at":0,"caption":"<b>Cây non</b> (nội dung) lớn lên từng ngày bên trong <b>chậu đất nung</b> (hình thức) — lúc đầu chậu chứa vừa."},{"at":0.4,"caption":"Cây ngày một lớn, rễ đâm rộng — <b>nội dung mâu thuẫn với hình thức</b> chật hẹp; chậu bắt đầu rạn nứt."},{"at":0.72,"caption":"<b>Chậu vỡ</b>, cây vươn lên tự do trong <b>hình thức mới</b> rộng mở. Hình thức cũ vỡ ra, hình thức mới phù hợp ra đời — và hình thức mới lại thúc đẩy nội dung phát triển."}],"parts":[{"shape":"cyl","pos":[0,-1.9,0],"color":11560254,"scale":1.5,"rotation":[0,0,1.57],"label":{"t":"chậu đất nung","p":-1.9,"s":0.65},"phases":[{"at":0,"scale":1.5},{"at":0.4,"pos":[0,-1.9,0]},{"at":0.72,"pos":[0,-3,0],"scale":0.35,"opacity":0.4}]},{"shape":"plant","pos":[0,-1.2,0],"scale":0.45,"motion":{"type":"bob","amp":0.06},"label":{"t":"cây non (nội dung)","c":"#8fd08a","p":3.4,"s":0.6},"phases":[{"at":0,"scale":0.45},{"at":0.4,"scale":0.85},{"at":0.72,"scale":1.15}]},{"shape":"label","pos":[2.9,-1.4,0],"text":"rạn nứt!","textColor":"#ff8f88","scale":0.6,"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false},{"at":0.72,"hide":true}]},{"shape":"line","points":[[0.8,-1.5,0],[1.3,-2.2,0]],"color":15222861,"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false},{"at":0.72,"hide":true}]},{"shape":"line","points":[[-0.9,-1.3,0],[-1.4,-2.3,0]],"color":15222861,"phases":[{"at":0,"hide":true},{"at":0.45,"hide":false},{"at":0.72,"hide":true}]},{"shape":"ring","pos":[0,-2.8,0],"r":3,"color":7061337,"opacity":0.5,"label":{"t":"hình thức mới","c":"#8fd08a","p":-0.7,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.72,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"nội dung quyết định hình thức — hình thức tác động trở lại","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "cat-possibility-reality": {"title":"Mô phỏng · Khả năng và hiện thực","camDist":16,"caption":"Khả năng là cái chưa xảy ra; trong điều kiện thích hợp, khả năng chuyển hóa thành hiện thực.","spec":{"period":11,"phases":[{"at":0,"caption":"Trong <b>hạt giống</b> ẩn chứa <b>khả năng</b>: một cái cây sẽ thành hình — nhưng chưa xảy ra."},{"at":0.35,"caption":"Gặp <b>điều kiện</b> — nước và ánh nắng — khả năng bắt đầu chuyển hóa: hạt nứt nanh, nhú mầm."},{"at":0.7,"caption":"<b>Khả năng thành hiện thực</b>: cây xanh đã thật sự đứng đó. Hiện thực mới lại chứa đựng những khả năng mới — ra hoa, kết quả."}],"parts":[{"shape":"seed","color":13214542,"scale":1.1,"pos":[0,-2.4,0],"label":{"t":"khả năng","c":"#7ec8f0","p":1.8,"s":0.75},"phases":[{"at":0,"opacity":0.65,"pos":[0,-2.4,0]},{"at":0.35,"opacity":1},{"at":0.7,"scale":0.001}]},{"shape":"plant","pos":[0,-2.6,0],"scale":1.05,"label":{"t":"hiện thực","c":"#e8b54d","p":3.4,"s":0.8},"phases":[{"at":0,"hide":true},{"at":0.7,"hide":false}]},{"shape":"label","pos":[0,-1.2,0],"text":"mầm non","textColor":"#8fd08a","scale":0.6,"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false},{"at":0.7,"hide":true}]},{"shape":"sphere","color":3112918,"scale":0.2,"motion":{"type":"flow","a":[-3.6,2.8,0],"b":[0,-1.6,0],"speed":0.25,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":3112918,"scale":0.16,"motion":{"type":"flow","a":[-3.2,2.4,0],"b":[-0.2,-1.8,0],"speed":0.25,"phase":0.5,"fade":true},"phases":[{"at":0}]},{"shape":"label","pos":[-3.6,3.2,0],"text":"nước","textColor":"#7ec8f0","scale":0.6,"phases":[{"at":0}]},{"shape":"sphere","pos":[3.6,3,0],"color":15250765,"emissive":0.8,"scale":0.75,"motion":{"type":"pulse"},"label":{"t":"ánh nắng","c":"#e8b54d","p":1.7,"s":0.6},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.14,"motion":{"type":"flow","a":[3.4,2.4,0],"b":[0.3,-1.4,0],"speed":0.2,"phase":0.25,"fade":true},"phases":[{"at":0}]},{"shape":"label","pos":[0,-3.8,0],"text":"trong điều kiện thích hợp: khả năng → hiện thực","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "cog-practice-basis": {"title":"Mô phỏng · Thực tiễn là cơ sở của nhận thức","camDist":17,"caption":"Hoạt động thực tiễn đặt ra vấn đề → con người nhận thức → tri thức quay về soi sáng thực tiễn.","spec":{"period":12,"phases":[{"at":0,"caption":"Nông dân ra đồng và gặp <b>vấn đề</b>: vì sao lúa bị vàng lá? Chính <b>thực tiễn đặt ra câu hỏi</b> — điểm xuất phát của nhận thức."},{"at":0.4,"caption":"Quan sát, tìm hiểu, đúc kết: người nông dân <b>nhận ra</b> nguyên nhân — thiếu nước, thiếu phân. Tri thức hình thành từ thực tiễn."},{"at":0.75,"caption":"Tri thức <b>quay về chỉ đạo thực tiễn</b>: tưới tiêu, bón phân đúng cách → mùa sau bội thu. Thực tiễn là động lực, mục đích và <b>tiêu chuẩn chân lý</b>."}],"parts":[{"shape":"person","pos":[-4.6,-1.6,0],"facing":1,"label":{"t":"nông dân","c":"#e8b54d","p":2.8,"s":0.7},"phases":[{"at":0}]},{"shape":"plant","pos":[-1.6,-2,0],"scale":0.7,"rotation":[0,0,0.3],"color":10528826,"label":{"t":"lúa vàng lá?","p":3,"s":0.6},"phases":[{"at":0}]},{"shape":"ico","pos":[-1.6,1.4,0],"color":15222861,"scale":0.5,"motion":{"type":"pulse","amp":0.25,"speed":2.5},"label":{"t":"vấn đề","c":"#ff8f88","p":1.5,"s":0.6},"phases":[{"at":0,"color":15222861},{"at":0.4,"color":15250765,"label":"đã hiểu!"}]},{"shape":"arrow","pos":[-3.2,0.6,0],"rotation":[0,0,-1.1],"color":15920610,"len":1.3,"phases":[{"at":0,"hide":true},{"at":0.2,"hide":false}]},{"shape":"sphere","pos":[1.8,0.8,0],"color":15250765,"emissive":0.7,"scale":0.85,"motion":{"type":"pulse"},"label":{"t":"tri thức","c":"#e8b54d","p":1.9,"s":0.7},"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false}]},{"shape":"arrow","pos":[3.2,0,0],"rotation":[0,0,-1.9],"color":15920610,"len":1.3,"phases":[{"at":0,"hide":true},{"at":0.6,"hide":false}]},{"shape":"plant","pos":[4.6,-2,0],"scale":0.9,"label":{"t":"bội thu","c":"#8fd08a","p":3.2,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.75,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"thực tiễn: điểm xuất phát + tiêu chuẩn chân lý","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "cog-process": {"title":"Mô phỏng · Quá trình nhận thức","camDist":18,"caption":"Từ trực quan sinh động đến tư duy trừu tượng, rồi từ tư duy trừu tượng trở về thực tiễn — vòng xoáy không dứt.","spec":{"period":13,"phases":[{"at":0,"caption":"Từ <b>trực quan sinh động</b>: mắt thấy táo rụng, tai nghe tiếng rơi — vô số sự kiện rời rạc đập vào giác quan."},{"at":0.4,"caption":"Đến <b>tư duy trừu tượng</b>: bộ não khái quát — không phải quả táo, mà <b>mọi vật</b> đều bị hút xuống. Hình thành khái niệm, quy luật."},{"at":0.72,"caption":"Rồi <b>trở về thực tiễn</b>: dùng quy luật tính quỹ đạo, xây đập, phóng vệ tinh. Nhận thức là <b>vòng xoáy</b> — mỗi vòng ở trình độ cao hơn."}],"parts":[{"shape":"person","pos":[-4.8,-1.4,0],"facing":1,"label":{"t":"quan sát","p":2.8,"s":0.65},"phases":[{"at":0}]},{"shape":"sphere","pos":[-2.8,2,0],"color":15222861,"scale":0.35,"phases":[{"at":0,"pos":[-2.8,2,0]},{"at":0.3,"pos":[-2.8,-0.6,0]}]},{"shape":"label","pos":[-2.8,2.6,0],"text":"táo rụng","textColor":"#ff8f88","scale":0.55,"phases":[{"at":0},{"at":0.3,"hide":true}]},{"shape":"sphere","color":15920610,"scale":0.14,"motion":{"type":"flow","a":[-3.4,0.4,0],"b":[-0.6,0.8,0],"speed":0.3,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15920610,"scale":0.14,"motion":{"type":"flow","a":[-3.2,-0.4,0],"b":[-0.6,0.4,0],"speed":0.3,"phase":0.4,"fade":true},"phases":[{"at":0}]},{"shape":"ico","pos":[0,0.6,0],"color":14647200,"scale":1.1,"motion":{"type":"pulse","amp":0.1,"speed":2},"label":{"t":"tư duy trừu tượng","c":"#f2c7d6","p":2.1,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false}]},{"shape":"sphere","color":15250765,"scale":0.15,"motion":{"type":"flow","a":[0.8,0.4,0],"b":[3.8,-0.2,0],"speed":0.3,"phase":0.2,"fade":true},"phases":[{"at":0}]},{"shape":"person","pos":[4.6,-1.4,0],"facing":-1,"label":{"t":"thực tiễn","c":"#e8b54d","p":2.8,"s":0.65},"phases":[{"at":0}]},{"shape":"octa","pos":[4.6,1.2,0],"color":8308976,"scale":0.5,"motion":{"type":"orbit","r":0.9,"speed":1.8},"label":{"t":"vệ tinh","c":"#7ec8f0","p":1.8,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.72,"hide":false}]},{"shape":"ring","r":5.4,"color":15250765,"opacity":0.35,"tiltX":1.25,"label":{"t":"vòng xoáy nhận thức","c":"#e8b54d","p":0.8,"s":0.55},"phases":[{"at":0,"hide":true},{"at":0.78,"hide":false}]}]},"type":"spec"},
  "cog-sensuous": {"title":"Mô phỏng · Nhận thức cảm tính","camDist":17,"caption":"Cảm giác, tri giác, biểu tượng — nhận thức trực tiếp bề ngoài của sự vật.","spec":{"period":13,"phases":[{"at":0,"caption":"<b>Cảm giác</b> — phản ánh <b>từng thuộc tính riêng lẻ</b>: mắt thấy màu đỏ, mũi ngửi hương thơm, lưỡi nếm vị ngọt."},{"at":0.4,"caption":"<b>Tri giác</b>: các cảm giác kết hợp lại thành <b>hình ảnh trọn vẹn</b> — đó là một quả táo."},{"at":0.72,"caption":"Nhắm mắt vẫn nhớ hình ảnh ấy — <b>biểu tượng</b>. Nhận thức cảm tính mới cho ta <b>bề ngoài</b>, chưa nắm được bản chất: cần tiến lên nhận thức lý tính."}],"parts":[{"shape":"sphere","pos":[-3,0,0],"color":15222861,"emissive":0.35,"scale":1.2,"motion":{"type":"pulse","amp":0.05},"label":{"t":"quả táo","c":"#ff8f88","p":2.1,"s":0.7},"phases":[{"at":0}]},{"shape":"sphere","pos":[-1.2,2,0],"color":15222861,"scale":0.32,"motion":{"type":"pulse","amp":0.2,"speed":3},"label":{"t":"màu đỏ","c":"#ff8f88","p":1.2,"s":0.6},"phases":[{"at":0}]},{"shape":"sphere","pos":[-0.4,2.7,0],"color":7061337,"scale":0.32,"motion":{"type":"pulse","amp":0.2,"speed":3,"phase":1},"label":{"t":"hương thơm","c":"#8fd08a","p":1.2,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.12,"hide":false}]},{"shape":"sphere","pos":[0.5,2.1,0],"color":15250765,"scale":0.32,"motion":{"type":"pulse","amp":0.2,"speed":3,"phase":2},"label":{"t":"vị ngọt","c":"#e8b54d","p":1.2,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.22,"hide":false}]},{"shape":"person","pos":[4.2,-0.8,0],"facing":-1,"label":{"t":"giác quan","p":2.8,"s":0.65},"phases":[{"at":0}]},{"shape":"arrow","pos":[-1.4,1,0],"rotation":[0,0,-1.1],"color":15920610,"len":1.2,"phases":[{"at":0,"hide":true},{"at":0.1,"hide":false}]},{"shape":"sphere","pos":[2,1,0],"color":15222861,"scale":0.85,"opacity":0.9,"motion":{"type":"bob","amp":0.1},"label":{"t":"tri giác: quả táo","c":"#ff8f88","p":1.9,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false}]},{"shape":"sphere","pos":[2,1,0],"color":15222861,"scale":0.85,"opacity":0.3,"motion":{"type":"bob","amp":0.15},"label":{"t":"biểu tượng: hình ảnh trong trí nhớ","c":"#c9d4e8","p":1.9,"s":0.55},"phases":[{"at":0,"hide":true},{"at":0.72,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"bề ngoài đã rõ — bản chất còn phải tìm ở nhận thức lý tính","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "cog-rational": {"title":"Mô phỏng · Nhận thức lý tính","camDist":17,"caption":"Khái niệm, phán đoán, suy luận — từ tài liệu cảm tính, tư duy trừu tượng nắm lấy bản chất, quy luật.","spec":{"period":13,"phases":[{"at":0,"caption":"Vô số sự kiện rời rạc: táo rơi, lá rụng, mưa trút xuống… — <b>tài liệu cảm tính</b> còn lộn xộn."},{"at":0.4,"caption":"Tư duy <b>trừu tượng hóa, khái quát hóa</b>: gạt bỏ cái ngẫu nhiên, giữ lại cái lặp lại — 'mọi vật đều rơi xuống'."},{"at":0.72,"caption":"Hình thành <b>khái niệm, phán đoán, suy luận</b> → nắm được <b>quy luật</b> (vạn vật hấp dẫn). Nhận thức lý tính đi sâu vào bản chất."}],"parts":[{"shape":"sphere","pos":[-5,2,0],"color":15222861,"scale":0.3,"phases":[{"at":0,"pos":[-5,2,0]},{"at":0.35,"pos":[-1,0.5,0]}]},{"shape":"ico","pos":[-5.4,0.4,0],"color":7061337,"scale":0.28,"phases":[{"at":0,"pos":[-5.4,0.4,0]},{"at":0.4,"pos":[-1,0.1,0]}]},{"shape":"octa","pos":[-4.8,-1.4,0],"color":15250765,"scale":0.28,"phases":[{"at":0,"pos":[-4.8,-1.4,0]},{"at":0.45,"pos":[-1,-0.3,0]}]},{"shape":"sphere","pos":[-5.2,-2.6,0],"color":3112918,"scale":0.3,"phases":[{"at":0,"pos":[-5.2,-2.6,0]},{"at":0.5,"pos":[-1,-0.7,0]}]},{"shape":"label","pos":[-4.6,3,0],"text":"táo rơi, lá rụng, mưa sa…","textColor":"#c9d4e8","scale":0.55,"phases":[{"at":0},{"at":0.5,"hide":true}]},{"shape":"ico","pos":[0.2,0.2,0],"color":14647200,"scale":1.2,"motion":{"type":"pulse","amp":0.08,"speed":2},"label":{"t":"tư duy trừu tượng","c":"#f2c7d6","p":2.2,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false}]},{"shape":"label","pos":[0.2,-1.6,0],"text":"trừu tượng hóa · khái quát hóa","textColor":"#c9b6f0","scale":0.55,"phases":[{"at":0,"hide":true},{"at":0.42,"hide":false}]},{"shape":"arrow","pos":[2,0,0],"rotation":[0,0,-1.57],"color":15920610,"len":1.4,"phases":[{"at":0,"hide":true},{"at":0.6,"hide":false}]},{"shape":"sphere","pos":[4.2,0.2,0],"color":15250765,"emissive":0.7,"scale":1,"motion":{"type":"pulse"},"label":{"t":"quy luật","c":"#e8b54d","p":2,"s":0.75},"phases":[{"at":0,"hide":true},{"at":0.72,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"khái niệm → phán đoán → suy luận → bản chất, quy luật","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "cog-return-practice": {"title":"Mô phỏng · Nhận thức trở về thực tiễn","camDist":17,"caption":"Tri thức phải quay về chỉ đạo thực tiễn — thực tiễn là tiêu chuẩn của chân lý.","spec":{"period":12,"phases":[{"at":0,"caption":"Có <b>bản vẽ cây cầu</b> trong tay (tri thức) — nhưng tri thức mới chỉ tồn tại trên giấy, chưa hoàn tất sứ mệnh."},{"at":0.4,"caption":"Tri thức <b>quay về chỉ đạo thực tiễn</b>: người kỹ sư đem bản vẽ ra công trường — cầu được xây theo đúng tính toán."},{"at":0.75,"caption":"Cầu đứng vững cho xe chạy qua — <b>thực tiễn kiểm nghiệm chân lý</b>: đúng thì đứng vững, sai thì sụp đổ."}],"parts":[{"shape":"box","pos":[-4.6,0.6,0],"color":8308976,"scale":0.9,"motion":{"type":"bob","amp":0.15},"label":{"t":"bản vẽ (tri thức)","c":"#7ec8f0","p":1.9,"s":0.65},"phases":[{"at":0}]},{"shape":"person","pos":[-2.2,-1.6,0],"facing":1,"label":{"t":"kỹ sư","p":2.8,"s":0.6},"phases":[{"at":0,"pos":[-2.2,-1.6,0]},{"at":0.4,"pos":[0.6,-1.6,0]}]},{"shape":"sphere","color":15250765,"scale":0.16,"motion":{"type":"flow","a":[-3.6,1,0],"b":[-0.5,0.4,0],"speed":0.25,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.14,"motion":{"type":"flow","a":[-3.4,0.6,0],"b":[0,0.1,0],"speed":0.25,"phase":0.5,"fade":true},"phases":[{"at":0}]},{"shape":"box","pos":[0.4,-2.6,0],"color":10134450,"scale":0.7,"phases":[{"at":0,"hide":true},{"at":0.45,"hide":false}]},{"shape":"box","pos":[3.4,-2.6,0],"color":10134450,"scale":0.7,"phases":[{"at":0,"hide":true},{"at":0.5,"hide":false}]},{"shape":"box","pos":[1.9,-1.7,0],"color":9071178,"scale":1.6,"label":{"t":"cây cầu","c":"#e8b54d","p":1.4,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.55,"hide":false}]},{"shape":"ico","pos":[1.9,-0.9,0],"color":7061337,"scale":0.45,"motion":{"type":"orbit","r":1.6,"speed":2},"label":{"t":"xe qua cầu","p":1.3,"s":0.55},"phases":[{"at":0,"hide":true},{"at":0.75,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"thực tiễn là tiêu chuẩn của chân lý","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "hist-productive-force": {"title":"Mô phỏng · Lực lượng sản xuất","camDist":17,"caption":"Người lao động và tư liệu lao động — yếu tố cách mạng nhất, luôn vận động đi lên.","spec":{"period":13,"phases":[{"at":0,"caption":"Lực lượng sản xuất = <b>người lao động + tư liệu lao động</b>. Thời thủ công: lưỡi cuốc, sức người — năng suất thấp."},{"at":0.35,"caption":"Đại công nghiệp: <b>máy hơi nước</b> ra đời — sức máy thay sức người, năng suất nhảy vọt."},{"at":0.7,"caption":"Thời đại <b>tự động hóa, trí tuệ nhân tạo</b>: robot làm việc không nghỉ. Lực lượng sản xuất là yếu tố <b>cách mạng nhất</b>, luôn vận động đi lên."}],"parts":[{"shape":"person","pos":[-2.2,-1.6,0],"facing":1,"label":{"t":"người lao động","c":"#e8b54d","p":2.9,"s":0.65},"phases":[{"at":0}]},{"shape":"cone","pos":[2.8,-1.2,0],"rotation":[0,0,2.6],"color":10450755,"scale":1,"label":{"t":"cuốc cày","p":2,"s":0.6},"phases":[{"at":0,"hide":false},{"at":0.35,"pos":[2.8,-3,0],"scale":0.4,"opacity":0.35}]},{"shape":"cyl","pos":[2.8,-1,0],"color":5661038,"scale":1.2,"label":{"t":"máy hơi nước","p":2.1,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.35,"hide":false},{"at":0.7,"pos":[2.8,-3,0],"scale":0.4,"opacity":0.35}]},{"shape":"sphere","color":10134450,"scale":0.18,"motion":{"type":"flow","a":[2.8,0.4,0],"b":[2.8,2.2,0],"speed":0.5,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"ico","pos":[2.8,-0.9,0],"color":8308976,"scale":1,"motion":{"type":"spin","speed":1.4},"label":{"t":"robot · AI","c":"#7ec8f0","p":2,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.7,"hide":false}]},{"shape":"arrow","pos":[-4.6,-0.4,0],"color":7061337,"len":2.2,"label":{"t":"luôn đi lên","c":"#8fd08a","p":3,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.2,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"yếu tố cách mạng nhất — luôn vận động đi lên","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "hist-relations": {"title":"Mô phỏng · Quan hệ sản xuất","camDist":16,"caption":"Quan hệ giữa người với người trong sản xuất — bị lực lượng sản xuất quyết định.","spec":{"period":12,"phases":[{"at":0,"caption":"<b>Quan hệ sản xuất</b>: ai <b>sở hữu</b> tư liệu sản xuất, ai <b>tổ chức</b> sản xuất, sản phẩm <b>phân phối</b> thế nào."},{"at":0.4,"caption":"Hai bánh răng <b>ăn khớp</b> thì guồng máy chạy trơn tru — quan hệ sản xuất <b>phù hợp</b> với trình độ lực lượng sản xuất thì thúc đẩy phát triển."},{"at":0.75,"caption":"Lực lượng sản xuất lớn lên mà quan hệ cũ không đổi → <b>kìm hãm, kẹt cứng</b> — sớm muộn quan hệ cũ cũng bị thay thế."}],"parts":[{"shape":"cyl","pos":[-3.6,1.4,0],"color":15250765,"scale":0.55,"motion":{"type":"spin","axis":"y","speed":2},"label":{"t":"sở hữu","c":"#e8b54d","p":1.7,"s":0.6},"phases":[{"at":0}]},{"shape":"cyl","pos":[0,1.4,0],"color":8308976,"scale":0.55,"motion":{"type":"spin","axis":"y","speed":2,"phase":1},"label":{"t":"tổ chức","c":"#7ec8f0","p":1.7,"s":0.6},"phases":[{"at":0}]},{"shape":"cyl","pos":[3.6,1.4,0],"color":7061337,"scale":0.55,"motion":{"type":"spin","axis":"y","speed":2,"phase":2},"label":{"t":"phân phối","c":"#8fd08a","p":1.7,"s":0.6},"phases":[{"at":0}]},{"shape":"label","pos":[0,3.2,0],"text":"ba mặt của quan hệ sản xuất","textColor":"#c9d4e8","scale":0.58,"phases":[{"at":0}]},{"shape":"torus","pos":[-1.5,-1.2,0],"color":7061337,"scale":0.9,"motion":{"type":"spin","axis":"z","speed":1.6},"label":{"t":"lực lượng sản xuất","c":"#8fd08a","p":-1.9,"s":0.55},"phases":[{"at":0}]},{"shape":"torus","pos":[1.5,-1.2,0],"color":9072586,"scale":0.9,"motion":{"type":"spin","axis":"z","speed":-1.6},"label":{"t":"quan hệ sản xuất","c":"#c9b6f0","p":-1.9,"s":0.55},"phases":[{"at":0}]},{"shape":"label","pos":[0,-3.9,0],"text":"ăn khớp → cùng chuyển động","textColor":"#e8b54d","scale":0.58,"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false},{"at":0.75,"label":"lệch nhịp → kìm hãm, phải thay thế","color":"#ff8f88"}]}]},"type":"spec"},
  "hist-base-superstructure": {"title":"Mô phỏng · Cơ sở hạ tầng và kiến trúc thượng tầng","camDist":17,"caption":"Cơ sở hạ tầng (kinh tế) quyết định kiến trúc thượng tầng (chính trị, pháp quyền, tư tưởng).","spec":{"period":13,"phases":[{"at":0,"caption":"<b>Cơ sở hạ tầng</b> — nền móng: toàn bộ quan hệ sản xuất hợp thành <b>nền kinh tế</b> của xã hội (công xưởng, nông trại, chợ)."},{"at":0.4,"caption":"Trên nền móng dựng lên <b>kiến trúc thượng tầng</b>: tòa nhà <b>nhà nước</b>, cán cân <b>pháp luật</b>, ngọn cờ <b>tư tưởng</b>."},{"at":0.72,"caption":"Cơ sở hạ tầng <b>quyết định</b> kiến trúc thượng tầng: <b>nền móng lay thì cả tòa nhà rung chuyển</b>; kiến trúc thượng tầng cũng tác động trở lại."}],"parts":[{"shape":"box","pos":[0,-2.6,0],"color":6968890,"scale":3,"label":{"t":"cơ sở hạ tầng (kinh tế)","c":"#e8b54d","p":-1.5,"s":0.6},"phases":[{"at":0,"rotation":[0,0,0]},{"at":0.75,"rotation":[0,0,-0.12]}]},{"shape":"cyl","pos":[-3.4,-2.2,0],"color":9071178,"scale":0.5,"phases":[{"at":0}]},{"shape":"cyl","pos":[3.4,-2.2,0],"color":9071178,"scale":0.5,"phases":[{"at":0}]},{"shape":"cyl","pos":[-1.6,-0.6,0],"color":10134450,"scale":0.6,"motion":{"type":"bob","amp":0.08},"label":{"t":"nhà nước","p":1.7,"s":0.55},"phases":[{"at":0,"hide":true},{"at":0.4,"hide":false},{"at":0.75,"rotation":[0,0,-0.15]}]},{"shape":"cyl","pos":[0,-0.6,0],"color":10134450,"scale":0.6,"motion":{"type":"bob","amp":0.08,"phase":1},"label":{"t":"pháp luật","c":"#7ec8f0","p":1.7,"s":0.55},"phases":[{"at":0,"hide":true},{"at":0.45,"hide":false},{"at":0.75,"rotation":[0,0,-0.15]}]},{"shape":"cyl","pos":[1.6,-0.6,0],"color":10134450,"scale":0.6,"motion":{"type":"bob","amp":0.08,"phase":2},"label":{"t":"tư tưởng","c":"#c9b6f0","p":1.7,"s":0.55},"phases":[{"at":0,"hide":true},{"at":0.5,"hide":false},{"at":0.75,"rotation":[0,0,-0.15]}]},{"shape":"box","pos":[0,0.9,0],"color":3752282,"scale":1.1,"motion":{"type":"bob","amp":0.12},"label":{"t":"kiến trúc thượng tầng","c":"#7ec8f0","p":1.8,"s":0.6},"phases":[{"at":0,"hide":true},{"at":0.55,"hide":false},{"at":0.75,"pos":[0.3,0.8,0],"rotation":[0,0,-0.15]}]},{"shape":"label","pos":[0,-4,0],"text":"nền móng lay — cả tòa nhà rung chuyển","textColor":"#ff8f88","scale":0.58,"phases":[{"at":0,"hide":true},{"at":0.78,"hide":false}]}]},"type":"spec"},
  "hist-sos-form": {"title":"Mô phỏng · Hình thái kinh tế – xã hội","camDist":19,"caption":"Lịch sử là sự thay thế kế tiếp của các hình thái kinh tế – xã hội từ thấp đến cao.","spec":{"period":14,"phases":[{"at":0,"caption":"Mỗi <b>hình thái kinh tế – xã hội</b> là một nấc thang lịch sử — kết cấu từ lực lượng sản xuất, quan hệ sản xuất và kiến trúc thượng tầng."},{"at":0.3,"caption":"Chúng <b>thay thế nhau theo quy luật</b>: cộng sản nguyên thủy → chiếm hữu nô lệ → phong kiến → tư bản chủ nghĩa…"},{"at":0.8,"caption":"…tiến lên <b>cộng sản chủ nghĩa</b>. Sự phát triển của xã hội là <b>quá trình lịch sử – tự nhiên</b>, không phụ thuộc ý chí chủ quan."}],"parts":[{"shape":"box","pos":[-5.2,-2.4,0],"color":9071178,"scale":0.8,"label":{"t":"nguyên thủy","p":1.35,"s":0.5},"phases":[{"at":0}]},{"shape":"box","pos":[-2.6,-1.6,0],"color":10134450,"scale":0.9,"label":{"t":"nô lệ","p":1.4,"s":0.5},"phases":[{"at":0}]},{"shape":"box","pos":[0,-0.7,0],"color":15222861,"scale":1,"label":{"t":"phong kiến","p":1.45,"s":0.5},"phases":[{"at":0}]},{"shape":"box","pos":[2.6,0.3,0],"color":3752282,"scale":1.1,"label":{"t":"tư bản","p":1.5,"s":0.5},"phases":[{"at":0}]},{"shape":"box","pos":[5.2,1.4,0],"color":4165226,"scale":1.2,"label":{"t":"cộng sản","c":"#8fd08a","p":1.55,"s":0.55},"phases":[{"at":0}]},{"shape":"line","points":[[-5.2,-1.4,0],[-2.6,-0.6,0]],"color":15250765,"opacity":0.8,"phases":[{"at":0,"hide":true},{"at":0.2,"hide":false}]},{"shape":"line","points":[[-2.6,-0.6,0],[0,0.3,0]],"color":15250765,"opacity":0.8,"phases":[{"at":0,"hide":true},{"at":0.35,"hide":false}]},{"shape":"line","points":[[0,0.3,0],[2.6,1.3,0]],"color":15250765,"opacity":0.8,"phases":[{"at":0,"hide":true},{"at":0.5,"hide":false}]},{"shape":"line","points":[[2.6,1.3,0],[5.2,2.4,0]],"color":15250765,"opacity":0.8,"phases":[{"at":0,"hide":true},{"at":0.65,"hide":false}]},{"shape":"person","pos":[-5.2,-0.8,0],"facing":1,"scale":0.7,"phases":[{"at":0,"pos":[-5.2,-0.8,0]},{"at":0.25,"pos":[-2.6,0.1,0]},{"at":0.45,"pos":[0,1.1,0]},{"at":0.65,"pos":[2.6,2.1,0]},{"at":0.8,"pos":[5.2,3.2,0]}]},{"shape":"octa","pos":[5.2,4.2,0],"color":15250765,"emissive":0.7,"scale":0.55,"motion":{"type":"spin","speed":1.5},"phases":[{"at":0,"hide":true},{"at":0.8,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"quá trình lịch sử – tự nhiên, từ thấp đến cao","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "hist-class-struggle": {"title":"Mô phỏng · Đấu tranh giai cấp","camDist":18,"caption":"Hai giai cấp đối kháng giằng co; đỉnh điểm là cách mạng — xã hội cũ bị thay thế.","spec":{"period":12,"phases":[{"at":0,"caption":"Trong xã hội có giai cấp: một bên <b>sở hữu</b> tư liệu sản xuất, một bên <b>làm thuê</b> — lợi ích <b>đối kháng</b> không thể điều hòa."},{"at":0.35,"caption":"<b>Đấu tranh giai cấp</b> bùng nổ — hai bên giằng co quyết liệt, mâu thuẫn ngày càng gay gắt."},{"at":0.72,"caption":"Đỉnh cao là <b>cách mạng xã hội</b>: xã hội cũ bị lật đổ, <b>hình thái kinh tế – xã hội mới</b> ra đời."}],"parts":[{"shape":"person","pos":[-3.4,-1.4,0],"color":15222861,"facing":1,"motion":{"type":"bob","amp":0.18,"speed":2.5},"label":{"t":"bị trị","c":"#ff8f88","p":2.8,"s":0.65},"phases":[{"at":0,"pos":[-3.4,-1.4,0]},{"at":0.35,"pos":[-2.6,-1.4,0]},{"at":0.72,"pos":[-0.8,-1.4,0]}]},{"shape":"person","pos":[3.4,-1.4,0],"color":3752282,"facing":-1,"motion":{"type":"bob","amp":0.18,"speed":2.5,"phase":1.3},"label":{"t":"thống trị","c":"#7ec8f0","p":2.8,"s":0.65},"phases":[{"at":0,"pos":[3.4,-1.4,0]},{"at":0.35,"pos":[2.6,-1.4,0]},{"at":0.72,"pos":[4.6,-1.4,0],"scale":0.7,"opacity":0.5}]},{"shape":"cyl","pos":[0,-1.6,0],"rotation":[0,0,1.57],"color":9071178,"scale":0.9,"phases":[{"at":0},{"at":0.35,"scale":1.1},{"at":0.72,"pos":[0,-2.6,0],"scale":0.5,"opacity":0.4}]},{"shape":"label","pos":[0,-3.4,0],"text":"giằng co","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0,"hide":true},{"at":0.35,"hide":false},{"at":0.72,"hide":true}]},{"shape":"sphere","pos":[0,1.4,0],"color":15222861,"emissive":0.8,"scale":0.75,"motion":{"type":"pulse","amp":0.2,"speed":3},"label":{"t":"cách mạng","c":"#ff8f88","p":1.9,"s":0.7},"phases":[{"at":0,"hide":true},{"at":0.72,"hide":false}]},{"shape":"octa","pos":[0,3.2,0],"color":15250765,"emissive":0.7,"scale":0.6,"motion":{"type":"spin","speed":1.5},"label":{"t":"xã hội mới","c":"#e8b54d","p":1.7,"s":0.65},"phases":[{"at":0,"hide":true},{"at":0.82,"hide":false}]},{"shape":"label","pos":[0,-3.8,0],"text":"đỉnh cao của đấu tranh giai cấp là cách mạng xã hội","textColor":"#c9d4e8","scale":0.6,"phases":[{"at":0}]}]},"type":"spec"},
  "hist-cmv": {"title":"Mô phỏng · Quần chúng nhân dân sáng tạo lịch sử","camDist":18,"caption":"Quần chúng nhân dân — những người lao động — là chủ thể sáng tạo lịch sử: làm ra của cải, văn hóa và cách mạng.","spec":{"period":12,"phases":[{"at":0,"caption":"<b>Quần chúng nhân dân</b> — đông đảo người lao động — làm ra mọi của cải vật chất và tinh thần của xã hội."},{"at":0.4,"caption":"Họ là <b>động lực của lịch sử</b>: phát triển lực lượng sản xuất, sáng tạo văn hóa, là lực lượng của mọi cuộc cách mạng."},{"at":0.75,"caption":"<b>Quần chúng là chủ thể sáng tạo lịch sử</b>. Cá nhân kiệt xuất có vai trò lớn, nhưng chỉ phát huy được khi dựa vào quần chúng."}],"parts":[{"shape":"person","pos":[0,-1.8,0],"color":15222861,"scale":1.05,"motion":{"type":"bob","amp":0.12},"phases":[{"at":0}]},{"shape":"person","pos":[-2.2,-1.8,0],"color":15222861,"scale":0.9,"motion":{"type":"bob","amp":0.12,"phase":0.7},"phases":[{"at":0,"pos":[-2.2,-1.8,0]},{"at":0.4,"pos":[-1.4,-1.8,0]}]},{"shape":"person","pos":[2.2,-1.8,0],"color":15222861,"scale":0.9,"motion":{"type":"bob","amp":0.12,"phase":1.4},"phases":[{"at":0,"pos":[2.2,-1.8,0]},{"at":0.4,"pos":[1.4,-1.8,0]}]},{"shape":"person","pos":[-4.2,-1.8,0],"color":15222861,"scale":0.75,"motion":{"type":"bob","amp":0.12,"phase":2.1},"phases":[{"at":0,"pos":[-4.2,-1.8,0]},{"at":0.4,"pos":[-2.5,-1.8,0]}]},{"shape":"person","pos":[4.2,-1.8,0],"color":15222861,"scale":0.75,"motion":{"type":"bob","amp":0.12,"phase":2.8},"phases":[{"at":0,"pos":[4.2,-1.8,0]},{"at":0.4,"pos":[2.5,-1.8,0]}]},{"shape":"label","pos":[0,-3.3,0],"text":"người lao động — đông đảo, sáng tạo","textColor":"#e8b54d","scale":0.58,"phases":[{"at":0}]},{"shape":"cyl","pos":[-5,1,0],"color":5661038,"scale":0.7,"motion":{"type":"spin","axis":"y","speed":1},"label":{"t":"sản xuất","p":1.8,"s":0.55},"phases":[{"at":0}]},{"shape":"ico","pos":[5,1,0],"color":9072586,"scale":0.6,"motion":{"type":"bob","amp":0.2},"label":{"t":"văn hóa","c":"#c9b6f0","p":1.6,"s":0.55},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.14,"motion":{"type":"flow","a":[0,0.2,0],"b":[0,2.6,0],"speed":0.35,"phase":0,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.14,"motion":{"type":"flow","a":[-1.2,0.2,0],"b":[0,2.6,0],"speed":0.3,"phase":0.4,"fade":true},"phases":[{"at":0}]},{"shape":"sphere","color":15250765,"scale":0.14,"motion":{"type":"flow","a":[1.2,0.2,0],"b":[0,2.6,0],"speed":0.3,"phase":0.8,"fade":true},"phases":[{"at":0}]},{"shape":"octa","pos":[0,3.2,0],"color":15250765,"emissive":0.9,"scale":0.9,"motion":{"type":"spin","speed":1.3},"label":{"t":"lịch sử do quần chúng sáng tạo","c":"#e8b54d","p":1.9,"s":0.7},"phases":[{"at":0,"hide":true},{"at":0.75,"hide":false}]}]},"type":"spec"},
  // 3) Quy luật phủ định của phủ định
  negation: {
    title: "Mô phỏng · Quy luật phủ định của phủ định",
    caption: "Hạt (khẳng định) → cây (phủ định) → hạt mới nhiều hơn, tốt hơn (phủ định của phủ định). Điểm cuối ở <b>cao hơn</b> điểm đầu nhưng cùng hướng: sự phát triển đi theo đường <b>xoáy ốc</b>, không phải vòng tròn khép kín.",
    type: "negation",
    palette: [0x6bbf59, 0x3f8e6a, 0xe8b54d],
    camDist: 20
  }
};

/* =====================================================================
   ĐƯỜNG THỜI GIAN LỊCH SỬ HÌNH THÀNH CHỦ NGHĨA MÁC–LÊNIN
   ===================================================================== */
const TIMELINE = {
  title: "Lịch sử hình thành chủ nghĩa Mác–Lênin",
  intro: "Chủ nghĩa Mác–Lênin là hệ thống quan điểm khoa học do C. Mác, Ph. Ăngghen xây dựng và được V.I. Lênin phát triển từ ba nguồn gốc lý luận: triết học cổ điển Đức, kinh tế chính trị học Anh và chủ nghĩa xã hội không tưởng Pháp.",
  eras: [
    {
      era: "1818 – 1848",
      label: "Hình thành",
      color: 0x8a7d5a,
      items: [
        { year: "1818", title: "C. Mác ra đời", text: "Karl Marx sinh ngày 5/5/1818 tại Trier, Vương quốc Phổ (nay là Đức)." },
        { year: "1820", title: "Ph. Ăngghen ra đời", text: "Friedrich Engels sinh ngày 28/11/1820 tại Barmen, Vương quốc Phổ." },
        { year: "1841", title: "Mác bảo vệ luận án tiến sĩ", text: "Luận án về sự khác nhau giữa triết học tự nhiên của Democrite và Epicure — khởi đầu sự nghiệp triết học." },
        { year: "1844", title: "Bản thảo kinh tế – triết học", text: "Mác phê phán kinh tế học tư sản, bước đầu hình thành quan niệm duy vật lịch sử và vấn đề tha hóa lao động." },
        { year: "1845", title: "Luận cương về Feuerbach", text: "Khoảng 11 luận cương khẳng định vai trò của thực tiễn cách mạng: “Các nhà triết học mới chỉ giải thích thế giới khác nhau, song vấn đề là cải tạo thế giới.”", node: "cog-practice-basis" },
        { year: "1846", title: "Hệ tư tưởng Đức", text: "Cùng Ăngghen, Mác phê phán triết học Hêghen và Phoi-ơ-bắc, luận chứng quan niệm duy vật về lịch sử — cuộc cách mạng trong triết học.", node: "hist-sos-form" },
        { year: "1848", title: "Tuyên ngôn Đảng Cộng sản", text: "Tác phẩm cờ đầu của chủ nghĩa Mác: “Những người vô sản toàn thế giới và những người bị áp bức, hãy đoàn kết lại!”", node: "hist-class-struggle" }
      ]
    },
    {
      era: "1848 – 1883",
      label: "Triển khai & phê phán",
      color: 0xb33b3b,
      items: [
        { year: "1859", title: "Góp phần phê phán khoa kinh tế chính trị", text: "Mác trình bày những tư tưởng cơ bản về kinh tế chính trị, mở đường cho bộ Tư bản." },
        { year: "1867", title: "Tư bản · Quyển I", text: "Công trình vĩ đại nhất của Mác, phát hiện quy luật giá trị thặng dư — “mạch máu” của chủ nghĩa tư bản.", node: "hist-relations" },
        { year: "1871", title: "Công xã Paris", text: "Cuộc cách mạng vô sản đầu tiên; Mác tổng kết kinh nghiệm đấu tranh giai cấp." },
        { year: "1883", title: "C. Mác qua đời", text: "Mác mất ngày 14/3/1883 tại London; Ăngghen tiếp tục sự nghiệp biên tập, xuất bản các tác phẩm còn dang dở." }
      ]
    },
    {
      era: "1883 – 1924",
      label: "Lênin phát triển",
      color: 0xc0263a,
      items: [
        { year: "1894", title: "Tư bản · Quyển II & III được in", text: "Ăngghen biên tập, người thực hiện di nguyện của Mác." },
        { year: "1895", title: "Ph. Ăngghen qua đời", text: "Người bạn, người đồng chí vĩ đại của Mác qua đời ngày 5/8/1895; ông để lại nhiều công trình triết học quan trọng như “Chống Đuy-rinh”, “Biện chứng của tự nhiên”." },
        { year: "1902", title: "Làm gì?", text: "Lênin luận chứng sự cần thiết của đảng tiên phong cách mạng." },
        { year: "1909", title: "Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán", text: "Xuất bản năm 1909 — Lênin bảo vệ và phát triển nền tảng triết học duy vật biện chứng.", node: "material" },
        { year: "1917", title: "Cách mạng Tháng Mười Nga", text: "Thắng lợi mở ra thời đại mới, chủ nghĩa Mác từ lý luận trở thành hiện thực.", node: "hist-class-struggle" },
        { year: "1920", title: "Vấn đề dân tộc thuộc địa", text: "Lênin phát triển học thuyết cách mạng trong điều kiện các nước thuộc địa — đặt nền móng cho con đường giải phóng dân tộc." },
        { year: "1924", title: "V.I. Lênin qua đời", text: "Chủ nghĩa Mác–Lênin trở thành nền tảng tư tưởng của phong trào cộng sản quốc tế." }
      ]
    }
  ]
};
