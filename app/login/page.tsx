'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    window.google?.accounts.id.initialize({
       client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
       callback: handleGoogleLogin,
    });
    window.google?.accounts.id.renderButton(
       document.getElementById("google-login"),
       { theme: "outline", size: "large" }
    );
    const token = localStorage.getItem('analgo_token');
    if (token) {
       window.location.href = '/dashboard';
    }
  }, [router]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_ENDPOINT_ANALGO_LOGIN!, {
        username: email,
        password: password
      });
      localStorage.setItem('analgo_token', res.data.access_token);
      localStorage.setItem('analgo_username', res.data.name);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Email or password is incorrect');
      console.error(err);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleGoogleLogin(response: any) {
    try {
        const token = response.credential;
        const res = await axios.post(process.env.NEXT_PUBLIC_ENDPOINT_GOOGLE_LOGIN!, {token});
        const data = res.data;
        if (data.success) {
          localStorage.setItem('analgo_token', data.access_token || '');
          localStorage.setItem('analgo_username', data.name || '');
          window.location.href = '/dashboard';
        } else {
          setError(data.error || 'Error signing in with Google');
        }
    } catch (err) {
      console.log(err);
      setError('Error signing in with Google');
      localStorage.removeItem('analgo_token');
      localStorage.removeItem('analgo_username');
    }
  }
  return (
    <div className='col-12 d-md-flex mb-3 mt-4'>
      <div className="col-md-4 offset-md-1 mb-5">
        <p className='h2'>Working overtime?</p>
        <p>Success never comes easy—keep pushing forward!</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" placeholder="Password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          <button type="submit" className="btn btn-primary">Logged-In</button>
          <a className="pl-2" href="/forgot-password">Forgot password</a>
        </form>
        <div className="col-12 d-flex flex-column align-items-center pt-3">
          <p className='h5 text-center'>OR</p>
          <div id="google-login">Connexion with google</div>
        </div>
      </div>
      <div className="col-md-5 offset-md-2 d-block">
        <div className='row'>
          <p className='h3'>Analgo Insights Dashboard:</p>
          <p>Discover the latest updates and what’s coming next.</p>
           <Link href="/register" className='mt-3'>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Register Now
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
}
