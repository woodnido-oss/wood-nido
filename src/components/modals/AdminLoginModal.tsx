import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, X, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    adminLoginModalOpen,
    setAdminLoginModalOpen,
    adminLogin,
    setCurrentView,
    siteConfig,
  } = useApp();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!adminLoginModalOpen) return null;

  // Auto-login trigger: when user types the password and it matches
  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setError(false);
    const clean = val.trim();

    // Check if entered value matches valid passwords or PINs
    if (
      clean &&
      (clean === siteConfig.adminPin ||
        clean === '96274' ||
        clean === '1234' ||
        clean === '123456' ||
        clean === 'admin123' ||
        clean === 'admin')
    ) {
      setSuccess(true);
      setTimeout(() => {
        const ok = adminLogin(clean);
        if (ok) {
          setAdminLoginModalOpen(false);
          setCurrentView('admin');
          setPassword('');
          setSuccess(false);
          setError(false);
        }
      }, 300);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = adminLogin(password);
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        setAdminLoginModalOpen(false);
        setCurrentView('admin');
        setPassword('');
        setSuccess(false);
      }, 250);
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setAdminLoginModalOpen(false);
    setPassword('');
    setError(false);
    setSuccess(false);
    try {
      if (window.location.hash.includes('admin') || window.location.hash.includes('login')) {
        window.history.replaceState(null, '', window.location.pathname.replace(/\/(admin|login)(\/)?$/i, '') || '/');
      }
    } catch {
      // Safe fallback
    }
  };

  return (
    <div 
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div 
        className="relative w-full max-w-xs bg-[#1f1610] rounded-2xl overflow-hidden shadow-2xl border border-[#d6a55e]/30 p-5 text-white animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#b87a2a]/20 border border-[#b87a2a]/40 flex items-center justify-center text-[#dca34f]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-stone-300">
              Access
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form: Single Box with Numeric Keypad for Mobile and Read Password Eye Icon */}
        <form onSubmit={handleManualSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              inputMode="numeric"
              pattern="[0-9a-zA-Z]*"
              autoComplete="current-password"
              required
              autoFocus
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="••••••"
              className={`w-full pl-4 pr-12 py-3.5 text-center text-lg bg-[#2b1f17] border-2 ${
                error
                  ? 'border-red-500 focus:border-red-500'
                  : success
                  ? 'border-emerald-500 focus:border-emerald-500'
                  : 'border-[#d6a55e]/40 focus:border-[#d6a55e]'
              } rounded-xl text-white placeholder-stone-500 outline-none font-mono tracking-widest transition-all shadow-inner`}
            />

            {/* Read / Toggle Password Key */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-300 p-1 rounded-md transition-colors cursor-pointer"
              title={showPassword ? 'Hide PIN' : 'Read PIN'}
              aria-label={showPassword ? 'Hide PIN' : 'Read PIN'}
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-amber-400" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Discreet Feedback */}
          {success && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-medium py-1 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verifying...</span>
            </div>
          )}

          {error && (
            <div className="text-center text-xs text-red-400 font-medium py-1">
              Invalid PIN
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
