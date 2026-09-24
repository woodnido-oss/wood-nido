import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, CheckCircle2, Phone, Sparkles } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { quoteModalOpen, setQuoteModalOpen, selectedServiceForQuote, setSelectedServiceForQuote, services, addLead, siteConfig } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Cupboards');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedServiceForQuote) {
      setService(selectedServiceForQuote);
    }
  }, [selectedServiceForQuote]);

  if (!quoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addLead({
      name,
      phone,
      email,
      service,
      budget,
      message,
      notes: 'Direct inquiry via modal popup',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setQuoteModalOpen(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setBudget('');
      setSelectedServiceForQuote('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#ebdcc7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#241710] border-b border-[#3d291e] text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2 text-amber-100">
              <Sparkles className="w-4 h-4 text-[#dca34f]" />
              Get Free Consultation & Quote
            </h3>
            <p className="text-xs text-stone-300 mt-0.5">
              {siteConfig.companyName || 'Wood Nido'} • Islamabad & Rawalpindi Expert Carpentry
            </p>
          </div>
          <button
            onClick={() => setQuoteModalOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 bg-[#fbf8f3]">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-stone-900">Request Sent Successfully!</h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you! Our carpentry specialist will review your project and get in touch with you at <strong>{phone}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Khan"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#c28c46] focus:border-transparent outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0334-XXXXXXX"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#c28c46] focus:border-transparent outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#c28c46] focus:border-transparent outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#c28c46] focus:border-transparent outline-hidden bg-white"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Complete Home Interior">Complete Home Interior</option>
                    <option value="Custom Renovation">Custom Renovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Approximate Budget
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 150,000 PKR"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#c28c46] focus:border-transparent outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Project Details / Location in Islamabad
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the room, approximate measurements, desired materials, or timeline..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#c28c46] focus:border-transparent outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#241710] hover:bg-[#382317] text-[#fdf8f0] text-xs font-bold py-3 rounded-lg border border-[#d6a55e]/30 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#dca34f]" />
                  <span>Request Free Estimate</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-stone-500">
                Or call directly at <a href={`tel:${siteConfig.phone}`} className="text-[#9e631b] hover:text-[#72430e] font-semibold underline">{siteConfig.displayPhone}</a>
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
