"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts"

type FootfallCategory = "Low" | "Medium-Low" | "Medium-High" | "High"

const categoryMap: Record<FootfallCategory, number> = {
  Low: 1,
  "Medium-Low": 2,
  "Medium-High": 3,
  High: 4,
}

type HourlyDataPoint = {
  hour: string
  predicted: number
}

function getMockHourlyData(): HourlyDataPoint[] {
  return [
    { hour: "9 AM", predicted: 10 },
    { hour: "10 AM", predicted: 30 },
    { hour: "11 AM", predicted: 50 },
    { hour: "12 PM", predicted: 80 },
    { hour: "1 PM", predicted: 70 },
    { hour: "2 PM", predicted: 50 },
    { hour: "3 PM", predicted: 30 },
    { hour: "4 PM", predicted: 20 },
    { hour: "5 PM", predicted: 10 },
  ]
}

function categoryColor(cat: FootfallCategory) {
  switch (cat) {
    case "High":
      return "text-red-600"
    case "Medium-High":
      return "text-orange-500"
    case "Medium-Low":
      return "text-yellow-600"
    case "Low":
      return "text-green-600"
  }
}

function footfallColor(value: number) {
  if (value >= 250) return "text-red-600"
  if (value >= 200) return "text-orange-500"
  if (value >= 150) return "text-yellow-600"
  return "text-green-600"
}

function generateTomorrowReason(category: FootfallCategory) {
  switch (category) {
    case "High":
      return (
        "Warmer weather is expected, plus it's a weekend with local events. " +
        "We anticipate increased coffee runs throughout the day."
      )
    case "Medium-High":
      return (
        "Mild weather and mid-week foot traffic. People are likely to grab a coffee " +
        "before work or during lunch breaks."
      )
    case "Medium-Low":
      return (
        "Cooler day and fewer local events. We still expect some activity from regulars, " +
        "but not a significant rush."
      )
    case "Low":
      return (
        "No special events, likely a slower weekday. People may be staying indoors " +
        "or skipping coffee runs."
      )
  }
}

