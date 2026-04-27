import React from 'react'
import { Button } from './ui/button'
import { Rocket, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const CTASection = () => {
    const { user } = useSelector(store => store.auth);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden bg-brand-gradient">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white opacity-10 blur-2xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                            Ready to Start Your Career?
                        </h2>
                        <p className="text-indigo-200 max-w-md mx-auto mb-8 text-sm md:text-base">
                            Join thousands of professionals who found their dream jobs through JobPortal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            {!user ? (
                                <>
                                    <Link to="/signup">
                                        <Button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 shadow-lg font-semibold" style={{color: '#6366f1'}}>
                                            <Rocket size={16} />
                                            Get Started Free
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => toast.info('Employer portal coming soon!')}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-transparent hover:bg-white/10 transition-all"
                                        style={{border: '2px solid rgba(255,255,255,0.25)'}}
                                    >
                                        <Building2 size={16} />
                                        Post a Job
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/browse">
                                        <Button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 shadow-lg font-semibold" style={{color: '#6366f1'}}>
                                            <Rocket size={16} />
                                            Browse Jobs
                                        </Button>
                                    </Link>
                                    <Link to="/profile">
                                        <Button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-transparent hover:bg-white/10 transition-all" style={{border: '2px solid rgba(255,255,255,0.25)'}}>
                                            View Profile
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection
