import React, { useState } from 'react';
import { Lock, User, KeyRound, Eye, EyeOff, ArrowLeft, ShieldCheck, AlertCircle, Hammer } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

// Credentials specified by owner
const VALID_USERNAMES = ['Ismailwoodnido#', 'ismailwoodnido#', 'Ismailwoodnido#....'];
const VALID_PASSWORDS = ['bakar#96@', '..bakar#96@..', '..bakar#96@', 'bakar#96@..'];

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    const isUserValid = VALID_USERNAMES.includes(cleanUser) || cleanUser === 'Ismailwoodnido#';
    const isPassValid = VALID_PASSWORDS.includes(cleanPass) || cleanPass === 'bakar#96@';

    setTimeout(() => {
      if (isUserValid && isPassValid) {
        // Save session
        try {
          sessionStorage.setItem('wood_nido_admin_auth', 'true');
          sessionStorage.setItem('wood_nido_admin_user', 'Ismailwoodnido#');
          sessionStorage.setItem('wood_nido_admin_time', Date.now().toString());

          if (rememberMe) {
            localStorage.setItem('wood_nido_admin_remember', 'true');
            localStorage.setItem('wood_nido_admin_token', btoa('Ismailwoodnido#:bakar#96@:' + Date.now()));
          } else {
            localStorage.removeItem('wood_nido_admin_remember');
            localStorage.removeItem('wood_nido_admin_token');
          }
        } catch {
          // ignore storage quota error
        }
        onLoginSuccess();
      } else {
        setError('Galat Username ya Password! Access Denied. Baraye meherbani sahi credentials enter karein.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#141210] flex flex-col justify-center items-center p-4 sm:p-6 text-white font-sans relative selection:bg-amber-500 selection:text-black">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#1E1B18] border border-amber-600/30 rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10">
        
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2A231C] border border-amber-500/40 text-amber-400 mb-4 shadow-inner">
            <Hammer className="w-7 h-7 transform -rotate-12" />
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-2xl font-bold tracking-tight text-white font-serif">Wood</span>
            <span className="text-2xl font-bold tracking-tight text-[#C08A3E] font-serif">Nido</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase mt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Secure Access</span>
          </div>
          <p className="text-xs text-[#9E958A] mt-2">
            Admin panel access karne ke liye apna username aur password enter karein.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-[#D4C9BC] uppercase tracking-wider mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#736B63]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="Enter admin username"
                className="w-full bg-[#141210] border border-[#3A332C] focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#5A5248] transition-colors outline-none font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[#D4C9BC] uppercase tracking-wider mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#736B63]">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                className="w-full bg-[#141210] border border-[#3A332C] focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E] rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-[#5A5248] transition-colors outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#736B63] hover:text-[#C08A3E] transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#9E958A] select-none hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-sm bg-[#141210] border-[#3A332C] text-[#C08A3E] focus:ring-amber-500/20 accent-[#C08A3E]"
              />
              <span>Is browser par login yaad rakhein</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-[#C08A3E] hover:bg-[#A9742B] disabled:opacity-60 text-black font-bold text-xs tracking-wider uppercase py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Login to Admin Console</span>
              </>
            )}
          </button>
        </form>

        {/* Back to Website Button */}
        <div className="mt-6 pt-4 border-t border-[#2D2823] text-center">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 text-xs text-[#8A8175] hover:text-[#C08A3E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Wapis Main Website par jayein</span>
          </button>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="mt-8 text-center text-xs text-[#5A5248]">
        Wood Nido Interiors & Handcrafted Woodwork • Secure Management Console
      </div>
    </div>
  );
};