export default function UpcomingPage() {
  const [yesterdayCategory, setYesterdayCategory] = useState<FootfallCategory>("Medium-High")
  const [yesterdayFootfall, setYesterdayFootfall] = useState(210)
  const [yesterdayFeedback, setYesterdayFeedback] = useState<"yes" | "no" | null>(null)
  const [yesterdayCorrectedCat, setYesterdayCorrectedCat] = useState<FootfallCategory>("Low")

  const [todayCategory, setTodayCategory] = useState<FootfallCategory>("Medium-Low")
  const [todayFootfall, setTodayFootfall] = useState(190)
  const [todayFeedback, setTodayFeedback] = useState<"yes" | "no" | null>(null)
  const [todayCorrectedCat, setTodayCorrectedCat] = useState<FootfallCategory>("Low")

  const [tomorrowCategory, setTomorrowCategory] = useState<FootfallCategory>("High")
  const [tomorrowFootfall, setTomorrowFootfall] = useState(280)
  const tomorrowReason = generateTomorrowReason(tomorrowCategory)

  const next7days = [
    { day: "Day 1", predictedCat: "High" },
    { day: "Day 2", predictedCat: "Medium-Low" },
    { day: "Day 3", predictedCat: "Medium-High" },
    { day: "Day 4", predictedCat: "Low" },
    { day: "Day 5", predictedCat: "Medium-High" },
    { day: "Day 6", predictedCat: "Medium-Low" },
    { day: "Day 7", predictedCat: "High" },
  ]
  const processedNext7 = next7days.map((d) => ({
    label: d.day,
    predictedVal: categoryMap[d.predictedCat as FootfallCategory],
  }))

  const [overlayVisible, setOverlayVisible] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  function handleBarClick(dayLabel: string) {
    setSelectedDay(dayLabel)
    setOverlayVisible(true)
  }

  const chartConfig: ChartConfig = {
    predicted: { label: "Predicted", color: "#4f46e5" },
  }

  const hourData = getMockHourlyData()

  function closeOverlay() {
    setOverlayVisible(false)
    setSelectedDay(null)
  }

  return (
    <div className="p-6 space-y-6 relative">
      <h1 className="text-2xl font-bold">Upcoming Predictions</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Yesterday’s Prediction</CardTitle>
            <CardDescription >
              Category: {yesterdayCategory}, Footfall: {yesterdayFootfall}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label className="block mb-2">Was this accurate?</Label>
            <div className="flex gap-2 mb-4">
              <Button
                variant={yesterdayFeedback === "yes" ? "default" : "outline"}
                onClick={() => setYesterdayFeedback("yes")}
              >
                Yes
              </Button>
              <Button
                variant={yesterdayFeedback === "no" ? "default" : "outline"}
                onClick={() => setYesterdayFeedback("no")}
              >
                No
              </Button>
            </div>
            {yesterdayFeedback === "no" && (
              <div className="space-y-2">
                <Label htmlFor="yCat">What was the correct category?</Label>
                <select
                  id="yCat"
                  className="border rounded-md p-2 w-full"
                  value={yesterdayCorrectedCat}
                  onChange={(e) => setYesterdayCorrectedCat(e.target.value as FootfallCategory)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium-Low">Medium-Low</option>
                  <option value="Medium-High">Medium-High</option>
                  <option value="High">High</option>
                </select>
                <Button
                  onClick={() =>
                    alert(
                      `Yesterday corrected to ${yesterdayCorrectedCat} (Pretend we store it)`
                    )
                  }
                >
                  Submit Correction
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today’s Prediction</CardTitle>
            <CardDescription>
              Category: {todayCategory}, Footfall: {todayFootfall}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label className="block mb-2">Was this accurate?</Label>
            <div className="flex gap-2 mb-4">
              <Button
                variant={todayFeedback === "yes" ? "default" : "outline"}
                onClick={() => setTodayFeedback("yes")}
              >
                Yes
              </Button>
              <Button
                variant={todayFeedback === "no" ? "default" : "outline"}
                onClick={() => setTodayFeedback("no")}
              >
                No
              </Button>
            </div>
            {todayFeedback === "no" && (
              <div className="space-y-2">
                <Label htmlFor="tCat">What was the correct category?</Label>
                <select
                  id="tCat"
                  className="border rounded-md p-2 w-full"
                  value={todayCorrectedCat}
                  onChange={(e) => setTodayCorrectedCat(e.target.value as FootfallCategory)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium-Low">Medium-Low</option>
                  <option value="Medium-High">Medium-High</option>
                  <option value="High">High</option>
                </select>
                <Button
                  onClick={() =>
                    alert(`Today corrected to ${todayCorrectedCat} (Pretend we store it)`)
                  }
                >
                  Submit Correction
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tomorrow’s Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <p className={`text-lg font-semibold ${categoryColor(tomorrowCategory)}`}>
                Category: {tomorrowCategory}
              </p>
              <p className={`text-lg font-semibold ${footfallColor(tomorrowFootfall)}`}>
                Footfall: {tomorrowFootfall}
              </p>
            </div>

            <div className="flex-1 space-y-2">
              <Label className="block font-semibold text-gray-700">
                Why this prediction?
              </Label>
              <p className="text-sm text-gray-600">{tomorrowReason}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next 7 Days - Category Predictions</CardTitle>
          <CardDescription>
            Each bar indicates Low=1, Medium-Low=2, Medium-High=3, High=4
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-2/3">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={processedNext7}
                margin={{ left: 12, right: 12 }}
                width={266}
                height={133}
                onClick={(state) => {
                  if (state && state.activeLabel) {
                    handleBarClick(state.activeLabel)
                  }
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  domain={[0, 4.5]}
                  tickCount={5}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <RechartsTooltip
                  cursor={{ fill: "rgba(200,200,200,0.2)" }}
                  formatter={(value) => {
                    const cat = Object.entries(categoryMap).find(
                      ([, v]) => v === value
                    )
                    return cat ? cat[0] : value
                  }}
                />
                <Bar dataKey="predictedVal" fill="#4f46e5" name="Predicted" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {overlayVisible && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-screen-lg w-full h-auto relative">
            <button
              onClick={closeOverlay}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-2">
              Hour-by-Hour Footfall for {selectedDay}
            </h2>
            <ChartContainer config={{ predicted: { label: "Predicted", color: "#4f46e5" } }}>
              <LineChart
                data={hourData}
                width={600}
                height={300}
                margin={{ left: 12, right: 12, top: 30}}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="predicted"
                  type="monotone"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      )}
    </div>
  )
}
