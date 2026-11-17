require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/db"); // ✅ destructure

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 API running on port ${PORT}`);
    });

    // مدیریت خطای listen (مثلاً پورت اشغال)
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use`);
      } else {
        console.error("❌ Server error:", err);
      }
      process.exit(1);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log("🛑 HTTP server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (err) {
    console.error("❌ Startup failed:", err.message);
    process.exit(1);
  }
}

start();