/**
 * RegisterForm.jsx
 * ──────────────────────────────────────────────────────
 * Signup / registration form refactored with hooks & utils.
 * ──────────────────────────────────────────────────────
 */

import { useState, useMemo } from 'react';
import { useForm, validateEmail } from '../utils/form-utils';
import { cn } from '../utils/cn';
import {
    IconUser, IconMail, IconLock, IconEye, IconEyeOff, IconArrow, IconCheck,
    IconGoogle, IconGithub
} from './Icons';

/* ── Password strength scorer ── */
const getStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const levels = [
        { label: 'Too short', color: '#ef4444' },
        { label: 'Weak', color: '#f97316' },
        { label: 'Fair', color: '#eab308' },
        { label: 'Good', color: '#3b82f6' },
        { label: 'Strong', color: '#10b981' },
    ];
    return { score, ...levels[score] };
};

/* ── Validation logic ── */
const validate = ({ name, email, password, confirm }) => {
    const err = {};
    if (!name.trim()) err.name = 'Full name is required.';

    if (!email) err.email = 'Email is required.';
    else if (!validateEmail(email)) err.email = 'Enter a valid email.';

    if (!password) err.password = 'Password is required.';
    else if (password.length < 6) err.password = 'Minimum 6 characters.';

    if (!confirm) err.confirm = 'Please confirm your password.';
    else if (confirm !== password) err.confirm = 'Passwords do not match.';

    return err;
};

export default function RegisterForm({ onSwitch }) {
    const {
        values, errors, handleChange, validate: runValidation, resetForm
    } = useForm({ name: '', email: '', password: '', confirm: '' }, validate);

    const [showPwd, setShowPwd] = useState(false);
    const [showCon, setShowCon] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const strength = useMemo(() => getStrength(values.password), [values.password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!runValidation()) return;

        setLoading(true);
        setTimeout(() => { setLoading(false); setSuccess(true); }, 1400);
    };

    const handleReset = () => {
        setSuccess(false);
        resetForm();
    };

    if (success) {
        return (
            <div className="form-card">
                <div className="form-success">
                    <div className="success-icon"><IconCheck /></div>
                    <h2 className="success-title">Account Created!</h2>
                    <p className="success-msg">
                        Welcome, <strong>{values.name}</strong>! Your account has been created successfully.
                    </p>
                    <button className="submit-btn" style={{ maxWidth: 220 }} onClick={handleReset}>
                        Register another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="form-card">
            <div className="form-icon">
                <IconUser />
            </div>
            <h1 className="form-title">Create account</h1>
            <p className="form-subtitle">Join us today — it's free and takes less than a minute.</p>

            <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="field-group" style={{ '--i': 1 }}>
                    <label className="field-label" htmlFor="reg-name">Full name</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconUser /></span>
                        <input
                            id="reg-name" className="field-input"
                            type="text" name="name"
                            value={values.name} onChange={handleChange}
                            placeholder="Jane Doe"
                            autoComplete="name"
                        />
                    </div>
                    {errors.name && <p className="error-text">⚠ {errors.name}</p>}
                </div>

                {/* Email */}
                <div className="field-group" style={{ '--i': 2 }}>
                    <label className="field-label" htmlFor="reg-email">Email address</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconMail /></span>
                        <input
                            id="reg-email" className="field-input"
                            type="email" name="email"
                            value={values.email} onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>
                    {errors.email && <p className="error-text">⚠ {errors.email}</p>}
                </div>

                {/* Password */}
                <div className="field-group" style={{ '--i': 3 }}>
                    <label className="field-label" htmlFor="reg-password">Password</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconLock /></span>
                        <input
                            id="reg-password" className="field-input"
                            type={showPwd ? 'text' : 'password'}
                            name="password"
                            value={values.password} onChange={handleChange}
                            placeholder="Min. 6 characters"
                            autoComplete="new-password"
                            style={{ paddingRight: 44 }}
                        />
                        <button type="button" className="pwd-toggle"
                            onClick={() => setShowPwd(v => !v)}
                            aria-label={showPwd ? 'Hide' : 'Show'}>
                            {showPwd ? <IconEyeOff /> : <IconEye />}
                        </button>
                    </div>
                    {errors.password && <p className="error-text">⚠ {errors.password}</p>}

                    {/* Strength bar */}
                    {values.password && (
                        <div style={{ marginTop: 8 }}>
                            <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} style={{
                                        flex: 1, height: 4, borderRadius: 99,
                                        background: i <= strength.score ? strength.color : 'var(--input-border)',
                                        transition: 'background 0.3s'
                                    }} />
                                ))}
                            </div>
                            <span style={{ fontSize: '0.72rem', color: strength.color, fontWeight: 600 }}>
                                {strength.label}
                            </span>
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="field-group" style={{ '--i': 4 }}>
                    <label className="field-label" htmlFor="reg-confirm">Confirm password</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconLock /></span>
                        <input
                            id="reg-confirm" className="field-input"
                            type={showCon ? 'text' : 'password'}
                            name="confirm"
                            value={values.confirm} onChange={handleChange}
                            placeholder="Repeat your password"
                            autoComplete="new-password"
                            style={{ paddingRight: 44 }}
                        />
                        <button type="button" className="pwd-toggle"
                            onClick={() => setShowCon(v => !v)}
                            aria-label={showCon ? 'Hide' : 'Show'}>
                            {showCon ? <IconEyeOff /> : <IconEye />}
                        </button>
                    </div>
                    {errors.confirm && <p className="error-text">⚠ {errors.confirm}</p>}
                </div>

                {/* Submit */}
                <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: 4, '--i': 5 }}>
                    {loading
                        ? <><span className="spinner" /> Creating account…</>
                        : <>Create account <IconArrow /></>}
                </button>

                {/* Social Login */}
                <div style={{ animation: 'slideIn 0.8s ease backwards', animationDelay: '0.45s' }}>
                    <div className="social-divider">Or join with</div>
                    <div className="social-group">
                        <button type="button" className="social-btn">
                            <IconGoogle /> Google
                        </button>
                        <button type="button" className="social-btn">
                            <IconGithub /> GitHub
                        </button>
                    </div>
                </div>

                <p className="form-toggle-text" style={{ animation: 'slideIn 0.8s ease backwards', animationDelay: '0.5s' }}>
                    Already have an account?
                    <span className="tab-link" onClick={() => onSwitch?.('login')}>Sign in</span>
                </p>
            </form>
        </div>
    );
}
