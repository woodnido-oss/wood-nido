import React, { useState } from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { Phone, Mail, Globe, CheckCircle2, Send, Clock, Sparkles } from 'lucide-react';

export const TransformSpaceCTA: React.FC = () => {
  const { siteSettings, submitInquiry, categories } = useWoodStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Kitchen');
  const [requirement, setRequirement] = useState('');
  const [budget, setBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    submitInquiry({
      customerName: name,
      phone,
      email: email || 'Not specified',
      category,
      requirement: requirement || 'Consultation request regarding custom furniture or woodworking.',
      budget: budget || 'Standard'
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setRequirement('');
    setBudget('');

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Golden Headline matching screenshot */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#C08A3E] font-serif tracking-tight">
            Transform Your Space with {siteSettings.businessName}
          </h2>
          <p className="text-sm text-[#5C564D] mt-3 max-w-3xl mx-auto leading-relaxed">
            At {siteSettings.businessName}, we believe that <strong className="text-[#1A1815]">quality renovation increases value, comfort, and aesthetics</strong>. Whether it's <strong className="text-[#1A1815]">painting, woodworking, Ragwal finishing, polishing or interior remodeling</strong>, we deliver excellence in every detail.
          </p>
          <div className="w-12 h-0.5 bg-[#C08A3E] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Contact Info verbatim from screenshot */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#E3DAD0] shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#1B1916] mb-2 font-serif">
                Contact Us Today
              </h3>
              <p className="text-xs text-[#736B63]">
                For consultation, quotation, or project booking:
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#3E3831]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-[#C08A3E] shrink-0 border border-amber-200">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold block text-xs text-gray-500 uppercase tracking-wide">
                    Website
                  </span>
                  <a
                    href="https://woodnido.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1A1816] hover:text-[#C08A3E] transition-colors"
                  >
                    https://woodnido.com/
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-[#C08A3E] shrink-0 border border-amber-200">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold block text-xs text-gray-500 uppercase tracking-wide">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                    className="font-bold text-[#1A1816] hover:text-[#C08A3E] transition-colors"
                  >
                    {siteSettings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-[#C08A3E] shrink-0 border border-amber-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold block text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </span>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="font-medium text-[#1A1816] hover:text-[#C08A3E] transition-colors"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE3D6] text-xs text-[#706960] italic">
              "{siteSettings.businessName} – {siteSettings.tagline}"
            </div>

            <div className="bg-[#FAF7F2] p-4 border border-[#E3DBD0] rounded-none">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B1916] uppercase tracking-wide text-amber-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Custom Orders Welcome</span>
              </div>
              <p className="text-xs text-[#635C53] leading-relaxed">
                Bring your own architectural blueprint or photos of furniture you like. We source 100% seasoned Sheesham, Teak, and Oak with guaranteed termite-proof warranty.
              </p>
            </div>
          </div>

          {/* Right: Instant Quotation & Consultation Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E3DAD0] shadow-xs">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#1B1916] font-serif">
                Request Free Measurement & Consultation
              </h3>
              <p className="text-xs text-[#736B63] mt-1">
                Leave your requirements. Our master woodworker will call you within 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">
                  Consultation Request Received!
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you! Your request has been logged in our system. You can view or manage this anytime in the Admin Dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D3730] uppercase tracking-wide mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Ullah"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CCC0] text-sm text-gray-900 focus:outline-none focus:border-[#C08A3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D3730] uppercase tracking-wide mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0334 1234567"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CCC0] text-sm text-gray-900 focus:outline-none focus:border-[#C08A3E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D3730] uppercase tracking-wide mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CCC0] text-sm text-gray-900 focus:outline-none focus:border-[#C08A3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D3730] uppercase tracking-wide mb-1">
                      Woodwork Service
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CCC0] text-sm text-gray-900 focus:outline-none focus:border-[#C08A3E]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                      <option value="Full House Renovation">Full House Renovation</option>
                      <option value="Custom Wood Polish">Custom Wood Polish</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3730] uppercase tracking-wide mb-1">
                    Describe Your Requirement & Dimensions
                  </label>
                  <textarea
                    rows={3}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    placeholder="e.g., I need a custom 6-seater Sheesham dining table and wall-fitted kitchen cabinets with soft close fittings..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CCC0] text-sm text-gray-900 focus:outline-none focus:border-[#C08A3E]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#121110] hover:bg-[#2B2724] text-white text-xs uppercase font-bold tracking-widest py-3.5 px-6 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Submit Consultation Request</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
