import app from "express";
import User from "../schema/user.js";
import bcryptjs from "bcryptjs";
const router = app.Router();

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, userName, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password);
    const exisitingEmailID = await User.findOne({ emailId });
    const exsitingUserName = await User.findOne({ userName });
    if (exisitingEmailID || exsitingUserName) {
      if (exisitingEmailID)
        return res.status(200).json({ message: "Email ID already exist" });
      if (exsitingUserName)
        return res
          .status(200)
          .json({ message: "UserName already exist, try with different one" });
    }
    const user = new User({
      firstName,
      lastName,
      emailId,
      userName,
      password: hashPassword,
    });
    if (req.file) {
      user.image = req.file.path;
    }
    await user.save().then(() => {
      const { password, ...others } = user._doc;
      return res
        .status(200)
        .json({ message: "Signup Successful", info: others });
    });
  } catch (error) {
    return res.status(200).json({ error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      return res.status(200).json({ message: "Please signup first" });
    }

    const isPasswordCorrect = bcryptjs.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Password is not correct" });
    }
    const { password, ...others } = user._doc;
    return res.status(200).json({ others });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error });
  }
});

export default router;
