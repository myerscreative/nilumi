
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getGeminiResponse } from '../services/geminiService';
import { saveAIChat } from '../services/supabase';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello. I am the Nilumi Innovation Assistant. How can I help you understand our patented light switch technology today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "How does the functional cradle work?",
    "Tell me about the wireless control switches",
    "What happens during a power outage?",
    "Is it compatible with standard wall boxes?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideMsg?: string) => {
    const msgToSend = overrideMsg || input;
    if (!msgToSend.trim() || isLoading) return;

    const userMsg = msgToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', content: response || "Something went wrong. Please try again." }]);
    setIsLoading(false);
    
    // Persist the interaction for analytics
    if (response) {
      saveAIChat(userMsg, response);
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 100px (e.g. out of header)
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-[60] transition-opacity duration-500 ${isVisible || isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {isOpen ? (
        <div className="bg-slate-900 border border-slate-700 w-[90vw] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-[#a3cf4a] to-[#2bb673] text-slate-900">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-slate-900/20">
                <img src="/images/nilumi-logo.png" alt="N" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm">Nilumi Innovation Bot</p>
                <p className="text-[10px] uppercase opacity-80 font-bold tracking-widest">Technical Assistant</p>
              </div>
            </div>
            <button onClick={() => onToggle(false)} className="hover:bg-black/10 p-1 rounded transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#2bb673] text-slate-900 font-medium rounded-br-none shadow-lg' 
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}>
                  {m.role === 'user' ? (
                    m.content
                  ) : (
                    <div className="markdown-content">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h3: ({node, ...props}) => <h3 className="text-white font-bold text-base mt-6 mb-2 first:mt-0" {...props} />,
                          hr: ({node, ...props}) => <hr className="border-slate-700 my-6" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-2 mb-4" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          p: ({node, ...props}) => <p className="mb-4 last:mb-0 whitespace-pre-wrap" {...props} />,
                          strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-xl rounded-bl-none border border-slate-700 animate-pulse text-slate-500 text-sm">
                  Searching patent documents...
                </div>
              </div>
            )}
            
            {!isLoading && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(s)}
                    className="text-[10px] bg-slate-800 border border-slate-700 hover:border-[#a3cf4a] text-slate-400 hover:text-[#a3cf4a] px-2 py-1 rounded-full transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the patent or cradle..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#a3cf4a] transition-colors"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#a3cf4a] to-[#2bb673] text-slate-900 p-2 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group">
          {/* AI Nudge Tooltip - More prominent and persistent */}
          <div className="absolute bottom-full right-0 mb-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none z-[70]">
            <div className="bg-slate-900 border border-[#a3cf4a]/50 p-4 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex items-center gap-3">
              <div className="flex -space-x-1">
                <div className="w-2 h-2 rounded-full bg-[#a3cf4a] animate-ping"></div>
                <div className="w-2 h-2 rounded-full bg-[#a3cf4a] absolute"></div>
              </div>
              <div>
                <p className="text-[#a3cf4a] text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">Nilumi Intelligence</p>
                <p className="text-white text-xs font-semibold">Ready to answer patent & tech questions</p>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute top-full right-10 w-4 h-4 bg-slate-900 border-r border-b border-[#a3cf4a]/50 rotate-45 -mt-2"></div>
            </div>
          </div>

          <button 
            onClick={() => onToggle(true)}
            className="flex items-center gap-3 pr-6 pl-4 h-16 rounded-full bg-slate-950 border-2 border-[#a3cf4a]/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:border-[#a3cf4a] hover:shadow-[0_0_30px_rgba(163,207,74,0.3)] relative overflow-hidden"
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#a3cf4a]/10 to-[#2bb673]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* AI Icon Container (Circle) */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#a3cf4a] to-[#2bb673] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
              <svg 
                className="w-6 h-6 text-slate-900" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                {/* Standard Triple Sparkles / AI Icon */}
                <path d="M12 3L10.5 8.5L5 10L10.5 11.5L12 17L13.5 11.5L19 10L13.5 8.5L12 3Z" />
                <path d="M19 14L18.25 16.75L15.5 17.5L18.25 18.25L19 21L19.75 18.25L22.5 17.5L19.75 16.75L19 14Z" />
                <path d="M6 14L5.25 16.75L2.5 17.5L5.25 18.25L6 21L6.75 18.25L9.5 17.5L6.75 16.75L6 14Z" />
              </svg>
              
              {/* Pulse effect for the icon */}
              <div className="absolute inset-0 rounded-full border-2 border-[#a3cf4a] animate-ping opacity-20"></div>
            </div>

            {/* Clear Text Label */}
            <div className="flex flex-col items-start">
              <span className="text-white text-sm font-bold tracking-tight group-hover:text-[#a3cf4a] transition-colors leading-none">
                Ask Innovation AI
              </span>
              <span className="text-slate-500 text-[9px] uppercase font-black tracking-widest mt-1 group-hover:text-slate-400 transition-colors">
                Patent Expert
              </span>
            </div>

            {/* "New" or active indicator */}
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3cf4a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a3cf4a]"></span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
