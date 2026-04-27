import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, MapPin } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const quickSearch = (term) => {
        setQuery(term);
        dispatch(setSearchedQuery(term));
        navigate("/browse");
    }

    return (
        <section className="hero-gradient min-h-screen flex items-center pt-16 relative">
            {/* Dot pattern overlay */}
            <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none"></div>

            {/* Floating decorative shapes */}
            <div className="absolute top-32 right-20 hidden lg:block animate-float">
                <div className="w-16 h-16 rounded-2xl rotate-12 bg-gradient-to-br from-brand-200 to-brand-100 opacity-60"></div>
            </div>
            <div className="absolute bottom-40 left-16 hidden lg:block" style={{animation: 'float 8s ease-in-out infinite 1s'}}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-purple-100 opacity-50"></div>
            </div>
            <div className="absolute top-60 left-1/3 hidden lg:block" style={{animation: 'float 7s ease-in-out infinite 2s'}}>
                <div className="w-8 h-8 rounded-lg rotate-45 bg-gradient-to-br from-blue-200 to-blue-100 opacity-40"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-20 w-full relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{backgroundColor: '#eef2ff', border: '1px solid #e0e7ff'}}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{backgroundColor: '#818cf8'}}></span>
                            <span className="relative inline-flex rounded-full h-2 w-2" style={{backgroundColor: '#6366f1'}}></span>
                        </span>
                        <span className="text-xs font-semibold" style={{color: '#6366f1'}}>2,500+ new jobs posted this week</span>
                    </div>

                    {/* Heading */}
                    <h1 className="animate-fade-up-d1 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-slate-900">
                        Search, Apply &<br />
                        Get Your <span className="gradient-text">Dream Jobs</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="animate-fade-up-d2 text-base sm:text-lg text-slate-500 leading-relaxed mb-10 max-w-lg mx-auto">
                        Discover opportunities that match your skills and ambitions. Your next career move starts here.
                    </p>

                    {/* Search Box */}
                    <div className="animate-fade-up-d3 bg-white border-2 border-slate-100 rounded-2xl p-2 max-w-2xl mx-auto shadow-xl shadow-slate-200/50 hover:border-brand-200 hover:shadow-brand-100/50 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50/80">
                                <Search size={18} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Job title or keyword..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                                    className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400"
                                />
                            </div>
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50/80">
                                <MapPin size={18} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Location..."
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                                    className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400"
                                />
                            </div>
                            <Button
                                onClick={searchJobHandler}
                                className="px-8 py-3 rounded-xl btn-gradient text-white shadow-lg whitespace-nowrap flex items-center justify-center gap-2"
                            >
                                <Search size={16} />
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* Popular searches */}
                    <div className="animate-fade-up-d4 flex flex-wrap items-center justify-center gap-2 mt-6">
                        <span className="text-xs text-slate-400 font-medium">Popular:</span>
                        <button onClick={() => quickSearch('Frontend Developer')} className="px-3 py-1 rounded-full text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer" style={{backgroundColor: '#eef2ff', color: '#6366f1', border: '1px solid #e0e7ff'}}>Frontend Developer</button>
                        <button onClick={() => quickSearch('Backend Developer')} className="px-3 py-1 rounded-full text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer" style={{backgroundColor: '#eef2ff', color: '#6366f1', border: '1px solid #e0e7ff'}}>Backend Developer</button>
                        <button onClick={() => quickSearch('UI/UX Designer')} className="px-3 py-1 rounded-full text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer" style={{backgroundColor: '#eef2ff', color: '#6366f1', border: '1px solid #e0e7ff'}}>UI/UX Designer</button>
                        <button onClick={() => quickSearch('Data Scientist')} className="px-3 py-1 rounded-full text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer" style={{backgroundColor: '#eef2ff', color: '#6366f1', border: '1px solid #e0e7ff'}}>Data Scientist</button>
                    </div>
                </div>

                {/* Stats */}
                <div className="animate-fade-up-d5 grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                        <div className="text-2xl font-bold" style={{color: '#6366f1'}}>12K+</div>
                        <div className="text-xs text-slate-400 mt-1 font-medium">Active Jobs</div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                        <div className="text-2xl font-bold" style={{color: '#6366f1'}}>5K+</div>
                        <div className="text-xs text-slate-400 mt-1 font-medium">Companies</div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                        <div className="text-2xl font-bold" style={{color: '#6366f1'}}>80K+</div>
                        <div className="text-xs text-slate-400 mt-1 font-medium">Candidates</div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                        <div className="text-2xl font-bold" style={{color: '#6366f1'}}>95%</div>
                        <div className="text-xs text-slate-400 mt-1 font-medium">Satisfaction</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection