'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation";

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('analgo_token');
    setIsLoggedIn(!!token);
    async function checkToken(token: any) {
        try {
            await axios.post(process.env.NEXT_PUBLIC_ENDPOINT_CHECKTOKEN!, {token: token});
            setIsLoggedIn(true);
        } catch (err) {
            localStorage.removeItem('analgo_token');
            localStorage.removeItem('analgo_username');
            setIsLoggedIn(false);
        }
    }

  }, [router]);

  return isLoggedIn;
}
