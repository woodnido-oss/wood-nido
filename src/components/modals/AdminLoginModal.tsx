import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck, CheckCircle2, RotateCcw, Eye, EyeOff } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    adminLoginModalOpen,
    setAdminLoginModalOpen,
    adminLogin,
    resetAdminPinWithMasterKey,
    setCurrentView,
    siteConfig,
  } = useApp();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showMasterKey, setShowMasterKey] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [mode, setMode] = useState<'login' | 'reset'>('login');

  // Reset form states
  const [masterKeyInput, setMasterKeyInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!adminLoginModalOpen) return null;

  // Auto-login trigger: when user types the password and it matches current password, master key, or default
  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setError('');
    const clean = val.trim();

    // Check if entered value matches valid passwords
    if (
      clean &&
      (clean === siteConfig.adminPin ||
        clean === '96274' ||
        clean === 'admin123' ||
        clean === 'admin')
    ) {
      setSuccessMsg('Password Verified! Logging in...');
      setTimeout(() => {
        const ok = adminLogin(clean);
        if (ok) {
          setAdminLoginModalOpen(false);
          setCurrentView('admin');
          setPassword('');
          setSuccessMsg('');
          setError('');
        }
      }, 350);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = adminLogin(password);
    if (ok) {
      setAdminLoginModalOpen(false);
      setCurrentView('admin');
      setPassword('');
      setError('');
    } else {
      setError('Password ghalat hai. Baraye meherbani sahi password darj karein.');
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');

    if (masterKeyInput.trim() !== '96274') {
      setResetError('Master Key ghalat hai! Baraye meherbani durust Master Key darj karein.');
      return;
    }

    if (!newPasswordInput.trim()) {
      setResetError('Naya password darj karein.');
      return;
    }

    if (newPasswordInput.trim() !== confirmPasswordInput.trim()) {
      setResetError('Naya password aur confirm password aapas mein match nahi ho rahe.');
      return;
    }

    const success = resetAdminPinWithMasterKey('96274', newPasswordInput.trim());
    if (success) {
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        setMode('login');
        setPassword(newPasswordInput.trim());
        setMasterKeyInput('');
        setNewPasswordInput('');
        setConfirmPasswordInput('');
      }, 1500);
    }
  };

  const handleClose = () => {
    setAdminLoginModalOpen(false);
    setMode('login');
    setError('');
    setResetError('');
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div 
        className="relative w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#241710] border-b border-[#3d291e] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#b87a2a] flex items-center justify-center text-white font-bold shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-100">Admin Portal Access</h3>
              <p className="text-[10px] text-stone-300">
                {mode === 'login' ? 'Single Password Direct Login' : 'Password Reset with Master Key'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODE 1: SIMPLE PASSWORD ONLY LOGIN WITH AUTO-LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleManualSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center justify-between">
                <span>Admin Password (صرف پاس ورڈ درج کریں)</span>
                <span className="text-[10px] text-[#b57a2c] font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  ⚡ Auto-Login
                </span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-3 pr-16 py-3 text-sm border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-[#c28c46] focus:border-[#c28c46] outline-hidden font-mono tracking-wider transition-all"
                />
                
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-stone-400">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 hover:text-stone-700 transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <KeyRound className="w-4 h-4 text-stone-400" />
                </div>
              </div>

              <p className="text-[11px] text-stone-500 mt-1.5">
                جیسے ہی آپ صحیح پاس ورڈ ڈالیں گے، سسٹم <strong>آٹو لاگ اِن (Auto-Login)</strong> کر دے گا۔
              </p>
            </div>

            {/* Success state badge */}
            {successMsg && (
              <div className="p-2.5 rounded-xl bg-green-50 border border-green-300 flex items-center gap-2 text-xs text-green-800 font-semibold animate-pulse">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-700 leading-snug">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Manual login button (optional fallback, since auto-login also works) */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full bg-[#241710] hover:bg-[#382317] text-[#fdf8f0] text-xs font-bold py-3 rounded-xl border border-[#d6a55e]/30 transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#dca34f]" />
                <span>Sign In to Admin Panel</span>
              </button>
            </div>

            {/* Reset Password using Master Key link */}
            <div className="pt-2 text-center border-t border-stone-100">
              <button
                type="button"
                onClick={() => {
                  setMode('reset');
                  setError('');
                  setMasterKeyInput('');
                  setNewPasswordInput('');
                  setConfirmPasswordInput('');
                }}
                className="text-xs text-[#b57a2c] hover:text-[#8f5e1f] font-bold hover:underline inline-flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Password bhool gaye? Master Key se reset karein</span>
              </button>
            </div>
          </form>
        )}

        {/* MODE 2: RESET PASSWORD VIA MASTER KEY */}
        {mode === 'reset' && (
          <form onSubmit={handleResetSubmit} className="p-6 space-y-4">
            <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-[#c28c46]" />
                Master Key Password Reset
              </p>
              <p className="text-[11px] text-amber-900">
                Apna naya password set karne ke liye authorized Master Key darj karein.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                <span>Master Key (ماسٹر کی)</span>
              </label>
              <div className="relative">
                <input
                  type={showMasterKey ? 'text' : 'password'}
                  required
                  autoFocus
                  value={masterKeyInput}
                  onChange={(e) => setMasterKeyInput(e.target.value)}
                  placeholder="Enter Master Key"
                  className="w-full pl-3 pr-10 py-2.5 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#c28c46] outline-hidden font-mono tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowMasterKey(!showMasterKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                  title={showMasterKey ? 'Hide key' : 'Show key'}
                >
                  {showMasterKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                New Password (نیا پاس ورڈ)
              </label>
              <input
                type="password"
                required
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#c28c46] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Confirm New Password (دوبارہ لکھیں)
              </label>
              <input
                type="password"
                required
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#c28c46] outline-hidden"
              />
            </div>

            {resetError && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{resetError}</span>
              </div>
            )}

            {resetSuccess && (
              <div className="p-2.5 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2 text-xs text-green-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                <span>Password kamyabi se reset ho gaya! Login par ja rahe hain...</span>
              </div>
            )}

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold py-2.5 rounded-lg transition-colors"
              >
                Back to Login
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
