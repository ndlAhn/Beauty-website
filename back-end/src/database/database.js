const { Sequelize } = require("sequelize");

// Kết nối database SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./users.db", // File SQLite
  logging: false, // Ẩn log SQL
});

// Kiểm tra kết nối
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(" Kết nối đến database thành công!");
  } catch (error) {
    console.error("Lỗi kết nối database:", error);
  }
}
testConnection();

module.exports = sequelize;
