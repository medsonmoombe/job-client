import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.password || !formData.confirmPassword) {
            toast.error('Please fill all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/reset-password/${token}`, {
                password: formData.password
            });

            if (res.data.success) {
                toast.success('Password reset successfully!');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid or expired token');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-20">
                <div className="w-full max-w-md">
                    <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-lg">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#eef2ff'}}>
                                <Lock size={32} style={{color: '#6366f1'}} />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h1>
                            <p className="text-slate-600">Enter your new password below</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="password">New Password</Label>
                                <div className="relative mt-1">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative mt-1">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm new password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-gradient text-white"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
