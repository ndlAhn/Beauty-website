const express = require('express');
const router = express.Router();
const chatService = require('../service/chatService');

router.post('/chat', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question || typeof question !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Câu hỏi không hợp lệ'
      });
    }

    const result = await chatService.getChatResponse(question);
    
    if (result.success) {
      res.json({
        success: true,
        answer: result.answer,
        confidence: result.confidence
      });
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('ChatController Error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server nội bộ'
    });
  }
});

module.exports = router;
