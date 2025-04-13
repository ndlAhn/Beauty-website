const sequelize = require("../database/database");
const UserModel = require("../model/user.model"); 
const User = UserModel(sequelize); // Gọi hàm để lấy model

async function createUser() {
  await sequelize.sync(); // Đảm bảo DB đã sẵn sàng

  const newUser = await User.create({
    user_id: "2",
    username: "user22",
    password: "123456",
    name: "user22",
    gender: "male",
    dob: "1990-01-01",
    role: "user",
    skin_type: "oily",
    skin_prob: "acne",
  });

  console.log("User created:", newUser.toJSON());
}

createUser();
