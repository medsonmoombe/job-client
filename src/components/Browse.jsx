import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Browse = () => {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className='flex-1 bg-slate-50 pt-20'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#eef2ff'}}>
                                <Search size={20} style={{color: '#6366f1'}} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Browse All Jobs</h1>
                                <p className="text-slate-500 mt-1">
                                    {searchedQuery ? (
                                        <span>Search results for <span className="font-semibold" style={{color: '#6366f1'}}>"{ searchedQuery}"</span></span>
                                    ) : (
                                        <span>Explore all available opportunities</span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">Found</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold" style={{backgroundColor: '#eef2ff', color: '#6366f1'}}>
                                {allJobs.length} job{allJobs.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>

                    {/* Jobs Grid */}
                    {allJobs.length === 0 ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Search className="w-12 h-12 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs available</h3>
                                <p className="text-slate-500">Check back later for new opportunities</p>
                            </div>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {
                                allJobs.map((job, index) => (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Job job={job}/>
                                    </motion.div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Browse