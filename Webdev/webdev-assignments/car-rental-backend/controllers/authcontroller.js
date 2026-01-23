function login(req, res) {
  res.send('User logged in successfully');
}

function signup(req, res) {
  res.send('User signed up successfully');
}


module.exports = {
  login,
  signup
};