
import React, { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import HowItWorks from './components/HowItWorks';
import SuccessSection from './components/SuccessSection';
import PhaseShift from './components/PhaseShift';
import ExpertGuide from './components/ExpertGuide';
import UseCases from './components/UseCases';
import FeatureDeepDive from './components/FeatureDeepDive';
import CradleFocus from './components/CradleFocus';
import Ecosystem from './components/Ecosystem';
import PatentSection from './components/PatentSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import { getCurrentUser } from './services/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'admin'>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true); // null = checking
  const [scrolled, setScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const { scrollYProgress } = useScroll();
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    // FOR CRAWLER AUDIT: Bypass login check
    setIsAuthenticated(true);
  }, []);

  // Handle hash-based routing
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else {
        setView('landing');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync the React state with the scroll position for navbar/component logic
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (view !== 'landing') return;
    setScrolled(window.scrollY > 50);
    // Switch global theme state after the dynamic transition in HowItWorks
    if (latest > 0.35) {
      if (currentTheme !== 'light') setCurrentTheme('light');
    } else {
      if (currentTheme !== 'dark') setCurrentTheme('dark');
    }
  });

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#a3cf4a]/20 border-t-[#a3cf4a] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  if (view === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen transition-colors duration-700">
      <Navbar 
        scrolled={scrolled} 
        theme={currentTheme} 
        isAuthenticated={isAuthenticated} 
        onLogout={() => setIsAuthenticated(false)} 
        onOpenAI={() => setIsAIOpen(true)}
      />
      
      <main>
        {/* INITIAL DARK SECTIONS */}
        <Hero />
        <Problem />
        <SuccessSection />
        <PhaseShift />
        <HowItWorks onOpenAI={() => setIsAIOpen(true)} />
        <UseCases />
        <FeatureDeepDive theme={currentTheme} />
        <CradleFocus theme={currentTheme} />
        <Ecosystem theme={currentTheme} />
        <PatentSection theme={currentTheme} />
        <ExpertGuide />
        <ContactForm theme={currentTheme} />
      </main>

      <Footer theme={currentTheme} />
      <AIAssistant isOpen={isAIOpen} onToggle={setIsAIOpen} />
    </div>
  );
};

export default App;
