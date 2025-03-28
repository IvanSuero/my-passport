"use client"

import { useState } from "react"
import { usePassport } from "@/context/PassportContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { PassportData } from "@/context/PassportContext"

const PASSPORT_COLORS = [
  { name: "Red", value: "bg-red-900" },
  { name: "Blue", value: "bg-blue-900" },
  { name: "Green", value: "bg-green-900" },
  { name: "Black", value: "bg-black" },
  { name: "Purple", value: "bg-purple-900" },
  { name: "Brown", value: "bg-amber-800" },
]

interface PassportSettingsProps {
  currentSettings: PassportData
  onCancel: () => void
}

export function PassportSettings({ currentSettings, onCancel }: PassportSettingsProps) {
  const { setPassport } = usePassport()
  const [name, setName] = useState(currentSettings.name)
  const [ownerName, setOwnerName] = useState(currentSettings.ownerName)
  const [color, setColor] = useState(currentSettings.color)

  const handleSave = () => {
    setPassport({
      ...currentSettings,
      name,
      ownerName,
      color,
    })
    onCancel()
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajustes</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Titulo</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="PASSPORT" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ownerName">Nombre</Label>
            <Input
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="grid gap-2">
            <Label>Color de portada</Label>
            <div className="grid grid-cols-3 gap-2">
              {PASSPORT_COLORS.map((passportColor) => (
                <Button
                  key={passportColor.value}
                  type="button"
                  variant="outline"
                  className={`h-12 hover:cursor-pointer ${passportColor.value} ${color === passportColor.value ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                  onClick={() => setColor(passportColor.value)}
                >
                  <span className="sr-only">{passportColor.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} className="hover:cursor-pointer">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="hover:cursor-pointer">Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

