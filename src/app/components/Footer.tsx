import Link from 'next/link';

const navigation = [
  { name: 'Wu-Tang Name generator', href: '/' },
  { name: 'Rap Lyrics generator', href: '/rap' },
  { name: 'Rap Name generator', href: '/rap-name-generator' },
  { name: 'Diss Track generator', href: '/diss-track-generator' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:flex-col md:items-center lg:px-8">
        <div className="flex justify-center space-x-8 mb-8">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="text-center text-sm text-gray-400 space-y-2">
          <p>30 N Gould St Ste R Sheridan, WY 82801</p>
          <p>
            <a 
              href="mailto:support@wutangclannamegenerators.com" 
              className="hover:text-purple-400 transition-colors"
            >
              support@wutangclannamegenerators.com
            </a>
          </p>
        </div>
        <p className="mt-8 text-center text-sm/6 text-gray-400">
          &copy; 2025 Wu Tang Name Generator. All rights reserved.
        </p>
      </div>
    </footer>
  )
}