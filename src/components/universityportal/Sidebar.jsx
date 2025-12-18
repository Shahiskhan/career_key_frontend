import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: "dashboard", icon: "📊", label: "Dashboard" },
        { id: "students", icon: "👥", label: "Students" },
        { id: "attestations", icon: "📝", label: "Attestations" },
        { id: "degree-issuance", icon: "🎓", label: "Degree Issuance" },
        { id: "verification", icon: "✅", label: "Verification" },
        { id: "reports", icon: "📄", label: "Reports" },
        { id: "settings", icon: "⚙️", label: "Settings" },
    ];

    return (
        <aside className="w-64 bg-gradient-to-b from-emerald-900 to-green-800 text-white h-screen sticky top-0 shadow-xl">
            <div className="p-6 border-b border-emerald-700">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-xl">
                        CK
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">CareerKey</h2>
                        <p className="text-xs text-emerald-300">University Portal</p>
                    </div>
                </div>
            </div>
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === item.id
                            ? "bg-white text-emerald-900 font-semibold shadow-lg"
                            : "text-emerald-100 hover:bg-white/10"
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
