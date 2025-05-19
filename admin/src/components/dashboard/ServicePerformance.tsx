import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ServiceData {
  name: string;
  bookings: number;
  revenue: number;
}

const data: ServiceData[] = [
  { name: "Deep Tissue Massage", bookings: 42, revenue: 2100 },
  { name: "Facial Treatment", bookings: 28, revenue: 1680 },
  { name: "Hot Stone Therapy", bookings: 15, revenue: 1125 },
  { name: "Aromatherapy", bookings: 22, revenue: 1320 },
  { name: "Body Scrub", bookings: 18, revenue: 900 },
];

const ServicePerformance = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Top Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  value.length > 12 ? `${value.substring(0, 12)}...` : value
                }
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                formatter={(value: number) => [`${value} bookings`, "Bookings"]}
              />
              <Bar dataKey="bookings" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicePerformance;
