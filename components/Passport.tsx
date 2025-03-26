"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Globe, Settings } from "lucide-react"
import { PassportPage } from "@/components/PassportPage"
import { usePassport } from "@/context/PassportContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PassportSettings } from "@/components/PassportSettings"

export function Passport() {
  const { passport } = usePassport()
  const [currentPage, setCurrentPage] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  // Calcular el número total de páginas basado en los sellos (8 sellos por página)
  const stampsPerPage = 4
  const lastPage = Math.max(1, Math.ceil(passport.stamps.length / stampsPerPage))

  const nextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div
        className={cn("relative w-full aspect-[3/4] rounded-lg overflow-hidden", passport.color)}
        style={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          backgroundImage: "url('/passport-texture.png')",
          backgroundBlendMode: "multiply",
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: "12px",
        }}
      >
        {/* Cover */}
        {currentPage === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div
              className="w-16 h-16 mb-6 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(45deg, #d4af37, #f9f295, #d4af37)" }}
            >
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="text-white text-center">
              <div className="mb-2 text-sm uppercase tracking-widest">{passport.name}</div>
              <div className="text-xl font-bold mb-4">{passport.ownerName}</div>
              <div className="mt-8 border-t border-white/30 pt-4 text-xs text-white/70">Virtual Passport</div>
            </div>

            {/* Decorative passport elements */}
            <div className="absolute bottom-6 left-6 right-6 border-b border-white/20"></div>
            <div className="absolute top-6 left-6 right-6 border-b border-white/20"></div>
            <div className="absolute top-6 bottom-6 left-6 border-l border-white/20"></div>
            <div className="absolute top-6 bottom-6 right-6 border-l border-white/20"></div>
          </div>
        )}

        {/* Passport pages */}
        {currentPage > 0 && (
          <div
            className="absolute inset-0 bg-amber-50 overflow-hidden"
            style={{
              backgroundImage: "url('/passport-page-texture.png')",
              backgroundSize: "cover",
            }}
          >
            <PassportPage pageNumber={currentPage} />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center text-gray-400 text-sm">
              Page {currentPage} of {lastPage}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="absolute inset-y-0 left-2 flex items-center">
          {currentPage > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPage}
              className="h-8 w-8 rounded-full bg-white/80 text-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="absolute inset-y-0 right-2 flex items-center">
          {currentPage < lastPage && (
            <Button
              variant="ghost"
              size="icon"
              onClick={nextPage}
              className="h-8 w-8 rounded-full bg-white/80 text-gray-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Botón de ajustes en la esquina inferior derecha */}
        <div className="absolute bottom-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(true)}
            className="h-8 w-8 rounded-full bg-white/80 text-gray-800 hover:bg-white/90"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSettings && <PassportSettings currentSettings={passport} onCancel={() => setShowSettings(false)} />}
    </div>
  )
}

