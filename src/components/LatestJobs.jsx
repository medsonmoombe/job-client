import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #d1fae5'}}>Featured</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Latest & Top Job Openings</h2>
                        <p className="text-slate-500 mt-2 text-sm">Handpicked opportunities from top companies</p>
                    </div>
                    <Link to="/jobs" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold transition-colors group" style={{color: '#6366f1'}} onMouseEnter={(e) => e.target.style.color = '#4338ca'} onMouseLeave={(e) => e.target.style.color = '#6366f1'}>
                        View all jobs
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="space-y-4">
                    {
                        allJobs.length <= 0 ? (
                            <div className="text-center py-12">
                                <p className="text-slate-400 text-sm">No jobs available at the moment</p>
                            </div>
                        ) : (
                            allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                        )
                    }
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold" style={{color: '#6366f1'}}>
                        View all jobs
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default LatestJobs