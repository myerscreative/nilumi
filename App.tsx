
import React, { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import SuccessSection from './components/SuccessSection';
import PhaseShift from './components/PhaseShift';
import HowItWorks from './components/HowItWorks';
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
import ResetPasswordPage from './components/ResetPasswordPage';
import { getCurrentUser, supabase } from './services/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'admin' | 'reset-password'>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = checking
  const [scrolled, setScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const { scrollYProgress } = useScroll();
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Initialize auth and listeners
  useEffect(() => {
    // 1. Capture hash immediately on mount
    const hashOnLoad = window.location.hash;
    const isAuthAction = hashOnLoad.includes('type=recovery') || 
                        hashOnLoad.includes('type=invite') || 
                        hashOnLoad.includes('type=signup') || 
                        hashOnLoad === '#reset-password';

    // Set initial view synchronously to prevent flickering or mid-render shifts
    if (isAuthAction) {
      setView('reset-password');
    } else if (hashOnLoad === '#admin') {
      setView('admin');
    }

    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session?.user);
      
      // If we are authenticated but on the landing, we stay there.
      // If we have an auth action hash, initializeAuth won't override setView('reset-password')
      // but it will establish the session needed for ResetPasswordPage.
    };

    initializeAuth();

    // 3. Listen for auth state changes
    let invitationHandled = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, !!session);
      
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        // If we are catching a signed in event during an invite/recovery, force the view ONLY ONCE
        const currentHash = window.location.hash;
        const isInvitation = hashOnLoad.includes('type=invite') || hashOnLoad.includes('type=recovery') || 
                           currentHash.includes('type=invite') || currentHash.includes('type=recovery');

        if (isInvitation && !invitationHandled) {
          setView('reset-password');
          invitationHandled = true; // Mark as handled so subsequent logins don't loop
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setView('landing');
        invitationHandled = true; // Also block invitation logic if they explicitly log out
      } else if (event === 'PASSWORD_RECOVERY') {
        setView('reset-password');
      }
    });

    // 4. Handle hash changes for navigation
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setView('admin');
      } else if (hash === '#reset-password' || hash.includes('type=recovery') || hash.includes('type=invite') || hash.includes('type=signup')) {
        setView('reset-password');
      } else if (!hash) {
        // ONLY reset to landing if we aren't currently in an auth-specific view
        // to prevent Supabase's automatic hash clearing from kicking us to landing/login
        setView(prev => (prev === 'reset-password' || prev === 'admin') ? prev : 'landing');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('hashchange', handleHash);
    };
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
    // If we're on reset-password page, don't show loading spinner
    if (view === 'reset-password') {
      return (
        <ResetPasswordPage 
          onComplete={() => {
            window.location.hash = '';
            setView('landing');
          }} 
        />
      );
    }
    
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#a3cf4a]/20 border-t-[#a3cf4a] rounded-full animate-spin" />
      </div>
    );
  }

  // Check for reset-password view BEFORE checking authentication
  if (view === 'reset-password') {
    return (
      <ResetPasswordPage 
        onComplete={() => {
          window.location.hash = '';
          setView('landing');
        }} 
      />
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
