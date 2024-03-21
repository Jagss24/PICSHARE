import app from "express";
import ImageSchema from "../schema/imageSchema.js";
import User from "../schema/user.js";
import upload from "../middleware/upload.js";
import nodemailer from "nodemailer";
import path,{dirname} from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = app.Router();

router.post("/yourPics", upload.single("image"), async (req, res) => {
  try {
    const { emailId } = req.body;
    const exisitingUser = await User.findOne({ emailId });
    if (exisitingUser) {
      const findMail = await ImageSchema.findOne({ emailId });
      if (findMail) {
        if (!req.file) {
          return res.status(200).json({ message: "Image not there" });
        }
        findMail.images.push(req.file.path);
        await findMail.save();
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        let mailOptions = {
          from: `"Jagannath Samantra" ${process.env.GMAIL_ID}`,
          to: emailId,
          subject: "Picture Captured ✔",
          text: "Here is the picture you captured.",
          attachments: [
            {
              filename: "captured-picture.png",
              content: req.file,
              encoding: "base64",
            },
          ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return res.status(500).send("Error sending email");
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).json({ message: "Email sent successfully" });
          }
        });
      } else {
        const newMail = new ImageSchema({
          emailId: emailId,
        });
        if (!req.file) {
          return res.status(200).json({ message: "Image not there" });
        }
        newMail.images.push(req.file.path);
        await newMail.save().then(() => {
          res.status(200).json({ message: "Image saved Successfully" });
        });
      }
    } else {
      res.status(200).json({
        message: "There is no Such emailId. Pls Signup through this emailID",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(200).json({ message: "Some error occured" });
  }
});

router.post("/uploadPics", upload.array("images"), async (req, res) => {
  try {
    const { emailId } = req.body;
    const existingUser = await User.findOne({ emailId });

    if (!existingUser) {
      return res.status(200).json({
        message: "There is no Such emailId. Please Signup through this emailID",
      });
    }
    const findMail = await ImageSchema.findOne({ emailId });

    if (findMail) {
      if (!req.files || req.files.length === 0) {
        return res.status(200).json({ message: "Images not uploaded" });
      }

      req.files.forEach((file) => {
        findMail.images.push(file.path);
      });

      await findMail.save();
    } else {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Images not uploaded" });
      }

      const newMail = new ImageSchema({
        emailId: emailId,
        images: req.files.map((file) => file.path),
      });

      await newMail.save();
    }

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    let mailOptions = {
      from: `"Jagannath Samantra" ${process.env.GMAIL_ID}`,
      to: emailId,
      subject: "Pictures Captured ✔",
      text: "Here are the pictures you captured.",
      attachments: req.files.map((file) => ({
        filename: file.filename,
        path: file.path,
      })),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some error occurred" });
  }
});

router.get("/yourPics/:emailId", async (req, res) => {
  try {
    const { emailId } = req.params;
    const exisitingUser = await User.findOne({ emailId });
    if (exisitingUser) {
      const findMail = await ImageSchema.findOne({ emailId });
      if (findMail) {
        const yourPics = findMail.images;
        res.status(200).json({ message: "Here's the image", yourPics });
      } else {
        res
          .status(200)
          .json({ message: "you have not uploaded any image yet" });
      }
    } else {
      res.status(200).json({ message: "User doesn't exist", email: emailId });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some error occurred" });
  }
});

router.delete("/deletePic/:emailId/:imgUrl", async (req, res) => {
  try {
    const { emailId, imgUrl } = req.params;
    const user = await ImageSchema.findOne({ emailId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const imageIndex = user.images.findIndex((img) => img === imgUrl);
    if (imageIndex !== -1) {
      const filename = imgUrl.slice(8);
      console.log(__dirname)
      const imagePath = path.join(__dirname, "../uploads", filename);
      // Delete the file from the filesystem
      fs.unlinkSync(imagePath);
      user.images.splice(imageIndex, 1); // Remove the image from the array
      await user.save();

      return res.status(200).json({ message: "Image deleted successfully" });
    } else {
      return res.status(404).json({ message: "Image doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some error occurred" });
  }
});

export default router;
