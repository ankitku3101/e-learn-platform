"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BackgroundGradient from "@/components/BackgroundGradient";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="absolute flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800 bg-white z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
      </div>
      <Link href="/faculty">
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back
        </button>
      </Link>
    </nav>
  );
};

const CreateQuizPage = () => {
  const moduleId = "67f05eca7a41b92fdd35437d"; // ✅ Your hardcoded module ID
  const [isActive, setIsActive] = useState(true);
  const [lastDate, setLastDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lastDate) {
      toast.error("❌ Please select a last date!");
      return;
    }

    try {
      const res = await fetch(`/api/v1/quiz/create-quiz/${moduleId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isactive: isActive, lastdate: lastDate }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Quiz created successfully!");
        setLastDate("");
        setIsActive(true);
        router.refresh();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("❌ Server error, try again!");
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={12} />
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">📝 Create Quiz</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Is Active?</label>
              <select
                className="w-full border p-3 rounded"
                value={isActive ? "true" : "false"}
                onChange={(e) => setIsActive(e.target.value === "true")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Last Submission Date</label>
              <input
                type="date"
                className="w-full border p-3 rounded"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-[#27187E] hover:bg-[#FF8600] text-white px-6 py-3 rounded-lg transition duration-300"
            >
              Create Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
