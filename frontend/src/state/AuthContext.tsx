import React, { createContext, useEffect, useState } from 'react'

type User = any

interface AuthContextType {
  user: User | null
  token: string | null
  setAuth: (token: string | null, user: User | null) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const setAuth = (t: string | null, u: User | null) => {
    setToken(t)
    setUser(u)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, token, setAuth, logout }}>{children}</AuthContext.Provider>
}
