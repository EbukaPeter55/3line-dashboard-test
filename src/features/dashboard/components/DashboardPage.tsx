import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFullDashboardData } from "../shared/dashboard-service";
import {
  FormattedAnalyticsDataForComponent,
  FullDashboardData,
} from "../shared/dashboard-types";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<FullDashboardData | null>(
    null
  );

  if (loading) {
    return (
      <div className="p-4 bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-gray-100">
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200">
        No dashboard data available.
      </div>
    );
  }

  // Data is available, extract for rendering
  const initialStats = dashboardData.kpiCards;
  const initialAnalyticsData: FormattedAnalyticsDataForComponent = {
    revenueData: dashboardData.analyticsData.revenueTimeSeries,
    signupData: dashboardData.analyticsData.signupTimeSeries,
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100">
        Dashboard
      </h1>
    </main>
  );
}
