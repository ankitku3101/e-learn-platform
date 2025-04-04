"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import BackgroundGradient from "@/components/BackgroundGradient";
import Link from "next/link";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = formData.role === "faculty" ? "/api/v1/admin/create-faculty-id" : "/api/v1/admin/create-student-id";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success(`${formData.role} created successfully!`);
      setFormData({ name: "", username: "", email: "", password: "", role: "student" });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={9} />
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Add User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="w-full px-3 py-2 border rounded"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="w-full px-3 py-2 border rounded"
                onChange={handleChange}
                value={formData.username}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="role">
                Role
              </label>
              <select
                name="role"
                id="role"
                onChange={handleChange}
                value={formData.role}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#27187E]/70 text-white rounded hover:bg-[#27187E] disabled:bg-[#27187E]/50 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="none"
                      d="M4 12a8 8 0 0 1 8-8V4a10 10 0 0 0-10 10h2z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Create User"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;


const Navbar = () => {

    return (
      <nav className="absolute flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
        </div>
        <Link href={'/admin'}>
          <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Back to Home
          </button>
        </Link>
      </nav>
    );
  };