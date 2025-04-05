'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MyCourses = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    coursename: '',
    description: '',
    duration: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: session?.user?.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Course created:', data);
        router.push('/faculty/dashboard'); // ✅ Redirect to dashboard
      } else {
        setError(data.message || 'Failed to create course');
      }
    } catch (err) {
      setError('Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f1f2f6] p-6 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-[#27187E] mb-6">Create New Course</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              onClick={() => router.push('/faculty/dashboard')}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[#27187E] hover:bg-[#1a1259] text-white px-6 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyCourses;
