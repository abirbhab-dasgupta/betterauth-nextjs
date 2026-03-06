'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import { FormInput } from '@/components/auth/form-input';
import { signIn, signUp } from '@/lib/auth-client';

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
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

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (username.length < 3) {
            setError('Username must be at least 3 characters long');
            return;
        }

        setLoading(true);

        try {
            await signUp.email(
                { email, password, name, username } as Parameters<typeof signUp.email>[0],
                {
                    onSuccess: () => router.push('/dashboard'),
                    onError: (ctx) => setError(ctx.error.message || 'Failed to create account'),
                }
            );
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setSocialLoading(true);
        try {
            await signIn.social(
                { provider: 'google', callbackURL: '/dashboard' },
                {
                    onError: (ctx) => setError(ctx.error.message || 'Failed to sign up with Google'),
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
            <div className="absolute inset-0  from-background via-background to-secondary/5 pointer-events-none" />

            <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <AuthCard
                    title="Create Account"
                    subtitle="Join AUth Next today"
                    footerText="Already have an account?"
                    footerLink={{ text: 'Sign in', href: '/auth/sign-in' }}
                >
                    <form onSubmit={handleSignUp} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <FormInput
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <FormInput
                            label="Username"
                            type="text"
                            placeholder="johndoe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength={3}
                            maxLength={30}
                        />

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
                            minLength={8}
                        />

                        {password.length > 0 && password.length < 8 && (
                            <p className="text-xs text-amber-400 -mt-3">
                                Password must be at least 8 characters ({8 - password.length} more needed)
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full btn-primary font-mono uppercase tracking-wide ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="divider-text">
                        <span>Or sign up with</span>
                    </div>

                    <button
                        onClick={handleGoogleSignUp}
                        disabled={socialLoading}
                        className={`btn-social fade-in-up w-full ${socialLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <img src="/google.svg" alt="Google" width={20} height={20} />
                        <span className="font-mono uppercase tracking-wide text-sm">
                            {socialLoading ? 'Loading...' : 'Sign up with Google'}
                        </span>
                    </button>
                </AuthCard>
            </div>
        </div>
    );
}