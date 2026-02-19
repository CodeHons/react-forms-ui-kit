/**
 * App.jsx — React Forms UI Kit Demo Shell
 * ──────────────────────────────────────────────────────
 * Refined with premium aesthetics and smoother transitions.
 * ──────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';

/* ── Import themes ── */
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

const TABS = [
  { id: 'login', label: '🔐 Sign In' },
  { id: 'register', label: '✨ Register' },
  { id: 'contact', label: '💬 Contact' },
  { id: 'forgot', label: '🔑 Forgot' },
];

const THEMES = ['blue', 'green', 'purple', 'red', 'orange', 'dark'];

const THEME_LABELS = {
  blue: 'Modern Blue',
  green: 'Emerald Green',
  purple: 'Royal Purple',
  red: 'Vibrant Red',
  orange: 'Energetic Orange',
  dark: 'Midnight Dark',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [activeTheme, setActiveTheme] = useState('blue');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  const handleForgot = () => setActiveTab('forgot');
  const handleBack = () => setActiveTab('login');

  return (
    <div className="app-wrapper">

      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="10" fill="var(--primary)" />
            <path d="M9 16h14M16 9l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          FormsKit <span>v1.1</span>
        </div>

        {/* Theme dots */}
        <nav className="theme-bar" aria-label="Color theme selector">
          <span className="theme-bar-label">Appearance</span>
          {THEMES.map(theme => (
            <button
              key={theme}
              className={`theme-dot${activeTheme === theme ? ' active' : ''}`}
              data-theme={theme}
              onClick={() => setActiveTheme(theme)}
              aria-label={`Switch to ${THEME_LABELS[theme]}`}
              title={THEME_LABELS[theme]}
            />
          ))}
        </nav>
      </header>

      {/* ── Main content ── */}
      <main className="app-main">

        {/* Form tabs */}
        <nav className="form-tabs" role="tablist">
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

        {/* Rendered form */}
        <div key={activeTab}>
          {activeTab === 'login' && <LoginForm onForgot={handleForgot} />}
          {activeTab === 'register' && <RegisterForm />}
          {activeTab === 'contact' && <ContactForm />}
          {activeTab === 'forgot' && <ForgotPasswordForm onBack={handleBack} />}
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        Premium React Forms UI Kit • ThemeForest Edition • ©{new Date().getFullYear()}
      </footer>

    </div>
  );
}
