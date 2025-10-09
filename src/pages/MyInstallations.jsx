import React, { useEffect, useState, useMemo } from "react";
import appsData from "../data/apps.json";
import { useNavigate } from "react-router-dom";

export default function MyInstallations() {
  const [installedApps, setInstalledApps] = useState([]);
  const [sort, setSort] = useState("default");
  const navigate = useNavigate();

  useEffect(() => {
    const installed = JSON.parse(localStorage.getItem("installed") || "[]");
    const apps = appsData.filter((a) => installed.includes(a.id));
    setInstalledApps(apps);
  }, []);

  function handleUninstall(id) {
    const installed = JSON.parse(
      localStorage.getItem("installed") || "[]"
    ).filter((x) => x !== id);
    localStorage.setItem("installed", JSON.stringify(installed));
    setInstalledApps((prev) => prev.filter((a) => a.id !== id));

    // Simple toast feedback
    const el = document.createElement("div");
    el.innerText = "App uninstalled";
    el.className =
      "fixed right-4 bottom-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow";
    document.body.appendChild(el);
    setTimeout(() => document.body.removeChild(el), 1800);
  }

  const sortedApps = useMemo(() => {
    let apps = [...installedApps];
    if (sort === "size-high-low") {
      apps.sort((a, b) => (b.size || 0) - (a.size || 0));
    } else if (sort === "size-low-high") {
      apps.sort((a, b) => (a.size || 0) - (b.size || 0));
    }
    return apps;
  }, [installedApps, sort]);

  if (installedApps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 px-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">No installed apps yet</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Browse our app store and install some amazing applications
        </p>
        <button
          onClick={() => navigate("/apps")}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        >
          Browse Apps
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
        Your Installed Apps
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Explore All Trending Apps on the Market developed by us
      </p>

      {/* Header row */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-gray-800 font-semibold mb-3 md:mb-0">
          {sortedApps.length} Apps Found
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="default">Sort By Size</option>
          <option value="size-high-low">Size: High-Low</option>
          <option value="size-low-high">Size: Low-High</option>
        </select>
      </div>

      {/* App list */}
      <div className="flex flex-col gap-4">
        {sortedApps.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/50?text=App";
                  }}
                />
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  {app.title || "Unnamed App"}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    {app.downloads >= 1000000
                      ? `${(app.downloads / 1000000).toFixed(1)}M`
                      : `${(app.downloads / 1000).toFixed(0)}K`}
                  </div>
                  <div className="flex items-center text-amber-500">
                    <span className="mr-1">⭐</span>
                    {app.ratingAvg?.toFixed(1) || "5.0"}
                  </div>
                  <div>{app.size ? `${app.size} MB` : "N/A"}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleUninstall(app.id)}
              className="px-4 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-md hover:bg-emerald-600 transition"
            >
              Uninstall
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
