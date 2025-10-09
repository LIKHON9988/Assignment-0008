import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appsData from "../data/apps.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AppDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [installed, setInstalled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundApp = appsData.find((a) => String(a.id) === id);
      setApp(foundApp);
      setLoading(false);

      if (foundApp) {
        const installedList = JSON.parse(
          localStorage.getItem("installed") || "[]"
        );
        setInstalled(installedList.includes(foundApp.id));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  function handleInstall() {
    const installedList = JSON.parse(localStorage.getItem("installed") || "[]");
    if (!installedList.includes(app.id)) {
      installedList.push(app.id);
      localStorage.setItem("installed", JSON.stringify(installedList));
      setInstalled(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-bold text-gray-700 mb-2">App Not Found</h3>
        <p className="text-gray-600 mb-6">No app matches the requested ID.</p>
        <button
          onClick={() => navigate("/apps")}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition shadow-md"
        >
          Back to All Apps
        </button>
      </div>
    );
  }

  const chartData = app.ratings.map((r) => ({
    name: r.name,
    count: r.count,
    fill:
      r.name === "5 star"
        ? "#8884d8"
        : r.name === "4 star"
        ? "#9c88e3"
        : r.name === "3 star"
        ? "#b08dee"
        : r.name === "2 star"
        ? "#c493f9"
        : "#d89af5",
  }));

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* App Icon and Basic Info */}
          <div className="w-full md:w-72">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-full h-56 bg-gray-100 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150?text=App";
                  }}
                />
              </div>
              <h1 className="text-2xl font-bold mb-1">{app.title}</h1>
              <p className="text-sm text-purple-600 mb-4">
                Developed by {app.companyName || "productive.io"}
              </p>

              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex flex-col items-center">
                  <span className="text-green-600 font-bold text-lg">
                    {app.downloads >= 1000000
                      ? `${(app.downloads / 1000000).toFixed(1)}M`
                      : `${(app.downloads / 1000).toFixed(0)}K`}
                  </span>
                  <span className="text-xs text-gray-500">Downloads</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-amber-500 font-bold text-lg flex items-center">
                    <span className="mr-1">⭐</span>
                    {app.ratingAvg.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500">Rating</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-purple-600 font-bold text-lg">
                    {app.reviews >= 1000
                      ? `${(app.reviews / 1000).toFixed(1)}K`
                      : app.reviews}
                  </span>
                  <span className="text-xs text-gray-500">Reviews</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                    {app.category || "App"}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {app.size} MB
                  </span>
                </div>
              </div>

              <button
                onClick={handleInstall}
                disabled={installed}
                className={`w-full py-3 rounded-md text-white font-medium transition-all ${
                  installed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg"
                }`}
              >
                {installed ? "Installed" : "Install Now"}
              </button>
            </div>
          </div>

          {/* App Details */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold mb-6">Ratings & Reviews</h2>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold text-amber-500 flex items-center">
                    {app.ratingAvg.toFixed(1)}
                  </div>
                  <div className="flex items-center text-amber-400 my-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill={
                          i < Math.round(app.ratingAvg)
                            ? "currentColor"
                            : "none"
                        }
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {app.reviews} reviews
                  </div>
                </div>

                <div className="md:w-2/3">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={chartData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        width={50}
                      />
                      <Tooltip
                        formatter={(value) => [`${value} reviews`, ""]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <div className="text-gray-700 space-y-4">
                <p>{app.description}</p>
                <p>
                  This app takes the proven techniques and makes it even more
                  practical for modern lifestyles. Instead of just setting a
                  timer, it builds a complete environment for deep work,
                  minimizing distractions and maximizing concentration.
                </p>
                <p>
                  Users can create custom work and break intervals, track how
                  many sessions they complete each day, and review detailed
                  statistics about their habits over time. The design is minimal
                  and calming, reducing cognitive load so you can focus entirely
                  on the task at hand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed right-4 bottom-4 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          App installed successfully!
        </div>
      )}
    </div>
  );
}
