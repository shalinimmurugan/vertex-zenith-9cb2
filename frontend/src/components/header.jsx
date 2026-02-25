import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#050506]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <Icon name="Cpu" className="w-6 h-6 text-indigo-400" />
          GyanGuru
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
          <Link to="/courses" className="text-white/80 hover:text-white transition-colors">Courses</Link>
          <Link to="/projects" className="text-white/80 hover:text-white transition-colors">Projects</Link>
          <Link to="/community" className="text-white/80 hover:text-white transition-colors">Community</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-white/30 text-white text-sm hover:bg-white/10 active:scale-95 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 active:scale-95 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}