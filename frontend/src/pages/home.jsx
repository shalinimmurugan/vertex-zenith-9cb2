import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const GlassCard = ({ icon, title, desc, img }) => (
  <div className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <img
      src={img}
      alt={title}
      className="w-full h-40 object-cover rounded-xl mb-4"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/1a1a2e/eaeaea?text=AI'; }}
    />
    <Icon name={icon} className="w-10 h-10 mb-4 text-indigo-300" />
    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70">{desc}</p>
  </div>
);

const Step = ({ num, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">{num}</div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-white/70 mt-1">{desc}</p>
    </div>
  </div>
);

export default function Home() {
  const [text, setText] = useState('');
  const fullText = 'Learn ML with AI';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050506]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050506]/80 to-[#050506]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full filter blur-3xl animate-pulse delay-2000" />
        <div className="container mx-auto px-4 md:px-6 text-center z-10">
          <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tight">
            {text}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl mb-10">
            Master machine learning through AI-driven personalized paths, interactive notebooks, and real-world projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 active:scale-95 transition-all duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 active:scale-95 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-24 lg:py-32 bg-[#050506]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white text-center mb-12 md:mb-20">AI Learning Modalities</h2>
          <div className="grid gap-6 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
            <GlassCard
              icon="Brain"
              title="Adaptive Paths"
              desc="AI curates personalized syllabi based on your goals and progress."
              img="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&auto=format"
            />
            <GlassCard
              icon="BookOpen"
              title="Interactive Notebooks"
              desc="Run Python & TensorFlow code in-browser with instant feedback."
              img="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&auto=format"
            />
            <GlassCard
              icon="Zap"
              title="Live Projects"
              desc="Deploy models to the cloud and monitor performance in real time."
              img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format"
            />
            <GlassCard
              icon="Users"
              title="Peer Matchmaking"
              desc="AI pairs you with study partners at similar skill levels."
              img="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-24 lg:py-32 bg-[#050506]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white text-center mb-12 md:mb-20">How It Works</h2>
          <div className="max-w-3xl mx-auto grid gap-8 md:gap-12">
            <Step num={1} title="Create Your Profile" desc="Tell us your background, goals, and preferred learning style." />
            <Step num={2} title="AI Generates Your Path" desc="Our engine designs a syllabus with curated content and projects." />
            <Step num={3} title="Learn & Build" desc="Complete interactive lessons, code notebooks, and real-world projects." />
            <Step num={4} title="Get Certified" desc="Earn blockchain-verified certificates and share your portfolio." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-indigo-900 to-[#050506]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6">Ready to Start?</h2>
          <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl mb-10">
            Join thousands of learners accelerating their ML journey with AI.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-lg bg-cyan-400 text-[#050506] font-bold text-lg hover:bg-cyan-300 active:scale-95 transition-all duration-300"
          >
            <Icon name="Rocket" className="w-6 h-6" />
            Sign Up for Free
          </Link>
        </div>
      </section>
    </>
  );
}