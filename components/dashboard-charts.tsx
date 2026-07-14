"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { categoryData, trendData } from "@/lib/demo-data";

const tooltipStyle = {
  background: "#071b22",
  border: "1px solid rgba(242,240,232,.2)",
  borderRadius: 0,
  color: "#f2f0e8",
  fontSize: 11,
};

export function CategoryChart() {
  return (
    <div className="chart-panel">
      <div className="chart-title">
        <h3>Pareto por categoría</h3>
        <span>126 incidencias simuladas</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={categoryData}
          margin={{ left: -16, right: 8, top: 8, bottom: 18 }}
        >
          <CartesianGrid vertical={false} stroke="rgba(7,27,34,.08)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#596565" }}
            angle={-18}
            textAnchor="end"
            height={54}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#596565" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "rgba(67,213,189,.08)" }}
          />
          <Bar
            dataKey="value"
            fill="#0c816f"
            radius={[1, 1, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendChart() {
  return (
    <div className="chart-panel">
      <div className="chart-title">
        <h3>Abiertas / cerradas</h3>
        <span>Escenario trimestral</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={trendData}
          margin={{ left: -16, right: 16, top: 8, bottom: 8 }}
        >
          <CartesianGrid vertical={false} stroke="rgba(7,27,34,.08)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#596565" }} />
          <YAxis
            tick={{ fontSize: 11, fill: "#596565" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Line
            type="monotone"
            dataKey="abiertas"
            stroke="#e6b06c"
            strokeWidth={2}
            dot={{ r: 3 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="cerradas"
            stroke="#0c816f"
            strokeWidth={2}
            dot={{ r: 3 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
