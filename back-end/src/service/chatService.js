const use = require('@tensorflow-models/universal-sentence-encoder');
const tf = require('@tensorflow/tfjs');
const csv = require('csvtojson');
const path = require('path');
const cosineSimilarity = require('cosine-similarity');

class ChatService {
  constructor() {
    this.model = null;
    this.chatData = [];
    this.questionEmbeddings = [];
    this.ready = this.initialize();
  }

  async initialize() {
    this.model = await use.load();
    const filePath = path.join(__dirname, '../database/chatData.csv');
    this.chatData = await csv().fromFile(filePath);

    const sentences = this.chatData.map(item => item.question);
    const embeddings = await this.model.embed(sentences);
    this.questionEmbeddings = await embeddings.array();
  }

  async getChatResponse(userQuery) {
    try {
      await this.ready;

      const userEmbeddingTensor = await this.model.embed([userQuery]);
      const userEmbeddingArray = await userEmbeddingTensor.array();
      const userEmbedding = userEmbeddingArray[0];

      const similarities = this.questionEmbeddings.map(embedding =>
        cosineSimilarity(userEmbedding, embedding)
      );

      const bestMatchIndex = similarities.indexOf(Math.max(...similarities));
      const bestAnswer = this.chatData[bestMatchIndex]?.answer || "Xin lỗi, tôi chưa có câu trả lời phù hợp.";

      return {
        success: true,
        answer: bestAnswer,
        confidence: similarities[bestMatchIndex]
      };

    } catch (error) {
      console.error('ChatService Error:', error);
      return {
        success: false,
        answer: "Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu của bạn."
      };
    }
  }
}

module.exports = new ChatService();
