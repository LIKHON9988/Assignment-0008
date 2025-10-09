import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appsData from "../data/apps.json";
import hero from "/assets/hero.png";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const topApps = appsData
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 8);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Banner Section */}
      <section className="pt-10 px-4 ">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            We Build{" "}
            <span className="bg-gradient-to-br from-purple-700 to-purple-500 bg-clip-text text-transparent">
              Productive
            </span>
            <span> Apps</span>
          </h1>
          <p className="text-[#627382] text-opacity-90 max-w-3xl mx-auto mt-4 mb-8">
            At HERO.IO , we craft innovative apps designed to make everyday life
            simpler, smarter, and more exciting.Our goal is to turn your ideas
            into digital experiences that truly make an impact.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-white hover:bg-gray-100 transition shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-green-600"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <span className="font-medium">Play Store</span>
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-white hover:bg-gray-100 transition shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-blue-500"
              >
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <span className="font-medium">App Store</span>
            </a>
          </div>

          {/* Hero Image with App Preview */}
          <div className="relative mt-12 max-w-md mx-auto">
            <img src={hero} alt="App Preview" className="w-full rounded-3xl " />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-7 px-4 bg-gradient-to-br from-purple-700 to-purple-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 text-white">
            Trusted by Millions, Built for You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className=" pb-8 rounded-xl text-white text-center shadow-sm transform  transition-transform">
              <div>Total Downloads</div>
              <div className="text-5xl font-bold mb-2">29.6M+</div>
              <div>21% more than last month</div>
            </div>
            <div className=" pb-8 rounded-xl text-white text-center shadow-sm transform  transition-transform">
              <div>Active Users</div>
              <div className="text-5xl font-bold mb-2">906K+</div>
              <div>46% more than last month</div>
            </div>
            <div className=" pb-8 rounded-xl text-white text-center shadow-sm transform  transition-transform">
              <div>Apps Published</div>
              <div className="text-5xl font-bold mb-2">132+</div>
              <div>31 more will Launch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Apps Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
            Trending Apps
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Explore All Trending Apps on the Market developed by us
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {topApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer border border-gray-100"
                onClick={() => navigate(`/apps/${app.id}`)}
              >
                <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
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

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/apps")}
              className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition shadow-md"
            >
              Show All
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
