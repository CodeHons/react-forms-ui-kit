/**
 * ForgotPasswordForm.jsx
 * ──────────────────────────────────────────────────────
 * Password-reset flow refactored with hooks & utils.
 * ──────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { useForm, validateEmail } from '../utils/form-utils';
import {
    IconMail, IconKey, IconArrow, IconBack, IconInbox
} from './Icons';

/* ── Validation logic ── */
const validate = ({ email }) => {
    const err = {};
    if (!email) err.email = 'Email is required.';
    else if (!validateEmail(email)) err.email = 'Enter a valid email address.';
    return err;
};

export default function ForgotPasswordForm({
    onBack,
    onSubmit,
    title = 'Forgot password?',
    subtitle = "No worries! Enter your email and we'll send you a secure reset link."
}) {
    const {
        values, errors, handleChange, validate: runValidation, resetForm
    } = useForm({ email: '' }, validate);

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
                await new Promise(res => setTimeout(res, 1400));
            }
            setSuccess(true);
        } catch (err) {
            console.error('Password reset failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleTryAgain = () => {
        setSuccess(false);
        resetForm();
    };

    if (success) {
        return (
            <div className="form-card">
                <div className="form-success">
                    <div className="success-icon"><IconInbox /></div>
                    <h2 className="success-title">Check your inbox</h2>
                    <p className="success-msg">
                        We've sent a password reset link to <strong>{values.email}</strong>.
                        Check your spam folder if you don't see it within a few minutes.
                    </p>

                    {/* Tips */}
                    <div className="info-box">
                        {[
                            'The link expires in 30 minutes.',
                            'Check your spam / junk folder.',
                            'Make sure to use the same browser.'
                        ].map((tip, i) => (
                            <div key={i} className="info-tip">
                                <span className="tip-check">✓</span>
                                <span className="tip-text">{tip}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: 10, width: '100%', flexWrap: 'wrap' }}>
                        <button className="submit-btn" style={{ flex: 1 }} onClick={handleTryAgain}>
                            Try another email
                        </button>
                        {onBack && (
                            <button className="secondary-btn" onClick={onBack}>
                                <IconBack /> Back to login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="form-card">
            <div className="form-icon">
                <IconKey />
            </div>
            <h1 className="form-title">{title}</h1>
            <p className="form-subtitle">{subtitle}</p>

            <form onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <div className="field-group" style={{ '--i': 1 }}>
                    <label className="field-label" htmlFor="fp-email">Email address</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconMail /></span>
                        <input
                            id="fp-email" className="field-input"
                            type="email" name="email"
                            value={values.email} onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>
                    {errors.email && <p className="error-text">⚠ {errors.email}</p>}
                </div>

                {/* Submit */}
                <button type="submit" className="submit-btn" disabled={loading} style={{ '--i': 2 }}>
                    {loading
                        ? <><span className="spinner" /> Sending link…</>
                        : <>Send reset link <IconArrow /></>}
                </button>
            </form>

            {/* Back link */}
            {onBack && (
                <p className="form-footer-text" style={{ '--i': 3 }}>
                    <span className="link-text" role="button" tabIndex={0}
                        onClick={onBack}
                        onKeyDown={e => e.key === 'Enter' && onBack?.()}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
                    >
                        <IconBack /> Back to sign in
                    </span>
                </p>
            )}
        </div>
    );
}
