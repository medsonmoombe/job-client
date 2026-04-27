import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Briefcase, Award, Bookmark } from 'lucide-react'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'
import LatestJobCards from './LatestJobCards'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('applied');
    const { user } = useSelector(store => store.auth);
    const { savedJobs } = useSelector(store => store.savedJob);
    const isResume = user?.profile?.resume;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className='flex-1 bg-slate-50 pt-20'>
                <div className='max-w-5xl mx-auto px-6 py-8'>
                    {/* Profile Header Card */}
                    <div className='bg-white border border-slate-100 rounded-2xl p-8 mb-6'>
                        <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6'>
                            <div className='flex items-start gap-6'>
                                <Avatar className="h-24 w-24 ring-4 ring-indigo-50">
                                    <AvatarImage 
                                        src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} 
                                        alt="profile" 
                                        className="object-cover"
                                    />
                                </Avatar>
                                <div>
                                    <h1 className='font-bold text-2xl text-slate-900 mb-1'>{user?.fullname}</h1>
                                    <p className='text-slate-600 mb-4'>{user?.profile?.bio || 'No bio added yet'}</p>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-2 text-sm text-slate-600'>
                                            <Mail size={16} className="text-slate-400" />
                                            <span>{user?.email}</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-slate-600'>
                                            <Contact size={16} className="text-slate-400" />
                                            <span>{user?.phoneNumber}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button 
                                onClick={() => setOpen(true)} 
                                variant="outline" 
                                className="rounded-xl border-indigo-200 hover:bg-indigo-50"
                                style={{color: '#6366f1'}}
                            >
                                <Pen size={16} className="mr-2" />
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    {/* Skills Card */}
                    <div className='bg-white border border-slate-100 rounded-2xl p-8 mb-6'>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#eef2ff'}}>
                                <Award size={18} style={{color: '#6366f1'}} />
                            </div>
                            <h2 className='text-lg font-bold text-slate-900'>Skills</h2>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {
                                user?.profile?.skills?.length > 0 ? (
                                    user.profile.skills.map((item, index) => (
                                        <span 
                                            key={index} 
                                            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                                            style={{backgroundColor: '#eef2ff', color: '#6366f1', border: '1px solid #e0e7ff'}}
                                        >
                                            {item}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-slate-500 text-sm">No skills added yet. Click "Edit Profile" to add your skills.</p>
                                )
                            }
                        </div>
                    </div>

                    {/* Resume Card */}
                    <div className='bg-white border border-slate-100 rounded-2xl p-8 mb-6'>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-50">
                                <FileText size={18} className="text-emerald-600" />
                            </div>
                            <h2 className='text-lg font-bold text-slate-900'>Resume</h2>
                        </div>
                        {
                            isResume ? (
                                <a 
                                    target='_blank' 
                                    rel="noreferrer"
                                    href={user?.profile?.resume} 
                                    className='inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700 border border-slate-200'
                                >
                                    <FileText size={16} />
                                    {user?.profile?.resumeOriginalName || 'View Resume'}
                                </a>
                            ) : (
                                <p className="text-slate-500 text-sm">No resume uploaded yet. Click "Edit Profile" to upload your resume.</p>
                            )
                        }
                    </div>

                    {/* Applied Jobs & Saved Jobs Card */}
                    <div className='bg-white border border-slate-100 rounded-2xl p-8'>
                        {/* Tabs */}
                        <div className="flex items-center gap-4 mb-6 border-b border-slate-100">
                            <button
                                onClick={() => setActiveTab('applied')}
                                className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors ${
                                    activeTab === 'applied'
                                        ? 'border-indigo-600 text-indigo-600 font-semibold'
                                        : 'border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                <Briefcase size={18} />
                                Applied Jobs
                            </button>
                            <button
                                onClick={() => setActiveTab('saved')}
                                className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors ${
                                    activeTab === 'saved'
                                        ? 'border-indigo-600 text-indigo-600 font-semibold'
                                        : 'border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                <Bookmark size={18} />
                                Saved Jobs ({savedJobs.length})
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'applied' ? (
                            <AppliedJobTable />
                        ) : (
                            <div>
                                {savedJobs.length > 0 ? (
                                    <div className="space-y-4">
                                        {savedJobs.map((job) => (
                                            <LatestJobCards key={job._id} job={job} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#f1f5f9'}}>
                                            <Bookmark size={32} className="text-slate-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Saved Jobs</h3>
                                        <p className="text-slate-500 text-sm">Start saving jobs to view them here</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile