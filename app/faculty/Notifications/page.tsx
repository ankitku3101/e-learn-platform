"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import BackgroundGradient from "@/components/BackgroundGradient";

const Navbar = () => {
  return (
    <nav className="absolute flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800 bg-white z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
      </div>
      <Link href="/admin">
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back to Home
        </button>
      </Link>
    </nav>
  );
};

const AdminNotificationManager = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Assignment", message: "Submit by 5th April", type: "assignment" },
    { id: 2, title: "Exam Scheduled", message: "Maths Exam on 10th April", type: "exam" },
  ]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleEdit = (id) => {
    const selected = notifications.find((n) => n.id === id);
    if (selected) {
      setEditId(id);
      setFormData({ ...selected });
    }
  };

  const handleDelete = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
    toast.success("Notification deleted");
  };

  const handleUpdate = () => {
    const updated = notifications.map((n) =>
      n.id === editId ? { ...n, ...formData } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
    toast.success("Notification updated and pushed to student dashboard");
    setEditId(null);
    setFormData({});
    router.push("/student");
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={30} />
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">📢 Manage Notifications</h2>

          <div className="space-y-6">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="border p-4 rounded-lg shadow-md bg-white flex justify-between items-start"
              >
                <div>
                  <p className="font-bold text-lg">{notif.title}</p>
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-gray-500">Type: {notif.type}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(notif.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(notif.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editId && (
            <div className="mt-10 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Edit Notification</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full border p-3 rounded"
                  placeholder="Title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full border p-3 rounded"
                  placeholder="Message"
                  value={formData.message || ""}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <select
                  className="w-full border p-3 rounded"
                  value={formData.type || ""}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="assignment">Assignment</option>
                  <option value="exam">Exam</option>
                  <option value="announcement">Announcement</option>
                </select>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNotificationManager;
