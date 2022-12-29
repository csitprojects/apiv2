const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  // Get the JWT from the request headers
  const token = req.headers.authorization;

  // If there is no JWT, return a 401 unauthorized status code
  if (!token) return res.status(401).send('Unauthorized');

  // Try to verify the JWT and get the user's role
  try {
    const decoded = jwt.verify(token, secret);
    const role = decoded.role;

    // If the role is "admin", allow the request
    if (role === 'admin') return next();

    // If the role is "teacher", only allow requests to the "teacher" routes
    if (role === 'teacher' && req.path.startsWith('/api/teacher')) return next();

    // If the role is "student", only allow requests to the "student" routes
    if ((role === 'student' || role == "teacher" )&& req.path.startsWith('/api/exams') ) return next();


    if ((role === 'student' )&& req.path.startsWith('/api/payments') ) return next();
    // If the role does not match any of the above, return a 403 forbidden status code
    return res.status(403).send('Forbidden');
  } catch (error) {
    // If there was an error verifying the JWT, return a 401 unauthorized status code
    return res.status(401).send('Unauthorized');
  }
}

module.exports = authenticate;