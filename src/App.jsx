import { useState } from 'react';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  async function handleScan(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setScore(null);
    try {
      const config = await fetch('/config.json').then(r => r.json());
      const url = `${config.apiBaseUrl}/?domain=${encodeURIComponent(domain)}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('Failed to fetch');
      const data = await resp.json();
      setScore(data.score);
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
