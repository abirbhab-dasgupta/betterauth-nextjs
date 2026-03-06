'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut, authClient } from '@/lib/auth-client';

export default function Dashboard() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [isVisible, setIsVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editImage, setEditImage] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [signOutLoading, setSignOutLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isPending && !session) {
            router.push('/');
        }
    }, [session, isPending, router]);

    useEffect(() => {
        if (session?.user) {
            setEditName(session.user.name ?? '');
            setEditImage(session.user.image ?? '');
        }
    }, [session]);

    const handleSignOut = async () => {
        setSignOutLoading(true);
        await signOut();
        router.push('/');
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateError('');
        setUpdateSuccess(false);
        setUpdateLoading(true);

        try {
            await authClient.updateUser({
                name: editName,
                image: editImage || undefined,
            });
            setUpdateSuccess(true);
            setIsEditing(false);
        } catch {
            setUpdateError('Failed to update profile. Please try again.');
        } finally {
            setUpdateLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-background grid-background flex items-center justify-center">
                <p className="font-mono text-muted-foreground uppercase tracking-wider text-sm">
                    Loading...
                </p>
            </div>
        );
    }

    if (!session) return null;

    const user = session.user;
    const initials = user.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
        : user.email?.[0].toUpperCase();

    return (
        <div className="min-h-screen bg-background grid-background p-6 md:p-12">
            <div className="absolute inset-0  from-background via-background to-secondary/5 pointer-events-none" />

            <div className={`relative max-w-3xl mx-auto space-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

                {/* Header */}
                <div className="flex items-start justify-between fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                            Dashboard
                        </p>
                        <h1 className="heading-lg text-white">
                            Welcome, {user.name?.split(' ')[0] ?? 'User'}
                        </h1>
                    </div>
                    <button
                        onClick={handleSignOut}
                        disabled={signOutLoading}
                        className={`btn-secondary text-sm px-4 py-2 font-mono uppercase tracking-wide ${signOutLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {signOutLoading ? 'Signing out...' : 'Sign Out'}
                    </button>
                </div>

                {/* Profile Card */}
                <div className="border border-border p-8 space-y-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name ?? 'User'}
                                className="w-16 h-16 rounded-full object-cover border border-border"
                            />
                        ) : (
                            <div className="w-16 h-16 border border-border flex items-center justify-center bg-secondary">
                                <span className="font-mono text-xl font-bold text-foreground">
                                    {initials}
                                </span>
                            </div>
                        )}
                        <div>
                            <h2 className="font-mono text-lg font-bold text-white">{user.name}</h2>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>

                    {/* Auth Details */}
                    <div className="space-y-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            Account Details
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="border border-border p-4">
                                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">User ID</p>
                                <p className="font-mono text-sm text-foreground truncate">{user.id}</p>
                            </div>
                            <div className="border border-border p-4">
                                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Email</p>
                                <p className="font-mono text-sm text-foreground">{user.email}</p>
                            </div>
                            <div className="border border-border p-4">
                                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Email Verified</p>
                                <p className={`font-mono text-sm ${user.emailVerified ? 'text-green-400' : 'text-amber-400'}`}>
                                    {user.emailVerified ? 'Verified' : 'Not Verified'}
                                </p>
                            </div>
                            <div className="border border-border p-4">
                                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Session Expires</p>
                                <p className="font-mono text-sm text-foreground">
                                    {new Date(session.session.expiresAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Edit Toggle */}
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn-primary text-sm px-4 py-2 font-mono uppercase tracking-wide"
                        >
                            Edit Profile
                        </button>
                    )}

                    {updateSuccess && (
                        <p className="text-sm font-mono text-green-400">Profile updated successfully.</p>
                    )}
                </div>

                {/* Edit Form */}
                {isEditing && (
                    <div className="border border-border p-8 space-y-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            Edit Profile
                        </p>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            {updateError && (
                                <div className="p-3 bg-destructive/10 border border-destructive text-destructive text-sm">
                                    {updateError}
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="form-input"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Profile Photo URL</label>
                                <input
                                    type="url"
                                    value={editImage}
                                    onChange={(e) => setEditImage(e.target.value)}
                                    className="form-input"
                                    placeholder="https://example.com/photo.jpg"
                                />
                                <p className="text-xs text-muted-foreground mt-1 font-mono">
                                    Paste a direct image URL
                                </p>
                            </div>

                            {/* Preview */}
                            {editImage && (
                                <div className="flex items-center gap-4">
                                    <img
                                        src={editImage}
                                        alt="Preview"
                                        className="w-12 h-12 rounded-full object-cover border border-border"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                    <p className="text-xs font-mono text-muted-foreground">Preview</p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={updateLoading}
                                    className={`btn-primary text-sm px-4 py-2 font-mono uppercase tracking-wide ${updateLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {updateLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setUpdateError('');
                                        setEditName(session.user.name ?? '');
                                        setEditImage(session.user.image ?? '');
                                    }}
                                    className="btn-secondary text-sm px-4 py-2 font-mono uppercase tracking-wide"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}