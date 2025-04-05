"use client";

import { useEffect, useState } from "react";
import BackgroundGradient from "@/components/BackgroundGradient";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    coursename: "",
    description: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!session?.user?.id) {
      setError("Invalid session. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/v1/course/create-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session.user.id,
          ...formData,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response from server:", text);
        setError("Server returned unexpected response.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        console.log("Course created:", data);
        router.push("/faculty");
      } else {
        setError(data.message || "Failed to create course");
      }
    } catch (err) {
      console.error("Error while creating course:", err);
      setError("Something went wrong during creating course.");
    }

    setLoading(false);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={30} />
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">📘 Create New Course</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-black">Course Name</label>
              <input
                type="text"
                name="coursename"
                placeholder="Enter course name"
                className="w-full p-3 border rounded-lg text-black"
                value={formData.coursename}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-black">Description</label>
              <textarea
                name="description"
                placeholder="Enter course description"
                className="w-full p-3 border rounded-lg text-black"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-black">Duration</label>
              <input
                type="text"
                name="duration"
                placeholder="e.g. 4 weeks / 20 hours"
                className="w-full p-3 border rounded-lg text-black"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
                onClick={() => router.push("/faculty/dashboard")}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#27187E] hover:bg-[#1a1259] text-white px-6 py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Course"}
              </button>
            </div>
          </form>
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
      <Link href="/faculty">
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back to Home
        </button>
      </Link>
    </nav>
  );
};

export default CreateCourse;
