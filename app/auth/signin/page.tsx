'use client';

import { signIn, getSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackgroundGradient from '@/components/BackgroundGradient';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 

    const result = await signIn('credentials', {
      username: email,
      password,
      redirect: false,
    });

    setLoading(false); 

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      setError('');
      const session = await getSession();
      const role = session?.user?.role;

      if (role === 'student') {
        router.push('/student');
      } else if (role === 'faculty') {
        router.push('/faculty');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center text-black">
      <BackgroundGradient color1="#AEB8FE" color2="#758BFD" position="bottom" id={3} />  
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
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
                Please Wait...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </div>
  );
}
