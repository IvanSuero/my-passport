import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { jsonToUrl } from "@/lib/jsonToUrl"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ShareLink({passport, onClose}:{passport: any, onClose: () => void}) {
  const [shareLink, setShareLink] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const generateShareLink = async () => {
      setShareLink(await jsonToUrl({jsonData: passport}))
    }
    generateShareLink()
  }, [])

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>GUARDA TU PASAPORTE</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="shareUrl">Enlace para guardar</Label>
            <div className="flex items-center gap-2">
              <Input id="shareUrl" value={shareLink} readOnly className="flex-1" />
              <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-10 w-10">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Guarda este enlace para acceder a él siempre que quieras. Cuando lo modifiques, vuelve a copiar el nuevo enlace.
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:w-auto w-full">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}