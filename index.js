const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://914033:ESHzn4WuB4FGzHrb@cluster0.zy4a3xi.mongodb.net/?retryWrites=true&w=majority'
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
