import "@/styles/globals.css"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Stride",
  description: "Welcome to FootfallForesight",
}

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <header className="w-full bg-white border-b p-4 flex items-center justify-between relative h-15">
            <h1 className="text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">
              Stride
            </h1>
        </header>

        {children}
      </body>
    </html>
  )
}
