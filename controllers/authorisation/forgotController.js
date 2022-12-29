const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, html) {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: 'user@example.com',
      pass: 'password'
    }
  });

  // Define the email options
  const mailOptions = {
    from: '"Your App" <noreply@example.com>',
    to,
    subject,
    html
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent: ${info.messageId}`);
}

async function sendResetEmail(email) {
  // Generate a reset password token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Save the reset password token in the database
  await User.findOneAndUpdate({ email }, { resetPasswordToken: resetToken });

  // Send the reset password email to the user
  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
  const message = `Click the link to reset your password: ${resetUrl}`;
  await sendEmail(email, 'Reset your password', message);
}


module.exports = function Forgot(req, res){
  // Validate the request body
  if (!req.body.email) {
    return res.status(400).send({ error: 'Email is required' });
  }

  // Check if the user with the provided email exists
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).send({ error: 'Error finding user' });
    }
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Generate a reset token and send it to the user's email
    const resetToken = jwt.sign({ id: user._id }, process.env.RESET_TOKEN_SECRET, { expiresIn: '1h' });
    sendResetEmail(user.email, resetToken);

    // Return success message
    res.send({ message: 'Reset email sent' });
  });
};