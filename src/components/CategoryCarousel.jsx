import React from 'react';
import { Monitor, Server, Palette, BarChart3, Smartphone, Cloud } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    { name: "Frontend", icon: Monitor, jobs: "2.4K", gradient: "from-brand-50 to-brand-100", color: "text-brand-600" },
    { name: "Backend", icon: Server, jobs: "1.8K", gradient: "from-emerald-50 to-emerald-100", color: "text-emerald-600" },
    { name: "Design", icon: Palette, jobs: "950", gradient: "from-orange-50 to-orange-100", color: "text-orange-600" },
    { name: "Data Science", icon: BarChart3, jobs: "1.2K", gradient: "from-blue-50 to-blue-100", color: "text-blue-600" },
    { name: "Mobile", icon: Smartphone, jobs: "780", gradient: "from-purple-50 to-purple-100", color: "text-purple-600" },
    { name: "DevOps", icon: Cloud, jobs: "620", gradient: "from-red-50 to-red-100", color: "text-red-600" },
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" style={{backgroundColor: '#eef2ff', color: '#6366f1', border: '1px solid #e0e7ff'}}>Categories</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-4">Browse by Category</h2>
                    <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm">Explore job opportunities across different fields and industries</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <div
                                key={index}
                                onClick={() => searchJobHandler(cat.name)}
                                className="bg-white border border-slate-100 rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/50 hover:-translate-y-1 group"
                            >
                                <div className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-gradient-to-br ${cat.gradient} transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon size={24} className={cat.color} />
                                </div>
                                <div className="text-sm font-semibold text-slate-900">{cat.name}</div>
                                <div className="text-xs text-slate-400 mt-1">{cat.jobs} jobs</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default CategoryCarousel