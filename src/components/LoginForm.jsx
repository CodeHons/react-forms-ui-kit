/**
 * LoginForm.jsx
 * ──────────────────────────────────────────────────────
 * A clean, animated login form refactored with hooks & utils.
 * ──────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { useForm, validateEmail } from '../utils/form-utils';
import { cn } from '../utils/cn';
import {
    IconMail, IconLock, IconEye, IconEyeOff, IconArrow, IconCheck,
    IconGoogle, IconGithub
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

export default function LoginForm({
    onForgot,
    onSwitch,
    onSubmit,
    title = 'Sign in',
    subtitle = 'Welcome back - enter your credentials to continue.'
}) {
    const {
        values, errors, handleChange, validate: runValidation, resetForm
    } = useForm({ email: '', password: '', remember: false }, validate);

    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!runValidation()) return;

        setLoading(true);
        try {
            if (onSubmit) {
                await onSubmit(values);
            } else {
                // Mock delay
                await new Promise(res => setTimeout(res, 1400));
            }
            setSuccess(true);
        } catch (err) {
            console.error('Login failed:', err);
        } finally {
            setLoading(false);
        }
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
            <h1 className="form-title">{title}</h1>
            <p className="form-subtitle">{subtitle}</p>

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

                {/* Social Login */}
                <div style={{ animation: 'slideIn 0.8s ease backwards', animationDelay: '0.4s' }}>
                    <div className="social-divider">Or continue with</div>
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
                    Don't have an account?
                    <span className="tab-link" onClick={() => onSwitch('register')}>Sign up</span>
                </p>
            </form>
        </div>
    );
}
