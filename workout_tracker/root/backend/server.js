require('dotenv').config();

const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: [
      'https://workout-tracker-marko.netlify.app',
      'http://localhost:3000',
      'https://www.uptimerobot.com',
    ],
  })
);

// import routes
const authRoute = require('./routes/Auth');
const addWorkoutRoute = require('./routes/AddWorkouts');
const retrieveWorkoutRoute = require('./routes/RetrieveWorkouts');
const editWorkoutRoute = require('./routes/EditWorkouts');
const retrieveNames = require('./routes/RetrieveNames');

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/auth', authRoute);
app.use('/api/auth', addWorkoutRoute);
app.use('/api/auth', retrieveWorkoutRoute);
app.use('/api/auth', editWorkoutRoute);
app.use('/api/auth', retrieveNames);

app.get('/', async (req, res) => {
  try {
    return res.status(200).json('Hello server');
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
