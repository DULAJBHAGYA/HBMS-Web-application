const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET="jjhhhjhkjkhjhkjhhkhjjkj";


const app = express();
const PORT = 8000;
const DB_URL =
  'mongodb+srv://dulajupananda:Ddbu1998@mernapp.epqu3mq.mongodb.net/merncrud';

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({extended:false}));

// import routes
const postRoutes = require('./routes/posts');
const postRoutes2 = require('./routes/posts2');
const busRoutes = require('./routes/buses');
const routeRoutes = require('./routes/route');
const itemRoutes = require('./routes/Item');
const passengerRoutes = require('./routes/passengers');
const conductorRoutes = require('./routes/conductors');

// app middleware
app.use(bodyParser.json());
app.use(cors());

// route middleware
app.use(postRoutes);
app.use(postRoutes2);
app.use(busRoutes);
app.use(routeRoutes);
app.use(passengerRoutes);
app.use(conductorRoutes);
// app.use(itemRoutes);
app.use("/api/v1/items", itemRoutes);

// Define the schema for the "UserInfo" model
const userInfoSchema = new mongoose.Schema({
  fullName: String,
  userName: String,
  email: String,
  mobile: String,
  password: String,
});

// Register the "UserInfo" model with the schema
const UserInfo = mongoose.model('UserInfo', userInfoSchema);

app.post('/register', async (req, res) => {
  const { fullName, userName, email, mobile, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await UserInfo.findOne({
      $or: [{ email }, { userName }, { mobile }],
    });

    if (existingUser) {
      const errors = {};
      if (existingUser.email === email) {
        errors.email = 'Email already exists';
      }
      if (existingUser.userName === userName) {
        errors.userName = 'Username already exists';
      }
      if (existingUser.mobile === mobile) {
        errors.mobile = 'Mobile number already exists';
      }
      return res.status(409).json({ errors });
    }
    console.log(fullName, userName,email, mobile);
    await UserInfo.create({
      fullName:fullName,
      userName:userName,
      email:email,
      mobile:mobile,
      password: encryptedPassword,
    });
    res.send({ status: 'ok' });
  } catch (error) {
    res.status(500).send({ status: 'error' });
  }
});

app.post('/login-user', async (req, res) => {
  const { email, password } = req.body;

  const user = await UserInfo.findOne({ email });
  if (!user) {
    return res.json({ error: 'User not found' });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET);

    // Send the token in the response
    return res.json({ status: 'ok', token });
  }
  return res.json({ status: 'error', error: 'Invalid password' });
});

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await UserInfo.findOne({ email });
    if (!oldUser) {
      return res.json({ status: 'User does not exist' });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '5m',
    });
    const link = `http://localhost:8000/reset-password/${oldUser._id}/${token}`;
        console.log(link);
    // ... (rest of the code)
  } catch (error) {
    // ... (handle error)
  }
});

app.get('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await UserInfo.findOne({ _id: id }); // Fix: Changed User to UserInfo
  if (!oldUser) {
    return res.json({ status: 'User Not Exist!' });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", {email: verify.email})
  } catch (error) {
    console.log(error);
    res.send('Not Verified');
  }
});

app.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await UserInfo.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: 'User Not Exist!' });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await UserInfo.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.send({ status: 'Password Updated' });
  } catch (error) {
    console.log(error);
    res.json({ status: 'Something went wrong' });
  }
});

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => {
      console.log(`App is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('DB connection error', err);
  });

