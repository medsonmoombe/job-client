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
import { setLoading } from '@/redux/authSlice'
import { Loader2, Mail, Lock, Phone, UserCircle, Upload, Briefcase, User, Eye, EyeOff } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: undefined });
        }
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrors({});
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.response?.data?.errors) {
                const validationErrors = {};
                error.response.data.errors.forEach(err => {
                    if (!validationErrors[err.field]) {
                        validationErrors[err.field] = err.message;
                    }
                });
                setErrors(validationErrors);
                toast.error('Please fix the validation errors');
            } else {
                toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
            }
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
            <div className='flex-1 flex items-center justify-center bg-slate-50 pt-16 px-6 py-12'>
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center logo-gradient">
                            <Briefcase size={28} className="text-white" />
                        </div>
                        <h1 className='font-bold text-3xl text-slate-900 mb-2'>Create Your Account</h1>
                        <p className="text-slate-500">Join JobPortal and start your career journey</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xl">
                        <form onSubmit={submitHandler} className='space-y-5'>
                            {/* Full Name */}
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Full Name</Label>
                                <div className="relative">
                                    <UserCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="John Doe"
                                        className={`pl-10 h-11 rounded-xl border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 ${errors.fullname ? 'border-red-500' : ''}`}
                                        required
                                    />
                                </div>
                                {errors.fullname && <p className="text-red-600 text-xs mt-1">{errors.fullname}</p>}
                            </div>

                            {/* Email & Phone in Grid */}
                            <div className="grid md:grid-cols-2 gap-4">
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
                                            className={`pl-10 h-11 rounded-xl border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 ${errors.email ? 'border-red-500' : ''}`}
                                            required
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-slate-700 mb-2 block">Phone Number</Label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            type="text"
                                            value={input.phoneNumber}
                                            name="phoneNumber"
                                            onChange={changeEventHandler}
                                            placeholder="+1 234 567 8900"
                                            className={`pl-10 h-11 rounded-xl border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                            required
                                        />
                                    </div>
                                    {errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>}
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
                                        placeholder="Create a strong password"
                                        className={`pl-10 pr-10 h-11 rounded-xl border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 ${errors.password ? 'border-red-500' : ''}`}
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
                                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
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

                            {/* Profile Photo Upload */}
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Profile Photo (Optional)</Label>
                                <div className="relative">
                                    <label className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 cursor-pointer transition-all bg-slate-50 hover:bg-indigo-50">
                                        <Upload size={18} className="text-slate-400" />
                                        <span className="text-sm text-slate-600">
                                            {input.file ? input.file.name : 'Click to upload profile photo'}
                                        </span>
                                        <Input
                                            accept="image/*"
                                            type="file"
                                            onChange={changeFileHandler}
                                            className="sr-only"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            {
                                loading ? (
                                    <Button disabled className="w-full h-11 rounded-xl btn-gradient text-white">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Creating account...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full h-11 rounded-xl btn-gradient text-white">
                                        Create Account
                                    </Button>
                                )
                            }
                        </form>
                    </div>

                    {/* Footer */}
                    <p className='text-center text-sm text-slate-600 mt-6'>
                        Already have an account?{' '}
                        <Link to="/login" className='font-semibold hover:underline' style={{color: '#6366f1'}}>
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup