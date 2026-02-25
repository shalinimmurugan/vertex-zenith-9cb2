import React from 'react';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function Footer() {
  return (
    <footer className="bg-[#050506] border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Icon name="Cpu" className="w-6 h-6 text-indigo-400" />
              GyanGuru
            </div>
            <p className="text-white/70 text-sm">AI-powered machine learning education for everyone.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <span>© 2024 GyanGuru. All rights reserved.</span>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors"><Icon name="Twitter" className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Icon name="Github" className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Icon name="Linkedin" className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}