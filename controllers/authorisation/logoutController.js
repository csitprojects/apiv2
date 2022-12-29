module.exports =  function Logout(req, res) {
  // Get the JWT from the request header
  const token = req.headers.authorization.split(' ')[1];

  // Set the expiration date to a past date
  const exp = Math.floor(Date.now() / 1000) - 60;

  // Update the JWT with the new expiration date
  const updatedToken = jwt.sign({ exp }, process.env.JWT_SECRET);

  // Send the updated JWT in the response
  res.json({ token: updatedToken });
}