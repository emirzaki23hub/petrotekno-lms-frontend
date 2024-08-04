"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { category: "Training", sessions: 43, percentage: 55, fill: "#D62027" },
  { category: "E-Learning", sessions: 12, percentage: 25, fill: "#E6797D" },
  { category: "Webinar", sessions: 5, percentage: 11, fill: "#EFA6A9" },
  { category: "Certification", sessions: 4, percentage: 9, fill: "#E6797D" },
];

const chartConfig = {
  training: {
    label: "Training",
    color: "#D62027",
  },
  eLearning: {
    label: "E-Learning",
    color: "#E6797D",
  },
  webinar: {
    label: "Webinar",
    color: "#EFA6A9",
  },
  certification: {
    label: "Certification",
    color: "#E6797D",
  },
} satisfies ChartConfig;

export function OverallChart() {
  const totalSessions = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.sessions, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-lg:mx-auto max-h-[250px] h-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel className="bg-white" />}
        />
        <Pie
          data={chartData}
          dataKey="sessions"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
          paddingAngle={1}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      sessions
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalSessions.toLocaleString()}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
