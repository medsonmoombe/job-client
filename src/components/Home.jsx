import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import RecommendedJobs from './RecommendedJobs'
import CTASection from './CTASection'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import useGetSavedJobs from '@/hooks/useGetSavedJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  useGetSavedJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <RecommendedJobs />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Home