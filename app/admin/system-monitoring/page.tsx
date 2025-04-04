"use client";

import { useEffect, useState } from "react";
import BackgroundGradient from "@/components/BackgroundGradient";
import Link from "next/link";

const SystemMonitoring = () => {
  const [usageStats, setUsageStats] = useState({
    activeUsers: 234,
    dailyVisits: 1234,
    uptime: "99.9%",
  });

  const [supportRequests, setSupportRequests] = useState([
    { id: 1, user: "Ankit", issue: "Login not working", status: "Pending" },
    { id: 2, user: "Meera", issue: "Video not loading", status: "Resolved" },
  ]);

  const [settings, setSettings] = useState([
    { key: "Theme", value: "Light Mode" },
    { key: "Notifications", value: "Enabled" },
    { key: "Auto Backup", value: "Weekly" },
  ]);

  useEffect(() => {
    // Simulate API fetch
  }, []);

  const handleSettingChange = (index: number, newValue: string) => {
    const updated = [...settings];
    updated[index].value = newValue;
    setSettings(updated);
  };

  const getSettingOptions = (key: string) => {
    switch (key) {
      case "Theme":
        return ["Dark Mode", "Light Mode"];
      case "Notifications":
        return ["Enabled", "Disabled"];
      case "Auto Backup":
        return ["Daily","Weekly", "Monthly"];
      default:
        return ["Option 1", "Option 2"];
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={10} />
        <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">System Monitoring</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Platform Usage */}
            <div className="bg-[#F1F2F6] p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]">
              <h3 className="text-xl font-semibold text-[#27187E] mb-4">📈 Platform Usage</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Active Users: <b>{usageStats.activeUsers}</b></li>
                <li>Daily Visits: <b>{usageStats.dailyVisits}</b></li>
                <li>Uptime: <b>{usageStats.uptime}</b></li>
              </ul>
            </div>

            {/* Support Requests */}
            <div className="bg-[#F1F2F6] p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]">
              <h3 className="text-xl font-semibold text-[#27187E] mb-4">🛠️ Support Requests</h3>
              <ul className="space-y-4 text-sm text-gray-700">
                {supportRequests.map((req) => (
                  <li key={req.id} className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition">
                    <b>{req.user}</b>: {req.issue} <br />
                    <span className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${req.status === "Resolved" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                      {req.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Settings */}
            <div className="bg-[#F1F2F6] p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]">
              <h3 className="text-xl font-semibold text-[#27187E] mb-4">⚙️ Platform Settings</h3>
              <div className="space-y-4">
                {settings.map((setting, index) => (
                  <div key={index} className="bg-white p-4 rounded-md shadow hover:shadow-md transition-transform hover:scale-[1.02]">
                    <h4 className="font-bold text-[#27187E] mb-2">{setting.key}</h4>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                      value={setting.value}
                      onChange={(e) => handleSettingChange(index, e.target.value)}
                    >
                      {getSettingOptions(setting.key).map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="absolute flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
      </div>
      <Link href={"/admin"}>
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back to Home
        </button>
      </Link>
    </nav>
  );
};

export default SystemMonitoring;
