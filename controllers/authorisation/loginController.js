const jwt = require('jsonwebtoken');

module.exports = async function Login(req, res){
  try {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the user with the matching email
    const user = await User.findOne({ email });

    // If the user was not found, return a 401 status code with a message
    if (!user) return res.status(401).send('Invalid email or password');

    // Check if the provided password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return a 401 status code with a message
    if (!isMatch) return res.status(401).send('Invalid email or password');

    // Create a JWT using the `creatJwt` function
    const token = creatJwt(user);

    // Send the JWT in the response
    res.send({ token });
  } catch (err) {
    // If there is an error, return a 500 status code with the error message
    res.status(500).send(err.message);
  }
}

function creatJwt(user) {
  // Create a payload with the user's ID and role
  const payload = {
    id: user._id,
    role: user.role
  };

  // Sign the JWT with a secret key and an expiration time
  return jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
}