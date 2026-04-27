import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { User, Briefcase, GraduationCap, Award, Globe, Link as LinkIcon, Building2 } from 'lucide-react';
import BasicInfoForm from './profile/BasicInfoForm';
import ExperienceForm from './profile/ExperienceForm';
import EducationForm from './profile/EducationForm';
import SkillsForm from './profile/SkillsForm';
import RecruiterProfileForm from './profile/RecruiterProfileForm';
import { useSelector } from 'react-redux';

const ComprehensiveProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const [activeTab, setActiveTab] = useState('basic');

    const isRecruiter = user?.role === 'recruiter';

    const tabs = isRecruiter ? [
        { id: 'basic', label: 'Basic Info', icon: User },
        { id: 'company', label: 'Company', icon: Building2 }
    ] : [
        { id: 'basic', label: 'Basic Info', icon: User },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills & More', icon: Award }
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Complete Your Profile</DialogTitle>
                    <p className="text-sm text-slate-500">Build a comprehensive profile to stand out</p>
                </DialogHeader>

                <div className="flex gap-6 flex-1 overflow-hidden">
                    {/* Sidebar Tabs */}
                    <div className="w-48 flex-shrink-0 border-r border-slate-100 pr-4">
                        <div className="space-y-2">
                            {tabs.map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                            activeTab === tab.id
                                                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                                : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        <Icon size={18} />
                                        <span className="text-sm">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto pr-2">
                        {activeTab === 'basic' && <BasicInfoForm setOpen={setOpen} />}
                        {activeTab === 'experience' && <ExperienceForm setOpen={setOpen} />}
                        {activeTab === 'education' && <EducationForm setOpen={setOpen} />}
                        {activeTab === 'skills' && <SkillsForm setOpen={setOpen} />}
                        {activeTab === 'company' && <RecruiterProfileForm setOpen={setOpen} />}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ComprehensiveProfileDialog;
