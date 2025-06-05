"use client"
import React, { use } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Chip,
  Paper,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  Menu,
} from '@mui/icons-material';
import Link from 'next/link';

const MarketingPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 1 }}>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: 'primary.main'
              }}
            >
              Fortuno
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              <Button color="inherit" sx={{ color: 'text.primary' }}>Features</Button>
              <Button color="inherit" sx={{ color: 'text.primary' }}>Pricing</Button>
              <Button color="inherit" sx={{ color: 'text.primary' }}>About</Button>
              <Button color="inherit" sx={{ color: 'text.primary' }}>Contact</Button>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 3 }}>
              <Button 
                component={Link} 
                href="/login" 
                variant="outlined" 
                color="primary"
              >
                Sign In
              </Button>
              <Button 
                component={Link} 
                href="/signup" 
                variant="contained" 
                color="primary"
              >
                Get Started
              </Button>
            </Box>
            <IconButton 
              color="inherit" 
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 12, md: 16 }, 
          pb: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  sx={{ 
                    mb: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Your Financial Future, Simplified
                </Typography>
                <Typography 
                  variant="h5" 
                  color="text.secondary" 
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  Track your net worth, monitor investments, and achieve your financial goals with our comprehensive wealth management platform.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    component={Link}
                    href="/signup"
                    variant="contained" 
                    size="large"
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      fontSize: '1.1rem',
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                  >
                    Start Building Wealth
                  </Button>
                  <Button 
                    component={Link}
                    href="/dashboard"
                    variant="outlined" 
                    size="large"
                    sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                  >
                    View Demo
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                  Your Net Worth
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="h2" 
                    color="primary.main"
                    sx={{ fontWeight: 700, fontFamily: 'monospace' }}
                  >
                    $247,650
                  </Typography>
                  <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <TrendingUp fontSize="small" />
                    +$12,450 (5.3%) this month
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main">Assets</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>$285,400</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="error.main">Liabilities</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>$37,750</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default MarketingPage;