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
      <Link href="/student">
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Back to Home
        </button>
      </Link>
    </nav>
  );
};

const modules = [
  { id: "mod1", name: "Mathematics" },
  { id: "mod2", name: "Physics" },
];

const dummyData = {
  mod1: {
    quiz: [
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
      },
      {
        question: "What is the square root of 16?",
        options: ["2", "4", "6", "8"],
        answer: "4",
      },
    ],
    assignments: [
      {
        question: "Define Algebra.",
      },
      {
        question: "Solve: 3x + 5 = 11. Find x.",
      },
    ],
  },
  mod2: {
    quiz: [
      {
        question: "What is Newton's 2nd law?",
        options: [
          "F = ma",
          "Every action has an equal and opposite reaction",
          "An object at rest stays at rest",
          "Force is inversely proportional to acceleration",
        ],
        answer: "F = ma",
      },
      {
        question: "Speed is measured in?",
        options: ["Meter", "Second", "m/s", "m/s²"],
        answer: "m/s",
      },
    ],
    assignments: [
      {
        question: "Explain the concept of inertia.",
      },
      {
        question: "What is the SI unit of force?",
      },
    ],
  },
};

export default function QuizAssignmentPage() {
  const [selectedModule, setSelectedModule] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [assignmentAnswers, setAssignmentAnswers] = useState<{ [key: number]: string }>({});

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    const questions = dummyData[selectedModule]?.quiz || [];

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score += 1;
      }
      // No negative marking: wrong = 0
    });

    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignmentSubmitted(true);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center text-black pt-16 pb-10">
        <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={50} />
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">📘 Quiz & Assignment</h2>

          <div className="mb-6">
            <label className="block font-medium mb-2">Select Subject</label>
            <select
              value={selectedModule}
              onChange={(e) => {
                setSelectedModule(e.target.value);
                setQuizSubmitted(false);
                setAssignmentSubmitted(false);
                setAnswers({});
                setQuizScore(null);
              }}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Choose Module --</option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.name}
                </option>
              ))}
            </select>
          </div>

          {selectedModule && (
            <>
              {/* Quiz Section */}
              <form onSubmit={handleQuizSubmit} className="mb-10">
                <h3 className="text-lg font-semibold mb-4">📝 Attempt Quiz</h3>
                {dummyData[selectedModule]?.quiz.map((q, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium mb-1">
                      Q{index + 1}: {q.question}
                    </p>
                    {q.options.map((opt, i) => (
                      <label key={i} className="block">
                        <input
                          type="radio"
                          name={`q${index}`}
                          value={opt}
                          checked={answers[index] === opt}
                          onChange={(e) =>
                            setAnswers((prev) => ({ ...prev, [index]: e.target.value }))
                          }
                        />
                        <span className="ml-2">{opt}</span>
                      </label>
                    ))}
                  </div>
                ))}

                <button
                  type="submit"
                  className="bg-[#27187E] hover:bg-[#FF8600] text-white px-4 py-2 rounded"
                >
                  Submit Quiz
                </button>

                {quizSubmitted && (
                  <p className="mt-4 font-bold text-green-600">
                    ✅ Quiz Submitted Successfully! Score: {quizScore} /{" "}
                    {dummyData[selectedModule].quiz.length}
                  </p>
                )}
              </form>

              {/* Assignment Section */}
              <form onSubmit={handleAssignmentSubmit}>
                <h3 className="text-lg font-semibold mb-4">📂 Submit Assignment</h3>
                {dummyData[selectedModule]?.assignments.map((assign, index) => (
                  <div key={index} className="mb-4">
                    <label className="block font-medium mb-1">
                      Q{index + 1}: {assign.question}
                    </label>
                    <textarea
                      className="w-full border rounded p-2"
                      rows={3}
                      value={assignmentAnswers[index] || ""}
                      onChange={(e) =>
                        setAssignmentAnswers((prev) => ({ ...prev, [index]: e.target.value }))
                      }
                      required
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="bg-[#27187E] hover:bg-[#FF8600] text-white px-4 py-2 rounded"
                >
                  Submit Assignment
                </button>

                {assignmentSubmitted && (
                  <p className="mt-4 font-bold text-green-600">✅ Assignment Submitted Successfully!</p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
