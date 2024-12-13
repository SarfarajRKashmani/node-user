const express = require("express");
const path = require("path");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const Cookies = require("cookie-parser");
const { isLoggedInTrue } = require("./middlewares/isLogin");
const User = require("./models/user.model");

require("dotenv").config();
const app = express();
app.use(Cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", isLoggedInTrue, async(req, res) => {
  let { userId } = req.cookies;
let user = await User.findById(userId);
console.log("user", user);
  res.render("index", { user });
});
app.use("/user", userRouter);


const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log("listening on port on" + PORT);
  connection();
});