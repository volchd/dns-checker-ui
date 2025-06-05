import React, { JSX } from 'react';
import { FormEvent, useState } from 'react';
import Dashboard from './Dashboard';
import { ThemeProvider, CssBaseline, Container, Box, TextField, Button, Alert, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import DnsIcon from '@mui/icons-material/Dns';

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

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#00bcd4',
      },
      background: {
        default: '#f5f7fa',
        paper: '#ffffff',
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontWeight: 700,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 12,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            boxShadow: '0 2px 12px 0 rgba(25, 118, 210, 0.07)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #e3f0ff 0%, #f5f7fa 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: { xs: 4, md: 8 } }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={4} width="100%">
            <Box display="flex" alignItems="center" gap={1}>
              <DnsIcon color="primary" sx={{ fontSize: 44 }} />
              <Typography variant="h4" component="h1" gutterBottom color="primary">
                DNS Checker
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleScan} width="100%" maxWidth={600} mx="auto" display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center" sx={{ mt: 2 }}>
              <TextField
                label="Enter domain name"
                variant="outlined"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                disabled={loading}
                fullWidth
                size="medium"
                sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading || !domain}
                size="large"
                sx={{ minWidth: 140, height: 56, fontSize: 18, boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.10)' }}
              >
                {loading ? <CircularProgress size={28} color="inherit" /> : 'Scan'}
              </Button>
            </Box>
            {error && <Alert severity="error" sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>{error}</Alert>}
            <Box width="100%" maxWidth={1000} mx="auto">
              <Dashboard score={score} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
