"use client";

import { useState } from "react";
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
          Go Back
        </button>
      </Link>
    </nav>
  );
};

const FacultyUpload = () => {
  const [module, setModule] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentDeadline, setAssignmentDeadline] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([
    { question: "", options: ["", "", "", ""], correct: "" },
  ]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleAddQuizQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      { question: "", options: ["", "", "", ""], correct: "" },
    ]);
  };

  const handleQuizChange = (index: number, field: string, value: string, optIndex?: number) => {
    const updated = [...quizQuestions];
    if (field === "question") updated[index].question = value;
    else if (field === "correct") updated[index].correct = value;
    else if (field === "option" && optIndex !== undefined)
      updated[index].options[optIndex] = value;
    setQuizQuestions(updated);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate upload
    console.log({
      module,
      assignmentTitle,
      assignmentDescription,
      assignmentDeadline,
      quizQuestions,
    });
    setUploadStatus("✅ Assignment & Quiz Uploaded Successfully!");
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-20 pb-20">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={69} />
        <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">📤 Upload Assignment & Quiz</h2>

          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Subject</label>
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">-- Select --</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>

            {/* Assignment Upload Section */}
            <h3 className="text-lg font-semibold mb-2 mt-6">📘 Assignment</h3>
            <div className="mb-4">
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                rows={3}
                value={assignmentDescription}
                onChange={(e) => setAssignmentDescription(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-1">Deadline</label>
              <input
                type="date"
                value={assignmentDeadline}
                onChange={(e) => setAssignmentDeadline(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Quiz Upload Section */}
            <h3 className="text-lg font-semibold mb-2 mt-8">🧠 Quiz</h3>
            {quizQuestions.map((q, index) => (
              <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                <label className="block font-medium mb-1">Question {index + 1}</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded mb-3"
                  value={q.question}
                  onChange={(e) => handleQuizChange(index, "question", e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  {q.options.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      className="border p-2 rounded"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => handleQuizChange(index, "option", e.target.value, i)}
                      required
                    />
                  ))}
                </div>
                <div className="mt-2">
                  <label className="block font-medium mb-1">Correct Answer</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={q.correct}
                    onChange={(e) => handleQuizChange(index, "correct", e.target.value)}
                    placeholder="Must match one of the options"
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuizQuestion}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
            >
              ➕ Add Another Question
            </button>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="bg-[#27187E] hover:bg-[#FF8600] text-white px-6 py-2 rounded font-medium"
              >
                Upload
              </button>
              {uploadStatus && <p className="mt-4 font-bold text-green-600">{uploadStatus}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyUpload;
