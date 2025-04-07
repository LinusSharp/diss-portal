// src/app/setup/page.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SetupPage() {
  const [city, setCity] = useState("")
  const [industry, setIndustry] = useState("Coffee Shop")
  const [openingHours, setOpeningHours] = useState({
    monday: { open: "09:00", close: "17:00" },
  })
  const [csvFile, setCsvFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("City:", city)
    console.log("Industry:", industry)
    console.log("CSV File:", csvFile)
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Setup Your Venue</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="e.g. London"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <select
            id="industry"
            className="border rounded-md p-2 w-full"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="Coffee Shop">Coffee Shop</option>
            <option value="Retail">Retail</option>
            <option value="Pub">Pub</option>
            <option value="Bar">Bar</option>
          </select>
        </div>

        <div>
          <Label>Opening Hours (Mon)</Label>
          <div className="flex items-center gap-2">
            <Input
              type="time"
              value={openingHours.monday.open}
              onChange={(e) =>
                setOpeningHours((prev) => ({
                  ...prev,
                  monday: {
                    ...prev.monday,
                    open: e.target.value
                  }
                }))
              }
            />
            <span>to</span>
            <Input
              type="time"
              value={openingHours.monday.close}
              onChange={(e) =>
                setOpeningHours((prev) => ({
                  ...prev,
                  monday: {
                    ...prev.monday,
                    close: e.target.value
                  }
                }))
              }
            />
          </div>
        </div>

        <div>
          <Label htmlFor="csv">Upload CSV</Label>
          <Input
            type="file"
            id="csv"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </section>
  )
}
