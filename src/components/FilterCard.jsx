import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter, X, DollarSign, MapPin, Briefcase, Clock, Wifi } from 'lucide-react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const filterData = [
    {
        filterType: "Location",
        icon: MapPin,
        array: ["Lusaka", "Ndola", "Kitwe", "Livingstone", "Chipata", "Remote"]
    },
    {
        filterType: "Job Type",
        icon: Briefcase,
        array: ["Full-time", "Part-time", "Contract", "Internship"]
    },
    {
        filterType: "Experience Level",
        icon: Clock,
        array: ["Entry Level", "Mid Level", "Senior Level", "Lead"]
    },
    {
        filterType: "Salary Range",
        icon: DollarSign,
        array: ["0-40k", "40-80k", "80-120k", "120k+"]
    },
    {
        filterType: "Work Mode",
        icon: Wifi,
        array: ["Remote", "On-site", "Hybrid"]
    }
]

const FilterCard = () => {
    const [filters, setFilters] = useState({
        location: '',
        jobType: '',
        experienceLevel: '',
        salaryRange: '',
        workMode: '',
        sortBy: 'latest'
    });
    const dispatch = useDispatch();
    
    const changeHandler = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    }

    const clearFilters = () => {
        setFilters({
            location: '',
            jobType: '',
            experienceLevel: '',
            salaryRange: '',
            workMode: '',
            sortBy: 'latest'
        });
        dispatch(setSearchedQuery(''));
    }

    const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'latest').length;

    useEffect(() => {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== 'latest') {
                queryParams.append(key, value);
            }
        });
        dispatch(setSearchedQuery(queryParams.toString()));
    }, [filters, dispatch]);

    return (
        <div className='bg-white border border-slate-100 rounded-2xl p-6 sticky top-24'>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Filter size={18} style={{color: '#6366f1'}} />
                    <h1 className='font-bold text-lg text-slate-900'>Filter Jobs</h1>
                    {activeFiltersCount > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full" style={{backgroundColor: '#6366f1'}}>
                            {activeFiltersCount}
                        </span>
                    )}
                </div>
                {activeFiltersCount > 0 && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="text-xs hover:bg-red-50 hover:text-red-600"
                        style={{color: '#ef4444'}}
                    >
                        Clear All
                    </Button>
                )}
            </div>
            
            <div className="h-px bg-slate-100 mb-4"></div>

            {/* Sort By */}
            <div className="mb-6">
                <h2 className='font-semibold text-sm text-slate-700 mb-3'>Sort By</h2>
                <Select value={filters.sortBy} onValueChange={(value) => changeHandler('sortBy', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                        <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                        <SelectItem value="views">Most Viewed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <div className="space-y-6">
                {
                    filterData.map((data, index) => {
                        const filterKey = data.filterType.toLowerCase().replace(' ', '');
                        const Icon = data.icon;
                        return (
                            <div key={index}>
                                <div className="flex items-center gap-2 mb-3">
                                    <Icon size={14} className="text-slate-400" />
                                    <h2 className='font-semibold text-sm text-slate-700'>{data.filterType}</h2>
                                </div>
                                <RadioGroup 
                                    value={filters[filterKey]} 
                                    onValueChange={(value) => changeHandler(filterKey, value)}
                                >
                                    <div className="space-y-2">
                                        {
                                            data.array.map((item, idx) => {
                                                const itemId = `id${index}-${idx}`
                                                const isSelected = filters[filterKey] === item;
                                                return (
                                                    <div 
                                                        key={itemId} 
                                                        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors cursor-pointer ${
                                                            isSelected ? 'bg-indigo-50' : 'hover:bg-slate-50'
                                                        }`}
                                                    >
                                                        <RadioGroupItem 
                                                            value={item} 
                                                            id={itemId}
                                                            className="border-slate-300"
                                                            style={isSelected ? {borderColor: '#6366f1', color: '#6366f1'} : {}}
                                                        />
                                                        <Label 
                                                            htmlFor={itemId} 
                                                            className={`text-sm cursor-pointer flex-1 ${
                                                                isSelected ? 'font-medium' : 'text-slate-600'
                                                            }`}
                                                            style={isSelected ? {color: '#6366f1'} : {}}
                                                        >
                                                            {item}
                                                        </Label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </RadioGroup>
                            </div>
                        )
                    })
                }
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">Active Filters ({activeFiltersCount}):</p>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([key, value]) => {
                            if (value && value !== 'latest') {
                                return (
                                    <div key={key} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium" style={{backgroundColor: '#eef2ff', color: '#6366f1'}}>
                                        {value}
                                        <button onClick={() => changeHandler(key, '')} className="hover:opacity-70">
                                            <X size={12} />
                                        </button>
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterCard