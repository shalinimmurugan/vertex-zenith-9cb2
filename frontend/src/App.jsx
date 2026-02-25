import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/home';
import Dashboard from '@pages/dashboard';
import TextExplanation from '@pages/textExplanation';
import CodeGeneration from '@pages/codeGeneration';
import AudioLearning from '@pages/audioLearning';
import ImageVisualization from '@pages/imageVisualization';
import Settings from '@pages/settings';
import Login from '@pages/login';
import SignUp from '@pages/signUp';
import About from '@pages/about';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn/text" element={<TextExplanation />} />
        <Route path="/learn/code" element={<CodeGeneration />} />
        <Route path="/learn/audio" element={<AudioLearning />} />
        <Route path="/learn/visual" element={<ImageVisualization />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;