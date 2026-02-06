import React, { useState } from "react";
import { Activity, AlertCircle, CheckCircle } from "lucide-react";

export default function PredictionForm({ onPredict }) {
  const [inputs, setInputs] = useState({
    ph: "",
    turb: "",
    temp: "",
    tds: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // 🔥 Send data in EXACT order ML expects (by keys)
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ph: Number(inputs.ph),
          turbidity: Number(inputs.turb),
          temperature: Number(inputs.temp),
          tds: Number(inputs.tds)
        })
      });

      const data = await response.json();

      let color, bg, description;

      if (data.wqi_class === "Excellent") {
        color = "text-green-400";
        bg = "bg-green-500/20 border-green-500/30";
        description = "Water quality is optimal for all uses.";
      } else if (data.wqi_class === "Good" || data.wqi_class === "Avg") {
        color = "text-yellow-400";
        bg = "bg-yellow-500/20 border-yellow-500/30";
        description = "Water quality is acceptable but needs monitoring.";
      } else {
        color = "text-red-400";
        bg = "bg-red-500/20 border-red-500/30";
        description = "Water quality is unsafe. Immediate action required!";
      }

      const finalResult = {
        status: data.wqi_class,
        color,
        bg,
        description
      };

      setResult(finalResult);

      if (onPredict) {
        onPredict({ inputs, result: finalResult });
      }
    } catch (err) {
      alert("Prediction failed. Backend not reachable.");
    }

    setLoading(false);
  };

  const parameters = [
<<<<<<< HEAD
    { name: "ph", label: "pH Level", unit: "", placeholder: "", min: 0, max: 14 },
    { name: "turb", label: "Turbidity", unit: "NTU", placeholder: "", min: 0, max: 10000 },
    { name: "temp", label: "Temperature", unit: "°C", placeholder: "", min: 0, max: 50 },
    { name: "tds", label: "TDS (Total Dissolved Solids)", unit: "ppm", placeholder: "", min: 0, max: 50000 }
=======
    { name: "ph", label: "pH Level", unit: "", placeholder: "6-8", min: 0, max: 14 },
    { name: "turb", label: "Turbidity", unit: "NTU", placeholder: "0-10", min: 0, max: 100 },
    { name: "temp", label: "Temperature", unit: "°C", placeholder: "0-50", min: 0, max: 50 },
    { name: "tds", label: "TDS (Total Dissolved Solids)", unit: "ppm", placeholder: "0-2000", min: 0, max: 5000 }
>>>>>>> 14db63196ef4b5c75bbf037fca8b4a7063d38583
  ];

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-300">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="text-blue-400" size={28} />
        <h2 className="text-2xl font-bold">Analyze Water Samples</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parameters.map((param) => (
            <div key={param.name} className="flex flex-col gap-2">
              <label className="text-xs uppercase font-bold text-slate-400 ml-1">
                {param.label}{" "}
                <span className="text-slate-500">({param.unit})</span>
              </label>
              <input
                type="number"
                name={param.name}
                required
                min={param.min}
                max={param.max}
                step="0.1"
                value={inputs[param.name]}
                onChange={handleInputChange}
                className="bg-slate-800 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-200 placeholder:text-slate-600"
                placeholder={param.placeholder}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
        >
          <Activity size={20} />
          {loading ? "Analyzing..." : "Run AI Prediction"}
        </button>
      </form>

      {result && (
        <div
          className={`mt-8 p-6 rounded-2xl border border-white/20 text-center ${result.bg}`}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            {result.status === "Excellent" && (
              <CheckCircle className="text-green-400" size={32} />
            )}
            {(result.status === "Good" || result.status === "Avg") && (
              <Activity className="text-yellow-400" size={32} />
            )}
            {(result.status === "Poor" || result.status === "Very Poor") && (
              <AlertCircle className="text-red-400" size={32} />
            )}
            <h3 className={`text-3xl font-black ${result.color}`}>
              {result.status}
            </h3>
          </div>

          <p className="text-slate-300 text-sm">{result.description}</p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {parameters.map((param) => (
              <div key={param.name} className="bg-white/5 p-3 rounded-lg">
                <p className="text-slate-500 mb-1">{param.label}</p>
                <p className="font-bold text-slate-200">
                  {inputs[param.name]} {param.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
