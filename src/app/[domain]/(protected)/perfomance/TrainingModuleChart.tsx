"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { module: 16, percentage: 85 },
  { module: 17, percentage: 60 },
  { module: 18, percentage: Math.floor(Math.random() * 100) },
  { module: 19, percentage: Math.floor(Math.random() * 100) },
  { module: 20, percentage: Math.floor(Math.random() * 100) },
  { module: 21, percentage: Math.floor(Math.random() * 100) },
  { module: 22, percentage: Math.floor(Math.random() * 100) },
  { module: 23, percentage: Math.floor(Math.random() * 100) },
];

const chartConfig = {
  percentage: {
    label: "Percentage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const TrainingModuleChart = () => {
  return (
    <Card className="border-0">
      <CardContent className="lg:-ml-5 shadow-none w-full -ml-5 p-0 overflow-hidden ">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="module"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              //   tickFormatter={(value) => `${value}%`}
              //   domain={[0, 100]}
              //   ticks={[0, 20, 40, 60, 80, 100]}
            />
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
      </CardContent>
      <CardFooter className="flex mt-3 items-start gap-2 text-sm">
        <span>X = (x) percentage</span>
        <span>Y = module (y)</span>
      </CardFooter>
    </Card>
  );
};

export default TrainingModuleChart;
