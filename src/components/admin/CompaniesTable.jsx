import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption className="text-slate-500">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow className="border-slate-200">
                        <TableHead className="font-semibold text-slate-700">Logo</TableHead>
                        <TableHead className="font-semibold text-slate-700">Name</TableHead>
                        <TableHead className="font-semibold text-slate-700">Date</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.length > 0 ? (
                            filterCompany.map((company) => (
                                <TableRow key={company._id} className="border-slate-200 hover:bg-slate-50">
                                    <TableCell>
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={company.logo} alt={company.name} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900">{company.name}</TableCell>
                                    <TableCell className="text-slate-600">{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors">
                                                <MoreHorizontal size={18} className="text-slate-600" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 rounded-xl border-slate-200">
                                                <div 
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                    className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors'
                                                >
                                                    <Edit2 className='w-4 text-slate-600' />
                                                    <span className="text-sm font-medium text-slate-700">Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                                    No companies found
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable