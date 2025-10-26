import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import repositoryRoutes from "./routes/repositoryRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
connectDB();

(async () => {
  const existing = await User.findOne({ username: "admin" });
  if (!existing) {
    const admin = new User({ username: "admin", password: "matrix123", role: "admin" });
    await admin.save();
    console.log("✅ Default admin created: admin / matrix123");
  }
})();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/repositories", repositoryRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
