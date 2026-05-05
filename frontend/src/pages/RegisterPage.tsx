import React, { useContext, useState } from 'react'
import {
  Button,
  Typography,
  Alert,
  Box,
  Paper,
} from '@mui/material'
import AuthHero from '../components/AuthHero'
import { useNavigate } from 'react-router-dom'
import { register as apiRegister } from '../api/auth'
import { AuthContext } from '../state/AuthContext'
import TextField from '../components/CustomTextField'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    console.log('register payload', { name, email, password })
    try {
      const res = await apiRegister({ name, email, password })
      console.log('register response', res)
      const { token } = res.data
      const user = res.data.user || res.data || res.data.data || null
      // prefer the submitted form `name` first, then other user fields, then email
      const uname = name || user?.name || user?.username || user?.fullName || user?.firstName || user?.email
      const sanitizedUser = { ...user, name: uname }
      auth?.setAuth(token, sanitizedUser)
      navigate('/')
    } catch (err: any) {
      console.error('register error', err.response?.status, err.response?.data, err)
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', background: 'linear-gradient(135deg, #4f6f1f, #6f8f2f)' }}>
      <AuthHero />
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 4 }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 320, borderRadius: 2 }}>
          <Typography variant="h6" align="center" color="text.secondary" mb={2}>
            Welcome, please sign up to continue
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={submit}>
            <TextField
              fullWidth
              label="Name"
              placeholder="John Doe"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              placeholder="your@email.com"
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
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              py: 1.2,
              background: '#4f6f1f',
              '&:hover': { background: '#3e5718' },
              color: '#FFD54F'
            }}
          >
            Sign Up
          </Button>

          </form>
        </Paper>
      </Box>
    </Box>
  )
}