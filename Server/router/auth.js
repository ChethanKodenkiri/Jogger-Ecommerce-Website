const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.use(cookieParser());
 
require("../DB/Connection");
const User = require("../Model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(401).json({ error: "Please fill all the fields" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(421).json({ error: "Passwords are not matching" });
    } else if (phone.length != 10) {
      return res
        .status(403)
        .json({ error: "Phone number should be 10 digits" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();

      res.cookie("jwt", token.toString(), {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (isMatch) {
        res.status(201).json({ message: "User signin successfully" });
      } else {
        res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/forgotPassword", async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    if (!email || !newPassword || !confirmPassword) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      if (newPassword === confirmPassword) {
      const newPassword1 = await bcrypt.hash(newPassword, 12)
      const confirmPassword1 = await bcrypt.hash(confirmPassword, 12);
        
        const user = await User.findOneAndUpdate(
          { email: email },
          { password: newPassword1 },
          {cpassword:confirmPassword1}
        );
        await user.save();

        res.status(201).json({ message: "Password updated successfully" });
      } else if (newPassword != confirmPassword) {
        res.status(421).json({ error: "Passwords are not matching" });
      }
    }else{
        res.status(404).json({error:"User not found with this email"})
    }
  } catch(err) {
    console.log(err);
  }
});

//Payment API
router.post("/api/create-checkout-session",async(req, res) => {
  const {products} = req.body;

  const lineItmes = products.map((product) =>( {
    price_data :{
      currency: 'inr',
      product_data:{
        name:product.name
      },
      unit_amount:product.price * 100
    },
    quantity: 1
  }));


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items:lineItmes,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  });
  res.json({id:session.id});
});

module.exports = router;
