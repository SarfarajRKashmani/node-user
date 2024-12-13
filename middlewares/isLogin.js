const isLoggedInTrue = (req, res, next) => {
    let { username, userId } = req.cookies;
    if (username && userId) {
      next();
    } else {
      res.redirect("/user/login");
    }
  };
  
  module.exports = { isLoggedInTrue };