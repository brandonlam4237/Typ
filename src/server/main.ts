import express from "express";
import ViteExpress from "vite-express";
import routes from "./routes/routes";

const connectDB = require("./database/db");
const PORT = 3000;

const app = express();

app.get("/", (_, res) => {
    res.send("Hello from the backend: Vite + React + TypeScript!");
});

//app.use("/api", routes);

app.use(express.json());

/*
ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000...")
);
*/

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
