const User = require("../models/user");
const Quotation = require("../models/quotation");

//Controller to create the Quotation
module.exports.createQuotation = async (req, res) => {
  try {
    // 1-> Get the data from req.body (content, user, subjet)
    const { content, userId, subject } = req.body;

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
