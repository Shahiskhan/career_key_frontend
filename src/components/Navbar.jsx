import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Navbar = () => {
    const location = useLocation();
    const isVerifierPortal = location.pathname === '/verifier-portal';
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const isSimplifiedNav = isVerifierPortal || isAuthPage;

    return (
        <nav className="sticky top-4 z-50 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-md mb-8 border border-emerald-100">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <img src={logo} alt="CareerKey logo" className="w-11 h-11 rounded-xl object-cover shadow-md" />
                <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent leading-tight">CareerKey</h1>
                    <p className="text-[11px] text-gray-500 tracking-wide">Blockchain & AI • FYP</p>
                </div>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">

                <Link to="/" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors">
                    Home
                </Link>

                {!isSimplifiedNav && (
                    <>
                        <a href="#features" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors">
                            Features
                        </a>

                        <a href="#how-it-works" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors">
                            How It Works
                        </a>

                        <Link to="/verifier-portal" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors">
                            Verify Degree
                        </Link>
                    </>
                )}

                <Link
                    to="/login"
                    className="ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-bold shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 hover:scale-105 transform"
                >

                    PORTALS
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition">
                <svg
                    className="w-6 h-6 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </nav>
    );
};

export default Navbar;


