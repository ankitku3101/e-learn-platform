"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const MyCourses = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    coursename: "",
    description: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/course/create-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      router.push("/Dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-10 px-6 text-black">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-[#27187E] mb-6 text-center">
          Create New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Faculty ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Faculty ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="id"
              placeholder="Enter your Faculty ID"
              value={formData.id}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#758BFD]"
            />
          </div>

          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="coursename"
              placeholder="Enter course title (e.g., Data Structures)"
              value={formData.coursename}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#758BFD]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Describe the course briefly"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#758BFD]"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="duration"
              placeholder="e.g., 10 weeks, 2 months"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#758BFD]"
            />
          </div>

          {/* Error & Button */}
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#758BFD] text-white py-3 rounded-md font-semibold hover:bg-[#5c6bdf] transition"
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyCourses;
