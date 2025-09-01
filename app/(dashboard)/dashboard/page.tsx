
import StatsCard from "@/components/StatsCard";
import { FileText, Eye, Loader } from "lucide-react";

const Home = () => {
  // Static E-Commerce Analytics Data
  const analytics = {
    data: {
      // Dashboard summary
      totalOrders: 850,
      totalRevenue: 125000, // in USD or BDT
      totalCustomers: 420,
      totalProducts: 120,
      totalViews: 4520, // site visits

      // Category-wise sales
      categoryWiseCount: [
        { category: "Electronics", count: 300 },
        { category: "Fashion", count: 200 },
        { category: "Home & Kitchen", count: 150 },
        { category: "Books", count: 100 },
        { category: "Sports", count: 100 },
      ],

      // Top-selling products
      topProducts: [
        { name: "Smartphone XYZ", sales: 120 },
        { name: "Wireless Earbuds ABC", sales: 95 },
        { name: "Laptop 15-inch", sales: 80 },
        { name: "Men’s Watch", sales: 70 },
        { name: "Coffee Maker", sales: 50 },
      ],

      // Recent orders (optional)
      recentOrders: [
        { id: "ORD001", customer: "Rahim", amount: 120, status: "Delivered" },
        { id: "ORD002", customer: "Karim", amount: 250, status: "Pending" },
        { id: "ORD003", customer: "Fatema", amount: 75, status: "Cancelled" },
        { id: "ORD004", customer: "Dina", amount: 180, status: "Delivered" },
      ],
    },
  };

  const isLoading = false;
  const isError = false;

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <Loader />
        <p className="text-sm text-muted-foreground">Analytics বিস্তারিত লোড হচ্ছে...</p>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <p className="text-red-500">Failed to load Analytics details.</p>
      </div>
    );

  const {
    totalOrders,
    totalRevenue,
    totalCustomers,
    totalProducts,
    totalViews,
    topProducts,
    recentOrders,
  } = analytics.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">E-Commerce Dashboard</h1>
          <p className="text-sm mt-1">Store statistics and analytics</p>
        </div>
        <div className="text-right">
          <p className="text-sm">সর্বশেষ আপডেট</p>
          <p className="text-sm font-medium">{new Date().toLocaleDateString("bn-BD")}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard
          title="মোট অর্ডার"
          value={totalOrders}
          description="সর্বমোট অর্ডার"
          icon={FileText}
          trend="up"
          className="xl:col-span-1"
        />
        <StatsCard
          title="মোট রাজস্ব"
          value={`$${totalRevenue}`}
          description="মোট বিক্রয়"
          icon={FileText}
          trend="up"
          className="xl:col-span-1"
        />
        <StatsCard
          title="মোট গ্রাহক"
          value={totalCustomers}
          description="সক্রিয় গ্রাহক"
          icon={Eye}
          trend="up"
          className="xl:col-span-1"
        />
        <StatsCard
          title="মোট পণ্য"
          value={totalProducts}
          description="স্টকে থাকা পণ্য"
          icon={Eye}
          trend="up"
          className="xl:col-span-1"
        />
        <StatsCard
          title="মোট ভিউ"
          value={totalViews}
          description="সাইট ভিউ"
          icon={Eye}
          trend="up"
          className="xl:col-span-2"
        />
      </div>

      {/* Optional: Top Products */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Top Products</h2>
        <ul className="space-y-1">
          {topProducts.map((product, idx) => (
            <li key={idx}>
              {product.name} — Sales: {product.sales}
            </li>
          ))}
        </ul>
      </div>

      {/* Optional: Recent Orders */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
        <ul className="space-y-1">
          {recentOrders.map((order) => (
            <li key={order.id}>
              {order.id} - {order.customer} - ${order.amount} - {order.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
