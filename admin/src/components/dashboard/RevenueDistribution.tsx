import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ServiceData {
  name: string;
  revenue: number;
}

const data: ServiceData[] = [
  { name: "Deep Tissue Massage", revenue: 2100 },
  { name: "Facial Treatment", revenue: 1680 },
  { name: "Hot Stone Therapy", revenue: 1125 },
  { name: "Aromatherapy", revenue: 1320 },
  { name: "Body Scrub", revenue: 900 },
];

// Calculate total revenue
const totalRevenue = data.reduce((sum, service) => sum + service.revenue, 0);

// Calculate percentage for each service and prepare data for pie chart
const pieData = data.map((service) => ({
  name: service.name,
  value: service.revenue,
  percent: Math.round((service.revenue / totalRevenue) * 100),
}));

// Colors for the pie chart segments
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const RevenueDistribution = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Revenue Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${percent}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `$${value} (${Math.round((value / totalRevenue) * 100)}%)`,
                  "Revenue",
                ]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueDistribution;
