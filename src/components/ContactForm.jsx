/**
 * ContactForm.jsx
 * ──────────────────────────────────────────────────────
 * A professional contact form refactored with hooks & utils.
 * ──────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { useForm, validateEmail } from '../utils/form-utils';
import {
    IconUser, IconMail, IconMessage, IconSend, IconCheck
} from './Icons';

const MAX_MSG = 500;

/* ── Validation logic ── */
const validate = ({ name, email, message }) => {
    const err = {};
    if (!name.trim()) err.name = 'Your name is required.';

    if (!email) err.email = 'Email is required.';
    else if (!validateEmail(email)) err.email = 'Enter a valid email.';

    if (!message.trim()) err.message = 'Message cannot be empty.';
    else if (message.trim().length < 10) err.message = 'Message must be at least 10 characters.';

    return err;
};

export default function ContactForm() {
    const {
        values, errors, handleChange: baseHandleChange, validate: runValidation, resetForm
    } = useForm({ name: '', email: '', subject: '', message: '' }, validate);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Custom change handler to cap message length
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'message' && value.length > MAX_MSG) return;
        baseHandleChange(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!runValidation()) return;

        setLoading(true);
        setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
    };

    const handleReset = () => {
        setSuccess(false);
        resetForm();
    };

    const remaining = MAX_MSG - values.message.length;

    if (success) {
        return (
            <div className="form-card">
                <div className="form-success">
                    <div className="success-icon"><IconCheck /></div>
                    <h2 className="success-title">Message Sent!</h2>
                    <p className="success-msg">
                        Thank you, <strong>{values.name}</strong>! We'll get back to you at <strong>{values.email}</strong> as soon as possible.
                    </p>
                    <button className="submit-btn" style={{ maxWidth: 200 }} onClick={handleReset}>
                        Send another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="form-card">
            <div className="form-icon">
                <IconMessage />
            </div>
            <h1 className="form-title">Get in touch</h1>
            <p className="form-subtitle">We'd love to hear from you. Fill out the form and we'll respond shortly.</p>

            <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="field-group" style={{ '--i': 1 }}>
                    <label className="field-label" htmlFor="ct-name">Your name</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconUser /></span>
                        <input
                            id="ct-name" className="field-input"
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
                    <label className="field-label" htmlFor="ct-email">Email address</label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconMail /></span>
                        <input
                            id="ct-email" className="field-input"
                            type="email" name="email"
                            value={values.email} onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>
                    {errors.email && <p className="error-text">⚠ {errors.email}</p>}
                </div>

                {/* Subject (optional) */}
                <div className="field-group" style={{ '--i': 3 }}>
                    <label className="field-label" htmlFor="ct-subject">
                        Subject <span style={{ opacity: 0.45, fontWeight: 400 }}>(optional)</span>
                    </label>
                    <div className="field-input-wrap">
                        <span className="field-icon"><IconMessage /></span>
                        <input
                            id="ct-subject" className="field-input"
                            type="text" name="subject"
                            value={values.subject} onChange={handleChange}
                            placeholder="How can we help?"
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="field-group" style={{ '--i': 4 }}>
                    <label className="field-label" htmlFor="ct-message">Message</label>
                    <div className="field-input-wrap">
                        <span className="field-icon top" style={{ top: 14 }}><IconMessage /></span>
                        <textarea
                            id="ct-message" className="field-textarea"
                            name="message"
                            value={values.message} onChange={handleChange}
                            placeholder="Write your message here…"
                            style={{ paddingTop: 12 }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {errors.message
                            ? <p className="error-text">⚠ {errors.message}</p>
                            : <span />}
                        <span style={{
                            fontSize: '0.72rem', marginTop: 5,
                            color: remaining < 50 ? 'var(--error-color)' : 'var(--text-secondary)',
                            opacity: 0.7, fontWeight: 500
                        }}>
                            {remaining} / {MAX_MSG}
                        </span>
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" className="submit-btn" disabled={loading} style={{ '--i': 5 }}>
                    {loading
                        ? <><span className="spinner" /> Sending…</>
                        : <>Send message <IconSend /></>}
                </button>
            </form>
        </div>
    );
}
