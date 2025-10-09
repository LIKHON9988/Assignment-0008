import React, { useEffect, useState } from "react";
import appsData from "../data/apps.json";
import { useNavigate } from "react-router-dom";

export default function MyInstallations() {
  const [installedApps, setInstalledApps] = useState([]);
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
    // small toast-like feedback
    const el = document.createElement("div");
    el.innerText = "App uninstalled";
    el.className =
      "fixed right-4 bottom-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow";
    document.body.appendChild(el);
    setTimeout(() => document.body.removeChild(el), 1800);
  }

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
        Your Installed Apps
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Explore All Trending Apps on the Market developed by us
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {installedApps.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <div className="relative">
              <img
                src={app.image}
                alt={app.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                {app.category || "Unknown"}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{app.title}</h3>
                <span className="text-sm text-gray-500">
                  {typeof app.rating === "number"
                    ? `${app.rating.toFixed(1)} ★`
                    : "No rating"}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {app.description || "No description available."}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(`/apps/${app.id}`)}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleUninstall(app.id)}
                  className="px-3 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 transition"
                >
                  Uninstall
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
