// src/app/login/page.tsx
'use client';

import {
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please complete all fields',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);

    // Simulación de login
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: 'Login successful',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push('/home');
      });
      
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 450,
          backgroundColor: '#FAFAFA',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          p: 5,
        }}
      >
        {/* Lock Icon */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 2,
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
            }}
          >
            <Lock sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          
          <Typography 
            variant="h5" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: '#2C3E50'
            }}
          >
            Welcome Back
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#7F8C8D',
              fontSize: '0.95rem'
            }}
          >
            Sign in to your account to continue
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1, 
              fontWeight: 500,
              color: '#546E7A'
            }}
          >
            Email Address
          </Typography>
          <TextField
            fullWidth
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '&:hover fieldset': {
                  borderColor: '#764ba2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#764ba2',
                },
              },
            }}
          />

          {/* Password Field */}
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1, 
              fontWeight: 500,
              color: '#546E7A'
            }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '&:hover fieldset': {
                  borderColor: '#764ba2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#764ba2',
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Remember me and Forgot password */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3 
            }}
          >
            <FormControlLabel
              control={
                <Checkbox 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  sx={{
                    color: '#764ba2',
                    '&.Mui-checked': {
                      color: '#764ba2',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: '#546E7A' }}>
                  Remember me
                </Typography>
              }
            />
            
            <Link
              href="#"
              underline="none"
              sx={{
                color: '#764ba2',
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Sign In Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b4199 100%)',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
              },
              '&:disabled': {
                background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>

        {/* Footer text */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Link
            href="#"
            underline="none"
            sx={{
              color: '#9CA3AF',
              fontSize: '0.75rem',
              '&:hover': {
                color: '#6B7280',
              },
            }}
          >
            Manage cookies or opt out
          </Link>
        </Box>
      </Box>
    </Box>
  );
}