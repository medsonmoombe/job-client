import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error('Please enter your email');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email });
            
            if (res.data.success) {
                setEmailSent(true);
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-20">
                <div className="w-full max-w-md">
                    {!emailSent ? (
                        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-lg">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#eef2ff'}}>
                                    <Mail size={32} style={{color: '#6366f1'}} />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password?</h1>
                                <p className="text-slate-600">No worries, we'll send you reset instructions.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-gradient text-white"
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link to="/login" className="inline-flex items-center gap-2 text-sm hover:underline" style={{color: '#6366f1'}}>
                                    <ArrowLeft size={16} />
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-lg text-center">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#dcfce7'}}>
                                <CheckCircle size={32} style={{color: '#16a34a'}} />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Check Your Email</h1>
                            <p className="text-slate-600 mb-6">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                            <p className="text-sm text-slate-500 mb-6">
                                Didn't receive the email? Check your spam folder or try again.
                            </p>
                            <Button
                                onClick={() => setEmailSent(false)}
                                variant="outline"
                                className="w-full"
                            >
                                Try Another Email
                            </Button>
                            <div className="mt-6">
                                <Link to="/login" className="inline-flex items-center gap-2 text-sm hover:underline" style={{color: '#6366f1'}}>
                                    <ArrowLeft size={16} />
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
