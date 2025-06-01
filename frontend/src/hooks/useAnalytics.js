// src/hooks/useAnalytics.js
import { useEffect, useState } from "react";
import axios from "axios";

const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    axios.get("/api/analytics")
      .then((res) => setAnalyticsData(res.data))
      .catch((err) => console.error("Analytics fetch error:", err));
  }, []);

  return analyticsData;
};

export default useAnalytics;
