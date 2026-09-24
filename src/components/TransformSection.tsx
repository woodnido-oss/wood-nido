import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export const TransformSection: React.FC = () => {
  const { siteConfig, addLead, services } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Modular Kitchen');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addLead({
      name,
      phone,
      email,
      service,
      message,
      budget,
      notes: 'Submitted via website bottom contact form',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setBudget('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-[#fbf8f3] to-[#f6efe4] relative border-t border-[#ebdcc7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title matching branding */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#a86c22]">
            Consultation & Bespoke Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#241710] tracking-tight mt-1">
            Transform Your Space with <span className="text-gold-gradient">Wood Nido</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#b87a2a] to-transparent mx-auto mt-3" />
          <p className="mt-3.5 text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
            At Wood Nido, we believe that <strong className="font-semibold text-[#241710]">quality renovation increases value, comfort, and aesthetics</strong>. Whether it's <strong className="font-semibold text-[#241710]">painting, woodworking, Ragwal finishing, polishing or interior remodeling</strong>, we deliver excellence in every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          
          {/* Left Column matching screenshot text: Contact Us Today */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#241710] tracking-tight">
                Contact Us Today
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                For consultation, quotation, or project booking:
              </p>
            </div>

            {/* Bullet points */}
            <div className="space-y-3.5 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-3 text-stone-800">
                <span className="w-2 h-2 rounded-full bg-[#b87a2a] shrink-0" />
                <span className="font-bold text-[#241710]">Website :</span>
                <a
                  href={siteConfig.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9e631b] hover:text-[#72430e] font-semibold underline underline-offset-4 decoration-[#d8a867]/60 transition-colors"
                >
                  {siteConfig.websiteUrl}
                </a>
              </div>

              <div className="flex items-center gap-3 text-stone-800">
                <span className="w-2 h-2 rounded-full bg-[#b87a2a] shrink-0" />
                <span className="font-bold text-[#241710]">Phone Number :</span>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-[#9e631b] hover:text-[#72430e] font-bold underline underline-offset-4 decoration-[#d8a867]/60 transition-colors"
                >
                  {siteConfig.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-3 text-stone-800">
                <span className="w-2 h-2 rounded-full bg-[#b87a2a] shrink-0" />
                <span className="font-bold text-[#241710]">Email :</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[#9e631b] hover:text-[#72430e] font-medium underline underline-offset-4 decoration-[#d8a867]/60 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex items-start gap-3 text-stone-800">
                <span className="w-2 h-2 rounded-full bg-[#b87a2a] shrink-0 mt-1.5" />
                <div>
                  <span className="font-bold text-[#241710]">Workshop & Display :</span>{' '}
                  <span className="text-stone-700 font-normal">
                    {siteConfig.locationName ? `${siteConfig.locationName} – ` : ''}
                    {siteConfig.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ebdcc7]">
              <p className="text-xs sm:text-sm italic font-medium text-[#725239]">
                {siteConfig.companyName} – {siteConfig.tagline}
              </p>
            </div>

            {/* Direct WhatsApp Quick Chat Box */}
            <div className="p-4 rounded-xl bg-[#fbf5eb] border border-[#ebdcc7] shadow-xs flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#241710]">Need Immediate Pricing?</p>
                <p className="text-[11px] text-[#725239]">Send dimensions on WhatsApp for a fast estimate.</p>
              </div>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello Wood Nido, I would like to get a quotation for carpentry & interior work.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e7845] hover:bg-[#186439] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Right Column: Instant Booking & Quote Request Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#ebdcc7] shadow-xl">
            <h4 className="text-base font-bold text-[#241710] mb-1">
              Request Free Consultation & Quote
            </h4>
            <p className="text-xs text-stone-500 mb-5">
              Fill this form and our senior carpenter will call you within 2 business hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#fbf5eb] border border-[#d6a760] text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#b87a2a] mx-auto" />
                <h5 className="text-sm font-bold text-[#241710]">Inquiry Received!</h5>
                <p className="text-xs text-stone-600">
                  Thank you, <strong>{name}</strong>. Our team will contact you shortly at {phone}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#3d2c20] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Malik"
                      className="w-full px-3 py-2 text-xs border border-[#ebdcc7] rounded-lg focus:ring-2 focus:ring-[#b87a2a]/30 focus:border-[#b87a2a] outline-hidden bg-[#faf7f2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#3d2c20] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0334-XXXXXXX"
                      className="w-full px-3 py-2 text-xs border border-[#ebdcc7] rounded-lg focus:ring-2 focus:ring-[#b87a2a]/30 focus:border-[#b87a2a] outline-hidden bg-[#faf7f2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#3d2c20] mb-1">
                      Service Required
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ebdcc7] rounded-lg focus:ring-2 focus:ring-[#b87a2a]/30 focus:border-[#b87a2a] outline-hidden bg-white text-[#2b1f17]"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Full Flat Renovation">Full Flat Renovation</option>
                      <option value="Commercial Carpentry">Commercial Carpentry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#3d2c20] mb-1">
                      Estimated Budget (Optional)
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. 100k - 300k"
                      className="w-full px-3 py-2 text-xs border border-[#ebdcc7] rounded-lg focus:ring-2 focus:ring-[#b87a2a]/30 focus:border-[#b87a2a] outline-hidden bg-[#faf7f2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#3d2c20] mb-1">
                    Project Details / Location
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe room dimensions, wood finish preference (ash, teak, UV gloss), and location in Islamabad/Rawalpindi..."
                    className="w-full px-3 py-2 text-xs border border-[#ebdcc7] rounded-lg focus:ring-2 focus:ring-[#b87a2a]/30 focus:border-[#b87a2a] outline-hidden bg-[#faf7f2]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#241710] hover:bg-[#382317] text-[#fdf8f0] text-xs font-bold py-3 rounded-lg border border-[#d6a55e]/40 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-99 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#dca34f]" />
                  <span>Submit Booking Request</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
