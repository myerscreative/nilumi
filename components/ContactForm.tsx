
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
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Request Logged.</h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">An innovation specialist will reach out within 24 hours to coordinate your technical walkthrough and licensing inquiry.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24">
        <div>
          <span className="text-nilumi-teal font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Strategic Partnerships</span>
          <h2 className="text-4xl lg:text-6xl font-bold text-[#0F172A] mb-8 font-heading tracking-tighter leading-none">Bring Nilumi to Your Portfolio.</h2>
          <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium">
            Currently accepting inquiries from Tier-1 manufacturers and hospitality innovation groups. 
          </p>
          <div className="space-y-8">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                  <svg className="w-7 h-7 text-nilumi-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Response Guarantee</p>
                  <p className="text-[#0F172A] font-bold text-lg">Under 24 Business Hours</p>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                  <svg className="w-7 h-7 text-nilumi-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
               </div>
               <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Confidentiality</p>
                  <p className="text-[#0F172A] font-bold text-lg">NDA-Ready Patent Overview</p>
               </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-50 border border-slate-200 p-10 lg:p-14 rounded-[3rem] shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <input 
                  required 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[#0F172A] focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <input 
                  required 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[#0F172A] focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <input 
                required 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[#0F172A] focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Corporate Identity</label>
              <input 
                required 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Leviton, Lutron, GE, Hilton Group..." 
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[#0F172A] focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm placeholder:text-slate-300" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Licensing Interest</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[#0F172A] h-40 resize-none focus:outline-none focus:border-nilumi-green transition-colors font-medium shadow-sm placeholder:text-slate-300" 
                placeholder="Briefly describe your interest in the Nilumi cradle technology."
              />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-xs font-bold text-center">Submission failed. Please check your connection and try again.</p>
            )}

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-[#0F172A] text-white font-black py-5 rounded-xl transition-all shadow-xl hover:bg-slate-800 text-[11px] uppercase tracking-[0.3em] active:scale-95 disabled:opacity-50"
            >
              {status === 'submitting' ? 'Logging Request...' : 'Initiate Pitch Request'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;