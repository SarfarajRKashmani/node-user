const isLoggedInTrue = (req, res, next) => {
    let { userId } = req.cookies;
    if ( userId) {
      next();
    } else {
      res.redirect("/user/login");
    }
  };
  
  module.exports = { isLoggedInTrue };