"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPinIcon as MapPinPlus } from "lucide-react"
import { CountrySelector } from "@/components/CountrySelector"
import { usePassport } from "@/context/PassportContext"
import type { CountryStamp } from "@/context/PassportContext"

export function PassportPage({ pageNumber }: { pageNumber: number }) {
  const { passport, setPassport } = usePassport()
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const stampsPerPage = 4
  const startIndex = (pageNumber - 1) * stampsPerPage
  const endIndex = startIndex + stampsPerPage
  const pageStamps = passport.stamps.slice(startIndex, endIndex)

  const addStamp = (stamp: CountryStamp) => {
    setPassport({
      ...passport,
      stamps: [...passport.stamps, stamp],
    })
    setShowCountrySelector(false)
  }

  return (
    <div className="relative w-full h-full p-6 bg-amber-50">

      <div className="flex flex-col h-full justify-start gap-4 pt-8">
        {pageStamps.map((stamp) => (
          <div key={stamp.id} className="relative mx-auto w-[80%] h-[20%] flex items-center justify-center mb-2">
            <div
              className="absolute inset-0 opacity-70 rotate-[-6deg]"
              style={{
                backgroundImage: `url('/countries/${stamp.code.toLowerCase()}.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(30%)",
                borderRadius: "8px",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            />
            <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-md p-3 shadow-sm border border-gray-300 transform rotate-[2deg] w-[50%] h-[75%]">
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-1">{getCountryFlag(stamp.code)}</div>
                <div className="text-sm font-semibold uppercase tracking-wider">{stamp.name}</div>
                <div className="absolute inset-0 border-2 border-red-800/40 rounded-md border-dashed"></div>
                <div className="absolute top-[-10px] right-[-10px] w-14 h-14 rounded-full border-2 border-red-800/40 flex items-center justify-center transform rotate-[15deg]">
                  <span className="text-xs text-red-800/70 font-extrabold">VISITED</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Botón para añadir sello - solo mostrar si hay espacio en la página o es la última página */}
        {pageStamps.length < stampsPerPage && (
          <div className="relative mx-auto w-[80%] h-[10%] flex items-center justify-center mt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowCountrySelector(true)}
              className="rounded-full bg-white/80 border-dashed border-2 border-gray-400 hover:bg-white/90"
            >
              <MapPinPlus className="h-5 w-5 mr-2 text-gray-600" />
              <span className="text-gray-700">Añadir Sello</span>
            </Button>
          </div>
        )}
      </div>

      {showCountrySelector && <CountrySelector onSelect={addStamp} onCancel={() => setShowCountrySelector(false)} />}
    </div>
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

