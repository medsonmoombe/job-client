import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Footer from './shared/Footer';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const Jobs = () => {
    const { searchedQuery } = useSelector(store => store.job);
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const queryParams = new URLSearchParams(searchedQuery);
                queryParams.append('page', currentPage);
                queryParams.append('limit', 12);
                
                const res = await axios.get(`${JOB_API_END_POINT}/get?${queryParams.toString()}`, {
                    withCredentials: true
                });
                
                if (res.data.success) {
                    setJobs(res.data.jobs);
                    setTotalPages(res.data.pagination.totalPages);
                    setTotalJobs(res.data.pagination.totalJobs);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [searchedQuery, currentPage]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className='flex-1 bg-slate-50 pt-20'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Your Perfect Job</h1>
                        <p className="text-slate-500">
                            {loading ? 'Loading...' : `Showing ${jobs.length} of ${totalJobs} job${totalJobs !== 1 ? 's' : ''}`}
                        </p>
                    </div>

                    <div className='flex gap-6'>
                        {/* Filter Sidebar */}
                        <div className='w-72 flex-shrink-0'>
                            <FilterCard />
                        </div>

                        {/* Jobs Grid */}
                        {
                            loading ? (
                                <div className='flex-1'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                        {[1, 2, 3, 4, 5, 6].map(i => (
                                            <div key={i} className="bg-slate-100 rounded-2xl h-80 animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            ) : jobs.length <= 0 ? (
                                <div className="flex-1 flex items-center justify-center py-20">
                                    <div className="text-center">
                                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                                            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
                                        <p className="text-slate-500">Try adjusting your filters or search query</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex-1 overflow-y-auto'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-8'>
                                        {
                                            jobs.map((job) => (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id}>
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                    <Pagination 
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs