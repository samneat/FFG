import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export default function JoinNetworkModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset form when modal closes
      setTimeout(() => {
        setForm({ name: '', email: '' });
        setSubmitted(false);
        setError('');
      }, 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to join. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Join the Network"
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl p-8 font-body overflow-hidden">

          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-[var(--color-ffg-green)] to-[var(--color-ffg-navy)]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-[var(--color-ffg-navy)] hover:bg-gray-100 transition-all duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {!submitted ? (
            <>
              <h2 className="text-2xl font-heading font-bold text-[var(--color-ffg-navy)] mb-1">
                Join the Network
              </h2>
              <p className="text-sm text-gray-500 mb-7">
                Be part of the movement. We'll be in touch with next steps.
              </p>

              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="join-name" className="text-sm font-semibold text-[var(--color-ffg-navy)]">
                    Full Name
                  </label>
                  <input
                    id="join-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-[var(--color-ffg-navy)] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-ffg-green)]/50 focus:border-[var(--color-ffg-green)] transition-all duration-200 disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="join-email" className="text-sm font-semibold text-[var(--color-ffg-navy)]">
                    Email Address
                  </label>
                  <input
                    id="join-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-[var(--color-ffg-navy)] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-ffg-green)]/50 focus:border-[var(--color-ffg-green)] transition-all duration-200 disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-12 w-full rounded-full bg-[var(--color-ffg-green)] text-white font-heading font-semibold text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--color-ffg-green)]/10 flex items-center justify-center text-3xl">
                🎉
              </div>
              <h2 className="text-2xl font-heading font-bold text-[var(--color-ffg-navy)]">
                You're in!
              </h2>
              <p className="text-sm text-gray-500 max-w-xs">
                Thanks, <span className="font-semibold text-[var(--color-ffg-navy)]">{form.name}</span>! We've sent a welcome email to <span className="font-semibold text-[var(--color-ffg-navy)]">{form.email}</span>. Check your inbox!
              </p>
              <button
                onClick={onClose}
                className="mt-4 h-11 px-8 rounded-full bg-[var(--color-ffg-navy)] text-white font-heading font-semibold text-sm hover:brightness-110 transition-all duration-200"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
