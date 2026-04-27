import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, Briefcase, User, Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className='flex-1 flex items-center justify-center bg-slate-50 pt-16 px-6'>
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center logo-gradient">
                            <Briefcase size={28} className="text-white" />
                        </div>
                        <h1 className='font-bold text-3xl text-slate-900 mb-2'>Welcome Back</h1>
                        <p className="text-slate-500">Sign in to continue to JobPortal</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xl">
                        <form onSubmit={submitHandler} className='space-y-5'>
                            {/* Email */}
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Email Address</Label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="john@example.com"
                                        className="pl-10 h-11 rounded-xl border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Password</Label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className="pl-10 pr-10 h-11 rounded-xl border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                                        required
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

                            {/* Role Selection */}
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-3 block">I am a</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label
                                        className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                            input.role === 'student'
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <User size={18} className={input.role === 'student' ? 'text-indigo-600' : 'text-slate-400'} />
                                        <span className={`text-sm font-medium ${
                                            input.role === 'student' ? 'text-indigo-600' : 'text-slate-600'
                                        }`}>Job Seeker</span>
                                    </label>
                                    <label
                                        className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                            input.role === 'recruiter'
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <Briefcase size={18} className={input.role === 'recruiter' ? 'text-indigo-600' : 'text-slate-400'} />
                                        <span className={`text-sm font-medium ${
                                            input.role === 'recruiter' ? 'text-indigo-600' : 'text-slate-600'
                                        }`}>Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            {
                                loading ? (
                                    <Button disabled className="w-full h-11 rounded-xl btn-gradient text-white">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                        Signing in...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full h-11 rounded-xl btn-gradient text-white">
                                        Sign In
                                    </Button>
                                )
                            }

                            {/* Forgot Password Link */}
                            <div className="text-center">
                                <Link to="/forgot-password" className='text-sm hover:underline' style={{color: '#6366f1'}}>
                                    Forgot your password?
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <p className='text-center text-sm text-slate-600 mt-6'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='font-semibold hover:underline' style={{color: '#6366f1'}}>
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login