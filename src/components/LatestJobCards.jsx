import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, Clock, Bookmark, BookmarkCheck } from 'lucide-react'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { addSavedJob, removeSavedJob } from '@/redux/savedJobSlice'
import { SAVED_JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { savedJobs } = useSelector(store => store.savedJob);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const isSaved = savedJobs.some(savedJob => savedJob._id === job._id);
        setIsBookmarked(isSaved);
    }, [savedJobs, job._id]);

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

    const getTimeAgo = (createdAt) => {
        const now = new Date();
        const created = new Date(createdAt);
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
        return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
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
        'from-brand-500 to-brand-600',
        'from-emerald-500 to-emerald-600',
        'from-orange-500 to-orange-600',
        'from-red-500 to-red-600',
        'from-purple-500 to-purple-600',
        'from-blue-500 to-blue-600',
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="bg-white border border-slate-100 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/50 hover:-translate-y-1"
        >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 bg-gradient-to-br ${randomGradient}`}>
                    {getCompanyInitial(job?.company?.name)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-slate-900">{job?.title}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getJobTypeBadge(job?.jobType)}`}>
                            {job?.jobType}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                            <Building2 size={12} />
                            {job?.company?.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {job?.location || 'Remote'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {getTimeAgo(job?.createdAt)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3 sm:text-right">
                    <div>
                        <div className="text-base font-bold" style={{color: '#6366f1'}}>
                            {job?.salary ? `$${job.salary}K` : 'Competitive'}
                        </div>
                        <div className="text-xs text-slate-400">per year</div>
                    </div>
                    <button
                        onClick={toggleBookmark}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                            isBookmarked
                                ? 'border-indigo-200 text-indigo-600'
                                : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600'
                        }`}
                        style={isBookmarked ? {backgroundColor: '#eef2ff'} : {}}
                        aria-label="Bookmark job"
                    >
                        {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    </button>
                </div>
            </div>
            {job?.description && (
                <p className="text-sm text-slate-600 mt-3 line-clamp-2">{job.description}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                {job?.requirements?.slice(0, 4).map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" style={{backgroundColor: '#eef2ff', color: '#6366f1', border: '1px solid #e0e7ff'}}>
                        {skill}
                    </span>
                ))}
                {job?.requirements?.length > 4 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-100">
                        +{job.requirements.length - 4} more
                    </span>
                )}
            </div>
        </div>
    )
}

export default LatestJobCards