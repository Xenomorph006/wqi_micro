import React from 'react';
import { Droplets, LayoutDashboard, Activity, Info, User, Menu, X } from 'lucide-react';

export default function Navbar({ currentPage, onPageChange, isOpen, toggleMenu }) {
  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'predict', label: 'Predict', icon: Activity },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/50 backdrop-blur-lg shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-2 text-blue-400 font-bold text-2xl">
        <Droplets size={32} />
        <span>AquaPure</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex items-center gap-2 transition ${
                currentPage === item.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-300 hover:text-blue-400'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange('login')}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full transition flex items-center gap-2 font-semibold"
        >
          <User size={18} />
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-slate-300 hover:text-blue-400 transition" onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-slate-900 border-b border-white/10 md:hidden">
          <div className="flex flex-col gap-4 p-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    toggleMenu();
                  }}
                  className={`flex items-center gap-2 transition ${
                    currentPage === item.id
                      ? 'text-blue-400'
                      : 'text-slate-300 hover:text-blue-400'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                onPageChange('login');
                toggleMenu();
              }}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full transition flex items-center gap-2 font-semibold w-full justify-center"
            >
              <User size={18} />
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
