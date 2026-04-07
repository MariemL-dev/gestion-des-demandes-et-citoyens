import express from "express";
import citizenRoutes from "../routes/citizen.routes";

const app = express();
app.use(express.json());

app.use("/citizens", citizenRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});