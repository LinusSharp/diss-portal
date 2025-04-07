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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip as RechartsTooltip,
} from "recharts"
import { TrendingUp } from "lucide-react"

type TimeFrame = "daily" | "weekly" | "monthly"
type FootfallCategory = "Low" | "Medium-Low" | "Medium-High" | "High"

type CategoryDataPoint = {
  label: string
  predictedCat: FootfallCategory
  actualCat: FootfallCategory
}

function randomCategory() {
  const cats: FootfallCategory[] = ["Low", "Medium-Low", "Medium-High", "High"]
  return cats[Math.floor(Math.random() * cats.length)]
}

function generateRandomWeek(weekNum: number): CategoryDataPoint[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  return days.map((day) => ({
    label: `${day} (W${weekNum})`,
    predictedCat: randomCategory(),
    actualCat: randomCategory(),
  }))
}

const HISTORICAL_WEEKS = 5
const historicalWeeksData: CategoryDataPoint[][] = []
for (let i = 1; i <= HISTORICAL_WEEKS; i++) {
  historicalWeeksData.push(generateRandomWeek(i))
}

export default function HistoricalPage() {
  const [accuracy] = useState(86)

  const [chartMode, setChartMode] = useState<"line" | "box">("line")
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily")

  const dailyData = [
    { label: "Mon", predicted: 150, actual: 140 },
    { label: "Tue", predicted: 180, actual: 175 },
    { label: "Wed", predicted: 170, actual: 165 },
    { label: "Thu", predicted: 160, actual: 150 },
    { label: "Fri", predicted: 220, actual: 210 },
    { label: "Sat", predicted: 300, actual: 290 },
    { label: "Sun", predicted: 250, actual: 240 },
  ]
  const weeklyData = [
    { label: "Week 1", predicted: 1200, actual: 1180 },
    { label: "Week 2", predicted: 1300, actual: 1320 },
    { label: "Week 3", predicted: 1400, actual: 1350 },
    { label: "Week 4", predicted: 1500, actual: 1480 },
  ]
  const monthlyData = [
    { label: "Jan", predicted: 5300, actual: 5200 },
    { label: "Feb", predicted: 5600, actual: 5700 },
    { label: "Mar", predicted: 5800, actual: 5900 },
    { label: "Apr", predicted: 6000, actual: 6100 },
    { label: "May", predicted: 6500, actual: 6400 },
    { label: "Jun", predicted: 6700, actual: 6650 },
  ]

  const numericData =
    timeFrame === "daily" ? dailyData : timeFrame === "weekly" ? weeklyData : monthlyData

  const [weekIndex, setWeekIndex] = useState(0)
  const handlePrevWeek = () => {
    if (weekIndex > 0) setWeekIndex((i) => i - 1)
  }
  const handleNextWeek = () => {
    if (weekIndex < HISTORICAL_WEEKS - 1) setWeekIndex((i) => i + 1)
  }

  const catData: CategoryDataPoint[] = historicalWeeksData[weekIndex]

  const categoryMap: Record<FootfallCategory, number> = {
    Low: 1,
    "Medium-Low": 2,
    "Medium-High": 3,
    High: 4,
  }
  const processedCatData = catData.map((d) => ({
    label: d.label,
    predictedVal: categoryMap[d.predictedCat],
    actualVal: categoryMap[d.actualCat],
  }))

  const chartConfig: ChartConfig = {
    predicted: {
      label: "Predicted",
      color: "#4f46e5",
    },
    actual: {
      label: "Actual",
      color: "#22c55e",
    },
  }

  const chartLabel =
    timeFrame === "daily"
      ? "Daily Footfall"
      : timeFrame === "weekly"
      ? "Weekly Footfall"
      : "Monthly Footfall"

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">
          This model is currently {accuracy}% accurate
        </h2>
        <p className="text-gray-600">
          This page is for viewing all historical predictions.
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={chartMode === "line" ? "default" : "outline"}
          onClick={() => setChartMode("line")}
        >
          Line Chart
        </Button>
        <Button
          variant={chartMode === "box" ? "default" : "outline"}
          onClick={() => setChartMode("box")}
        >
          Category Box Plot
        </Button>
      </div>

      {chartMode === "line" && (
        <div className="flex gap-2">
          <Button
            variant={timeFrame === "daily" ? "default" : "outline"}
            onClick={() => setTimeFrame("daily")}
          >
            Daily
          </Button>
          <Button
            variant={timeFrame === "weekly" ? "default" : "outline"}
            onClick={() => setTimeFrame("weekly")}
          >
            Weekly
          </Button>
          <Button
            variant={timeFrame === "monthly" ? "default" : "outline"}
            onClick={() => setTimeFrame("monthly")}
          >
            Monthly
          </Button>
        </div>
      )}

      {chartMode === "line" ? (
        <Card>
          <CardHeader>
            <CardTitle>{chartLabel} - Historical</CardTitle>
            <CardDescription>
              Numeric footfall data (historical). No on-click for details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto w-2/3">
              <ChartContainer config={chartConfig}>
                <LineChart
                  data={numericData}
                  margin={{ left: 12, right: 12 }}
                  width={266}
                  height={133}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis axisLine={false} tickLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                  <Line
                    dataKey="predicted"
                    type="monotone"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot
                  />
                  <Line
                    dataKey="actual"
                    type="monotone"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Historical numeric predictions
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Daily Footfall - Historical Categories</CardTitle>
            <CardDescription>
             predictions vs. actual categories (Low=1, High=4).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto w-2/3">
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={processedCatData}
                  margin={{ left: 12, right: 12 }}
                  width={266}
                  height={133}
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
                  <Bar dataKey="actualVal" fill="#22c55e" name="Actual" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handlePrevWeek} disabled={weekIndex === 0}>
                Previous Week
              </Button>
              <span className="text-sm text-muted-foreground">
                Viewing historical data for <strong>Week {weekIndex + 1}</strong>
              </span>
              <Button
                variant="outline"
                onClick={handleNextWeek}
                disabled={weekIndex === historicalWeeksData.length - 1}
              >
                Next Week
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
