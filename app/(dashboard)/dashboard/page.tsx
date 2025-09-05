
import { getDashboardAnalytics } from "@/lib/api";
import { Users, ShoppingCart, Package } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const StatsCard = ({ title, value, icon, bgColor, textColor }: StatsCardProps) => {
  return (
    <div className={`flex items-center justify-between p-6 rounded-2xl shadow-lg ${bgColor}`}>
      <div>
        <p className={`text-sm font-medium ${textColor}`}>{title}</p>
        <p className={`mt-2 text-2xl font-bold ${textColor}`}>{value}</p>
      </div>
      <div className="text-4xl opacity-70">{icon}</div>
    </div>
  );
};

export default async function DashboardAnalytics() {
  const { userCount,productCount,orderCount } = await getDashboardAnalytics()
  // Replace these with data from your API or RTK Query
  const stats = [
    { title: "Products", value: productCount, icon: <Package />, bgColor: "bg-white dark:bg-gray-800", textColor: "text-gray-900 dark:text-white" },
    { title: "Orders", value: orderCount, icon: <ShoppingCart />, bgColor: "bg-white dark:bg-gray-800", textColor: "text-gray-900 dark:text-white" },
    { title: "Users", value: userCount, icon: <Users />, bgColor: "bg-white dark:bg-gray-800", textColor: "text-gray-900 dark:text-white" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
          />
        ))}
      </div>
    </div>
  );
}
