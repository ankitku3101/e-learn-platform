"use client";

import { useState } from "react";
import BackgroundGradient from "@/components/BackgroundGradient";
import Link from "next/link";
import { FiSend, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

type Announcement = {
  message: string;
  target: "All" | "Students" | "Faculty";
  timestamp: string;
};

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<"All" | "Students" | "Faculty">("All");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState("");
  const [editedTarget, setEditedTarget] = useState<"All" | "Students" | "Faculty">("All");

  const handleBroadcast = () => {
    if (message.trim() === "") return;

    const newAnnouncement: Announcement = {
      message,
      target,
      timestamp: new Date().toLocaleString(),
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setMessage("");
    setTarget("All");
  };

  const handleDelete = (index: number) => {
    const updated = [...announcements];
    updated.splice(index, 1);
    setAnnouncements(updated);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedMessage(announcements[index].message);
    setEditedTarget(announcements[index].target);
  };

  const handleSaveEdit = () => {
    if (editIndex === null) return;

    const updated = [...announcements];
    updated[editIndex] = {
      ...updated[editIndex],
      message: editedMessage,
      target: editedTarget,
      timestamp: new Date().toLocaleString(),
    };
    setAnnouncements(updated);
    setEditIndex(null);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={10} />
        <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">📢 Announcements</h2>

          {/* Announcement Input */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter announcement message..."
              className="w-full border px-4 py-2 rounded-md"
            />
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value as "All" | "Students" | "Faculty")}
              className="border px-4 py-2 rounded-md"
            >
              <option value="All">All</option>
              <option value="Students">Students</option>
              <option value="Faculty">Faculty</option>
            </select>
            <button
              onClick={handleBroadcast}
              className="bg-[#27187E] text-white px-6 py-2 rounded-md hover:bg-[#FF8600] transition flex items-center gap-2"
            >
              <FiSend /> Broadcast
            </button>
          </div>

          {/* Announcement List */}
          <div className="grid gap-4">
            {announcements.map((a, index) => (
              <div
                key={index}
                className="bg-[#F1F2F6] p-5 rounded-lg shadow-md transition-transform hover:scale-[1.02]"
              >
                {editIndex === index ? (
                  <>
                    <div className="flex flex-col md:flex-row gap-4 mb-2">
                      <input
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                      />
                      <select
                        value={editedTarget}
                        onChange={(e) => setEditedTarget(e.target.value as "All" | "Students" | "Faculty")}
                        className="border px-4 py-2 rounded-md"
                      >
                        <option value="All">All</option>
                        <option value="Students">Students</option>
                        <option value="Faculty">Faculty</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 flex items-center gap-1"
                      >
                        <FiCheck /> Save
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 flex items-center gap-1"
                      >
                        <FiX /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-bold text-[#27187E]">{a.target}</h4>
                      <span className="text-xs text-gray-500">{a.timestamp}</span>
                    </div>
                    <p className="mt-2 text-gray-800">{a.message}</p>
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <FiEdit2 /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="absolute flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
      <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
      <Link href={"/admin"}>
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back to Home
        </button>
      </Link>
    </nav>
  );
};

export default AnnouncementsPage;
