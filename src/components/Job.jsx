import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck, Building2, MapPin, Clock, DollarSign } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { addSavedJob, removeSavedJob } from '@/redux/savedJobSlice'
import { SAVED_JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const Job = ({job}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { savedJobs } = useSelector(store => store.savedJob);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const isSaved = savedJobs.some(savedJob => savedJob._id === job._id);
        setIsBookmarked(isSaved);
    }, [savedJobs, job._id]);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    const toggleBookmark = async (e) => {
        e.stopPropagation();
        try {
            if (isBookmarked) {
                const res = await axios.delete(`${SAVED_JOB_API_END_POINT}/${job._id}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(removeSavedJob(job._id));
                    toast.success('Job removed from bookmarks');
                }
            } else {
                const res = await axios.post(`${SAVED_JOB_API_END_POINT}/${job._id}`, {}, { withCredentials: true });
                if (res.data.success) {
                    dispatch(addSavedJob(job));
                    toast.success('Job saved to bookmarks!');
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    const getCompanyInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'C';
    }

    const getJobTypeBadge = (type) => {
        const badges = {
            'Full-time': 'bg-emerald-50 text-emerald-600 border-emerald-100',
            'Part-time': 'bg-blue-50 text-blue-600 border-blue-100',
            'Contract': 'bg-orange-50 text-orange-600 border-orange-100',
            'Internship': 'bg-purple-50 text-purple-600 border-purple-100',
        };
        return badges[type] || 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }

    const gradients = [
        'from-indigo-500 to-indigo-600',
        'from-emerald-500 to-emerald-600',
        'from-orange-500 to-orange-600',
        'from-red-500 to-red-600',
        'from-purple-500 to-purple-600',
        'from-blue-500 to-blue-600',
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    
    return (
        <div className='bg-white border border-slate-100 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full flex flex-col' onClick={() => navigate(`/description/${job?._id}`)}>
            {/* Header */}
            <div className='flex items-start justify-between mb-4'>
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${randomGradient}`}>
                        {getCompanyInitial(job?.company?.name)}
                    </div>
                    <div>
                        <h2 className='font-semibold text-slate-900'>{job?.company?.name}</h2>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                            <MapPin size={12} />
                            <span>{job?.location || 'Remote'}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={toggleBookmark}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                        isBookmarked
                            ? 'border-indigo-200 text-indigo-600'
                            : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600'
                    }`}
                    style={isBookmarked ? {backgroundColor: '#eef2ff'} : {}}
                >
                    {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                </button>
            </div>

            {/* Job Title */}
            <div className="mb-3">
                <h1 className='font-bold text-lg text-slate-900 mb-2'>{job?.title}</h1>
                <p className='text-sm text-slate-600 line-clamp-2'>{job?.description}</p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 mb-4'>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getJobTypeBadge(job?.jobType)}`}>
                    {job?.jobType}
                </span>
                {job?.position && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                        {job?.position} Position{job?.position > 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                    <DollarSign size={12} />
                    <span>{job?.salary ? `${job.salary}K` : 'Competitive'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}d ago`}</span>
                </div>
            </div>

            {/* Skills */}
            {job?.requirements && job.requirements.length > 0 && (
                <div className='flex flex-wrap gap-2 mb-4'>
                    {job.requirements.slice(0, 3).map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium" style={{backgroundColor: '#eef2ff', color: '#6366f1'}}>
                            {skill}
                        </span>
                    ))}
                    {job.requirements.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600">
                            +{job.requirements.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className='flex items-center gap-3 mt-auto pt-4 border-t border-slate-100'>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }} 
                    variant="outline" 
                    className="flex-1 rounded-xl border-indigo-200 hover:bg-indigo-50"
                    style={{color: '#6366f1'}}
                >
                    View Details
                </Button>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(e);
                    }}
                    className="flex-1 rounded-xl btn-gradient text-white"
                >
                    {isBookmarked ? 'Saved' : 'Save Job'}
                </Button>
            </div>
        </div>
    )
}

export default Job