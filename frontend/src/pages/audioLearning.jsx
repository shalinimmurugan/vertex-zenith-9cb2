import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const Waveform = ({ isPlaying }) => {
  const bars = 40;
  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-300 ${
            isPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'
          }`}
          style={{
            height: isPlaying ? `${Math.random() * 100}%` : '20%',
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default function AudioLearning() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('female');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const voices = [
    { key: 'female', label: 'Female (AI)', icon: 'User' },
    { key: 'male', label: 'Male (AI)', icon: 'User' },
  ];

  const sampleTopics = [
    'Gradient descent optimization algorithm',
    'Convolutional neural networks explained',
    'Bias vs variance tradeoff in ML',
    'How decision trees work',
    'Introduction to reinforcement learning',
  ];

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    // TODO: connect API endpoint using src/config/api.js
    // const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUDIO_GEN}`, { method: 'POST', body: JSON.stringify({ text, voice }) });
    // const blob = await res.blob();
    setTimeout(() => {
      const mockBlob = new Blob([text], { type: 'audio/wav' });
      const url = URL.createObjectURL(mockBlob);
      setAudioUrl(url);
      setLoading(false);
    }, 2000);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = 'ml_audio.wav';
    a.click();
  };

  const handleSave = () => {
    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.SAVE_HISTORY}`, { method: 'POST', body: JSON.stringify({ type: 'audio', text, voice }) });
    alert('Saved to history!');
  };

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

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
          <Link to="/learn/audio" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">
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
          <h1 className="text-3xl md:text-4xl font-bold text-white">Audio Learning</h1>
          <p className="text-white/70 mt-2">Convert text explanations to speech for auditory learning</p>
        </div>

        {/* Input */}
        <section className="mb-8">
          <label className="block text-white/80 mb-3">Enter or paste your ML explanation</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
            rows={6}
            placeholder="e.g. Gradient descent is an optimization algorithm used to minimize the loss function..."
          />
          <div className="mt-3 flex gap-2 flex-wrap">
            {sampleTopics.map((t) => (
              <button
                key={t}
                onClick={() => setText(t)}
                className="px-3 py-1 rounded-full bg-white/10 text-white/80 hover:bg-white/20 text-xs transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* Voice Selection */}
        <section className="mb-8">
          <label className="block text-white/80 mb-3">Select voice</label>
          <div className="flex gap-4">
            {voices.map((v) => (
              <button
                key={v.key}
                onClick={() => setVoice(v.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  voice === v.key
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon name={v.icon} className="w-5 h-5" />
                {v.label}
              </button>
            ))}
          </div>
        </section>

        {/* Generate */}
        <div className="mb-8">
          <button
            onClick={handleGenerate}
            disabled={loading || !text.trim()}
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 active:scale-95 transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? <Icon name="Loader" className="w-5 h-5 animate-spin" /> : <Icon name="Mic" />}
            Generate Audio
          </button>
        </div>

        {/* Player */}
        {audioUrl && (
          <section className="mb-8">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Generated Audio</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-300"
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

              <Waveform isPlaying={playing} />

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={togglePlayPause}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 transition-all duration-300"
                >
                  <Icon name={playing ? 'Pause' : 'Play'} className="w-6 h-6" />
                </button>
                <span className="text-white/70 text-sm">
                  {playing ? 'Playing...' : 'Click to play'}
                </span>
              </div>

              <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}