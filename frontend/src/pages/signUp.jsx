import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const PasswordReq = ({ met, label }) => (
  <div className="flex items-center gap-2 text-sm">
    <Icon name={met ? 'CheckCircle' : 'Circle'} className={met ? 'text-cyan-400' : 'text-white/40'} />
    <span className={met ? 'text-white' : 'text-white/60'}>{label}</span>
  </div>
);

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState({ score: 0, reqs: {} });

  const checkStrength = (pwd) => {
    const reqs = {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
    const score = Object.values(reqs).filter(Boolean).length;
    setStrength({ score, reqs });
  };

  useEffect(() => {
    if (form.password) checkStrength(form.password);
  }, [form.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (strength.score < 5) e.password = 'Password requirements not met';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    // TODO: connect API endpoint using src/config/api.js
    // await fetch(`${API_BASE_URL}${API_ENDPOINTS.SIGNUP}`, { method: 'POST', body: JSON.stringify(form) });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050506] flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Create Account</h1>
            <p className="text-white/70 mt-2">Start your ML journey with AI</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 mb-2">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Ada Lovelace"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-white/80 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="ada@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-white/80 mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-white/80 mb-2">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="rounded-lg bg-white/5 border border-white/10 p-4 space-y-2">
              <p className="text-white/80 text-sm font-medium mb-2">Password Requirements</p>
              <PasswordReq met={strength.reqs.length} label="At least 8 characters" />
              <PasswordReq met={strength.reqs.upper} label="One uppercase letter" />
              <PasswordReq met={strength.reqs.lower} label="One lowercase letter" />
              <PasswordReq met={strength.reqs.number} label="One number" />
              <PasswordReq met={strength.reqs.special} label="One special character" />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 active:scale-95 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-8 text-center text-white/70 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}