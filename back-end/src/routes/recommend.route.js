const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

router.get('/:username', (req, res) => {
    const username = req.params.username;

    // Đường dẫn tuyệt đối đến recommend.py
    const scriptPath = path.resolve(__dirname, '../database/recommend.py');

    // Encode username để tránh lỗi shell injection
    const safeUsername = `"${username.replace(/"/g, '\\"')}"`;

    // Gọi Python script và truyền username
    exec(`python3 ${scriptPath} ${safeUsername}`, (err, stdout, stderr) => {
        if (err) {
            console.error("Lỗi khi gọi recommend.py:", stderr || err.message);
            return res.status(500).json({ success: false, message: 'Lỗi khi gọi thuật toán gợi ý' });
        }

        try {
            const result = JSON.parse(stdout);
            if (result.error) {
                return res.status(404).json({ success: false, message: result.error });
            }
            return res.status(200).json({ success: true, data: result });
        } catch (e) {
            console.error("Lỗi parse JSON:", e.message);
            console.error("Dữ liệu trả về:", stdout);
            return res.status(500).json({ success: false, message: 'Kết quả không hợp lệ từ Python' });
        }
    });
});

module.exports = router;
