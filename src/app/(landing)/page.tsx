"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BIRDS from "vanta/dist/vanta.birds.min"
import * as THREE from "three"

export default function LandingPage() {
  const vantaRef = useRef<HTMLDivElement>(null)
  let vantaEffect: any = null

  useEffect(() => {
    if (!vantaRef.current) return

    vantaEffect = BIRDS({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0xffffff,
      backgroundAlpha: 1.0,
      color1: 0x10b981,
      color2: 0x34d399,
      birdSize: 1.0,
      wingSpan: 30.0,
      speedLimit: 5.0,
      separation: 40.0,
      alignment: 20.0,
      cohesion: 20.0,
      quantity: 10,
    })

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [])

  return (
    <main ref={vantaRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto p-8 bg-white/70 backdrop-blur-sm rounded-lg shadow-lg text-center">
        <h2 className="text-5xl sm:text-6xl font-extrabold text-green-700 mb-6">
          Welcome to FootfallForesight
        </h2>
        <p className="text-xl text-gray-800 mb-8">
          Predict your venue’s footfall, refine predictions with real-time feedback, 
          and make data-driven decisions to optimize operations.
        </p>
        <div>
          <Link href="/setup">
            <Button 
              size="lg" 
              className="bg-green-700/90 hover:bg-green-800 text-white font-semibold px-6 py-3"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
