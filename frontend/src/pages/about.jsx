import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
    <Icon name={icon} className="w-8 h-8 text-indigo-300 mb-4" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70 text-sm">{desc}</p>
  </div>
);

const TeamMember = ({ img, name, role, bio }) => (
  <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
    <img
      src={img}
      alt={name}
      className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/1a1a2e/eaeaea?text=Team'; }}
    />
    <h4 className="text-white font-semibold text-center">{name}</h4>
    <p className="text-indigo-300 text-center text-sm mb-2">{role}</p>
    <p className="text-white/60 text-center text-xs">{bio}</p>
  </div>
);

export default function About() {
  const features = [
    { icon: 'Sparkles', title: 'Gemini 2.0 AI', desc: 'Powered by Google\'s latest generative model for accurate ML explanations.' },
    { icon: 'Code', title: 'Code Generation', desc: 'Instant Python, TensorFlow & PyTorch snippets with comments and dependencies.' },
    { icon: 'Headphones', title: 'Audio Learning', desc: 'Convert any text into natural speech for on-the-go learning.' },
    { icon: 'Image', title: 'Visual Diagrams', desc: 'Auto-generate flowcharts, architectures and data-flow diagrams.' },
    { icon: 'BookOpen', title: '4 Learning Modalities', desc: 'Text, Code, Audio, Image — choose how you learn best.' },
    { icon: 'Download', title: 'Export Anywhere', desc: 'PDF, TXT, PNG, SVG — take your learning offline.' },
  ];

  const team = [
    { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format', name: 'Arjun Patel', role: 'CEO & Founder', bio: 'Ex-Google ML Engineer with 10+ years in AI education.' },
    { img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format', name: 'Priya Sharma', role: 'CTO', bio: 'PhD in ML, led AI teams at Microsoft and OpenAI.' },
    { img: 'https://images.unsplash.com/photo-1500648767791-dc6a14c64387?w=80&h=80&fit=crop&auto=format', name: 'Ravi Kumar', role: 'Head of Product', bio: 'Designed learning platforms for 5M+ users worldwide.' },
    { img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format', name: 'Anita Desai', role: 'Lead Educator', bio: 'Stanford ML lecturer, 50+ courses authored.' },
  ];

  return (
    <div className="min-h-screen bg-[#050506]">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        {/* Hero */}
        <section className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">About GyanGuru</h1>
          <p className="max-w-3xl mx-auto text-white/80 text-lg md:text-xl mb-8">
            Democratizing machine learning education through AI-powered personalized learning paths.
          </p>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop&auto=format"
            alt="team"
            className="w-full max-w-4xl mx-auto rounded-2xl border border-white/10"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x600/1a1a2e/eaeaea?text=About'; }}
          />
        </section>

        {/* Mission */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              To make high-quality machine learning education accessible to everyone, everywhere. We believe AI can personalize learning at scale, adapting to each student's pace, style, and goals.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Platform Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Technology Stack</h2>
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Cpu" className="w-5 h-5 text-indigo-300" /> Backend
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Python 3.11</li>
                    <li>• FastAPI</li>
                    <li>• PostgreSQL</li>
                    <li>• Redis</li>
                    <li>• Google Gemini 2.0</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Code" className="w-5 h-5 text-indigo-300" /> Frontend
                  </h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• React 20+</li>
                    <li>• Tailwind CSS v4</li>
                    <li>• Vite</li>
                    <li>• React Router v6</li>
                    <li>• Lucide React</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Meet the Team</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <TeamMember key={i} {...m} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-white/80 mb-8">Have questions or feedback? We'd love to hear from you.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@gyanguru.ai"
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="Mail" className="w-5 h-5" />
                hello@gyanguru.ai
              </a>
              <a
                href="https://docs.gyanguru.ai"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="BookOpen" className="w-5 h-5" />
                Documentation
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-white/70 mb-6">Join thousands of students mastering ML with AI.</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-[#050506] font-bold hover:bg-cyan-300 active:scale-95 transition-all duration-300"
          >
            <Icon name="Rocket" className="w-5 h-5" />
            Get Started Free
          </Link>
        </section>
      </div>
    </div>
  );
}