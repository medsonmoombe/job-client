import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: undefined });
        }
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrors({});
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                const validationErrors = {};
                error.response.data.errors.forEach(err => {
                    if (!validationErrors[err.field]) {
                        validationErrors[err.field] = err.message;
                    }
                });
                setErrors(validationErrors);
                toast.error('Please fix the validation errors');
            } else {
                toast.error(error.response?.data?.message || 'Failed to update company');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className='max-w-3xl mx-auto my-10 pt-24 px-6'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 mb-8'>
                        <Button 
                            type="button"
                            onClick={() => navigate("/admin/companies")} 
                            variant="outline" 
                            className="flex items-center gap-2 rounded-xl"
                        >
                            <ArrowLeft size={18} />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-2xl text-slate-900'>Company Setup</h1>
                    </div>
                    
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    placeholder="Tech Corp"
                                    className={`rounded-xl ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Website</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    placeholder="https://company.com"
                                    className={`rounded-xl ${errors.website ? 'border-red-500' : ''}`}
                                />
                                {errors.website && <p className="text-red-600 text-xs mt-1">{errors.website}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="Lusaka, Zambia"
                                    className={`rounded-xl ${errors.location ? 'border-red-500' : ''}`}
                                />
                                {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Company Logo</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Description</Label>
                                <textarea
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Tell us about your company..."
                                    rows={4}
                                    className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? 'border-red-500' : 'border-slate-200'}`}
                                />
                                {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                            </div>
                        </div>
                        
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 h-11 rounded-xl btn-gradient text-white"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Updating...
                                </>
                            ) : (
                                'Update Company'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup