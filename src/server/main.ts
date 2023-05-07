import express from "express";
import ViteExpress from "vite-express";
import routes from "./routes/routes";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello from the backend: Vite + React + TypeScript!");
});

app.use("/api",routes);

app.use(express.json()); 

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);




// app.get('/users', async (req, res) => {
//   try {
//     await pool.connect();

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching users from database');
//   }
//  });



