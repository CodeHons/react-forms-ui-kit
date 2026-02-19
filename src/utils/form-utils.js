/**
 * form-utils.js
 * ──────────────────────────────────────────────────────
 * Reusable logic for form validation and state management.
 * ──────────────────────────────────────────────────────
 */

import { useState } from 'react';

/**
 * Standard email validation
 */
export const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

/**
 * Custom hook for form management
 * @param {Object} initialValues 
 * @param {Function} validateFn - returns an errors object
 */
export function useForm(initialValues, validateFn) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setValues(prev => ({ ...prev, [name]: val }));

        // Clear error for that field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    const validate = () => {
        if (!validateFn) return true;
        const errs = validateFn(values);
        setErrors(errs || {});
        return Object.keys(errs || {}).length === 0;
    };

    return {
        values,
        errors,
        handleChange,
        setErrors,
        resetForm,
        validate
    };
}
