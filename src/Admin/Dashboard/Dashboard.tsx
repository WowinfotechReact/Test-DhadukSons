import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { dashboardCount } from "../../APIServices/DashbordApi/DashbordApi";
import { useLoader } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

interface DashboardData {
  totalOrders: number;
  totalEnquiries: number;
  totalUsers: number;
  pendingOrders: number;
  inProcessOrders: number;
  completedOrders: number;
  rejectedOrders: number;
}

const Dashboard: React.FC = () => {
  const { setLoader } = useLoader();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [counters, setCounters] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCountList = async () => {
      setLoader(true);
      try {
        const res = await dashboardCount();
        if (res.statusCode === 200 && res.responseData?.data?.length > 0) {
          const data = res.responseData.data[0];
          setDashboardData(data);

          // start counters from 0
          setCounters(Object.keys(data).map(() => 0));

          // animate counters
          const interval = setInterval(() => {
            setCounters((prev) =>
              prev.map((count, i) => {
                const target = Object.values(data)[i] as number;
                return count < target
                  ? count + Math.ceil(target / 20) // speed control
                  : target;
              })
            );
          }, 40);

          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      } finally {
        setLoader(false);
      }
    };

    getAllCountList();
  }, [setLoader]);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  // Friendly labels for display
  const labels: Record<string, string> = {
    totalOrders: "Total Orders",
    totalEnquiries: "Total Enquiries",
    totalUsers: "Total Users",
    pendingOrders: "Pending Orders",
    inProcessOrders: "In Process Orders",
    completedOrders: "Completed Orders",
    rejectedOrders: "Rejected Orders",
  };

  // Routes mapping for clicks
  const routes: Record<string, string> = {
    totalOrders: "/admin/order-list",
    totalEnquiries: "/admin/enquiry",
    totalUsers: "/admin/adminList",
    pendingOrders: "/admin/order-list",
    inProcessOrders: "/admin/order-list",
    completedOrders: "/admin/order-list",
    rejectedOrders: "/admin/order-list",
  };

  // map keys to order status values
  const orderStatusMap: Record<string, string> = {
    pendingOrders: "Pending",
    inProcessOrders: "InProcess",
    completedOrders: "Completed",
  };

  return (
    <div className="dashboard">
      {Object.keys(dashboardData).map((key, index) => (
        <div
          className="card"
          key={key}
          onClick={() =>
            navigate(routes[key], {
              state: orderStatusMap[key]
                ? { orderStatus: orderStatusMap[key] }
                : {},
            })
          }
          style={{ cursor: "pointer" }} // 👈 makes it clickable
        >
          <h3 className="card-title">{labels[key]}</h3>
          <p className="counter">{counters[index]}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
