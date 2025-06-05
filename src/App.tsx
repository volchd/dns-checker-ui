import React, { JSX } from 'react';
import { FormEvent, useState } from 'react';
import Dashboard from './Dashboard';
import './App.css';

export type Score = {
  total: number;
  spf: number;
  dkim: number;
  dmarc: number;
  reasons: {
    spf: string;
    dkim: string;
    dmarc: string;
  };
  recommendations: {
    spf: string;
    dkim: string;
    dmarc: string;
  };
  details: Record<string, string>;
};


function App(): JSX.Element {
  const [domain, setDomain] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<Score | null>(null);
  const [error, setError] = useState<string>('');

  async function handleScan(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setScore(null);
    try {
      const config = await fetch('/config.json').then(r => r.json());
      // Detect environment
      const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
      const envConfig = isLocal ? config.local : config.production;
      const url = `${envConfig.apiBaseUrl}/?domain=${encodeURIComponent(domain)}`;
      const resp = await fetch(url);
      if (resp.status === 404) {
        setError('Domain not found.');
        setScore(null);
        setLoading(false);
        return;
      }
      if (!resp.ok) throw new Error('Failed to fetch');
      const data = await resp.json();
      if (data.error) {
        setError(data.error);
        setScore(null);
      } else {
        setScore(data.score);
      }
    } catch (err) {
      setError('Failed to fetch result.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <h1>DNS Checker UI</h1>
      <form className="domain-form" onSubmit={handleScan}>
        <input
          type="text"
          placeholder="Enter domain name"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          disabled={loading}
          className="domain-input"
        />
        <button type="submit" disabled={loading || !domain} className="scan-btn">
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <Dashboard score={score} />
    </div>
  );
}

export default App;
