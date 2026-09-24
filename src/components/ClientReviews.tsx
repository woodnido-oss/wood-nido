import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, MessageSquarePlus, CheckCircle } from 'lucide-react';

export const ClientReviews: React.FC = () => {
  const { reviews, addReview } = useApp();
  const [showAddReview, setShowAddReview] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [service, setService] = useState('Modular Kitchen');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      name,
      rating,
      comment,
      service,
      date: 'Just now',
      role: 'Verified Client',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddReview(false);
      setName('');
      setComment('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#fbf8f3] relative border-t border-[#ebdcc7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching screenshot: What Our Client S| */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#a86c22]">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#241710] tracking-tight mt-1 inline-flex items-center">
            What Our Clients Say<span className="text-[#b87a2a] animate-pulse">|</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#b87a2a] to-transparent mx-auto mt-3" />
          <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Honest feedback and ratings from homeowners and clients across Islamabad, Rawalpindi, and surrounding areas.
          </p>

          <div className="mt-4">
            <button
              onClick={() => setShowAddReview(!showAddReview)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a5522] hover:text-[#5a3614] transition-colors py-1.5 px-4 rounded-lg border border-[#d6a760] bg-white hover:bg-[#faf0df] shadow-2xs cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#b87a2a]" />
              {showAddReview ? 'Close Review Form' : 'Write a Review'}
            </button>
          </div>
        </div>

        {/* Optional Add Review Modal / Drawer */}
        {showAddReview && (
          <div className="mb-12 max-w-xl mx-auto bg-white p-6 sm:p-7 rounded-2xl border border-[#ebdcc7] shadow-xl animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-[#241710] mb-3">
              Share Your Experience with Wood Nido
            </h3>

            {submitted ? (
              <div className="flex items-center gap-2 text-green-800 bg-green-50 p-4 rounded-xl text-sm font-medium border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Thank you! Your review has been added.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3d2c20] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asif Raza"
                    className="w-full px-3 py-2 text-xs border border-[#ebdcc7] rounded-lg focus:ring-2 focus:ring-[#b87a2a]/30 focus:border-[#b87a2a] outline-hidden bg-[#faf7f2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#3d2c20] mb-1">
                      Service Received
                    </label>
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      placeholder="e.g. Cupboards / Kitchen"
                      className="w-full px-3 py-2 text-xs border border-[#ebdcc7] rounded-lg focus:ring-2 focus:ring-[#b87a2a]/30 focus:border-[#b87a2a] outline-hidden bg-[#faf7f2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3d2c20] mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-1 pt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-hidden cursor-pointer p-0.5"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= rating
                                ? 'fill-[#d89b37] text-[#d89b37]'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3d2c20] mb-1">
                    Review Comment
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the quality of woodwork, installation, and team professionalism..."
                    className="w-full px-3 py-2 text-xs border border-[#ebdcc7] rounded-lg focus:ring-2 focus:ring-[#b87a2a]/30 focus:border-[#b87a2a] outline-hidden bg-[#faf7f2]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#241710] hover:bg-[#382317] text-[#fdf8f0] text-xs font-bold py-2.5 rounded-lg border border-[#d6a55e]/30 transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* 2-Column Review Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col space-y-3 p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-xs border border-[#ebdcc7] shadow-xs hover:border-[#b87a2a] hover:shadow-md transition-all duration-200"
            >
              {/* 5 Golden Stars */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-[#d89b37] text-[#d89b37]'
                          : 'text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                {rev.service && (
                  <span className="text-[11px] font-semibold text-[#8c5620] bg-[#fbf5eb] px-2.5 py-0.5 rounded-md border border-[#ecdac4]">
                    {rev.service}
                  </span>
                )}
              </div>

              {/* Reviewer Name */}
              <h3 className="text-sm font-bold text-[#241710] tracking-wide">
                {rev.name}
              </h3>

              {/* Review Text */}
              <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed text-justify">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
