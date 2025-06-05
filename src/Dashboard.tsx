import React from "react";
import type { Score } from './App';
import { Container, Paper, Typography, List, ListItem, ListItemText, Box, Divider } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';

interface DashboardProps {
  score: Score | null;
}

export default function Dashboard({ score }: DashboardProps) {
  if (!score) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, background: 'linear-gradient(135deg, #f7fafc 0%, #e3f0ff 100%)' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, letterSpacing: '-0.01em', mb: 2 }}>
          Domain Health Score
        </Typography>
        <Box mb={3}>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: 20, fontWeight: 500 }}>
            Total Score:
            <Typography component="span" variant="h4" color="primary" sx={{ ml: 2, fontWeight: 800, fontSize: 36 }}>
              {score.total}
            </Typography>
          </Typography>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3} mb={3}>
          <Paper variant="outlined" sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(120deg, #e3f0ff 0%, #ffffff 100%)', boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.10)' }}>
            <VerifiedUserIcon color="primary" sx={{ fontSize: 38, mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>SPF</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Score: {score.spf}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Reason: {score.reasons.spf}</Typography>
            <Typography variant="body2">Recommendation: {score.recommendations.spf}</Typography>
          </Paper>
          <Paper variant="outlined" sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(120deg, #e3f0ff 0%, #ffffff 100%)', boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.10)' }}>
            <SecurityIcon color="secondary" sx={{ fontSize: 38, mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>DKIM</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Score: {score.dkim}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Reason: {score.reasons.dkim}</Typography>
            <Typography variant="body2">Recommendation: {score.recommendations.dkim}</Typography>
          </Paper>
          <Paper variant="outlined" sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(120deg, #e3f0ff 0%, #ffffff 100%)', boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.10)' }}>
            <ShieldIcon color="success" sx={{ fontSize: 38, mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>DMARC</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Score: {score.dmarc}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Reason: {score.reasons.dmarc}</Typography>
            <Typography variant="body2">Recommendation: {score.recommendations.dmarc}</Typography>
          </Paper>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ background: '#fff', borderRadius: 3, p: { xs: 2, sm: 3 }, boxShadow: '0 1px 6px 0 rgba(25, 118, 210, 0.07)' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, fontSize: 20 }}>Details</Typography>
          <List dense>
            {Object.entries(score.details).map(([k, v]) => (
              <ListItem key={k} disablePadding>
                <ListItemText
                  primary={<><b>{k}:</b> {v}</>}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
}
