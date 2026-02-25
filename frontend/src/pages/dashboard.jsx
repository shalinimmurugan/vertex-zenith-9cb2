import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const StatCard = ({ icon, label, value }) => (
  <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-6">
    <div className="flex items-center gap-3">
      <Icon name={icon} className="w-6 h-6 text-indigo-300" />
      <div>
        <p className="text-white/60 text-sm">{label}</p>
        <p className="text-white text-xl md:text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const ModuleCard = ({ icon, title, desc, img }) => (
  <Link
    to={`/${title.toLowerCase().replace(' ', '-')}`}
    className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 block"
  >
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <img
      src={img}
      alt={title}
      className="w-full h-40 object-cover rounded-xl mb-4"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/1a1a2e/eaeaea?text=Module'; }}
    />
    <Icon name={icon} className="w-10 h-10 mb-4 text-indigo-300" />
    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70">{desc}</p>
  </Link>
);

const HistoryItem = ({ type, title, time }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/10">
    <div className="flex items-center gap-3">
      <Icon name={type} className="w-5 h-5 text-indigo-300" />
      <span className="text-white">{title}</span>
    </div>
    <span className="text-white/60 text-sm">{time}</span>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [history] = useState([
    { type: 'FileText', title: 'Gradient Descent Explanation', time: '2 hours ago' },
    { type: 'Code', title: 'Neural Network Code Gen', time: '5 hours ago' },
    { type: 'Headphones', title: 'CNN Audio Lecture', time: '1 day ago' },
    { type: 'Image', title: 'GAN Visualization', time: '2 days ago' },
  ]);

  useEffect(() => {
    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.DASHBOARD}`).then(r => r.json()).then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-[#050506] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#050506] border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-2 text-white font-bold text-xl mb-10">
          <Icon name="Cpu" className="w-6 h-6 text-indigo-400" />
          GyanGuru
        </div>
        <nav className="flex-1 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">
            <Icon name="Home" />
            <span>Home</span>
          </Link>
          <Link to="/text" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="FileText" />
            <span>Text</span>
          </Link>
          <Link to="/code" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="Code" />
            <span>Code</span>
          </Link>
          <Link to="/audio" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="Headphones" />
            <span>Audio</span>
          </Link>
          <Link to="/image" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="Image" />
            <span>Image</span>
          </Link>
          <div className="pt-6 mt-6 border-t border-white/10">
            <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
              <Icon name="Settings" />
              <span>Settings</span>
            </Link>
            <Link to="/about" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
              <Icon name="Info" />
              <span>About</span>
            </Link>
            <button
              onClick={() => navigate('/')}
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
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-white/70 mt-2">Your AI-powered ML learning hub</p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <StatCard icon="Sparkles" label="Learning Modalities" value="4+" />
          <StatCard icon="Brain" label="AI Model" value="Gemini 2.0" />
          <StatCard icon="Layers" label="Depth Levels" value="3" />
          <StatCard icon="Download" label="Export Formats" value="5+" />
        </section>

        {/* Modules */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">Learning Modules</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <ModuleCard
              icon="FileText"
              title="Text Explanation"
              desc="AI breaks down complex ML concepts into easy narratives."
              img="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&auto=format"
            />
            <ModuleCard
              icon="Code"
              title="Code Generation"
              desc="Generate Python, TensorFlow, and PyTorch code instantly."
              img="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&auto=format"
            />
            <ModuleCard
              icon="Headphones"
              title="Audio Learning"
              desc="Listen to AI-narrated lectures on the go."
              img="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&auto=format"
            />
            <ModuleCard
              icon="Image"
              title="Image Visualization"
              desc="Visualize architectures, graphs, and decision boundaries."
              img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format"
            />
          </div>
        </section>

        {/* History */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">Recent Activity</h2>
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 divide-y divide-white/10">
            {history.map((h, i) => (
              <HistoryItem key={i} {...h} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}