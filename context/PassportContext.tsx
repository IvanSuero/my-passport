'use client'

import { useState, useEffect, createContext, useContext } from "react"

export type CountryStamp = {
  id: string
  code: string
  name: string
  date: string
}

export type PassportData = {
  color: string
  name: string
  ownerName: string
  stamps: CountryStamp[]
}

const DEFAULT_PASSPORT: PassportData = {
  color: 'bg-red-900',
  name: 'My Virtual Passport',
  ownerName: 'Ivan Suero',
  stamps: [{ id: 'us-1', code: 'us', name: 'United States', date: '01/01/2021' }, { id: 'mx-1', code: 'mx', name: 'Mexico', date: '01/02/2021' }]
}

type PassportContextType = {
  passport: PassportData
  setPassport: (passport: PassportData) => void
}

const PassportContext = createContext<PassportContextType>({} as PassportContextType)

export function PassportProvider({ children }: { children: React.ReactNode }) {
  const [passport, setPassport] = useState<PassportData>(() => {
    if (typeof window !== 'undefined') {
      const passport = localStorage.getItem('passport')
      return passport ? JSON.parse(passport) : DEFAULT_PASSPORT
    }
    return DEFAULT_PASSPORT
  })

  useEffect(() => {
    localStorage.setItem('passport', JSON.stringify(passport))
  }, [passport])

  return (
    <PassportContext.Provider value={{ passport, setPassport }}>
      {children}
    </PassportContext.Provider>
  )
}

export function usePassport() {
  const context = useContext(PassportContext)
  if (!context) {
    throw new Error('usePassport must be used within a PassportProvider')
  }
  return context
}