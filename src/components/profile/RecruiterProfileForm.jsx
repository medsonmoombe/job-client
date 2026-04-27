import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Upload } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const RecruiterProfileForm = ({ setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        companyName: user?.profile?.companyName || '',
        companyWebsite: user?.profile?.companyWebsite || '',
        companySize: user?.profile?.companySize || '',
        industry: user?.profile?.industry || '',
        location: user?.profile?.location || '',
        description: user?.profile?.description || '',
        file: null
    });

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('companyName', input.companyName);
        formData.append('companyWebsite', input.companyWebsite);
        formData.append('companySize', input.companySize);
        formData.append('industry', input.industry);
        formData.append('location', input.location);
        formData.append('description', input.description);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/recruiter`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success('Company profile updated successfully!');
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update company profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submitHandler} className="space-y-6">
            <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                    id="companyName"
                    name="companyName"
                    value={input.companyName}
                    onChange={changeHandler}
                    placeholder="Tech Solutions Ltd"
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="url"
                    value={input.companyWebsite}
                    onChange={changeHandler}
                    placeholder="https://company.com"
                    className="mt-1"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="companySize">Company Size</Label>
                    <select
                        id="companySize"
                        name="companySize"
                        value={input.companySize}
                        onChange={changeHandler}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                    >
                        <option value="">Select size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                        id="industry"
                        name="industry"
                        value={input.industry}
                        onChange={changeHandler}
                        placeholder="Technology, Finance, etc."
                        className="mt-1"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    name="location"
                    value={input.location}
                    onChange={changeHandler}
                    placeholder="Lusaka, Zambia"
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="description">Company Description</Label>
                <textarea
                    id="description"
                    name="description"
                    value={input.description}
                    onChange={changeHandler}
                    placeholder="Tell us about your company..."
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                />
            </div>

            <div>
                <Label htmlFor="file">Company Logo</Label>
                <div className="mt-1 flex items-center gap-3">
                    <Input
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={fileChangeHandler}
                        className="hidden"
                    />
                    <label
                        htmlFor="file"
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                    >
                        <Upload size={16} />
                        <span className="text-sm">{input.file ? input.file.name : 'Choose file'}</span>
                    </label>
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full btn-gradient text-white"
            >
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Company Profile'}
            </Button>
        </form>
    );
};

export default RecruiterProfileForm;
