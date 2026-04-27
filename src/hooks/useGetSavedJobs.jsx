import { setSavedJobs, setSavedJobsLoading } from '@/redux/savedJobSlice';
import { SAVED_JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetSavedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                dispatch(setSavedJobsLoading(true));
                const res = await axios.get(`${SAVED_JOB_API_END_POINT}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSavedJobs(res.data.savedJobs));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setSavedJobsLoading(false));
            }
        };
        fetchSavedJobs();
    }, [dispatch]);
};

export default useGetSavedJobs;
