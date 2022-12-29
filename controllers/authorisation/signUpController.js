const bcrypt = require('bcryptjs');

module.exports = async function SignUp(req, res){
  try {
    // Get the email, password, and role from the request body
    const { email, password, role } = req.body;

    // Check if a user with the same email already exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).send('Email already in use');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    // Create a JWT using the `creatJwt` function
    const token = creatJwt(newUser);

    // Send the JWT in the response
    res.send({ token });
  } catch (err) {
    // If there is an error, return a 500 status code with the error message
    res.status(500).send(err.message);
  }
}