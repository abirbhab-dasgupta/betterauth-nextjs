import React from 'react';
import Link from 'next/link';

interface AuthCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    footerText: string;
    footerLink: {
        text: string;
        href: string;
    };
}

export function AuthCard({
    title,
    subtitle,
    children,
    footerText,
    footerLink,
}: AuthCardProps) {
    return (
        <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-3 fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="heading-lg text-white">{title}</h1>
                <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Content */}
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                {children}
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground fade-in-up" style={{ animationDelay: '0.3s' }}>
                {footerText}{' '}
                <Link
                    href={footerLink.href}
                    className="text-primary hover:underline font-medium"
                >
                    {footerLink.text}
                </Link>
            </p>
        </div>
    );
}
