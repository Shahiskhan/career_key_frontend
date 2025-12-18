

import React, { useState, useEffect } from "react";
import StudentNavbar from "../components/studentportal/StudentNavbar";
import StudentHero from "../components/studentportal/StudentHero";
import DashboardStats from "../components/studentportal/DashboardStats";
import MyDocuments from "../components/studentportal/MyDocuments";
import AttestationPage from "./AttestationPage";
import JobRecommendationsPage from "./JobRecommendationsPage";
import ProfilePage from "./ProfilePage";

const StudentPortal = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    // Load initial data from localStorage or use defaults
    const storedName = localStorage.getItem("studentName");
    const storedRollNo = localStorage.getItem("studentRollNo");
    const storedCnic = localStorage.getItem("studentCnic");
    const storedUniversity = localStorage.getItem("studentUniversity");
    const storedDegree = localStorage.getItem("studentDegree");

    const [stats, setStats] = useState({ documents: 0, verified: 0, pending: 0, jobs: 12 });
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        // Fetch requests from localStorage
        const allRequests = JSON.parse(localStorage.getItem("attestationRequests") || "[]");
        const currentEmail = localStorage.getItem("studentEmail");

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
            hash: req.txHash || null, // Assuming txHash might be added later
            details: req // Pass full details if needed
        }));
        setDocuments(docsList);
    }, [activeSection]); // Re-run when switching sections to refresh data

    const profile = {
        name: storedName || "Muhammad Shahis",
        rollNo: storedRollNo || "",
        cnic: storedCnic || "",
        university: storedUniversity || "",
        degree: storedDegree || ""
    };

    const handleNavigate = (section) => {
        setActiveSection(section);
    };

    // Show different pages based on active section
    if (activeSection === 'attestation') {
        return <AttestationPage onNavigate={handleNavigate} />;
    }

    if (activeSection === 'jobs') {
        return <JobRecommendationsPage onNavigate={handleNavigate} />;
    }

    if (activeSection === 'profile') {
        return <ProfilePage onNavigate={handleNavigate} />;
    }

    // Default dashboard view
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
