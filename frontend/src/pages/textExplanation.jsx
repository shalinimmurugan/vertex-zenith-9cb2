import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const DifficultyButton = ({ level, label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
      selected
        ? 'bg-indigo-600 border-indigo-500 text-white'
        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
    }`}
  >
    {label}
  </button>
);

const ExportButton = ({ format, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all duration-300"
  >
    <Icon name={icon} className="w-4 h-4" />
    <span className="text-sm">{format}</span>
  </button>
);

export default function TextExplanation() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [typed, setTyped] = useState('');

  const difficulties = [
    { key: 'beginner', label: 'Beginner' },
    { key: 'intermediate', label: 'Intermediate' },
    { key: 'advanced', label: 'Advanced' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setExplanation('');
    setTyped('');
    // TODO: connect API endpoint using src/config/api.js
    // const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TEXT_EXPLAIN}`, { method: 'POST', body: JSON.stringify({ topic, difficulty }) });
    // const data = await res.json();
    setTimeout(() => {
      const mock = `${topic} (${difficulty})\n\n` +
        `Definition: A statistical method to model the relationship between a dependent variable and one or more independent variables.\n\n` +
        `Intuition: Imagine drawing the best-fit straight line through scattered data points to predict future values.\n\n` +
        `Mathematical Formulation: y = β₀ + β₁x + ε, where β₀ is intercept, β₁ is slope, and ε is error term.\n\n` +
        `Use Cases: House price prediction, sales forecasting, trend analysis.`;
      setExplanation(mock);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (!explanation) return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped(explanation.slice(0, i + 1));
      i++;
      if (i === explanation.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [explanation]);

  const handleExport = (format) => {
    const blob = new Blob([explanation], { type: format === 'PDF' ? 'application/pdf' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '_')}_explanation.${format.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.SAVE_HISTORY}`, { method: 'POST', body: JSON.stringify({ type: 'text', topic, content: explanation }) });
    alert('Saved to history!');
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
          <Link to="/learn/text" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">
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
          <Link to="/learn/image" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Text Explanation</h1>
          <p className="text-white/70 mt-2">Get AI-generated explanations for any ML topic</p>
        </div>

        {/* Input */}
        <section className="mb-8">
          <label className="block text-white/80 mb-3">Enter a machine learning topic</label>
          <div className="flex gap-4">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. Linear Regression"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 active:scale-95 transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? <Icon name="Loader" className="w-5 h-5 animate-spin" /> : <Icon name="Sparkles" />}
              Generate
            </button>
          </div>
        </section>

        {/* Difficulty */}
        <section className="mb-8">
          <label className="block text-white/80 mb-3">Select difficulty level</label>
          <div className="flex gap-3">
            {difficulties.map((d) => (
              <DifficultyButton key={d.key} {...d} selected={difficulty === d.key} onClick={() => setDifficulty(d.key)} />
            ))}
          </div>
        </section>

        {/* Explanation */}
        {explanation && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">AI Explanation</h2>
              <div className="flex gap-2">
                <ExportButton format="PDF" icon="FileText" onClick={() => handleExport('PDF')} />
                <ExportButton format="TXT" icon="Download" onClick={() => handleExport('TXT')} />
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30 active:scale-95 transition-all duration-300"
                >
                  <Icon name="Save" className="w-4 h-4" />
                  <span className="text-sm">Save</span>
                </button>
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-white/90 whitespace-pre-wrap leading-relaxed">
              {typed}
              <span className="animate-pulse">|</span>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}