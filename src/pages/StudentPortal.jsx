

import React, { useState, useEffect } from "react";
import StudentNavbar from "../components/studentportal/StudentNavbar";
import StudentHero from "../components/studentportal/StudentHero";
import DashboardStats from "../components/studentportal/DashboardStats";
import MyDocuments from "../components/studentportal/MyDocuments";
import AttestationPage from "./AttestationPage";
import JobRecommendationsPage from "./JobRecommendationsPage";
import ProfilePage from "./ProfilePage";
import { useAuth } from "../contexts/AuthContext";

const StudentPortal = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const { user } = useAuth();

    const [stats, setStats] = useState({ documents: 0, verified: 0, pending: 0, jobs: 12 });
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        // Fetch requests from localStorage - keeping this as is for now if it depends on local data
        const allRequests = JSON.parse(localStorage.getItem("attestationRequests") || "[]");
        const currentEmail = user?.email;

        // Filter requests for the current student only
        const requests = allRequests.filter(req => req.studentEmail === currentEmail);

        // Calculate stats
        const totalDocs = requests.length;
        const verifiedDocs = requests.filter(req => req.status === "Verified").length;
        const pendingDocs = requests.filter(req => req.status !== "Verified" && req.status !== "Rejected" && req.status !== "Rejected by HEC").length;

        setStats(prev => ({ ...prev, documents: totalDocs, verified: verifiedDocs, pending: pendingDocs }));

        // Map requests to document format
        const docsList = requests.map(req => ({
            name: req.degree || "Degree Certificate",
            status: req.status === "Verified" ? "Verified" :
                req.status.includes("Rejected") ? "Rejected" : "Pending",
            date: req.date,
            hash: req.txHash || null,
            details: req
        }));
        setDocuments(docsList);
    }, [activeSection, user]);

    const profile = {
        name: user?.name || "Student",
        email: user?.email || "",
        // Other fields like university, degree can be fetched from user.roles if roles are more complex 
        // or from a separate student object if backend provides it in user
    };

    const handleNavigate = (section) => {
        setActiveSection(section);
    };

    if (activeSection === 'attestation') {
        return <AttestationPage onNavigate={handleNavigate} />;
    }

    if (activeSection === 'jobs') {
        return <JobRecommendationsPage onNavigate={handleNavigate} />;
    }

    if (activeSection === 'profile') {
        return <ProfilePage onNavigate={handleNavigate} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-50">
            <div className="sticky top-0 z-50 pb-2 bg-gradient-to-br from-white/90 via-emerald-50/90 to-green-50/90 backdrop-blur-sm transition-all shadow-sm">
                <div className="container mx-auto px-4 pt-4">
                    <StudentNavbar activeSection={activeSection} onNavigate={handleNavigate} />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 mt-4">
                <div id="dashboard">
                    <StudentHero studentName={profile.name} />
                    <DashboardStats stats={stats} />
                </div>

                <MyDocuments documents={documents} />
            </div>

            <footer className="py-6 text-center text-gray-500 text-sm border-t mt-16">
                © 2025 CareerKey – All Rights Reserved.
            </footer>
        </div>
    );
};

export default StudentPortal;

