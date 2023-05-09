require("dotenv").config();
const express = require("express");
const router = require("./routes/routes");
const ViteExpress = require("vite-express");

// Database
const connectDB = require("./database/db");
const PORT = 3000;

const app = express();

app.get("/hello", (_, res) => {
    res.send("Hello from the backend: Vite + React + TypeScript!");
});

// Routes
app.use("/api", router);

app.use(express.json());

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
