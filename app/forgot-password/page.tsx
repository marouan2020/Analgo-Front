'use client';

import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

   useEffect(() => {
      const token = localStorage.getItem('analgo_token');
      if (token) {
        router.push('/dashboard');
      }
    }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await axios.post('https://www.api.analgo.tech/api/forgotpassword', {email});
        setMessage(res.data.message);
        setError('');
      } catch (err) {
        console.error(err);
        setMessage('');
        setError('Failed to send reset email. Please try again.');
      }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <h2>Forgot Password</h2>
      {message && <div className="text-success mb-2">{message}</div>}
      {error && <div className="text-danger mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Reset Link
        </button>
      </form>
      <p className="mt-2">
        <a href="/login">Back to Login</a>
      </p>
    </div>
  );
}
