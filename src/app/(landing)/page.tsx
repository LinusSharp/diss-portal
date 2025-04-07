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
      color1: 0x0f766e,
      color2: 0x5eead4,
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
    <main
      ref={vantaRef}
      className="relative min-h-screen flex items-center  overflow-hidden"
    >
      <div className="relative z-10 max-w-2xl mx-auto p-8 bg-white backdrop-blur-sm rounded-2xl shadow-xl text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
          Stride
        </h1>
        <p className="text-xl font-medium text-gray-800 mb-2">
          Step Ahead.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Forecast foot traffic in real-time and make smarter staffing, stock, and marketing decisions before the day even begins.
        </p>
        <Link href="/dashboard">
          <Button
            size="lg"
            className=" text-white font-semibold px-6 py-3"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  )
}
