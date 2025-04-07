import "@/styles/globals.css"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "FootfallForesight - App",
  description: "App Dashboard & Predictions",
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex flex-col">
        {/* Header */}
        <header className="w-full bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-700">FootfallForesight</h1>
          <Button variant="secondary">Sign Out</Button>
        </header>

        <div className="flex flex-1">
          <aside className="w-64 bg-white border-r p-4">
            <nav className="flex flex-col gap-2">
              <a href="/(app)" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                Home
              </a>
              <a href="/(app)/setup" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                Setup
              </a>
              <a href="/(app)/view" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                View Predictions
              </a>
            </nav>
          </aside>

          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
