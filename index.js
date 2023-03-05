const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./router/auth-router');
const commonRouter = require('./router/common-router');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/api', commonRouter);

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://914033:ESHzn4WuB4FGzHrb@cluster0.zy4a3xi.mongodb.net/?retryWrites=true&w=majority');
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
