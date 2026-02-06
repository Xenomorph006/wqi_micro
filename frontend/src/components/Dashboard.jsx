import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplets, Thermometer, Wind, Activity } from 'lucide-react';

export default function Dashboard() {
  const [chartData, setChartData] = useState([
    { time: '00:00', quality: 85, temp: 22, ph: 7.2 },
    { time: '04:00', quality: 82, temp: 20, ph: 7.1 },
    { time: '08:00', quality: 90, temp: 24, ph: 7.3 },
    { time: '12:00', quality: 94, temp: 28, ph: 7.4 },
    { time: '16:00', quality: 92, temp: 26, ph: 7.2 },
    { time: '20:00', quality: 88, temp: 23, ph: 7.1 },
  ]);

  const [stats, setStats] = useState([
    { icon: Activity, label: 'Quality Index', value: '94.2', unit: '%', color: 'text-blue-400' },
    { icon: Thermometer, label: 'Temperature', value: '28.5', unit: '°C', color: 'text-orange-400' },
    { icon: Droplets, label: 'pH Level', value: '7.4', unit: '', color: 'text-cyan-400' },
    { icon: Wind, label: 'TDS Level', value: '420', unit: 'ppm', color: 'text-green-400' },
  ]);

  // Real-time data connection from Node.js backend
  useEffect(() => {
    // WebSocket connection for real-time updates
    const connectWebSocket = () => {
      // Change 'localhost:3001' to your backend server address
      const ws = new WebSocket('ws://localhost:3001/sensor-data');

      ws.onopen = () => {
        console.log('WebSocket connected');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Update stats with latest data
          setStats(prevStats => 
            prevStats.map(stat => {
              switch(stat.label) {
                case 'Quality Index':
                  return { ...stat, value: data.quality?.toFixed(1) || stat.value };
                case 'Temperature':
                  return { ...stat, value: data.temp?.toFixed(1) || stat.value };
                case 'pH Level':
                  return { ...stat, value: data.ph?.toFixed(1) || stat.value };
                case 'TDS Level':
                  return { ...stat, value: data.tds?.toString() || stat.value };
                default:
                  return stat;
              }
            })
          );

          // Update chart data (keep last 24 data points)
          setChartData(prevData => {
            const newData = [...prevData, {
              time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
              quality: data.quality || 0,
              temp: data.temp || 0,
              ph: data.ph || 0,
              tds: data.tds || 0
            }];
            // Keep only last 24 data points
            return newData.slice(Math.max(0, newData.length - 24));
          });
        } catch (error) {
          console.error('Error parsing WebSocket data:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected. Reconnecting in 3 seconds...');
        // Attempt to reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000);
      };

      return ws;
    };

    const ws = connectWebSocket();

    return () => {
      if (ws) ws.close();
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-extrabold tracking-tight">Water Quality Dashboard</h2>
        <p className="text-slate-400">Real-time monitoring and predictive analysis system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-lg hover:border-white/20 transition">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`${stat.color}`} size={32} />
                <span className="text-xs uppercase text-slate-500 font-bold">Live</span>
              </div>
              <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
                <span className="text-slate-400">{stat.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h3 className="text-xl font-bold mb-6">Quality Trend (24 Hours)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="rgb(148, 163, 184)" />
            <YAxis stroke="rgb(148, 163, 184)" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Line 
              type="monotone" 
              dataKey="quality" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-1 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-white/20 transition">
          <img 
            src="https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?q=80&w=500&auto=format&fit=crop" 
            className="w-full h-40 object-cover opacity-80" 
            alt="Water Quality"
          />
          <div className="p-4">
            <h3 className="font-bold mb-1">Live Sensor Stream</h3>
            <p className="text-sm text-slate-400">Station: Alpha-7</p>
            <p className="text-xs text-slate-500 mt-2">Updated 2 mins ago</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h3 className="font-bold mb-3">Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Connection</span>
              <span className="text-green-400 font-bold text-sm">●</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Battery</span>
              <span className="text-green-400 font-bold text-sm">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Alerts</span>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">None</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h3 className="font-bold mb-3">Recommendations</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>✓ Water quality optimal</li>
            <li>✓ pH level balanced</li>
            <li>✓ Temperature stable</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
