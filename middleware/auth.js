const User = require("../models/User");
exports.authMiddleware = (req, res, next) => {
    console.log(req.method)
  if (req.method !== 'GET')    {
    if (!req.session.user) {
    res.send('You are not logged in')
    } else {
      next();
    }
  } else {
    next();
  }
};

exports.adminMiddleware = async (req, res, next) => {
  if (req.method !== "GET") {
    if (req.session.user) {
      const { email } = req.session.user;
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.redirect("/login");
      }
      if (user.isAdmin) {
        next();
      } else {
        res.send('you are not an admin');
      }
    }
  } else {
    next();
  }
};
