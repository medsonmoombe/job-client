import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Building2, MapPin, Clock, DollarSign, Users, Calendar, Briefcase, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const navigate = useNavigate();

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

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

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className='flex-1 bg-slate-50 pt-20'>
                <div className='max-w-5xl mx-auto px-6 py-8'>
                    {/* Back Button */}
                    <button 
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors mb-6"
                    >
                        <ArrowLeft size={16} />
                        Back to jobs
                    </button>

                    {/* Main Card */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-8 mb-6">
                        {/* Header */}
                        <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8'>
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex-shrink-0">
                                    {getCompanyInitial(singleJob?.company?.name)}
                                </div>
                                <div>
                                    <h1 className='font-bold text-2xl text-slate-900 mb-2'>{singleJob?.title}</h1>
                                    <div className="flex items-center gap-2 text-slate-600 mb-3">
                                        <Building2 size={16} />
                                        <span className="font-medium">{singleJob?.company?.name}</span>
                                    </div>
                                    <div className='flex flex-wrap items-center gap-2'>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getJobTypeBadge(singleJob?.jobType)}`}>
                                            {singleJob?.jobType}
                                        </span>
                                        {singleJob?.position && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                                                {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
                                            </span>
                                        )}
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" style={{backgroundColor: '#eef2ff', color: '#6366f1', border: '1px solid #e0e7ff'}}>
                                            <DollarSign size={12} className="mr-1" />
                                            {singleJob?.salary}K/year
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-xl px-8 whitespace-nowrap ${
                                    isApplied 
                                        ? 'bg-slate-100 text-slate-500 cursor-not-allowed hover:bg-slate-100' 
                                        : 'btn-gradient text-white'
                                }`}
                            >
                                {isApplied ? (
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 size={16} />
                                        Already Applied
                                    </span>
                                ) : 'Apply Now'}
                            </Button>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#eef2ff'}}>
                                    <MapPin size={18} style={{color: '#6366f1'}} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Location</p>
                                    <p className="text-sm font-semibold text-slate-900">{singleJob?.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-50">
                                    <Briefcase size={18} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Experience</p>
                                    <p className="text-sm font-semibold text-slate-900">{singleJob?.experience} yrs</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-50">
                                    <Users size={18} className="text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Applicants</p>
                                    <p className="text-sm font-semibold text-slate-900">{singleJob?.applications?.length || 0}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50">
                                    <Calendar size={18} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Posted</p>
                                    <p className="text-sm font-semibold text-slate-900">{singleJob?.createdAt?.split("T")[0]}</p>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div>
                            <h2 className='text-lg font-bold text-slate-900 mb-4 flex items-center gap-2'>
                                <div className="w-1 h-6 rounded-full" style={{backgroundColor: '#6366f1'}}></div>
                                Job Description
                            </h2>
                            <div className='space-y-4 text-slate-600 leading-relaxed'>
                                <p>{singleJob?.description}</p>
                            </div>
                        </div>

                        {/* Requirements */}
                        {singleJob?.requirements && singleJob.requirements.length > 0 && (
                            <div className="mt-8">
                                <h2 className='text-lg font-bold text-slate-900 mb-4 flex items-center gap-2'>
                                    <div className="w-1 h-6 rounded-full" style={{backgroundColor: '#6366f1'}}></div>
                                    Required Skills
                                </h2>
                                <div className='flex flex-wrap gap-2'>
                                    {singleJob.requirements.map((skill, index) => (
                                        <span key={index} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium" style={{backgroundColor: '#eef2ff', color: '#6366f1', border: '1px solid #e0e7ff'}}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Apply CTA */}
                    {!isApplied && (
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-center text-white">
                            <h3 className="text-2xl font-bold mb-2">Ready to Apply?</h3>
                            <p className="text-indigo-100 mb-6">Join {singleJob?.applications?.length || 0} other applicants for this position</p>
                            <Button
                                onClick={applyJobHandler}
                                className="bg-white text-indigo-600 hover:bg-slate-50 rounded-xl px-8 py-3 font-semibold"
                            >
                                Apply Now
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobDescription