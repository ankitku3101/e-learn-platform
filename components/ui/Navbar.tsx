'use client';

import Link from 'next/link';

const Navbar = () => {

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold tracking-tight md:text-2xl">UNILEARN</h1>
      </div>
      <Link href={'/auth/signin'}>
        <button className="cursor-pointer w-24 transform rounded-lg bg-[#27187E] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF8600] md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Sign In
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
