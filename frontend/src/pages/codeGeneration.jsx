import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const CheckItem = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500"
    />
    <span className="text-sm">{label}</span>
  </label>
);

const CodeBlock = ({ code, language }) => (
  <div className="relative rounded-xl bg-[#0d0d10] border border-white/10 p-4 overflow-x-auto">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs text-white/60 uppercase">{language}</span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          alert('Copied to clipboard!');
        }}
        className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-white/80 hover:bg-white/20 text-xs transition-colors"
      >
        <Icon name="Copy" className="w-3 h-3" />
        Copy
      </button>
    </div>
    <pre className="text-sm text-cyan-300 font-mono">{code}</pre>
  </div>
);

export default function CodeGeneration() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [deps, setDeps] = useState('');
  const [steps, setSteps] = useState('');
  const [options, setOptions] = useState({ comments: true, deps: true, steps: true, oop: false });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setCode('');
    setDeps('');
    setSteps('');
    // TODO: connect API endpoint using src/config/api.js
    // const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CODE_GEN}`, { method: 'POST', body: JSON.stringify({ prompt, options }) });
    // const data = await res.json();
    setTimeout(() => {
      const mockCode = `# ${prompt}\nimport numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\n\n# Load dataset\ndata = pd.read_csv('data.csv')\nX = data.drop('target', axis=1)\ny = data['target']\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Train model\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Evaluate\npreds = model.predict(X_test)\nmse = mean_squared_error(y_test, preds)\nprint('MSE:', mse)`;
      setCode(mockCode);
      setDeps('numpy, pandas, scikit-learn');
      setSteps('1. Install dependencies\n2. Save code as train.py\n3. Run: python train.py');
      setLoading(false);
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ml_script.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.SAVE_HISTORY}`, { method: 'POST', body: JSON.stringify({ type: 'code', prompt, content: code }) });
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
          <Link to="/learn/text" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="FileText" />
            <span>Text</span>
          </Link>
          <Link to="/learn/code" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">
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
          <h1 className="text-3xl md:text-4xl font-bold text-white">Code Generation</h1>
          <p className="text-white/70 mt-2">Generate executable Python ML code with comments and dependencies</p>
        </div>

        {/* Input */}
        <section className="mb-8">
          <label className="block text-white/80 mb-3">Describe your ML problem or algorithm</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
            rows={4}
            placeholder="e.g. Build a random forest classifier for Titanic dataset"
          />
        </section>

        {/* Options */}
        <section className="mb-8">
          <label className="block text-white/80 mb-3">Code Requirements</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CheckItem label="Comments" checked={options.comments} onChange={(e) => setOptions({ ...options, comments: e.target.checked })} />
            <CheckItem label="Dependencies" checked={options.deps} onChange={(e) => setOptions({ ...options, deps: e.target.checked })} />
            <CheckItem label="Steps" checked={options.steps} onChange={(e) => setOptions({ ...options, steps: e.target.checked })} />
            <CheckItem label="OOP Style" checked={options.oop} onChange={(e) => setOptions({ ...options, oop: e.target.checked })} />
          </div>
        </section>

        {/* Generate */}
        <div className="mb-8">
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 active:scale-95 transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? <Icon name="Loader" className="w-5 h-5 animate-spin" /> : <Icon name="Zap" />}
            Generate Code
          </button>
        </div>

        {/* Output */}
        {code && (
          <section className="space-y-6">
            {/* Code */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-white">Generated Code</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all duration-300"
                  >
                    <Icon name="Download" className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30 active:scale-95 transition-all duration-300"
                  >
                    <Icon name="Save" className="w-4 h-4" />
                    <span className="text-sm">Save</span>
                  </button>
                </div>
              </div>
              <CodeBlock code={code} language="python" />
            </div>

            {/* Dependencies */}
            {options.deps && deps && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Dependencies</h3>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <code className="text-sm text-cyan-300">pip install {deps}</code>
                </div>
              </div>
            )}

            {/* Steps */}
            {options.steps && steps && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Execution Steps</h3>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white/80 whitespace-pre-wrap text-sm">
                  {steps}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}