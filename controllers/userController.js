const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//Controller to Create SignUp
module.exports.signUp = async (req, res) => {
  try {
    //1- Fetch the data from the database using req.body
    const { name, email, password, confirmPassword } = req.body;

    //2-Match both the passwords
    if (password !== confirmPassword) {
      return res.status(401).json({
        message: "Password didn't matched",
        data: {},
      });
    }
    //3-Check for the existing user
    //Mongoose Query to find the user in the database
    const user = await User.findOne({ email: email });
    //check if user exists or not
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        data: {
          error: error,
        },
      });
    }
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    //4-Create the newUser
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    //5-Send the response
    return res.status(200).json({
      message: "Successfully created the User",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to SignUp!! ",
      data: {
        error: error,
      },
    });
  }
};

//Creating the Controller for singin
module.exports.signIn = async (req, res) => {
  try {
    // 1-email and Password request using req.body
    const { email, password } = req.body;
    // 2-Find the user in databse with email
    const user = await User.findOne({ email: email });
    // 3-If user doesn't exist return unsuccessfull message
    if (!user) {
      return res.status(400).json({
        message: "SignUp to use our Website",
        data: {},
      });
    }
    const isMatched = bcrypt.compareSync(password, user.password);
    // 4-if got the user match the password
    if (!isMatched) {
      return res.status(400).json({
        message: "Email/Password doesn't Matched",
        data: {},
      });
    }
    //Token to store the session
    const token = jwt.sign(
      { email: user.email },
      "hpEOHTnnMS72fxBhypqFHuwTq3hnM4GT",
      { expiresIn: "1h" }
    );

    // 5- if password matched return the users profile or data
    return res.status(200).json({
      message: "SignIn Successfully",
      data: {
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Opps!! Something Went Wrong ",
      data: {
        error: error,
      },
    });
  }
};
