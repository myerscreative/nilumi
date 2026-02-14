
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../services/supabase';

interface Props {
  theme?: 'dark' | 'light';
}

const ContactForm: React.FC<Props> = ({ theme = 'light' }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase
        .from('nilumi_leads')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            company: formData.company,
            licensing_interest: formData.message,
            captured_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error("Supabase submission error:", err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-32 bg-[#F8FAFC] text-[#0F172A] text-center">
        <div className="max-w-xl mx-auto px-6">
          <div className="w-24 h-24 bg-nilumi-green/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
            <svg className="w-12 h-12 text-nilumi-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Inquiry Received</h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">A licensing specialist will reach out within 24 business hours to coordinate a technical briefing and coordinate next steps.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-start">
        <div className="text-left">
          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-6 block">Strategic Engagement</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-8 font-heading tracking-tight leading-[1.1]">
            Strategic Licensing Inquiry
          </h2>
          <p className="text-slate-500 text-lg mb-12 leading-relaxed font-medium max-w-lg">
            Currently engaging with select Tier-1 electrical manufacturers and hospitality innovation teams.
          </p>
          
          <div className="space-y-4 mb-12">
            {[
              "Issued U.S. Utility Patents",
              "Dual-State Cradle Architecture",
              "Retrofit-Compatible Form Factor",
              "UL-Compliance Architecture Ready",
              "NDA-Ready Technical Brief"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-[#0F172A] font-semibold text-sm">
                <div className="w-1.5 h-1.5 bg-nilumi-green rounded-full" />
                {item}
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Response Commitment</p>
            <p className="text-[#0F172A] font-bold text-sm">Initial review within 24 business hours.</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-50 border border-slate-200 p-8 lg:p-12 rounded-2xl shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <input 
                  required 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-[#0F172A] focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm text-sm" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <input 
                  required 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-[#0F172A] focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm text-sm" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <input 
                required 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-[#0F172A] focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Corporate Identity</label>
              <input 
                required 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Leviton, Lutron, GE, Hilton Group..." 
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-[#0F172A] focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm placeholder:text-slate-300 text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Licensing Interest</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-[#0F172A] h-32 resize-none focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm placeholder:text-slate-300 text-sm" 
                placeholder="Briefly describe your interest in the Nilumi cradle technology."
              />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-xs font-bold text-center">Submission failed. Please check your connection and try again.</p>
            )}

            <div className="space-y-4">
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-[#0F172A] text-white font-bold py-4 rounded-lg transition-all hover:bg-slate-800 text-[11px] uppercase tracking-[0.2em] active:scale-[0.98] disabled:opacity-50"
              >
                {status === 'submitting' ? 'Processing Inquiry...' : 'Request Licensing Brief'}
              </button>
              <p className="text-[10px] text-slate-400 text-center font-medium">
                This inquiry form is intended for established manufacturers and portfolio development teams.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;