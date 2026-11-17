const mongoose = require("mongoose");

// ثبت event ها یک‌بار در سطح ماژول
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("♻️  MongoDB reconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

async function connectDB() {
  const isProd = process.env.mode === "pro";
  const uri = isProd ? process.env.DB_PRO_URL : process.env.DB_LOCAL_URL;

  if (!uri) {
    throw new Error(
      `Database URI is not defined (env: ${isProd ? "pro" : "development"})`
    );
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });

    console.log(
      `✅ ${isProd ? "pro" : "Local"} Database connected`
    );
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
}

module.exports = { connectDB };