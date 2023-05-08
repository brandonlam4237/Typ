require("dotenv").config();
const express = require("express");
const router = require("./routes/routes");

// Database
const connectDB = require("./database/db");
const PORT = 3000;

const app = express();

app.get("/", (_, res) => {
    res.send("Hello from the backend: Vite + React + TypeScript!");
});

// Routes
app.use("/api", router);

app.use(express.json());

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`);
        });
    } catch (error) {
        console.error("ERROR STARTING SERVER : ", error);
    }
};
start();

// app.get('/users', async (req, res) => {
//   try {
//     await pool.connect();

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching users from database');
//   }
//  });
