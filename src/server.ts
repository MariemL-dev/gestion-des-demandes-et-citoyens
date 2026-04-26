import express from "express";
import cors from "cors";
import citizenRoutes from "./routes/citizen.routes";
import demandeRoutes from "./routes/demande.routes";
import statusRoutes from "./routes/status.routes";
import adminProfileRoutes from "./routes/adminProfile.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API works 🚀");
});

app.use("/citizens", citizenRoutes);
app.use("/demandes", demandeRoutes);
app.use("/status", statusRoutes);
app.use("/admin-profile", adminProfileRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
