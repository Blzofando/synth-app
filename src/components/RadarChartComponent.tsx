"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { subject: "Lógica", value: 85, fullMark: 100 },
  { subject: "Teoria", value: 65, fullMark: 100 },
  { subject: "Prática", value: 90, fullMark: 100 },
  { subject: "Escrita", value: 70, fullMark: 100 },
  { subject: "Foco", value: 80, fullMark: 100 },
];

export function RadarChartComponent() {
  return (
    <div className="h-[250px] sm:h-[300px] w-full mt-4 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockData}>
          <PolarGrid stroke="#231C3B" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "#A19AB2", fontSize: 12 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#7C28D6"
            strokeWidth={2}
            fill="#7C28D6"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
