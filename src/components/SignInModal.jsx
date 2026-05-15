import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, CheckCircle2, Circle, Heart, TrendingUp, Building2, ArrowLeft, ChevronRight, ChevronDown, Info, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

// ─── Role definitions ─────────────────────────────────────────────────────────
const ROLES = [
  {
    id: 'donor',
    label: 'Donor',
    icon: Heart,
    description: 'Support causes you care about and track your impact over time.',
    color: 'from-rose-50 to-pink-50',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-100',
  },
  {
    id: 'fundraiser',
    label: 'Fundraiser',
    icon: TrendingUp,
    description: 'Create campaigns, manage donations, and engage with your supporters.',
    color: 'from-emerald-50 to-teal-50',
    iconColor: 'text-[var(--color-ffg-green)]',
    iconBg: 'bg-[var(--color-ffg-green)]/10',
  },
  {
    id: 'beneficiary',
    label: 'Beneficiary',
    icon: Building2,
    description: 'Receive funds directly and manage organisational profiles.',
    color: 'from-blue-50 to-indigo-50',
    iconColor: 'text-[var(--color-ffg-navy)]',
    iconBg: 'bg-[var(--color-ffg-navy)]/10',
  },
];

export default function SignInModal({ isOpen, onClose }) {
  const [tab, setTab]   = useState('signin');  // 'signin' | 'signup'
  const [step, setStep] = useState(1);         // 1 = auth form, 2 = role picker

  // Sign-in state
  const [signInForm, setSignInForm]               = useState({ email: '', password: '', role: '' });
  const [signInShowPassword, setSignInShowPassword] = useState(false);

  // Sign-up state
  const [signUpForm, setSignUpForm]               = useState({ name: '', email: '', password: '' });
  const [signUpShowPassword, setSignUpShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms]         = useState(false);

  // Role selection state
  const [selectedRole, setSelectedRole] = useState(null);

  // Auth processing state
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength
  const checks = {
    length:  signUpForm.password.length >= 8,
    upper:   /[A-Z]/.test(signUpForm.password),
    lower:   /[a-z]/.test(signUpForm.password),
    special: /[0-9!@#$%^&*]/.test(signUpForm.password),
  };
  const strengthScore  = Object.values(checks).filter(Boolean).length;
  const strengthColors = ['bg-gray-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-[var(--color-ffg-green)]'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) {
      setTimeout(() => {
        setSignInForm({ email: '', password: '', role: '' });
        setSignUpForm({ name: '', email: '', password: '' });
        setAgreedToTerms(false);
        setSignInShowPassword(false);
        setSignUpShowPassword(false);
        setTab('signin');
        setStep(1);
        setSelectedRole(null);
        setAuthError(null);
        setAuthSuccess(null);
      }, 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: signInForm.email,
      password: signInForm.password,
    });
    setIsLoading(false);
    if (error) {
      setAuthError(error.message);
    } else {
      onClose();
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    setAuthError(null);
    setStep(2);
  };

  const handleRoleContinue = async () => {
    if (!selectedRole) return;
    setAuthError(null);
    setAuthSuccess(null);
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: signUpForm.email,
      password: signUpForm.password,
      options: {
        data: {
          full_name: signUpForm.name,
          role: selectedRole,
        }
      }
    });
    setIsLoading(false);
    if (error) {
      setAuthError(error.message);
    } else if (data?.user && !data?.session) {
      setStep(3);
    } else {
      onClose();
    }
  };

  const handleResendVerification = async () => {
    setAuthError(null);
    setAuthSuccess(null);
    setIsLoading(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: signUpForm.email,
    });
    setIsLoading(false);
    if (error) {
      setAuthError(error.message);
    } else {
      setAuthSuccess('Verification email resent!');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(signInForm.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);
    if (error) {
      setAuthError(error.message);
    } else {
      setAuthSuccess('Password reset link sent! Check your email.');
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setAuthError(error.message);
    }
  };

  const inputClass =
    'w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-[var(--color-ffg-navy)] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-ffg-green)]/50 focus:border-[var(--color-ffg-green)] transition-all duration-200';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={step === 1 ? (tab === 'signin' ? 'Sign In' : 'Create Account') : 'Choose your role'}
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className={`relative bg-white shadow-2xl font-body transition-all duration-300 overflow-y-auto
          ${step === 2 || step === 3 || tab === 'signup'
            ? 'w-full max-w-2xl rounded-3xl p-6 pt-10 md:p-8 md:pt-14 max-h-[95vh] md:max-h-[90vh]'
            : 'w-full max-w-md rounded-3xl p-6 pt-10 md:p-8 md:pt-14 max-h-[95vh] md:max-h-[90vh]'
          }`}
        >
          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-[var(--color-ffg-green)] to-[var(--color-ffg-navy)]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-[var(--color-ffg-navy)] hover:bg-gray-100 transition-all duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* ══════════════════════════════════════════
              STEP 1 — Auth form
          ══════════════════════════════════════════ */}
          {step === 1 && (
            <>
              {/* Tab switcher */}
              {tab !== 'forgot-password' && (
                <div className="flex rounded-full bg-gray-100 p-1 mb-6 gap-1">
                  {['signin', 'signup'].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTab(t); setAuthError(null); setAuthSuccess(null); }}
                      className={`flex-1 h-9 rounded-full text-sm font-heading font-semibold transition-all duration-200 ${
                        tab === t
                          ? 'bg-white text-[var(--color-ffg-navy)] shadow-sm'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {t === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>
              )}

              {/* ── SIGN IN ── */}
              {tab === 'signin' && (
                <>
                  <h2 className="text-2xl font-heading font-bold text-[var(--color-ffg-navy)] mb-1">
                    Welcome back
                  </h2>
                  <p className="text-sm text-gray-500 mb-7">Sign in to your account to continue.</p>

                  {authError && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
                      {authError}
                    </div>
                  )}

                  <form onSubmit={handleSignIn} className="flex flex-col gap-5">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="si-email" className="text-sm font-semibold text-[var(--color-ffg-navy)]">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="si-email"
                          type="email"
                          required
                          placeholder="jane@example.com"
                          value={signInForm.email}
                          onChange={(e) => setSignInForm((p) => ({ ...p, email: e.target.value }))}
                          className={inputClass + ' pr-11'}
                        />
                        <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="si-password" className="text-sm font-semibold text-[var(--color-ffg-navy)]">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="si-password"
                          type={signInShowPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={signInForm.password}
                          onChange={(e) => setSignInForm((p) => ({ ...p, password: e.target.value }))}
                          className={inputClass + ' pr-11'}
                        />
                        <button
                          type="button"
                          onClick={() => setSignInShowPassword((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {signInShowPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </div>
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => { setTab('forgot-password'); setAuthError(null); setAuthSuccess(null); }}
                          className="text-sm text-[var(--color-ffg-green)] hover:underline font-semibold p-1 -mr-1"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="si-role" className="text-sm font-semibold text-[var(--color-ffg-navy)]">
                        Signing in as
                      </label>
                      <div className="relative">
                        <select
                          id="si-role"
                          required
                          value={signInForm.role}
                          onChange={(e) => setSignInForm((p) => ({ ...p, role: e.target.value }))}
                          className={inputClass + ' pr-11 appearance-none cursor-pointer'}
                        >
                          <option value="" disabled>Select your role…</option>
                          <option value="donor">Donor</option>
                          <option value="fundraiser">Fundraiser</option>
                          <option value="beneficiary">Beneficiary</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-1 h-12 w-full rounded-full bg-[var(--color-ffg-navy)] text-white font-heading font-semibold text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </form>

                  <Divider />
                  <GoogleButton label="Sign in with Google" onClick={handleGoogleSignIn} />

                  <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <button onClick={() => { setTab('signup'); setAuthError(null); setAuthSuccess(null); }} className="text-[var(--color-ffg-green)] font-semibold hover:underline">
                      Sign Up
                    </button>
                  </p>
                </>
              )}

              {/* ── FORGOT PASSWORD ── */}
              {tab === 'forgot-password' && (
                <>
                  <h2 className="text-2xl font-heading font-bold text-[var(--color-ffg-navy)] mb-2 text-center">
                    Reset your password
                  </h2>
                  <p className="text-sm text-gray-500 mb-8 text-center max-w-sm mx-auto">
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                  </p>

                  {authError && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium text-center">
                      {authError}
                    </div>
                  )}
                  {authSuccess && (
                    <div className="mb-6 p-3 rounded-xl bg-green-50 border border-green-100 text-sm text-[var(--color-ffg-green)] font-medium text-center">
                      {authSuccess}
                    </div>
                  )}

                  <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reset-email" className="text-sm font-semibold text-[var(--color-ffg-navy)]">
                        Email address
                      </label>
                      <input
                        id="reset-email"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={signInForm.email}
                        onChange={(e) => setSignInForm((p) => ({ ...p, email: e.target.value }))}
                        className={inputClass}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 h-12 w-full rounded-full bg-[var(--color-ffg-navy)] text-white font-heading font-semibold text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </form>

                  <div className="w-full h-px bg-gray-200 my-8" />

                  <div className="text-center">
                    <button
                      onClick={() => { setTab('signin'); setAuthError(null); setAuthSuccess(null); }}
                      className="text-sm font-semibold text-[var(--color-ffg-navy)] hover:text-[var(--color-ffg-green)] transition-colors flex items-center justify-center gap-1 mx-auto"
                    >
                      <ArrowLeft size={16} />
                      Back to Sign In
                    </button>
                  </div>
                </>
              )}

              {/* ── SIGN UP ── */}
              {tab === 'signup' && (
                <>
                  {/* Step indicator */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Step 1 of 2</span>
                    <span>Account Details</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-gray-100 mb-5 overflow-hidden">
                    <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[var(--color-ffg-green)] to-[var(--color-ffg-navy)] transition-all duration-500" />
                  </div>

                  <h2 className="text-2xl font-heading font-bold text-[var(--color-ffg-navy)] mb-1">
                    Create your account
                  </h2>
                  <p className="text-sm text-gray-500 mb-5">Join the infrastructure for good.</p>

                  <form onSubmit={handleSignUp} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* LEFT COLUMN: Name and Email */}
                      <div className="flex flex-col gap-4">
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="su-name" className="text-sm font-semibold text-[var(--color-ffg-navy)]">
                            Full Name
                          </label>
                          <input
                            id="su-name"
                            type="text"
                            required
                            placeholder="Jane Doe"
                            value={signUpForm.name}
                            onChange={(e) => setSignUpForm((p) => ({ ...p, name: e.target.value }))}
                            className={inputClass}
                          />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="su-email" className="text-sm font-semibold text-[var(--color-ffg-navy)]">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              id="su-email"
                              type="email"
                              required
                              placeholder="jane@example.com"
                              value={signUpForm.email}
                              onChange={(e) => setSignUpForm((p) => ({ ...p, email: e.target.value }))}
                              className={inputClass + ' pr-11'}
                            />
                            <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Password and Requirements */}
                      <div className="flex flex-col gap-4">
                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="su-password" className="text-sm font-semibold text-[var(--color-ffg-navy)]">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              id="su-password"
                              type={signUpShowPassword ? 'text' : 'password'}
                              required
                              placeholder="••••••••"
                              value={signUpForm.password}
                              onChange={(e) => setSignUpForm((p) => ({ ...p, password: e.target.value }))}
                              className={inputClass + ' pr-11'}
                            />
                            <button
                              type="button"
                              onClick={() => setSignUpShowPassword((v) => !v)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {signUpShowPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                          </div>

                          {/* Strength bar */}
                          {signUpForm.password.length > 0 && (
                            <div className="flex flex-col gap-1.5 mt-1">
                              <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                  <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                      i <= strengthScore ? strengthColors[strengthScore] : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-400">{strengthLabels[strengthScore]}</span>
                            </div>
                          )}

                          {/* Password requirements */}
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            {[
                              { key: 'length',  label: 'At least 8 chars' },
                              { key: 'upper',   label: 'One uppercase' },
                              { key: 'lower',   label: 'One lowercase' },
                              { key: 'special', label: 'One special char' },
                            ].map(({ key, label }) => (
                              <li key={key} className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors duration-200 ${
                                checks[key] ? 'text-[var(--color-ffg-green)]' : 'text-gray-500'
                              }`}>
                                {checks[key]
                                  ? <CheckCircle2 size={12} className="flex-shrink-0" />
                                  : <Circle size={12} className="flex-shrink-0" />}
                                {label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <label htmlFor="su-terms" className="flex items-start gap-3 cursor-pointer select-none mt-1">
                      <div className="relative mt-0.5 flex-shrink-0">
                        <input
                          id="su-terms"
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="sr-only"
                        />
                        {/* Visual checkbox — purely decorative, label handles the click */}
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                            agreedToTerms
                              ? 'bg-[var(--color-ffg-green)] border-[var(--color-ffg-green)]'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {agreedToTerms && (
                            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 leading-relaxed">
                        I agree to the{' '}
                        <a href="#" className="text-[var(--color-ffg-green)] hover:underline font-medium">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-[var(--color-ffg-green)] hover:underline font-medium">Privacy Policy</a>
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={!agreedToTerms}
                      className="mt-1 h-12 w-full rounded-full bg-[var(--color-ffg-navy)] text-white font-heading font-semibold text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      Next: Choose your role
                      <ChevronRight size={18} />
                    </button>
                  </form>

                  <Divider />
                  <GoogleButton label="Sign up with Google" onClick={handleGoogleSignIn} />

                  <p className="text-center text-sm text-gray-500 mt-5">
                    Already have an account?{' '}
                    <button onClick={() => setTab('signin')} className="text-[var(--color-ffg-green)] font-semibold hover:underline">
                      Sign In
                    </button>
                  </p>
                </>
              )}
            </>
          )}

          {/* ══════════════════════════════════════════
              STEP 2 — Role selection
          ══════════════════════════════════════════ */}
          {step === 2 && (
            <>
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Step 2 of 2</span>
                <span>Role Selection</span>
              </div>
              <div className="h-1 w-full rounded-full bg-gray-100 mb-8 overflow-hidden">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-[var(--color-ffg-green)] to-[var(--color-ffg-navy)] transition-all duration-500" />
              </div>

              <h2 className="text-2xl font-heading font-bold text-[var(--color-ffg-navy)] mb-2 text-center">
                Choose your role
              </h2>
              <p className="text-sm text-gray-500 text-center mb-8 max-w-md mx-auto">
                Select how you want to use Fundraisers For Good. This helps us tailor your experience.
              </p>

              {authError && (
                <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium text-center">
                  {authError}
                </div>
              )}

              {/* Role cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {ROLES.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`relative flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group ${
                        isSelected
                          ? 'border-[var(--color-ffg-green)] bg-gradient-to-b ' + role.color + ' shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {/* Selected checkmark */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--color-ffg-green)] flex items-center justify-center">
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}

                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl ${role.iconBg} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}>
                        <Icon size={26} className={role.iconColor} />
                      </div>

                      <h3 className="text-base font-heading font-bold text-[var(--color-ffg-navy)] mb-2">
                        {role.label}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {role.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[var(--color-ffg-navy)] transition-colors duration-200"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  onClick={handleRoleContinue}
                  disabled={!selectedRole || isLoading}
                  className="h-11 px-8 rounded-full bg-[var(--color-ffg-navy)] text-white font-heading font-semibold text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Account...' : 'Continue'}
                </button>
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════
              STEP 3 — Verify Email
          ══════════════════════════════════════════ */}
          {step === 3 && (
            <div className="flex flex-col items-center px-4 md:px-12 py-4">
              <div className="w-24 h-24 bg-[var(--color-ffg-navy)]/5 rounded-full flex items-center justify-center mb-6">
                <Mail size={36} strokeWidth={1.5} className="text-[var(--color-ffg-navy)]" />
              </div>

              <h2 className="text-2xl font-heading font-bold text-[var(--color-ffg-navy)] mb-2 text-center">
                Verify your email
              </h2>
              <p className="text-sm text-gray-500 mb-6 text-center">
                We've sent a verification link to:
              </p>

              <div className="bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl mb-8 w-full max-w-sm text-center">
                <span className="font-semibold text-[var(--color-ffg-navy)] text-sm">{signUpForm.email}</span>
              </div>

              {authError && (
                <div className="w-full mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium text-center">
                  {authError}
                </div>
              )}
              {authSuccess && (
                <div className="w-full mb-4 p-3 rounded-xl bg-green-50 border border-green-100 text-sm text-[var(--color-ffg-green)] font-medium text-center">
                  {authSuccess}
                </div>
              )}

              <button
                onClick={handleResendVerification}
                disabled={isLoading}
                className="w-full max-w-sm h-12 bg-[var(--color-ffg-navy)] text-white rounded-full font-heading font-semibold text-base flex items-center justify-center gap-2 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mb-8 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Mail size={18} />
                {isLoading ? 'Sending...' : 'Resend verification email'}
              </button>

              <div className="w-full max-w-sm bg-gray-50 border border-gray-100 p-6 rounded-2xl text-[var(--color-ffg-navy)] mb-10">
                <div className="flex items-center gap-2 font-semibold mb-4 text-sm text-[var(--color-ffg-navy)]">
                  <Info size={18} className="text-[var(--color-ffg-navy)]" />
                  Didn't receive the email?
                </div>
                <ul className="flex flex-col gap-3 text-sm text-gray-500 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-[-1px] flex-shrink-0 text-[var(--color-ffg-green)]" />
                    Check your spam or junk folder.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-[-1px] flex-shrink-0 text-[var(--color-ffg-green)]" />
                    Ensure the email address above is correct.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-[-1px] flex-shrink-0 text-[var(--color-ffg-green)]" />
                    Wait a few minutes, some emails are delayed.
                  </li>
                </ul>
              </div>

              <button
                onClick={() => { setStep(1); setTab('signin'); setAuthError(null); setAuthSuccess(null); }}
                className="flex items-center gap-2 font-semibold text-gray-400 hover:text-[var(--color-ffg-navy)] transition-colors duration-200 text-sm"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
                Back to Sign In
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400 font-medium">OR</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function GoogleButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-12 rounded-full border border-gray-200 flex items-center justify-center gap-3 text-sm font-heading font-semibold text-gray-700 hover:bg-gray-50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
    >
      <GoogleIcon />
      {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2045c0-.638-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.6159z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.8591-3.0477.8591-2.3445 0-4.3282-1.5832-5.036-3.7105H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71c-.18-.54-.2827-1.1168-.2827-1.71s.1018-1.17.2827-1.71V4.9582H.9574C.3477 6.1732 0 7.5477 0 9s.3477 2.8268.9573 4.0418L3.964 10.71z" fill="#FBBC05"/>
      <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4627.8918 11.4255 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6555 3.5795 9 3.5795z" fill="#EA4335"/>
    </svg>
  );
}
