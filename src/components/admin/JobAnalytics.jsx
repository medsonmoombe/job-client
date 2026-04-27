import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Eye, Users, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const JobAnalytics = () => {
    const { id } = useParams();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/${id}/analytics`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setAnalytics(res.data.analytics);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to fetch analytics');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchAnalytics();
    }, [id]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-slate-100 rounded-2xl h-32 animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (!analytics) return null;

    const stats = [
        {
            label: 'Total Views',
            value: analytics.totalViews,
            icon: Eye,
            color: 'indigo',
            bgColor: '#eef2ff',
            iconColor: '#6366f1'
        },
        {
            label: 'Total Applications',
            value: analytics.totalApplications,
            icon: Users,
            color: 'blue',
            bgColor: '#dbeafe',
            iconColor: '#3b82f6'
        },
        {
            label: 'Accepted',
            value: analytics.applicationsByStatus.accepted || 0,
            icon: CheckCircle,
            color: 'emerald',
            bgColor: '#dcfce7',
            iconColor: '#16a34a'
        },
        {
            label: 'Pending',
            value: analytics.applicationsByStatus.pending || 0,
            icon: Clock,
            color: 'orange',
            bgColor: '#fed7aa',
            iconColor: '#ea580c'
        }
    ];

    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} style={{color: '#6366f1'}} />
                <h2 className="text-lg font-bold text-slate-900">Job Analytics</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{backgroundColor: stat.bgColor}}
                                >
                                    <Icon size={24} style={{color: stat.iconColor}} />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                                <p className="text-sm text-slate-600">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {analytics.applicationsByStatus.rejected > 0 && (
                <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
                    <XCircle size={20} className="text-red-600" />
                    <div>
                        <p className="text-sm font-semibold text-red-900">
                            {analytics.applicationsByStatus.rejected} Rejected Applications
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobAnalytics;
