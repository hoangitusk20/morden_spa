import AdminLayout from "../components/layouts/AdminLayout";
import StatsCard from "../components/dashboard/StatsCard";
import ServicePerformance from "../components/dashboard/ServicePerformance";
import RevenueChart from "../components/dashboard/RevenueChart";
import { Calendar, CreditCard, Users } from "lucide-react";
import RevenueDistribution from "@/components/dashboard/RevenueDistribution";

// Mock data for demonstration

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your spa's performance and operations.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Bookings"
            value="248"
            subtitle="This month"
            trend={12}
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatsCard
            title="Total Revenue"
            value="$15,890"
            subtitle="This month"
            trend={8}
            icon={<CreditCard className="h-4 w-4" />}
          />
          <StatsCard
            title="New customers"
            value="45"
            subtitle="This month"
            icon={<Users className="h-4 w-4" />}
          />
          <StatsCard
            title="Repeat Booking rate"
            value="20%"
            subtitle="This month"
            icon={<Users className="h-4 w-4" />}
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 ">
          <RevenueChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ServicePerformance />
          <RevenueDistribution />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
