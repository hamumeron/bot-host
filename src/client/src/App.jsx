import React, { useEffect, useState } from 'react';

export default function App() {
  const [bots, setBots] = useState([]);
  const [form, setForm] = useState({ name: '', token: '', owner: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/bots')
      .then(res => res.json())
      .then(setBots)
      .catch(() => setError('Failed to load bots'));
  }, []);

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bots/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Register failed');
      const data = await res.json();
      setBots([...bots, { id: data.id, ...form }]);
      setForm({ name: '', token: '', owner: '' });
    } catch {
      setError('Failed to register bot');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Node Bot Hosting Service</h1>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <h2>Register Bot</h2>
      <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
        <input name="name" placeholder="Bot Name" value={form.name} onChange={onChange} required />
        <br />
        <input name="token" placeholder="Token" value={form.token} onChange={onChange} required />
        <br />
        <input name="owner" placeholder="Owner" value={form.owner} onChange={onChange} required />
        <br />
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>

      <h2>Registered Bots</h2>
      <ul>
        {bots.map(bot => (
          <li key={bot.id}>
            <b>{bot.name}</b> (Owner: {bot.owner})
          </li>
        ))}
      </ul>
    </div>
  );
}
