/**
 * App.jsx — React Forms UI Kit Demo Shell
 * ──────────────────────────────────────────
 * Features:
 *   - Tab navigation: Login / Register / Contact / Forgot Password
 *   - Theme switcher: 6 color themes via colored dots
 *   - All forms are self-contained with local state
 *   - "Forgot password?" link in LoginForm navigates to ForgotPasswordForm tab
 *   - "Back to sign in" in ForgotPasswordForm navigates back to Login tab
 */

import { useState, useEffect } from 'react';

/* ── Import themes — order matters: last loaded wins per specificity ── */
import './themes/blue.css';
import './themes/green.css';
import './themes/purple.css';
import './themes/red.css';
import './themes/orange.css';
import './themes/dark.css';

/* ── Import form components ── */
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ContactForm from './components/ContactForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';

/* ─────────────────────────────────
   App Constants
───────────────────────────────── */
const TABS = [
  { id: 'login', label: '🔐 Sign In' },
  { id: 'register', label: '✨ Register' },
  { id: 'contact', label: '💬 Contact' },
  { id: 'forgot', label: '🔑 Forgot Password' },
];

const THEMES = ['blue', 'green', 'purple', 'red', 'orange', 'dark'];

const THEME_LABELS = {
  blue: 'Blue',
  green: 'Green',
  purple: 'Purple',
  red: 'Red',
  orange: 'Orange',
  dark: 'Dark',
};

/* ─────────────────────────────────
   App Component
───────────────────────────────── */
export default function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [activeTheme, setActiveTheme] = useState('blue');

  /* Apply data-theme to <html> so CSS variables cascade globally */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  /* Navigate to "forgot" tab from LoginForm */
  const handleForgot = () => setActiveTab('forgot');

  /* Navigate back to "login" tab from ForgotPasswordForm */
  const handleBack = () => setActiveTab('login');

  return (
    <div className="app-wrapper">

      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-logo">
          {/* Small logo mark */}
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="30" rx="8" fill="var(--primary)" />
            <path d="M8 15h14M15 8l7 7-7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          FormsKit <span>UI Kit</span>
        </div>

        {/* Theme dots */}
        <nav className="theme-bar" aria-label="Color theme selector">
          <span className="theme-bar-label">Theme</span>
          {THEMES.map(theme => (
            <button
              key={theme}
              className={`theme-dot${activeTheme === theme ? ' active' : ''}`}
              data-theme={theme}
              onClick={() => setActiveTheme(theme)}
              aria-label={`Switch to ${THEME_LABELS[theme]} theme`}
              title={THEME_LABELS[theme]}
            />
          ))}
        </nav>
      </header>

      {/* ── Main content ── */}
      <main className="app-main">

        {/* Form tabs */}
        <nav className="form-tabs" role="tablist" aria-label="Form navigation">
          {TABS.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Rendered form — key forces re-mount animation on tab change */}
        {activeTab === 'login' && <LoginForm key="login" onForgot={handleForgot} />}
        {activeTab === 'register' && <RegisterForm key="register" />}
        {activeTab === 'contact' && <ContactForm key="contact" />}
        {activeTab === 'forgot' && <ForgotPasswordForm key="forgot" onBack={handleBack} />}

      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        React Authentication &amp; Contact Forms UI Kit — ThemeForest ©{new Date().getFullYear()}
      </footer>

    </div>
  );
}
