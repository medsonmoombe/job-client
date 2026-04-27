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

const BasicInfoForm = ({ setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
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
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success('Profile updated successfully!');
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submitHandler} className="space-y-6">
            <div>
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                    id="fullname"
                    name="fullname"
                    value={input.fullname}
                    onChange={changeHandler}
                    placeholder="John Doe"
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={input.email}
                    onChange={changeHandler}
                    placeholder="john@example.com"
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeHandler}
                    placeholder="+260 XXX XXX XXX"
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                    id="bio"
                    name="bio"
                    value={input.bio}
                    onChange={changeHandler}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                />
            </div>

            <div>
                <Label htmlFor="file">Profile Photo</Label>
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
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Changes'}
            </Button>
        </form>
    );
};

export default BasicInfoForm;
