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
  background: "var(--ink)",
  border: "1px solid var(--line-dark)",
  borderRadius: 0,
  color: "var(--paper)",
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
          <CartesianGrid vertical={false} stroke="var(--line)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--muted)" }}
            angle={-18}
            textAnchor="end"
            height={54}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "var(--aqua-soft)" }}
          />
          <Bar
            dataKey="value"
            fill="var(--aqua-dark)"
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
          <CartesianGrid vertical={false} stroke="var(--line)" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "var(--muted)" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Line
            type="monotone"
            dataKey="abiertas"
            stroke="var(--amber)"
            strokeWidth={2}
            dot={{ r: 3 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="cerradas"
            stroke="var(--aqua-dark)"
            strokeWidth={2}
            dot={{ r: 3 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
