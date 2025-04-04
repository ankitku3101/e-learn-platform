"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F1F2F6] p-6 text-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#27187E]">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" className="input" onChange={handleChange} value={formData.name} required />
          <input type="text" name="username" placeholder="Username" className="input" onChange={handleChange} value={formData.username} required />
          <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} value={formData.email} required />
          <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} value={formData.password} required />
          
          <select name="role" onChange={handleChange} value={formData.role} className="input">
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <button type="submit" className="w-full rounded-lg bg-[#758BFD] py-2 text-white hover:bg-[#5a6de3]" disabled={loading}>
            {loading ? "Processing..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;

// Tailwind Utility Classes
const inputStyles = "w-full rounded-md border border-gray-300 p-2 focus:border-[#758BFD] focus:outline-none";
