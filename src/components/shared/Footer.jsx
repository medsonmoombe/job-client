import React from 'react';
import { Briefcase, Twitter, Linkedin, Github, Instagram, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center logo-gradient">
                <Briefcase size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Job<span style={{color: '#818cf8'}}>Portal</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Connecting talent with opportunity. Your next career move starts here.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 transition-all hover:-translate-y-0.5"
                style={{'--hover-bg': '#eef2ff', '--hover-border': '#c7d2fe', '--hover-color': '#6366f1'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eef2ff';
                  e.currentTarget.style.borderColor = '#c7d2fe';
                  e.currentTarget.style.color = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 transition-all hover:-translate-y-0.5"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eef2ff';
                  e.currentTarget.style.borderColor = '#c7d2fe';
                  e.currentTarget.style.color = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 transition-all hover:-translate-y-0.5"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eef2ff';
                  e.currentTarget.style.borderColor = '#c7d2fe';
                  e.currentTarget.style.color = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 transition-all hover:-translate-y-0.5"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eef2ff';
                  e.currentTarget.style.borderColor = '#c7d2fe';
                  e.currentTarget.style.color = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              For Job Seekers
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/browse" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Browse Jobs
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Career Advice
                </a>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Resume Builder
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Salary Guide
                </a>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              For Employers
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Browse Candidates
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Recruiting Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors" onMouseEnter={(e) => e.target.style.color = '#818cf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Made with</span>
              <Heart size={12} style={{color: '#6366f1', fill: '#6366f1'}} />
              <span>for job seekers everywhere</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;