const User = require("../models/user");
const Quotation = require("../models/quotation");

//Controller to create the Quotation
module.exports.createQuotation = async (req, res) => {
  try {
    // 1-> Get the data from req.body (content, user, subjet)
    const { content, subject } = req.body;
    //This user we are getting from the JWT Authentication
    //Now in postman test we dont need to enter the id of the user
    const { _id: userId } = req.user;

    // 2-> Create the Quotation
    const quotation = await Quotation.create({
      content: content,
      user: userId,
      subject: subject,
    });

    // 3-> Find the user and push the quotation to the user
    const user = await User.findById(userId);
    user.quotations.push(quotation._id);
    user.save();

    // 4-> Return the response
    return res.status(200).json({
      message: "Successfully created the Quotation!!",
      data: {},
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

// api to get all the quotations
module.exports.allQuotations = async (req, res) => {
  try {
    // fetch the entire quotations from the Quotation model
    // populate the user property and get only the name of the user
    const quotations = await Quotation.find({}).populate({
      path: "user",
      select: "name",
    });

    // send the response
    return res.status(200).json({
      message: "Successfully fetched the quotations!",
      data: {
        quotations: quotations,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Opps something went wront at the server!",
      data: {
        error: error,
      },
    });
  }
};
