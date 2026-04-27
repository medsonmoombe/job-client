import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        // Clear error for this field when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: undefined });
        }
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                // Handle validation errors
                const validationErrors = {};
                error.response.data.errors.forEach(err => {
                    if (!validationErrors[err.field]) {
                        validationErrors[err.field] = err.message;
                    }
                });
                setErrors(validationErrors);
                toast.error('Please fix the validation errors');
            } else {
                toast.error(error.response?.data?.message || 'Failed to post job');
            }
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className='max-w-4xl mx-auto px-6 py-8 pt-24'>
                <div className="mb-8">
                    <h1 className='font-bold text-3xl text-slate-900 mb-2'>Post a New Job</h1>
                    <p className="text-slate-500">Fill in the details to create a job posting</p>
                </div>

                <form onSubmit={submitHandler} className='bg-white rounded-2xl border border-slate-200 p-8 shadow-sm'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Job Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                placeholder="Software Engineer"
                                className={`rounded-xl ${errors.title ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
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
                                required
                            />
                            {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location}</p>}
                        </div>
                        <div>
                            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                placeholder="e.g., 5000"
                                className={`rounded-xl ${errors.salary ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.salary && <p className="text-red-600 text-xs mt-1">{errors.salary}</p>}
                        </div>
                        <div>
                            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                placeholder="Full-time, Part-time, Contract"
                                className={`rounded-xl ${errors.jobType ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.jobType && <p className="text-red-600 text-xs mt-1">{errors.jobType}</p>}
                        </div>
                        <div>
                            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Experience Level (years)</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                placeholder="e.g., 2"
                                className={`rounded-xl ${errors.experience ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.experience && <p className="text-red-600 text-xs mt-1">{errors.experience}</p>}
                        </div>
                        <div>
                            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Number of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                placeholder="1"
                                className={`rounded-xl ${errors.position ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.position && <p className="text-red-600 text-xs mt-1">{errors.position}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Description</Label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Describe the job role and responsibilities... (minimum 50 characters)"
                                rows={4}
                                className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? 'border-red-500' : 'border-slate-200'}`}
                                required
                            />
                            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Requirements</Label>
                            <textarea
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="List the job requirements (comma separated)"
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.requirements ? 'border-red-500' : 'border-slate-200'}`}
                                required
                            />
                            {errors.requirements && <p className="text-red-600 text-xs mt-1">{errors.requirements}</p>}
                        </div>
                        {companies.length > 0 && (
                            <div className="md:col-span-2">
                                <Label className="text-sm font-semibold text-slate-700 mb-2 block">Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full rounded-xl">
                                        <SelectValue placeholder="Choose a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.companyId && <p className="text-red-600 text-xs mt-1">{errors.companyId}</p>}
                            </div>
                        )}
                    </div>

                    {companies.length === 0 && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className='text-sm text-red-600 font-medium text-center'>
                                Please register a company first before posting a job
                            </p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading || companies.length === 0}
                        className="w-full mt-6 h-11 rounded-xl btn-gradient text-white"
                    >
                        {loading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Posting Job...
                            </>
                        ) : (
                            'Post New Job'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default PostJob