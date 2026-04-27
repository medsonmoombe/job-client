import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const ExperienceForm = ({ setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [experiences, setExperiences] = useState(user?.profile?.experience || []);

    const addExperience = () => {
        setExperiences([...experiences, {
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
            current: false
        }]);
    };

    const removeExperience = (index) => {
        setExperiences(experiences.filter((_, i) => i !== index));
    };

    const updateExperience = (index, field, value) => {
        const updated = [...experiences];
        updated[index][field] = value;
        setExperiences(updated);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/experience`, 
                { experience: experiences },
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success('Experience updated successfully!');
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update experience');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submitHandler} className="space-y-6">
            {experiences.map((exp, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Experience {index + 1}</h3>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Job Title</Label>
                            <Input
                                value={exp.title}
                                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                placeholder="Software Engineer"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label>Company</Label>
                            <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                placeholder="Tech Corp"
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Location</Label>
                        <Input
                            value={exp.location}
                            onChange={(e) => updateExperience(index, 'location', e.target.value)}
                            placeholder="Lusaka, Zambia"
                            className="mt-1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Start Date</Label>
                            <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label>End Date</Label>
                            <Input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                disabled={exp.current}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                            className="rounded"
                        />
                        <Label>I currently work here</Label>
                    </div>

                    <div>
                        <Label>Description</Label>
                        <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Describe your responsibilities..."
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                        />
                    </div>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={addExperience}
                className="w-full"
            >
                <Plus size={16} className="mr-2" />
                Add Experience
            </Button>

            <Button
                type="submit"
                disabled={loading}
                className="w-full btn-gradient text-white"
            >
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Experience'}
            </Button>
        </form>
    );
};

export default ExperienceForm;
