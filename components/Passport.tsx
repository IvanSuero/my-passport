"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Globe, Settings } from "lucide-react"
import { PassportPage } from "@/components/PassportPage"
import { usePassport } from "@/context/PassportContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PassportSettings } from "@/components/PassportSettings"
import { ShareLink } from "@/components/ShareLink"
import { useMobile } from "@/hooks/useMobile"

export function Passport() {
  const { passport } = usePassport()
  const [currentPages, setCurrentPages] = useState({left: 0, right: 0})
  const [showSettings, setShowSettings] = useState(false)
  const [showShareLink, setShowShareLink] = useState(false)

  const isMobile = useMobile()
  const passportRef = useRef<HTMLDivElement>(null)
  const [passportHeight, setPassportHeight] = useState(0)

  useEffect(() => {
    if (passportRef.current) {
      const updateHeight = () => {
        const height = passportRef.current?.offsetHeight || 0
        setPassportHeight(height)
      }

      updateHeight()

      window.addEventListener("resize", updateHeight)
      return () => window.removeEventListener("resize", updateHeight)
    }
  }, [])

  // Calcular el número total de páginas basado en los sellos (8 sellos por página)
  const stampsPerPage = 4
  const lastPage = Math.max(1, Math.ceil(passport.stamps.length / stampsPerPage))

  const nextPage = () => {
    let next
    if (isMobile) {
      if (currentPages.left === 0) {
        next = {left: 1, right: 1}
      } else {
        next = {left: currentPages.left + 1, right: currentPages.right + 1}
      }
    } else {
      if (currentPages.left === 0) {
        next = {left: 1, right: 2}
      } else {
        next = {left: currentPages.left + 2, right: currentPages.right + 2}
      }
    }

    setCurrentPages(next)
}

  const prevPage = () => {
    let prev
    if (isMobile) {
      if (currentPages.left === 1) {
        prev = {left: 0, right: 0}
      } else {
        prev = {left: currentPages.left - 1, right: currentPages.right - 1}
      }
    } else {
      if (currentPages.left === 1) {
        prev = {left: 0, right: 1}
      } else {
        prev = {left: currentPages.left - 2, right: currentPages.right - 2}
      }
    }

    setCurrentPages(prev)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div
        ref={passportRef}
        className={cn("relative rounded-lg overflow-hidden", passport.color)}
        style={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          backgroundImage: "url('/passport-texture.png')",
          backgroundBlendMode: "multiply",
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: "12px",
          width: currentPages.left === 0 ? "100%" : isMobile ? '100%' : passportHeight ? `${passportHeight * 1.6}px` : "160%",
          height: passportHeight || 'auto',
          transformOrigin: "center",
          aspectRatio: currentPages.left === 0 ? "3/4" : isMobile ? '3/4' : "auto",
        }}
      >
        {/* Cover */}
        {currentPages.left === 0 && (
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
        {currentPages.left > 0 && (
          <div className="flex flex-row h-full w-full">
            {isMobile ? (
              <div
              className="bg-amber-50 overflow-hidden w-full"
              style={{
                backgroundImage: "url('/passport-page-texture.png')",
                backgroundSize: "cover",
              }}
            >
              <PassportPage pageNumber={currentPages.left} />
              <div className="relative bottom-8 left-0 right-0 flex justify-center text-gray-400 text-sm">
                Page {currentPages.left}
              </div>
            </div>
            ) : (
              <>
                <div
                  className="bg-amber-50 overflow-hidden w-1/2 border-r border-amber-950 shadow-r"
                  style={{
                    backgroundImage: "url('/passport-page-texture.png')",
                    backgroundSize: "cover",
                  }}
                >
                  <PassportPage pageNumber={currentPages.left} />
                  <div className="relative bottom-8 left-0 right-0 flex justify-center text-gray-400 text-sm">
                    Pág {currentPages.left}
                  </div>
                </div>
                <div
                  className="bg-amber-50 overflow-hidden w-1/2"
                  style={{
                    backgroundImage: "url('/passport-page-texture.png')",
                    backgroundSize: "cover",
                  }}
                >
                  <PassportPage pageNumber={currentPages.right} />
                  <div className="relative bottom-8 left-0 right-0 flex justify-center text-gray-400 text-sm">
                    Pág {currentPages.right}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="absolute inset-y-0 left-2 flex items-center">
          {currentPages.left > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPage}
              className="h-8 w-8 rounded-full bg-white/80 text-gray-800 hover:cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="absolute inset-y-0 right-2 flex items-center">
          {currentPages.right < lastPage+1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={nextPage}
              className="h-8 w-8 rounded-full bg-white/80 text-gray-800 hover:cursor-pointer"
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
            className="h-8 w-8 rounded-full bg-white/80 text-gray-800 hover:bg-white/90 hover:cursor-pointer"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSettings && <PassportSettings currentSettings={passport} onCancel={() => setShowSettings(false)} />}
      {showShareLink && <ShareLink passport={passport} onClose={() => setShowShareLink(false)} />}

      {/* Button to download */}
      <div className="flex justify-center w-full mt-4">
        <Button
          onClick={() => setShowShareLink(true)}
          className="w-full hover:cursor-pointer"
        >
          Guardar pasaporte
        </Button>
      </div>
    </div>
  )
}

