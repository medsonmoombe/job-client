import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import LatestJobCards from './LatestJobCards';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useSelector } from 'react-redux';

const RecommendedJobs = () => {
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!user) return;
            
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/recommendations`, { 
                    withCredentials: true 
                });
                if (res.data.success) {
                    setRecommendedJobs(res.data.recommendations || []);
                }
            } catch (error) {
                console.log(error);
                setRecommendedJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [user]);

    if (!user || !recommendedJobs || recommendedJobs.length === 0) return null;

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20'>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor: '#eef2ff'}}>
                        <Sparkles size={20} style={{color: '#6366f1'}} />
                    </div>
                    <div>
                        <h2 className='text-3xl font-bold text-slate-900'>Recommended for You</h2>
                        <p className='text-slate-600 mt-1'>Jobs matching your skills and preferences</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-slate-100 rounded-2xl h-48 animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-4'>
                    {recommendedJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendedJobs;
