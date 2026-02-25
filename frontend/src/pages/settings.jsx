import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Section = ({ title, children }) => (
  <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 mb-6">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      {title}
    </h2>
    {children}
  </div>
);

const InputRow = ({ label, children }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
    <span className="text-white/80">{label}</span>
    {children}
  </div>
);

export default function Settings() {
  const navigate = useNavigate();
  const [user] = useState({ name: 'Ada Lovelace', email: 'ada@gyanguru.ai' });
  const [prefs, setPrefs] = useState({
    difficulty: 'intermediate',
    voice: 'female',
    exportFormat: 'PDF',
    theme: 'dark',
  });
  const [password, setPassword] = useState({ current: '', newPass: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handlePrefChange = (key, val) => {
    setPrefs({ ...prefs, [key]: val });
    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.UPDATE_PREFS}`, { method: 'PUT', body: JSON.stringify({ [key]: val }) });
  };

  const handlePasswordChange = async () => {
    if (password.newPass !== password.confirm) return alert('Passwords do not match');
    // TODO: connect API endpoint using src/config/api.js
    // await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHANGE_PASSWORD}`, { method: 'POST', body: JSON.stringify(password) });
    alert('Password changed successfully');
    setPassword({ current: '', newPass: '', confirm: '' });
  };

  const handleLogout = () => {
    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGOUT}`, { method: 'POST' });
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure? This action cannot be undone.')) {
      // TODO: connect API endpoint using src/config/api.js
      // fetch(`${API_BASE_URL}${API_ENDPOINTS.DELETE_ACCOUNT}`, { method: 'DELETE' });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#050506] border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-2 text-white font-bold text-xl mb-10">
          <Icon name="Cpu" className="w-6 h-6 text-indigo-400" />
          GyanGuru
        </div>
        <nav className="flex-1 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="Home" />
            <span>Home</span>
          </Link>
          <Link to="/learn/text" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="FileText" />
            <span>Text</span>
          </Link>
          <Link to="/learn/code" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="Code" />
            <span>Code</span>
          </Link>
          <Link to="/learn/audio" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="Headphones" />
            <span>Audio</span>
          </Link>
          <Link to="/learn/visual" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="Image" />
            <span>Image</span>
          </Link>
          <div className="pt-6 mt-6 border-t border-white/10">
            <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">
              <Icon name="Settings" />
              <span>Settings</span>
            </Link>
            <Link to="/about" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
              <Icon name="Info" />
              <span>About</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors w-full mt-2"
            >
              <Icon name="LogOut" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Settings</h1>
          <p className="text-white/70 mt-2">Manage your profile and preferences</p>
        </div>

        {/* Profile */}
        <Section title={<><Icon name="User" className="w-5 h-5" /> Profile Information</>}>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format"
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/1a1a2e/eaeaea?text=A'; }}
            />
            <div>
              <p className="text-white font-semibold text-lg">{user.name}</p>
              <p className="text-white/70">{user.email}</p>
            </div>
          </div>
          <InputRow label="Full Name">
            <input
              type="text"
              defaultValue={user.name}
              className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/90 text-sm focus:outline-none focus:border-indigo-500"
            />
          </InputRow>
          <InputRow label="Email">
            <input
              type="email"
              defaultValue={user.email}
              className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/90 text-sm focus:outline-none focus:border-indigo-500"
            />
          </InputRow>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 active:scale-95 transition-all duration-300">
              Save Changes
            </button>
          </div>
        </Section>

        {/* Preferences */}
        <Section title={<><Icon name="Sliders" className="w-5 h-5" /> Preferences</>}>
          <InputRow label="Default Difficulty">
            <select
              value={prefs.difficulty}
              onChange={(e) => handlePrefChange('difficulty', e.target.value)}
              className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/90 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </InputRow>
          <InputRow label="Voice Selection">
            <select
              value={prefs.voice}
              onChange={(e) => handlePrefChange('voice', e.target.value)}
              className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/90 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="female">Female (AI)</option>
              <option value="male">Male (AI)</option>
            </select>
          </InputRow>
          <InputRow label="Export Format">
            <select
              value={prefs.exportFormat}
              onChange={(e) => handlePrefChange('exportFormat', e.target.value)}
              className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/90 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="PDF">PDF</option>
              <option value="TXT">TXT</option>
              <option value="PNG">PNG</option>
              <option value="SVG">SVG</option>
            </select>
          </InputRow>
          <InputRow label="Theme">
            <select
              value={prefs.theme}
              onChange={(e) => handlePrefChange('theme', e.target.value)}
              className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/90 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </InputRow>
        </Section>

        {/* Security */}
        <Section title={<><Icon name="Lock" className="w-5 h-5" /> Security</>}>
          <InputRow label="Current Password">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password.current}
              onChange={(e) => setPassword({ ...password, current: e.target.value })}
              className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/90 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
          </InputRow>
          <InputRow label="New Password">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password.newPass}
              onChange={(e) => setPassword({ ...password, newPass: e.target.value })}
              className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/90 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
          </InputRow>
          <InputRow label="Confirm Password">
            <div className="flex items-center gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password.confirm}
                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/90 text-sm focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 rounded bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} className="w-4 h-4" />
              </button>
            </div>
          </InputRow>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handlePasswordChange}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 active:scale-95 transition-all duration-300"
            >
              Change Password
            </button>
          </div>
        </Section>

        {/* Account Actions */}
        <Section title={<><Icon name="AlertTriangle" className="w-5 h-5" /> Account Actions</>}>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <Icon name="LogOut" className="w-4 h-4" />
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-500 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <Icon name="Trash2" className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </Section>
      </main>
    </div>
  );
}