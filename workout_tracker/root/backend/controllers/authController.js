//dependencies
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//services
const authService = require('../services/authService');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    // check for an existing user
    const existingUser = await authService.existingUser(email);
    if (existingUser.rows.length !== 0) {
      return res
        .status(400)
        .json({ existing: 'There is already a user with this email' });
    }
    // check the proper name
    if (name === '') {
      return res.status(400).json({ name: 'name field can not be empty' });
    }

    // check the proper email
    if (email === '' || !emailRegex.test(email)) {
      return res.status(400).json({ email: 'not a proper email' });
    }

    // check the proper password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ password: 'password has to be at least 6 characters long' });
    }

    // if no errors -> create a new user
    const newUser = await authService.newUser(name, email, hashedPassword);

    // Set a token if registered
    const payload = { userId: newUser.rows[0].id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('access-token', token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    const userCredentials = {
      id: newUser.rows[0].id,
      name: newUser.rows[0].name,
      email: newUser.rows[0].email,
    };
    res.json(userCredentials);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await authService.existingUser(email);
    //CHECKS
    // if user does not exist
    if (existingUser.rows.length === 0) {
      return res
        .status(400)
        .json({ error: 'Something is wrong with your credentials' });
    }
    // is password is invalid
    const isValid = await bcrypt.compareSync(
      password,
      existingUser.rows[0].password
    );
    if (!isValid) {
      return res
        .status(400)
        .json({ error: 'Something is wrong with your credentials' });
    }

    //IF NO ERRORS
    const payload = { userId: existingUser.rows[0].id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('access-token', token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    // return everything except the password
    const userCredentials = {
      id: existingUser.rows[0].id,
      name: existingUser.rows[0].name,
      email: existingUser.rows[0].email,
    };
    res.json({ user: userCredentials, token: token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const currentUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unathorized');
  }
  return res.json(req.user);
};

const logout = async (req, res) => {
  try {
    res.clearCookie('access-token');
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  signup,
  login,
  currentUser,
  logout,
};
