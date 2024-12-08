"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OverallChart } from "./OverallChart";
import { TrainingStats } from "@/types";
import { getIntakes } from "@/rest/perfomance";
import { useDomainHelper } from "@/hooks/useDomainHelper";

// Define the type for chart data
interface ChartData {
  category: string;
  sessions: number;
  percentage: number;
  fill: string;
}

const ChartTable = () => {
  const [trainings, setTrainings] = React.useState<TrainingStats[]>([]);
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

        const response = await getIntakes(token, partBeforeDot);
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

  // Map trainings data to chartData with fill colors
  const chartColors = ["#D62027", "#E6797D", "#EFA6A9", "#E6797D"];
  const chartData: ChartData[] = trainings.map((training, index) => ({
    category: training.category,
    sessions: training.session,
    percentage: training.percentage,
    fill: chartColors[index % chartColors.length], // Cycle through colors
  }));

  return (
    <Card className="flex flex-col p-0 border-transparent shadow-none border-none">
      <CardContent className="flex max-lg:flex-col flex-row p-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-6 w-full h-full">
            <div className="text-lg font-semibold text-neutral-800">
              Loading data...
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <>
            <div className="lg:flex-1 h-[250px] w-[250px] lg:flex max-lg:mx-auto lg:items-center justify-center">
              <OverallChart data={chartData} />
            </div>
            <div className="flex-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Sessions</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chartData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center gap-1">
                        <span
                          style={{ background: data.fill }}
                          className="h-3 w-3 rounded-full"></span>{" "}
                        <span>{data.category}</span>
                      </TableCell>
                      <TableCell>{data.sessions}</TableCell>
                      <TableCell>{data.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 w-full h-full">
            <div className="text-lg font-semibold text-neutral-800">
              No data available
            </div>
            <div className="mt-4 text-neutral-400">
              Please check back later or contact support.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartTable;
