// components/ui/placeholder.tsx
"use client"

import React from "react"

interface PlaceholderProps {
  title?: string
  description?: string
}

export function Placeholder({
  title = "Coming Soon",
  description = "We’re working on something here. Check back later!",
}: PlaceholderProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
