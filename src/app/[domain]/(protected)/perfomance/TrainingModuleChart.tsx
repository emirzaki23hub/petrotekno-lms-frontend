"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { getScore } from "@/rest/perfomance";
import { Score } from "@/types";

// Define the type for chart data
interface ChartData {
  label: string;
  value: number;
}

const chartConfig: ChartConfig = {
  value: {
    label: "Percentage",
    color: "hsl(var(--chart-1))",
  },
};

const TrainingModuleChart = () => {
  const [trainings, setTrainings] = React.useState<Score[]>([]);
  const [loading, setLoading] = React.useState(true);

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        setLoading(true);

        const response = await getScore(token, partBeforeDot);
        const data = response?.data?.data;

        if (!Array.isArray(data)) {
          console.error("Training data is not an array");
          setTrainings([]);
          return;
        }

        setTrainings(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [partBeforeDot]);

  const chartData: ChartData[] = React.useMemo(() => {
    return trainings.map((training) => ({
      label: training.label,
      value: training.value,
    }));
  }, [trainings]);


  return (
    <Card className="border-0">
      <CardContent className="lg:-ml-5 shadow-none w-full -ml-5 p-0 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="text-lg font-semibold text-neutral-800">
              Loading chart data...
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" fill="#D62027" radius={8} maxBarSize={12} />
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
          <span>X = module (label)</span>
          <span>Y = (value) percentage</span>
        </CardFooter>
      )}
    </Card>
  );
};

export default TrainingModuleChart;
