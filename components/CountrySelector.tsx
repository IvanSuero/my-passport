"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { CountryStamp } from "@/context/PassportContext"
import { usePassport } from "@/context/PassportContext"
import COUNTRIES from "@/data/countries.json"

interface CountrySelectorProps {
  onSelect: (stamp: CountryStamp) => void
  onCancel: () => void
}

export function CountrySelector({ onSelect, onCancel }: CountrySelectorProps) {
  const { passport } = usePassport()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCountries = COUNTRIES.filter((country) => !passport.stamps.map((stamp) => stamp.code).includes(country.code)).filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelectCountry = (code: string, name: string) => {
    const newStamp: CountryStamp = {
      id: `${code}-${Date.now()}`,
      code,
      name,
      date: new Date().toLocaleDateString(),
    }
    onSelect(newStamp)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sellar pasaporte</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar paises..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7 hover:cursor-pointer"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {filteredCountries.map((country) => (
              <Button
                key={country.code}
                variant="outline"
                className="justify-start h-auto py-2"
                onClick={() => handleSelectCountry(country.code, country.name)}
              >
                <span className="mr-2 text-xl">{getCountryFlag(country.code)}</span>
                <span className="text-sm truncate">{country.name}</span>
              </Button>
            ))}
          </div>

          {filteredCountries.length === 0 && <div className="text-center py-4 text-gray-500">No hay paises</div>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to get country flag emoji from country code
function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}

