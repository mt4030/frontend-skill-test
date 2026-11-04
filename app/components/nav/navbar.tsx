'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { useMe } from '@/hooks/useMe';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { Avatarprofil } from '../avatar';
import SiteIcon from '../siteicon';
import { Button } from '@/components/ui/button';

import { MovieSearch } from './movieSearch';
import MobileNavbarBottom from './mobileNavbar/navBotton';

export default function NavBar() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const { data: user } = useMe();

  const queryClient = useQueryClient();
  const router = useRouter();

  const publicLinks = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Movies', path: '/products' },
  ];

  const onLogout = () => {
    localStorage.removeItem('token');

    queryClient.setQueryData(['me'], null);
    queryClient.invalidateQueries({ queryKey: ['me'] });

    setIsAvatarOpen(false);

    toast.success('Logged out');

    router.replace('/');
  };

  return (
    <nav className="sticky top-0 z-999 flex h-20 w-full items-center bg-gray-950 px-6 text-amber-50 md:px-20">

      {/* DESKTOP NAVBAR */}
      <div className="hidden w-full items-center md:flex">

        <SiteIcon />

        <MovieSearch />

        {/* Right section */}
        <div className="flex flex-1 items-center justify-end gap-10">

          {publicLinks.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              className="hover:text-amber-300 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="relative">

              <Button
                onClick={() =>
                  setIsAvatarOpen((previous) => !previous)
                }
                className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-800"
                aria-expanded={isAvatarOpen}
                aria-label="Open user menu"
              >
                <Avatarprofil />

                <ChevronDown className="h-4 w-4" />
              </Button>

              {isAvatarOpen && (
                <div className="absolute right-0 z-50 mt-2 w-40 rounded border border-gray-700 bg-gray-900 shadow-lg">

                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setIsAvatarOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700"
                  >
                    Logout
                  </Button>

                </div>
              )}

            </div>
          ) : (
            <Link
              href="/login"
              className="rounded border border-amber-300 px-3 py-1 transition-colors hover:bg-amber-400 hover:text-gray-900"
            >
              Login
            </Link>
          )}

        </div>
      </div>

      {/* MOBILE TOP NAVBAR */}
      <div className="flex w-full items-center justify-around md:hidden">

        <Link href="/" aria-label="Homepage">
          <img
            src="/img/icon.png"
            alt="Website Icon"
            className="h-12"
          />
        </Link>

        <div className="flex flex-1 justify-center px-5">
          <MovieSearch />
        </div>

      </div>

      {/* MOBILE BOTTOM NAVBAR */}
      <MobileNavbarBottom loginStat={Boolean(user)} />

    </nav>
  );
}