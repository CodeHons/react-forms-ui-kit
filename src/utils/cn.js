/**
 * Simple utility to conditionally join class names.
 * Usage: cn('btn', isActive && 'active', isError ? 'error' : 'success')
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
