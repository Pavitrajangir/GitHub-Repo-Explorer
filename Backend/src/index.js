require("dotenv").config();

const express = require("express");
const cors = require("cors");
const githubRoutes = require("./routes/github");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use("/api/github", githubRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "GitHub Explorer backend is running!" });
});

app.listen(PORT, () => {
  console.log(` Backend server running at http://localhost:${PORT}`);
  console.log(
    `GitHub Token: ${process.env.GITHUB_TOKEN ? "Loaded" : "Not set (60 req/hr limit)"}`
  );
});
