const age3to5 = {
    animals: [
        { question: "Con nào biết leo cây?", options: [{ text: "Con cá", icon: "🐟" }, { text: "Con khỉ", icon: "🐒" }], answer: "Con khỉ" },
        { question: "Con nào gáy 'O ó o o'?", options: [{ text: "Con gà trống", icon: "🐓" }, { text: "Con gà mái", icon: "🐔" }], answer: "Con gà trống" },
        { question: "Con nào có vòi rất dài?", options: [{ text: "Con voi", icon: "🐘" }, { text: "Con chó", icon: "🐕" }], answer: "Con voi" },
        { question: "Con nào nhảy cao và có túi?", options: [{ text: "Con Kanguru", icon: "🦘" }, { text: "Con thỏ", icon: "🐇" }], answer: "Con Kanguru" },
        { question: "Con nào thích ăn mật ong?", options: [{ text: "Con gấu", icon: "🐻" }, { text: "Con mèo", icon: "🐱" }], answer: "Con gấu" }
    ],
    nature: [
        { question: "Bầu trời ban ngày màu gì?", options: [{ text: "Xanh da trời", icon: "☀️" }, { text: "Màu đen", icon: "🌑" }], answer: "Xanh da trời" },
        { question: "Cái gì chiếu sáng ban đêm?", options: [{ text: "Mặt trăng", icon: "🌙" }, { text: "Bóng đèn", icon: "💡" }], answer: "Mặt trăng" },
        { question: "Mưa rơi xuống từ đâu?", options: [{ text: "Đám mây", icon: "☁️" }, { text: "Cây xanh", icon: "🌳" }], answer: "Đám mây" }
    ],
    plants: [
        { question: "Quả gì màu đỏ hạt nhỏ?", options: [{ text: "Dâu tây", icon: "🍓" }, { text: "Chuối", icon: "🍌" }], answer: "Dâu tây" },
        { question: "Súp lơ có màu gì?", options: [{ text: "Màu xanh", icon: "🥦" }, { text: "Màu đỏ", icon: "🎈" }], answer: "Màu xanh" },
        { question: "Lá cây thường có màu gì?", options: [{ text: "Màu xanh", icon: "🍃" }, { text: "Màu hồng", icon: "🌸" }], answer: "Màu xanh" }
    ],
    landmarks: [
        { question: "Thành phố Hồ Gươm?", options: [{ text: "Hà Nội", icon: "🏙️" }, { text: "Sài Gòn", icon: "🌆" }], answer: "Hà Nội" },
        { question: "Tháp Eiffel nước nào?", options: [{ text: "Pháp", icon: "🇫🇷" }, { text: "Mỹ", icon: "🇺🇸" }], answer: "Pháp" }
    ],
    reading: [
        { question: "Đâu là chữ 🐟?", options: [{ text: "CÁ", icon: "" }, { text: "ÁC", icon: "" }], answer: "CÁ", speechPrompt: "Đâu là chữ cá" },
        { question: "Đâu là chữ 🐘?", options: [{ text: "VOI", icon: "" }, { text: "VÒI", icon: "" }], answer: "VOI", speechPrompt: "Đâu là chữ voi" },
        { question: "Đâu là chữ 🐣?", options: [{ text: "GÀ", icon: "" }, { text: "CÁ", icon: "" }], answer: "GÀ", speechPrompt: "Đâu là chữ gà" }
    ]
};

