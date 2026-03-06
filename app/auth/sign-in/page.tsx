'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import { FormInput } from '@/components/auth/form-input';
import { signIn } from '@/lib/auth-client';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn.email(
                { email, password },
                {
                    onSuccess: () => router.push('/dashboard'),
                    onError: (ctx) => setError(ctx.error.message || 'Failed to sign in'),
                }
            );
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setSocialLoading(true);
        try {
            await signIn.social(
                { provider: 'google', callbackURL: '/dashboard' },
                {
                    onError: (ctx) => setError(ctx.error.message || 'Failed to sign in with Google'),
                }
            );
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setSocialLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background grid-background flex items-center justify-center p-4">
            <div className="absolute inset-0 from-background via-background to-secondary/5 pointer-events-none" />

            <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <AuthCard
                    title="Sign In"
                    subtitle="Welcome back to AUth Next"
                    footerText="Don't have an account?"
                    footerLink={{ text: 'Sign up', href: '/auth/sign-up' }}
                >
                    <form onSubmit={handleSignIn} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <FormInput
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <FormInput
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full btn-primary font-mono uppercase tracking-wide ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="divider-text">
                        <span>Or continue with</span>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={socialLoading}
                        className={`btn-social fade-in-up w-full ${socialLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <img src="/google.svg" alt="Google" width={20} height={20} />
                        <span className="font-mono uppercase tracking-wide text-sm">
                            {socialLoading ? 'Loading...' : 'Sign in with Google'}
                        </span>
                    </button>
                </AuthCard>
            </div>
        </div>
    );
}