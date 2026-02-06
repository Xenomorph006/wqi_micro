import React, { useState } from 'react';
import { User, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setError('');
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(loginData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (loginData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setLoginData({ email: '', password: '' });

      if (onLoginSuccess) {
        onLoginSuccess(loginData.email);
      }

      // Auto close success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 800);
  };

  return (
    <div className="min-h-96 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-linear-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-2xl mb-4">
            <User className="text-blue-400" size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-slate-400">Sign in to your AquaPure account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center gap-3">
            <AlertCircle className="text-red-400" size={20} />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center gap-3 animate-in slide-in-from-top duration-300">
            <CheckCircle className="text-green-400" size={20} />
            <div>
              <p className="text-green-200 text-sm font-semibold">Login Successful!</p>
              <p className="text-green-200/70 text-xs">Welcome, {loginData.email}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-300 ml-1">Email Address</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500" size={20} />
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-100 placeholder:text-slate-600 transition"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-slate-800 cursor-pointer" />
              <span className="text-slate-400">Remember me</span>
            </label>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition font-semibold">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-blue-700 disabled:to-blue-600 py-3 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-500 uppercase">Or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social Login */}
        <button className="w-full py-3 px-4 border border-white/10 rounded-xl hover:border-white/20 transition flex items-center justify-center gap-2 font-semibold text-slate-300 hover:text-slate-100">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.461,2.268,15.365,1.156,12.545,1.156 c-6.321,0-11.445,5.125-11.445,11.45c0,6.321,5.124,11.45,11.445,11.45c6.321,0,11.444-5.129,11.444-11.45 C23.989,11.549,23.989,10.239,12.545,10.239z" />
          </svg>
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition font-semibold">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
