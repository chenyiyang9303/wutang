import React from 'react';
import Link from 'next/link';

const navigation = [
  { name: 'Wu-Tang Name generator', href: '/' },
  { name: 'Rap Lyrics generator', href: '/rap' },
  { name: 'Rap Name generator', href: '/rap-name-generator' },
  { name: 'Diss Track generator', href: '/diss-track-generator' },
]

export default function Header() {
  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              Wu-Tang Generator
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}