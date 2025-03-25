const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cấu hình kết nối database
const sequelize = new Sequelize('ten_database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  timezone: '+07:00', // Múi giờ Việt Nam
  logging: false, // Tắt log SQL
  pool: {
    max: 10, // Số kết nối tối đa
    min: 0, // Số kết nối tối thiểu
    acquire: 30000, // Thời gian tối đa (ms) để có được kết nối
    idle: 10000 // Thời gian (ms) một kết nối có thể không được sử dụng trước khi bị giải phóng
  }
});

// Kiểm tra kết nối database
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối cơ sở dữ liệu thành công.');
    // Đồng bộ hóa models (nếu cần)
    // await sequelize.sync({ force: false });
  } catch (error) {
    console.error('Không thể kết nối cơ sở dữ liệu:', error);
  }
};

// Gọi hàm kết nối
connectDatabase();

// Import routes (nếu có)
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// Cấu hình port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});

// Xuất sequelize để sử dụng trong các model
module.exports = { sequelize };