import "@/styles/globals.css"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "FootfallForesight - Landing",
  description: "Welcome to FootfallForesight",
}

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <header className="w-full bg-white border-b p-4 flex items-center justify-between relative">
            <h1 className="text-3xl font-bold text-green-700 absolute left-1/2 transform -translate-x-1/2">
                FootfallForesight
            </h1>
            <Button variant="secondary" className="ml-auto">Sign Out</Button>
        </header>

        {children}
      </body>
    </html>
  )
}
