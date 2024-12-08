"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  category: string;
  sessions: number;
  percentage: number;
  fill: string;
}

interface OverallChartProps {
  data: ChartData[];
}

export function OverallChart({ data }: OverallChartProps) {
  const totalSessions = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.sessions, 0);
  }, [data]);

  const chartConfig: ChartConfig = React.useMemo(() => {
    return data.reduce((acc, curr) => {
      acc[curr.category.toLowerCase()] = {
        label: curr.category,
        color: curr.fill,
      };
      return acc;
    }, {} as ChartConfig);
  }, [data]);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-lg:mx-auto max-h-[250px] h-full">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel className="bg-white" />}
        />
        <Pie
          data={data}
          dataKey="sessions"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
          paddingAngle={1}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground">
                      sessions
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold">
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
