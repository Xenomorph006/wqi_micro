import React, { useState } from "react";
import {
  Droplets,
  Thermometer,
  Wind,
  Activity,
  User,
  Info,
  LayoutDashboard
} from "lucide-react";

import PredictionForm from "./components/PredictionForm";

export default function App() {
  const [page, setPage] = useState("home");
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      alert("Login successful!");
      setLoginData({ email: "", password: "" });
      setPage("home");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-2xl">
          <Droplets size={32} />
          <span>AquaPure</span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            onClick={() => setPage("predict")}
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <Activity size={18} /> Predict
          </button>

          <button
            onClick={() => setPage("about")}
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <Info size={18} /> About
          </button>

          <button
            onClick={() => setPage("login")}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full transition flex items-center gap-2"
          >
            <User size={18} /> Login
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* DASHBOARD PAGE */}
        {page === "home" && (
          <div className="space-y-10 animate-in fade-in duration-700">
            <header className="text-center space-y-2">
              <h2 className="text-4xl font-extrabold tracking-tight">
                Water Quality Dashboard
              </h2>
              <p className="text-slate-400">
                Real-time monitoring and AI-based prediction system.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-1 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?q=80&w=500&auto=format&fit=crop"
                  className="w-full h-40 object-cover rounded-t-xl opacity-80"
                  alt="Water"
                />
                <div className="p-4">
                  <h3 className="font-bold">Live Sensor Stream</h3>
                  <p className="text-sm text-slate-400">
                    Location: Station Alpha-7
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center">
                <Activity className="text-blue-400 mb-2" size={40} />
                <span className="text-slate-400">
                  AI Prediction Engine
                </span>
                <h3 className="text-3xl font-black text-blue-400">
                  Online
                </h3>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center">
                <Thermometer className="text-orange-400 mb-2" size={40} />
                <span className="text-slate-400">
                  Avg Water Temperature
                </span>
                <h3 className="text-4xl font-black text-orange-400">
                  22.5°C
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* PREDICTION PAGE */}
        {page === "predict" && (
          <div className="flex justify-center mt-10">
            <PredictionForm />
          </div>
        )}

        {/* LOGIN PAGE */}
        {page === "login" && (
          <div className="max-w-sm mx-auto bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              User Portal
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-full bg-slate-800 p-4 rounded-xl border border-white/5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value
                  })
                }
                className="w-full bg-slate-800 p-4 rounded-xl border border-white/5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-slate-100 text-slate-900 py-4 rounded-xl font-bold hover:bg-white transition"
              >
                Login
              </button>
            </form>
          </div>
        )}

        {/* ABOUT PAGE */}
        {page === "about" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-extrabold tracking-tight">
                About AquaPure
              </h2>
              <p className="text-slate-400 text-lg">
                AI-powered Water Quality Monitoring & Prediction System
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
                <Droplets className="text-blue-400 mb-3" size={32} />
                <h3 className="text-xl font-bold mb-2">
                  Real-Time Monitoring
                </h3>
                <p className="text-slate-400 text-sm">
                  Monitor pH, turbidity, temperature, and TDS in real time.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
                <Activity className="text-green-400 mb-3" size={32} />
                <h3 className="text-xl font-bold mb-2">
                  AI Prediction
                </h3>
                <p className="text-slate-400 text-sm">
                  ML-based classification of water quality.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
                <Thermometer className="text-orange-400 mb-3" size={32} />
                <h3 className="text-xl font-bold mb-2">
                  Temperature Tracking
                </h3>
                <p className="text-slate-400 text-sm">
                  Analyze temperature impact on water quality.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
                <Wind className="text-cyan-400 mb-3" size={32} />
                <h3 className="text-xl font-bold mb-2">
                  Multi-Parameter Analysis
                </h3>
                <p className="text-slate-400 text-sm">
                  Combined insights from multiple water parameters.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
