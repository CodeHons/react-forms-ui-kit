/**
 * LoginForm.jsx
 * ──────────────────────────────────────────────────────
 * A clean, animated login form refactored with hooks & utils.
 * ──────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { useForm, validateEmail } from '../utils/form-utils';
import {
    IconMail, IconLock, IconEye, IconEyeOff, IconArrow, IconCheck
} from './Icons';

/* ── Validation logic ── */
const validate = (form) => {
    const err = {};
    if (!form.email) err.email = 'Email is required.';
    else if (!validateEmail(form.email)) err.email = 'Enter a valid email address.';

    if (!form.password) err.password = 'Password is required.';
    else if (form.password.length < 6) err.password = 'Password must be at least 6 characters.';

    return err;
};

export default function LoginForm({ onForgot }) {
    const {
        values, errors, handleChange, validate: runValidation, resetForm
    } = useForm({ email: '', password: '', remember: false }, validate);

    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!runValidation()) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1400);
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
                    <h2 className="success-title">Welcome back!</h2>
                    <p className="success-msg">
                        You've successfully logged in as <strong>{values.email}</strong>.
                    </p>
                    <button className="submit-btn" style={{ maxWidth: 220 }} onClick={handleReset}>
                        Log in again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="form-card">
            <div className="form-icon">
                <IconLock />
            </div>
            <h1 className="form-title">Sign in</h1>
            <p className="form-subtitle">Welcome back — enter your credentials to continue.</p>

            <form onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <div className="field-group" style={{ '--i': 1 }}>
                    <label className="field-label" htmlFor="login-email">Email address</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconMail /></span>
                        <input
                            id="login-email"
                            className="field-input"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>
                    {errors.email && <p className="error-text">⚠ {errors.email}</p>}
                </div>

                {/* Password */}
                <div className="field-group" style={{ '--i': 2 }}>
                    <label className="field-label" htmlFor="login-password">Password</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconLock /></span>
                        <input
                            id="login-password"
                            className="field-input"
                            type={showPwd ? 'text' : 'password'}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            style={{ paddingRight: 44 }}
                        />
                        <button
                            type="button"
                            className="pwd-toggle"
                            onClick={() => setShowPwd(v => !v)}
                            aria-label={showPwd ? 'Hide password' : 'Show password'}
                        >
                            {showPwd ? <IconEyeOff /> : <IconEye />}
                        </button>
                    </div>
                    {errors.password && <p className="error-text">⚠ {errors.password}</p>}
                </div>

                {/* Remember me + Forgot */}
                <div className="field-row" style={{ '--i': 3 }}>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={values.remember}
                            onChange={handleChange}
                        />
                        Remember me
                    </label>
                    <span
                        className="link-text"
                        role="button"
                        tabIndex={0}
                        onClick={onForgot}
                        onKeyDown={e => e.key === 'Enter' && onForgot?.()}
                    >
                        Forgot password?
                    </span>
                </div>

                {/* Submit */}
                <button type="submit" className="submit-btn" disabled={loading} style={{ '--i': 4 }}>
                    {loading
                        ? <><span className="spinner" /> Signing in…</>
                        : <> Sign in <IconArrow /></>}
                </button>
            </form>
        </div>
    );
}
