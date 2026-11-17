const Contact = require("../models/Contact");
const { responseReturn } = require("../utils/responseReturn");

class requestQlientControllers {
  add_request_client = async (req, res) => {
    console.log(req.body);

    const { name, email, phone, subject, message } = req.body;
    try {
      await Contact.create({ name, email, phone, subject, message });

      responseReturn(res, 201, {
        message: "پیام شما با موفقیت به پشتیبانی ما ارسال شد",
      });
    } catch (error) {
      console.log(error);

      responseReturn(res, 500, { error : error.message });
    }
  };
}

module.exports = new requestQlientControllers();
