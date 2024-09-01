"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the type for chart data
interface ChartData {
  module: number;
  percentage: number;
}

// Example data with the defined type
const chartData: ChartData[] = [
  // Uncomment the lines below to simulate empty chart data.
  // { module: 16, percentage: 85 },
  // { module: 17, percentage: 60 },
  // { module: 18, percentage: Math.floor(Math.random() * 100) },
  // { module: 19, percentage: Math.floor(Math.random() * 100) },
  // { module: 20, percentage: Math.floor(Math.random() * 100) },
  // { module: 21, percentage: Math.floor(Math.random() * 100) },
  // { module: 22, percentage: Math.floor(Math.random() * 100) },
  // { module: 23, percentage: Math.floor(Math.random() * 100) },
];

const chartConfig: ChartConfig = {
  percentage: {
    label: "Percentage",
    color: "hsl(var(--chart-1))",
  },
};

const TrainingModuleChart = () => {
  return (
    <Card className="border-0">
      <CardContent className="lg:-ml-5 shadow-none w-full -ml-5 p-0 overflow-hidden">
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="module"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="percentage"
                fill="#D62027"
                radius={8}
                maxBarSize={12}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="text-lg font-semibold text-neutral-800">
              No chart data available
            </div>
            <div className="mt-4 text-neutral-400">
              Please check back later or contact support.
            </div>
          </div>
        )}
      </CardContent>
      {chartData.length > 0 && (
        <CardFooter className="flex mt-3 items-start gap-2 text-sm">
          <span>X = (x) percentage</span>
          <span>Y = module (y)</span>
        </CardFooter>
      )}
    </Card>
  );
};

export default TrainingModuleChart;
