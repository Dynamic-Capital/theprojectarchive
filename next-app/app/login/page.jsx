'use client';

import { useState } from 'react';
import { supabaseClient } from '../../lib/supabaseClient.js';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabaseClient) {
      setMessage('Supabase not configured');
      return;
    }
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    setMessage(error ? error.message : 'Signed in');
  };

  return (
    <main className="container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}

