import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Plus, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const SkillsForm = ({ setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState(user?.profile?.skills || []);
    const [skillInput, setSkillInput] = useState('');
    const [input, setInput] = useState({
        resume: user?.profile?.resume || '',
        resumeName: user?.profile?.resumeName || '',
        github: user?.profile?.socialLinks?.github || '',
        linkedin: user?.profile?.socialLinks?.linkedin || '',
        portfolio: user?.profile?.socialLinks?.portfolio || ''
    });

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/skills`,
                {
                    skills,
                    resume: input.resume,
                    resumeName: input.resumeName,
                    socialLinks: {
                        github: input.github,
                        linkedin: input.linkedin,
                        portfolio: input.portfolio
                    }
                },
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success('Skills updated successfully!');
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update skills');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submitHandler} className="space-y-6">
            <div>
                <Label>Skills</Label>
                <div className="mt-1 flex gap-2">
                    <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        placeholder="Add a skill (e.g., React, Python)"
                    />
                    <Button type="button" onClick={addSkill} variant="outline">
                        <Plus size={16} />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="hover:text-indigo-900"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <Label htmlFor="resume">Resume URL</Label>
                <Input
                    id="resume"
                    name="resume"
                    value={input.resume}
                    onChange={changeHandler}
                    placeholder="https://drive.google.com/..."
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="resumeName">Resume Name</Label>
                <Input
                    id="resumeName"
                    name="resumeName"
                    value={input.resumeName}
                    onChange={changeHandler}
                    placeholder="John_Doe_Resume.pdf"
                    className="mt-1"
                />
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Social Links</h3>
                
                <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                        id="github"
                        name="github"
                        value={input.github}
                        onChange={changeHandler}
                        placeholder="https://github.com/username"
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        id="linkedin"
                        name="linkedin"
                        value={input.linkedin}
                        onChange={changeHandler}
                        placeholder="https://linkedin.com/in/username"
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="portfolio">Portfolio</Label>
                    <Input
                        id="portfolio"
                        name="portfolio"
                        value={input.portfolio}
                        onChange={changeHandler}
                        placeholder="https://yourportfolio.com"
                        className="mt-1"
                    />
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full btn-gradient text-white"
            >
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Skills'}
            </Button>
        </form>
    );
};

export default SkillsForm;
