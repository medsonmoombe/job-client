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

const EducationForm = ({ setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [education, setEducation] = useState(user?.profile?.education || []);

    const addEducation = () => {
        setEducation([...education, {
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            grade: ''
        }]);
    };

    const removeEducation = (index) => {
        setEducation(education.filter((_, i) => i !== index));
    };

    const updateEducation = (index, field, value) => {
        const updated = [...education];
        updated[index][field] = value;
        setEducation(updated);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/education`,
                { education },
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success('Education updated successfully!');
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update education');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submitHandler} className="space-y-6">
            {education.map((edu, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Education {index + 1}</h3>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>

                    <div>
                        <Label>Institution</Label>
                        <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            placeholder="University of Zambia"
                            className="mt-1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Degree</Label>
                            <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                placeholder="Bachelor's"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label>Field of Study</Label>
                            <Input
                                value={edu.fieldOfStudy}
                                onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                                placeholder="Computer Science"
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Start Date</Label>
                            <Input
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label>End Date</Label>
                            <Input
                                type="month"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Grade/GPA (Optional)</Label>
                        <Input
                            value={edu.grade}
                            onChange={(e) => updateEducation(index, 'grade', e.target.value)}
                            placeholder="3.8 GPA"
                            className="mt-1"
                        />
                    </div>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={addEducation}
                className="w-full"
            >
                <Plus size={16} className="mr-2" />
                Add Education
            </Button>

            <Button
                type="submit"
                disabled={loading}
                className="w-full btn-gradient text-white"
            >
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Education'}
            </Button>
        </form>
    );
};

export default EducationForm;
