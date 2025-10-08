'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(redirectIfLoggedIn = false) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('analgo_token');
    if (token) {
      setIsLoggedIn(true);
      if (redirectIfLoggedIn) {
         window.location.href = '/dashboard';
      }
    } else {
      setIsLoggedIn(false);
      if (!redirectIfLoggedIn) {
        router.push('/login');
        window.location.href = '/login';
      }
    }
  }, [redirectIfLoggedIn, router]);

  return isLoggedIn;
}
