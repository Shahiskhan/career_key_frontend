import React, { useState, useEffect } from "react";

const StatCard = ({ icon, title, value, color, bgColor }) => (
    <div className={`${bgColor} p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition`}>
        <div className="flex items-center justify-between mb-3">
            <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-2xl shadow`}>
                {icon}
            </div>
            <span className="text-3xl font-bold text-gray-800">{value}</span>
        </div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
    </div>
);

const Dashboard = () => {
    const [statsData, setStatsData] = useState({
        totalStudents: 0,
        pending: 0,
        forwarded: 0,
        rejected: 0
    });
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const students = JSON.parse(localStorage.getItem("universityStudents") || "[]");
        const requests = JSON.parse(localStorage.getItem("attestationRequests") || "[]");

        const pending = requests.filter(r => r.status === "Pending University").length;
        const forwarded = requests.filter(r => r.status === "Pending HEC" || r.status === "Verified").length;
        const rejected = requests.filter(r => r.status.includes("Rejected")).length;

        setStatsData({
            totalStudents: students.length,
            pending,
            forwarded,
            rejected
        });

        // Generate recent activities from requests (sorted newest first)
        const recent = [...requests]
            .sort((a, b) => b.id - a.id)
            .slice(0, 5)
            .map(req => ({
                text: `Request from ${req.name} (${req.degree}): ${req.status}`,
                time: req.date
            }));
        setActivities(recent);

    }, []);

    const stats = [
        { icon: "👥", title: "Total Students", value: statsData.totalStudents, color: "bg-blue-100 text-blue-600", bgColor: "bg-blue-50" },
        { icon: "⏳", title: "Pending Requests", value: statsData.pending, color: "bg-yellow-100 text-yellow-600", bgColor: "bg-yellow-50" },
        { icon: "🚀", title: "Forwarded to HEC", value: statsData.forwarded, color: "bg-indigo-100 text-indigo-600", bgColor: "bg-indigo-50" },
        { icon: "❌", title: "Rejected", value: statsData.rejected, color: "bg-red-100 text-red-600", bgColor: "bg-red-50" },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Recent Activities</h3>
                <div className="space-y-3">
                    {activities.length === 0 ? (
                        <p className="text-gray-500 text-sm">No recent activity.</p>
                    ) : (
                        activities.map((activity, index) => (
                            <ActivityItem key={index} text={activity.text} time={activity.time} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const ActivityItem = ({ text, time }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
        <p className="text-sm text-gray-700">{text}</p>
        <span className="text-xs text-gray-500">{time}</span>
    </div>
);

export default Dashboard;
