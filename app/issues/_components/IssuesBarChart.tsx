"use client";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssuesBarChart = ({ open, inProgress, closed }: Props) => {
  console.log(open, inProgress);
  const data = [
    {
      name: "Open",
      value: open,
    },
    {
      name: "In Progress",
      value: inProgress,
    },
    {
      name: "Closed",
      value: closed,
    },
  ];
  return (
    <Card>
      <ResponsiveContainer height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" barSize={40} fill="#654DC4" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssuesBarChart;
