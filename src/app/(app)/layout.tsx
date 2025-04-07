import "@/styles/globals.css"
import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Stride",
  description: "App Dashboard & Predictions",
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <header className="w-full bg-white border-b p-4 flex items-center justify-between relative h-15">
            <h1 className="text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">
              Stride
            </h1>
        </header>
        <SidebarProvider defaultOpen>
          <div className="flex flex-1">
            <AppSidebar />
            <main className="flex-1 p-6 overflow-auto">
              <SidebarTrigger className="md:hidden mb-4" />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
