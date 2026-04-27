import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption className="text-slate-500">A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow className="border-slate-200">
                        <TableHead className="font-semibold text-slate-700">Company Name</TableHead>
                        <TableHead className="font-semibold text-slate-700">Role</TableHead>
                        <TableHead className="font-semibold text-slate-700">Date</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.length > 0 ? (
                            filterJobs.map((job) => (
                                <TableRow key={job._id} className="border-slate-200 hover:bg-slate-50">
                                    <TableCell className="font-medium text-slate-900">{job?.company?.name}</TableCell>
                                    <TableCell className="text-slate-700">{job?.title}</TableCell>
                                    <TableCell className="text-slate-600">{job?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors">
                                                <MoreHorizontal size={18} className="text-slate-600" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-44 rounded-xl border-slate-200">
                                                <div 
                                                    onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                    className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors'
                                                >
                                                    <Edit2 className='w-4 text-slate-600' />
                                                    <span className="text-sm font-medium text-slate-700">Edit</span>
                                                </div>
                                                <div 
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                    className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors mt-1'
                                                >
                                                    <Eye className='w-4 text-slate-600' />
                                                    <span className="text-sm font-medium text-slate-700">Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                                    No jobs found
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable