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
const ChartTable = () => {
  const chartData = [
    { category: "Training", sessions: 43, percentage: 55, fill: "#D62027" },
    { category: "E-Learning", sessions: 12, percentage: 25, fill: "#E6797D" },
    { category: "Webinar", sessions: 5, percentage: 11, fill: "#EFA6A9" },
    { category: "Certification", sessions: 4, percentage: 9, fill: "#E6797D" },
  ];
  return (
    <Card className="flex flex-col p-0 border-transparent shadow-none border-none">
      <CardContent className="flex max-lg:flex-col flex-row p-0 ">
        <div className="lg:flex-1  h-[250px] w-[250px] lg:flex max-lg:mx-auto lg:items-center justify-center">
          <OverallChart />
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
                      className="h-3 w-3 rounded-full"
                    ></span>{" "}
                    <span>{data.category}</span>
                  </TableCell>
                  <TableCell>{data.sessions}</TableCell>
                  <TableCell>{data.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartTable;