const age6to10 = {
    animals: [
        { question: "Loài động vật nào là lớn nhất thế giới hiện nay?", options: [{ text: "Cá voi xanh", icon: "🐋" }, { text: "Voi Châu Phi", icon: "🐘" }], answer: "Cá voi xanh" },
        { question: "Con gì là biểu tượng của nước Úc (Australia)?", options: [{ text: "Chuột túi", icon: "🦘" }, { text: "Gấu Koala", icon: "🐨" }], answer: "Chuột túi" },
        { question: "Bốn chân như cột đình, hai tai như hai cái quạt, là con gì?", options: [{ text: "Con voi", icon: "🐘" }, { text: "Con hà mã", icon: "🦛" }], answer: "Con voi" },
        { question: "Loài chim nào không biết bay và sống ở Nam Cực?", options: [{ text: "Chim cánh cụt", icon: "🐧" }, { text: "Đà điểu", icon: "🐦" }], answer: "Chim cánh cụt" },
        { question: "Ốc sên di chuyển bằng bộ phận nào?", options: [{ text: "Bàn chân bụng", icon: "🐌" }, { text: "Vây", icon: "🐟" }], answer: "Bàn chân bụng" }
    ],
    nature: [
        { question: "Ngọn núi cao nhất thế giới nằm ở dãy Himalaya tên là?", options: [{ text: "Everest", icon: "🏔️" }, { text: "Phú Sĩ", icon: "🗻" }], answer: "Everest" },
        { question: "Hiện tượng nước biển dâng lên và hạ xuống hàng ngày gọi là?", options: [{ text: "Thủy triều", icon: "🌊" }, { text: "Sóng thần", icon: "🌪️" }], answer: "Thủy triều" },
        { question: "Trái đất quay quanh hành tinh nào?", options: [{ text: "Mặt trời", icon: "☀️" }, { text: "Mặt trăng", icon: "🌙" }], answer: "Mặt trời" },
        { question: "Chất khí nào cần thiết cho sự sống của con người?", options: [{ text: "Oxy", icon: "🌬️" }, { text: "Nitơ", icon: "☁️" }], answer: "Oxy" }
    ],
    plants: [
        { question: "Quá trình cây xanh dùng ánh sáng để tạo thức ăn gọi là gì?", options: [{ text: "Quang hợp", icon: "🌱" }, { text: "Hô hấp", icon: "🌬️" }], answer: "Quang hợp" },
        { question: "Hoa gì tượng trưng cho quốc hoa của Việt Nam?", options: [{ text: "Hoa Sen", icon: "🪷" }, { text: "Hoa Mai", icon: "🌼" }], answer: "Hoa Sen" },
        { question: "Củ khoai tây thực chất là bộ phận nào của cây?", options: [{ text: "Thân củ", icon: "🥔" }, { text: "Rễ củ", icon: "🍠" }], answer: "Thân củ" }
    ],
    landmarks: [
        { question: "Vạn Lý Trường Thành là công trình vĩ đại của nước nào?", options: [{ text: "Trung Quốc", icon: "🇨🇳" }, { text: "Hàn Quốc", icon: "🇰🇷" }], answer: "Trung Quốc" },
        { question: "Tượng Nữ thần Tự do nằm ở thành phố nào của nước Mỹ?", options: [{ text: "New York", icon: "🗽" }, { text: "Washington", icon: "🏛️" }], answer: "New York" },
        { question: "Kỳ quan thiên nhiên thế giới nào nằm ở tỉnh Quảng Ninh?", options: [{ text: "Vịnh Hạ Long", icon: "🚢" }, { text: "Phong Nha", icon: "⛰️" }], answer: "Vịnh Hạ Long" }
    ],
    reading: [
        { question: "Từ nào viết đúng chính tả?", options: [{ text: "HỌC TẬP", icon: "" }, { text: "HỌC TẬP", icon: "" }], answer: "HỌC TẬP", speechPrompt: "Đâu là từ học tập" },
        { question: "Từ nào chỉ hoạt động giúp đỡ cha mẹ?", options: [{ text: "QUÉT NHÀ", icon: "" }, { text: "NGỦ NƯỚNG", icon: "" }], answer: "QUÉT NHÀ", speechPrompt: "Đâu là từ quét nhà" },
        { question: "Đâu là từ chỉ một loại quả?", options: [{ text: "MĂNG CỤT", icon: "" }, { text: "MĂNG CÁ", icon: "" }], answer: "MĂNG CỤT", speechPrompt: "Đâu là từ măng cụt" }
    ]
};

// Merging for consistency
export const questionBank = {
    low: age3to5,
    high: age6to10
};
