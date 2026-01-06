require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// 1. IMPORT ROUTES (Sesuaikan path-nya dengan struktur folder Anda)
const authRoutes = require("./routes/auth.routes");
const articleRoutes = require("./routes/article.routes");

const app = express();
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server SecureArticles berjalan");
});

// 2. GUNAKAN ROUTES
// Ini akan menambahkan prefix /api sehingga rute menjadi /api/auth/... dan /api/articles/...
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log("Mencoba konek ke MongoDB...");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
