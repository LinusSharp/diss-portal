"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

import { Calendar } from "lucide-react"

type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

type OpeningHoursMap = {
  [K in DayOfWeek]: {
    open: string
    close: string
  }
}

export default function SetupPage() {
  const [city, setCity] = useState("")
  const [industry, setIndustry] = useState("Coffee Shop")
  const [fileName, setFileName] = useState<string | null>(null)
  const [openingHours, setOpeningHours] = useState<OpeningHoursMap>({
    monday: { open: "09:00", close: "17:00" },
    tuesday: { open: "09:00", close: "17:00" },
    wednesday: { open: "09:00", close: "17:00" },
    thursday: { open: "09:00", close: "17:00" },
    friday: { open: "09:00", close: "17:00" },
    saturday: { open: "09:00", close: "17:00" },
    sunday: { open: "09:00", close: "17:00" },
  })

  const [showDialog, setShowDialog] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0].name)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    noClick: true,
    noKeyboard: true,
  })

  const handleSave = () => {
    setShowDialog(true)
  }

  return (
    <section className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Setup Your Venue</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select City</CardTitle>
              <CardDescription>Choose a major UK city.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="city">City</Label>
              <Select onValueChange={(val) => setCity(val)} defaultValue="">
                <SelectTrigger id="city" className="w-full">
                  <SelectValue placeholder={city || "Select a city"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="Manchester">Manchester</SelectItem>
                  <SelectItem value="Birmingham">Birmingham</SelectItem>
                  <SelectItem value="Leeds">Leeds</SelectItem>
                  <SelectItem value="Liverpool">Liverpool</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industry</CardTitle>
              <CardDescription>Select your business type.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(val) => setIndustry(val)}
                defaultValue="Coffee Shop"
              >
                <SelectTrigger id="industry" className="w-full">
                  <SelectValue placeholder={industry} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coffee Shop">Coffee Shop</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Pub">Pub</SelectItem>
                  <SelectItem value="Bar">Bar</SelectItem>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Import</CardTitle>
              <CardDescription>Upload your CSV file for footfall data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer
                  ${
                    isDragActive
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
              >
                <input {...getInputProps()} />
                {fileName ? (
                  <p className="text-sm text-gray-600">
                    File Selected: <strong>{fileName}</strong>
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Drag & drop a CSV file here, or click below.
                  </p>
                )}
                <Button variant="outline" className="mt-4" onClick={open}>
                  Select a File
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Opening Hours</CardTitle>
              <CardDescription>Set your daily schedule.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {Object.entries(openingHours).map(([day, times]) => {
                  const typedDay = day as DayOfWeek
                  return (
                    <div
                      key={typedDay}
                      className="space-y-2 border rounded-md p-3"
                    >
                      <Label className="font-semibold capitalize">
                        {typedDay}
                      </Label>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <Input
                            type="time"
                            value={times.open}
                            onChange={(e) =>
                              setOpeningHours((prev) => ({
                                ...prev,
                                [typedDay]: {
                                  ...prev[typedDay],
                                  open: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                        <span>to</span>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <Input
                            type="time"
                            value={times.close}
                            onChange={(e) =>
                              setOpeningHours((prev) => ({
                                ...prev,
                                [typedDay]: {
                                  ...prev[typedDay],
                                  close: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          className="px-8 text-lg"
          onClick={handleSave}
        >
          Save Setup
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Processing Your Data</DialogTitle>
            <DialogDescription>
              Our team will now process your data and tune a model based on your
              needs. You’ll be able to view predictions on the Dashboard page
              once this is ready.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
