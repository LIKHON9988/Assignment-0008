import React, { useState, useMemo, useEffect } from "react";
import appsData from "../data/apps.json";
import { useNavigate } from "react-router-dom";

export default function AllApps() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("high-low");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate loading when search changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const filtered = useMemo(() => {
    let arr = appsData.filter((a) =>
      a.title.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "high-low")
      arr = arr.slice().sort((a, b) => b.downloads - a.downloads);
    if (sort === "low-high")
      arr = arr.slice().sort((a, b) => a.downloads - b.downloads);
    return arr;
  }, [query, sort]);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Our All Applications
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore All Apps on the Market developed by us. We code for Millions
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="mb-4 md:mb-0 bg-white px-4 py-2 rounded-md shadow-sm">
            <p className="font-medium text-purple-700">
              <span className="font-bold">{filtered.length}</span> Apps Found
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-grow md:w-64">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="high-low">Downloads: High-Low</option>
              <option value="low-high">Downloads: Low-High</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
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
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No App Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or browse our categories
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer border border-gray-100"
                onClick={() => navigate(`/apps/${app.id}`)}
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
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
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                      {app.category || "App"}
                    </span>
                  </div>
                  <h3 className="font-medium text-lg truncate">{app.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 truncate">
                    {app.companyName}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-green-600">
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
                    <div className="flex items-center text-sm text-amber-500">
                      <span className="mr-1">⭐</span>
                      {app.ratingAvg.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
