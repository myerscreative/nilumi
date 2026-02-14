
import React, { useState, useRef, useEffect } from 'react';
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

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
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
                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#2bb673] text-slate-900 font-medium rounded-br-none shadow-lg' 
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}>
                  {m.content}
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
        <button 
          onClick={() => onToggle(true)}
          className="bg-gradient-to-br from-[#a3cf4a] to-[#2bb673] text-slate-900 w-14 h-14 rounded-full shadow-2xl shadow-green-900/40 flex items-center justify-center group transition-all transform hover:scale-110 active:scale-95 p-2"
        >
          <img src="/images/nilumi-logo.png" alt="AI" className="w-full h-full object-cover rounded-full group-hover:rotate-6 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
