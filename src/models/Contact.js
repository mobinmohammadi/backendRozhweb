const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "نام الزامی است"],
      trim: true,
      minlength: [2, "نام باید حداقل ۲ کاراکتر باشد"],
      maxlength: [100, "نام نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"],
    },

    email: {
      type: String,
      required: [true, "ایمیل الزامی است"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "لطفاً یک ایمیل معتبر وارد کنید"],
    },

    phone: {
      type: String,
      required: [true, "شماره تلفن الزامی است"],
      trim: true,
      match: [/^[0-9+\-\s()]{7,15}$/, "لطفاً یک شماره تلفن معتبر وارد کنید"],
    },

    subject: {
      type: String,
      required: [true, "موضوع الزامی است"],
      trim: true,
      enum: {
        values: [
          "طراحی وب‌سایت",
          "بازطراحی وب‌سایت",
          "طراحی UI/UX",
          "طراحی لوگو و برند",
          "فروشگاه اینترنتی",
          "پشتیبانی فنی",
          "سایر موارد",
        ],
        message: "{VALUE} موضوع پشتیبانی نمی‌شود",
      },
    },

    message: {
      type: String,
      required: [true, "پیام الزامی است"],
      trim: true,
      minlength: [10, "پیام باید حداقل ۱۰ کاراکتر باشد"],
      maxlength: [2000, "پیام نمی‌تواند بیش از ۲۰۰۰ کاراکتر باشد"],
    },

    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.index({ email: 1, createdAt: -1 });

module.exports = mongoose.model("Contact", contactSchema);
