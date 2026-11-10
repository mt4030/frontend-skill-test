import Link from 'next/link';
import { Search,Clapperboard  } from 'lucide-react';

interface MobileNavbarBottomProps {
  loginStat: boolean;
}

export default function MobileNavbarBottom({
  loginStat,
}: MobileNavbarBottomProps) {
  const mobileNavbar = [
    {
      id: 1,
      title: 'Home',
      path: '/',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A.999.999 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Movies',
      path: '/products',
     icon: <Clapperboard className="size-5" />,
    },
    {
      id: 3,
      title: 'Search',
      path: '/products/results?items=20',
      icon: <Search className="size-5" />,
    },
    {
      id: 4,
      title: loginStat ? 'Dashboard' : 'Login',
      path: loginStat ? '/dashboard' : '/login',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-100 w-screen border-t-2 border-gray-700 bg-gray-950/95 text-gray-300 md:hidden">

      <div className="flex items-center justify-between gap-5 px-8 py-2">

        {mobileNavbar.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="flex flex-col items-center gap-1 transition-colors hover:text-amber-400"
          >
            {item.icon}

            <span className="text-xs">
              {item.title}
            </span>
          </Link>
        ))}

      </div>

    </div>
  );
}