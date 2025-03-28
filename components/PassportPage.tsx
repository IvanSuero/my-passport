"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPinIcon as MapPinPlus, XIcon } from "lucide-react"
import { CountrySelector } from "@/components/CountrySelector"
import { usePassport } from "@/context/PassportContext"
import type { CountryStamp } from "@/context/PassportContext"
import COUNTRIES from "@/data/countries.json"

export function PassportPage({ pageNumber }: { pageNumber: number }) {
  const { passport, setPassport } = usePassport()
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const stampsPerPage = 4
  const startIndex = (pageNumber - 1) * stampsPerPage
  const endIndex = startIndex + stampsPerPage
  const pageStamps = passport.stamps.slice(startIndex, endIndex)
  const lastPage = Math.max(1, Math.ceil(passport.stamps.length % stampsPerPage !== 0 ? passport.stamps.length / stampsPerPage : passport.stamps.length / stampsPerPage + 1))
  const showSeal = (pageNumber - lastPage === 1 && pageNumber-1 !== lastPage) || (pageStamps.length < stampsPerPage && pageNumber === lastPage)
  
  if (pageNumber === 0) return null

  const addStamp = (stamp: CountryStamp) => {
    setPassport({
      ...passport,
      stamps: [...passport.stamps, stamp],
    })
    setShowCountrySelector(false)
  }

  const deleteStamp = (stamp: CountryStamp) => {
    setPassport({
      ...passport,
      stamps: passport.stamps.filter((s) => s.id !== stamp.id),
    })
  }

  return (
    <div className="relative w-full h-full p-6 bg-amber-50">

      <div className="flex flex-col h-full justify-start gap-4 pt-8">
        {pageStamps.map((stamp) => (
          <div key={stamp.id} className="relative mx-auto w-[80%] h-[20%] flex items-center justify-center mb-2">
            <button className="absolute z-10 top-0 right-4 text-black hover:text-gray-600 hover:cursor-pointer" onClick={() => deleteStamp(stamp)}>
              <XIcon className="w-4 h-4" />
            </button>
            <div
              className="absolute inset-0 opacity-75 rotate-[-6deg]"
              style={{
                backgroundImage: `url(${COUNTRIES.find((c) => c.code === stamp.code)?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(70%) sepia(30%) contrast(85%)",
                borderRadius: "4px",
                border: "1px solid rgba(0,0,0,0.2)",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.4)",
              }}
            />
            <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-md p-3 shadow-md transform rotate-[2deg] w-[50%] h-[75%]" style={{boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3), 2px 2px 5px rgba(0, 0, 0, 0.4)"}}>
              <div className="flex flex-col items-center text-gray-800">
                <div className="text-2xl sm:mb-1 mb-0 opacity-70">{getCountryFlag(stamp.code)}</div>
                <div className="text-sm hidden sm:flex font-semibold uppercase tracking-wider text-black/60">{stamp.name}</div>
                <div className="absolute inset-0 border-2 border-gray-700/60 rounded-md border-dashed"></div>
                <div className="absolute top-[-12px] right-[-12px] w-14 h-14 rounded-full border-2 border-green-700/90 border-dashed flex items-center justify-center transform rotate-[8deg] bg-gray-200 shadow-inner">
                  <span className="text-xs text-green-700/90 font-extrabold">VISITED</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Botón para añadir sello - solo mostrar si hay espacio en la página o es la última página */}
        {showSeal  && (
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

