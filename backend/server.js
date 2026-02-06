import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import path from "path";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* =========================
   Root Route (TEST)
   ========================= */
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully");
});

app.get("/predict", (req, res) => {
  res.send("✅ Model is running successfully");
});

/* =========================
   Prediction Route
   ========================= */
app.post("/predict", (req, res) => {
  const inputData = req.body;

  // Path to python inside venv (Windows)
  const pythonPath = path.resolve("../ml/venv/Scripts/python");
  const scriptPath = path.resolve("../ml/predictor.py");

  const python = spawn(pythonPath, [
    scriptPath,
    JSON.stringify(inputData)
  ]);

  let output = "";
  let error = "";

  python.stdout.on("data", (data) => {
    output += data.toString();
  });

  python.stderr.on("data", (data) => {
    error += data.toString();
  });

  python.on("close", () => {
    if (error) {
      console.error("Python error:", error);
      return res.status(500).json({ error });
    }

    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (e) {
      res.status(500).json({
        error: "Invalid response from ML model",
        raw: output
      });
    }
  });
});

/* =========================
   Start Server
   ========================= */
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
