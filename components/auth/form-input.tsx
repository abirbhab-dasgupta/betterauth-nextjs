import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    delay?: string;
}

export function FormInput({
    label,
    error,
    delay = '0s',
    ...props
}: FormInputProps) {
    return (
        <div className="form-group fade-in-up" style={{ animationDelay: delay }}>
            <label className="form-label">{label}</label>
            <input
                className={`form-input ${error ? 'border-destructive' : ''}`}
                {...props}
            />
            {error && (
                <p className="text-xs text-destructive mt-1">{error}</p>
            )}
        </div>
    );
}
