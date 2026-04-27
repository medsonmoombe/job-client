import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 pt-24 px-6'>
                <div className="mb-8">
                    <h1 className='font-bold text-3xl text-slate-900 mb-2'>Companies</h1>
                    <p className="text-slate-500">Manage your registered companies</p>
                </div>
                
                <div className='flex items-center justify-between mb-6'>
                    <Input
                        className="max-w-sm rounded-xl"
                        placeholder="Search by company name..."
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="rounded-xl btn-gradient text-white"
                    >
                        New Company
                    </Button>
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <CompaniesTable/>
                </div>
            </div>
        </div>
    )
}

export default Companies