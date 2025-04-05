"use client";

import { useEffect, useState, useRef } from "react";
import { Bell, X } from "lucide-react";

// Emojis by type
const getTypeEmoji = (type: string) => {
  switch (type) {
    case "assignment":
      return "📘";
    case "exam":
      return "📝";
    case "announcement":
      return "📢";
    default:
      return "🔔";
  }
};

// Notification Bell (for student/faculty navbars)
const NotificationBell = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("student_notifications");
    if (stored) setNotifications(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("student_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-4 z-50">
          <h3 className="font-bold text-lg mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No new notifications</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="border-b pb-2 flex justify-between items-start hover:bg-gray-50 p-2 rounded-md transition"
                >
                  <div>
                    <p className="font-semibold">
                      {getTypeEmoji(notif.type)} {notif.title}
                    </p>
                    <p className="text-sm text-gray-600">{notif.message}</p>
                  </div>
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="text-gray-400 hover:text-red-500"
                    title="Mark as read"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Page Component: Send + View Notification
const NotificationPage = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("assignment");

  const handleSend = () => {
    const existing = JSON.parse(localStorage.getItem("student_notifications") || "[]");
    const newNotification = {
      id: Date.now(),
      title,
      message,
      type,
    };
    const updated = [newNotification, ...existing];
    localStorage.setItem("student_notifications", JSON.stringify(updated));
    setTitle("");
    setMessage("");
    alert("✅ Notification sent to students!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-[#27187E]">UNILEARN - Notifications</h1>
        <NotificationBell />
      </nav>

      {/* Send Notification Form */}
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">📢 Send Notification to Students</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full px-3 py-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          className="w-full px-3 py-2 border rounded mb-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <select
          className="w-full px-3 py-2 border rounded mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="assignment">📘 Assignment</option>
          <option value="exam">📝 Exam</option>
          <option value="announcement">📢 Announcement</option>
        </select>

        <button
          onClick={handleSend}
          className="bg-[#27187E] hover:bg-[#FF8600] text-white px-4 py-2 rounded font-semibold transition"
        >
          Send Notification
        </button>
      </div>
    </div>
  );
};

export default NotificationPage;
