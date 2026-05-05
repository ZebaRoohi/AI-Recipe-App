import React, { useContext, useState } from 'react'
import {
  Button,
  Typography,
  Alert,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material'
import AuthHero from '../components/AuthHero'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin } from '../api/auth'
import { AuthContext } from '../state/AuthContext'
import TextField from '../components/CustomTextField'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    try {
      const res = await apiLogin({ email, password })
      const { token } = res.data
      console.log('login response data:', res.data)
      const user = res.data.user || res.data || res.data.data || null
      let rawName = user?.name || user?.username || user?.fullName || user?.firstName || user?.email || null
      if (rawName && typeof rawName === 'string' && rawName.includes('@')) {
        rawName = user?.username || rawName.split('@')[0]
      }
      const sanitizedUser = { ...user, name: rawName }
      console.log('sanitizedUser to set in context:', sanitizedUser)
      auth?.setAuth(token, sanitizedUser)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', background: 'linear-gradient(135deg, #4f6f1f, #6f8f2f)' }}>
      <AuthHero />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: 4
    
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 320,
            borderRadius: 3
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Login for Amazing Recipes
          </Typography>

          <Typography color="text.secondary" mb={2}>
            Please sign in to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={submit}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box display="flex" justifyContent="space-between" mt={1} color="3e5718">
              <FormControlLabel
                control={
                <Checkbox size="small"
                  sx={{
                  color: '#FFD54F', 
                  '&.Mui-checked': {
                    color: '#2e7d32' 
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 22
                  }
                }} />}
                label="Remember me"
              />
              <Link href="/forgot-password" underline="hover">
                {/* Forgot password? */}
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                py: 1.2,
                background: '#4f6f1f',
                '&:hover': { background: '#3e5718' },
                color:'FFD54F'
              }}
            >
              Sign In
            </Button>

            <Typography align="center" mt={2} color="#4f6f1f">
              Don’t have an account?{' '}
              <Link href="/register" underline="hover" color="#4f6f1f" fontWeight="bold">
                Sign up
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}