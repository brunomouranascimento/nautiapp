import React, { createContext, useContext, useState } from 'react'

type AuthSession = Record<string, any> | null

type AuthContextData = {
  session: AuthSession
  setSession: React.Dispatch<React.SetStateAction<AuthSession>>
  clearSession: () => void
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession>(null)
  const value = {
    session,
    setSession,
    clearSession: () => setSession(null)
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}
