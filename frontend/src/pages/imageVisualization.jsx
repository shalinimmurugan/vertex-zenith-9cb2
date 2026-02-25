import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const TypeCard = ({ icon, title, desc, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left rounded-2xl border p-4 transition-all duration-300 ${
      selected
        ? 'bg-indigo-600/20 border-indigo-500'
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    }`}
  >
    <Icon name={icon} className={`w-6 h-6 mb-2 ${selected ? 'text-indigo-300' : 'text-white/70'}`} />
    <h3 className={`font-semibold mb-1 ${selected ? 'text-white' : 'text-white/80'}`}>{title}</h3>
    <p className={`text-sm ${selected ? 'text-white/70' : 'text-white/60'}`}>{desc}</p>
  </button>
);

const GalleryItem = ({ img, onClick }) => (
  <div
    onClick={onClick}
    className="rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition-transform duration-300 cursor-pointer"
  >
    <img
      src={img}
      alt="diagram"
      className="w-full h-32 object-cover"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/1a1a2e/eaeaea?text=Diagram'; }}
    />
  </div>
);

const Modal = ({ img, onClose }) => (
  <div
    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/20">
      <img
        src={img}
        alt="diagram zoom"
        className="w-full h-auto"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x900/1a1a2e/eaeaea?text=Diagram'; }}
      />
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        <Icon name="X" className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default function ImageVisualization() {
  const navigate = useNavigate();
  const [concept, setConcept] = useState('');
  const [type, setType] = useState('flowchart');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [gallery, setGallery] = useState([
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&auto=format',
  ]);
  const [modal, setModal] = useState(null);

  const types = [
    { key: 'flowchart', label: 'Flowchart', desc: 'Step-by-step process flow', icon: 'GitBranch' },
    { key: 'architecture', label: 'Architecture', desc: 'System component diagram', icon: 'Layers' },
    { key: 'data-flow', label: 'Data Flow', desc: 'Data movement visualization', icon: 'ArrowRight' },
  ];

  const handleGenerate = async () => {
    if (!concept.trim()) return;
    setLoading(true);
    // TODO: connect API endpoint using src/config/api.js
    // const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.IMAGE_GEN}`, { method: 'POST', body: JSON.stringify({ concept, type }) });
    // const blob = await res.blob();
    setTimeout(() => {
      const mockUrl = `https://images.unsplash.com/photo-${['1518770660439-4636190af475', '1551288049-bebda4e38f71', '1526374965328-7f61d4dc18c5'][Math.floor(Math.random() * 3)]}?w=1200&h=800&fit=crop&auto=format`;
      setImageUrl(mockUrl);
      setGallery((g) => [mockUrl, ...g.slice(0, 5)]);
      setLoading(false);
    }, 2000);
  };

  const handleDownload = (format) => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `${concept.replace(/\s+/g, '_')}_diagram.${format}`;
    a.click();
  };

  const handleSave = () => {
    // TODO: connect API endpoint using src/config/api.js
    // fetch(`${API_BASE_URL}${API_ENDPOINTS.SAVE_HISTORY}`, { method: 'POST', body: JSON.stringify({ type: 'image', concept, url: imageUrl }) });
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
          <Link to="/learn/code" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="Code" />
            <span>Code</span>
          </Link>
          <Link to="/learn/audio" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <Icon name="Headphones" />
            <span>Audio</span>
          </Link>
          <Link to="/learn/visual" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">
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
          <h1 className="text-3xl md:text-4xl font-bold text-white">Image Visualization</h1>
          <p className="text-white/70 mt-2">Generate ML diagrams and flowcharts using AI</p>
        </div>

        {/* Input */}
        <section className="mb-8">
          <label className="block text-white/80 mb-3">Enter ML concept or algorithm</label>
          <input
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. Neural Network Architecture"
          />
        </section>

        {/* Diagram Type */}
        <section className="mb-8">
          <label className="block text-white/80 mb-3">Select diagram type</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {types.map((t) => (
              <TypeCard key={t.key} {...t} selected={type === t.key} onClick={() => setType(t.key)} />
            ))}
          </div>
        </section>

        {/* Generate */}
        <div className="mb-8">
          <button
            onClick={handleGenerate}
            disabled={loading || !concept.trim()}
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 active:scale-95 transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? <Icon name="Loader" className="w-5 h-5 animate-spin" /> : <Icon name="Sparkles" />}
            Generate Diagram
          </button>
        </div>

        {/* Generated Image */}
        {imageUrl && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Generated Diagram</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload('png')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-300"
                >
                  <Icon name="Download" className="w-4 h-4" />
                  <span className="text-sm">PNG</span>
                </button>
                <button
                  onClick={() => handleDownload('svg')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-300"
                >
                  <Icon name="Download" className="w-4 h-4" />
                  <span className="text-sm">SVG</span>
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
            <div
              onClick={() => setModal(imageUrl)}
              className="rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={imageUrl}
                alt="generated diagram"
                className="w-full h-auto"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x800/1a1a2e/eaeaea?text=Diagram'; }}
              />
            </div>
            <p className="text-white/60 text-sm mt-3">Click image to zoom</p>
          </section>
        )}

        {/* Gallery */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Previous Diagrams</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((img, i) => (
              <GalleryItem key={i} img={img} onClick={() => setModal(img)} />
            ))}
          </div>
        </section>

        {/* Modal */}
        {modal && <Modal img={modal} onClose={() => setModal(null)} />}
      </main>
    </div>
  );
}