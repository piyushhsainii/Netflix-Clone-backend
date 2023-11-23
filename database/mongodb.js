const mongoose = require('mongoose');

const connectDB = () => {
  try {
     mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = connectDB ;
