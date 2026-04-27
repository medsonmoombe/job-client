import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Briefcase } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { persistor } from '@/redux/store'
import { useState } from 'react'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                await persistor.purge();
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            {/* Mobile Nav Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center gap-7 md:hidden">
                    <button 
                        onClick={() => setMobileMenuOpen(false)} 
                        className="absolute top-6 right-6 text-slate-600"
                    >
                        <X size={24} />
                    </button>
                    {user && user.role === 'recruiter' ? (
                        <>
                            <Link to="/admin/companies" onClick={() => setMobileMenuOpen(false)} className="text-xl font-semibold text-slate-700 hover:text-brand-600 transition-colors">Companies</Link>
                            <Link to="/admin/jobs" onClick={() => setMobileMenuOpen(false)} className="text-xl font-semibold text-slate-700 hover:text-brand-600 transition-colors">Jobs</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-semibold text-slate-700 transition-colors" style={{'--hover-color': '#6366f1'}} onMouseEnter={(e) => e.target.style.color = '#6366f1'} onMouseLeave={(e) => e.target.style.color = ''}>Home</Link>
                            <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="text-xl font-semibold text-slate-700 transition-colors" onMouseEnter={(e) => e.target.style.color = '#6366f1'} onMouseLeave={(e) => e.target.style.color = ''}>Jobs</Link>
                            <Link to="/browse" onClick={() => setMobileMenuOpen(false)} className="text-xl font-semibold text-slate-700 transition-colors" onMouseEnter={(e) => e.target.style.color = '#6366f1'} onMouseLeave={(e) => e.target.style.color = ''}>Browse</Link>
                        </>
                    )}
                    {!user && (
                        <div className="flex gap-3 mt-4">
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="outline" style={{borderColor: '#e0e7ff', color: '#6366f1'}} className="rounded-xl hover:bg-indigo-50">Login</Button>
                            </Link>
                            <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="rounded-xl btn-gradient text-white shadow-lg">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/85 backdrop-blur-2xl border-b border-slate-100">
                <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center logo-gradient">
                            <Briefcase size={18} className="text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            Job<span style={{color: '#6366f1'}}>Portal</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to="/admin/companies" className="relative text-sm font-medium text-slate-600 transition-colors" onMouseEnter={(e) => e.target.style.color = '#6366f1'} onMouseLeave={(e) => e.target.style.color = ''}>Companies</Link>
                                <Link to="/admin/jobs" className="relative text-sm font-medium text-slate-600 transition-colors" onMouseEnter={(e) => e.target.style.color = '#6366f1'} onMouseLeave={(e) => e.target.style.color = ''}>Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="relative text-sm font-medium text-slate-600 transition-colors" onMouseEnter={(e) => e.target.style.color = '#6366f1'} onMouseLeave={(e) => e.target.style.color = ''}>Home</Link>
                                <Link to="/jobs" className="relative text-sm font-medium text-slate-600 transition-colors" onMouseEnter={(e) => e.target.style.color = '#6366f1'} onMouseLeave={(e) => e.target.style.color = ''}>Jobs</Link>
                                <Link to="/browse" className="relative text-sm font-medium text-slate-600 transition-colors" onMouseEnter={(e) => e.target.style.color = '#6366f1'} onMouseLeave={(e) => e.target.style.color = ''}>Browse</Link>
                            </>
                        )}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {!user ? (
                            <>
                                <Link to="/login">
                                    <Button variant="outline" style={{borderColor: '#e0e7ff', color: '#6366f1'}} className="rounded-xl hover:bg-indigo-50">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="rounded-xl btn-gradient text-white shadow-lg">Sign Up</Button>
                                </Link>
                            </>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-brand-100 hover:ring-brand-200 transition-all">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} className="object-cover" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 rounded-2xl border-slate-200 shadow-xl">
                                    <div>
                                        <div className='flex gap-3 items-start'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} className="object-cover" />
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <h4 className='font-semibold text-slate-900'>{user?.fullname}</h4>
                                                <p className='text-sm text-slate-500 truncate'>{user?.profile?.bio || 'No bio added'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1 mt-4'>
                                            {user && user.role === 'student' && (
                                                <Link to="/profile" className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700'>
                                                    <User2 size={16} />
                                                    <span className="text-sm font-medium">View Profile</span>
                                                </Link>
                                            )}
                                            <button onClick={logoutHandler} className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 w-full'>
                                                <LogOut size={16} />
                                                <span className="text-sm font-medium">Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar