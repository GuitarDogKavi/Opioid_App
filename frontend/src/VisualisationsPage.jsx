import React, { useState, useEffect } from "react";
import { Moon, Sun, BarChart3, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Cell,
} from "recharts";

export default function VisualisationsPage({
  darkMode,
  setDarkMode,
  setCurrentPage,
}) {
  const [visualizationType, setVisualizationType] = useState("categorical");
  const [selectedVariable, setSelectedVariable] = useState("");
  const [selectedNumericVariable, setSelectedNumericVariable] = useState("");
  const [csvData, setCsvData] = useState({});
  const [boxplotData, setBoxplotData] = useState({});
  const [dataLoading, setDataLoading] = useState(false);
  const [boxplotLoading, setBoxplotLoading] = useState(false);
  const [dataError, setDataError] = useState(null);
  const [boxplotError, setBoxplotError] = useState(null);

  useEffect(() => {
    setDataLoading(true);
    fetch("http://localhost:5000/data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched categorical data:", data);
        setCsvData(data);
        setDataLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching CSV data:", err);
        setDataError(err.message);
        setDataLoading(false);
      });
  }, []);

  useEffect(() => {
    setBoxplotLoading(true);
    fetch("http://localhost:5000/boxplot-data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch boxplot data");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched boxplot data:", data);
        setBoxplotData(data);
        setBoxplotLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching boxplot data:", err);
        setBoxplotError(err.message);
        setBoxplotLoading(false);
      });
  }, []);

  const getVisualizationData = (variable) => {
    if (!csvData || !variable || Object.keys(csvData).length === 0) return [];

    const mapping = {
      gender: "Gender",
      employmentStatus: "Employment Status",
      alcohol: "Alcohol",
      smoking: "Smoking",
      depression: "Depression",
      anxiety: "Anxiety",
      sleeplessness: "Sleeplessness",
      feverish: "Feverish",
      prescriptionDrug: "Prescription Drug Used",
    };

    const backendKey = mapping[variable];
    const rawData = csvData[backendKey];

    if (!rawData || !Array.isArray(rawData)) return [];

    const transformed = rawData.map((item) => {
      const categoryKey = Object.keys(item).find(
        (key) => key !== "addicted" && key !== "notAddicted"
      );

      const addictedCount = item.addicted || 0;
      const notAddictedCount = item.notAddicted || 0;
      const total = addictedCount + notAddictedCount;

      const addictedPercent = total > 0 ? (addictedCount / total) * 100 : 0;
      const notAddictedPercent =
        total > 0 ? (notAddictedCount / total) * 100 : 0;

      return {
        category: item[categoryKey] || "Unknown",
        addicted: parseFloat(addictedPercent.toFixed(1)),
        notAddicted: parseFloat(notAddictedPercent.toFixed(1)),
      };
    });

    return transformed;
  };

  const getBoxplotData = (variable) => {
    if (!boxplotData || !variable || Object.keys(boxplotData).length === 0)
      return null;

    const mapping = {
      age: "Age",
      prescriptionDuration: "Prescription Duration",
      daysSinceFirstUse: "Days Since First Use",
    };

    const backendKey = mapping[variable];
    return boxplotData[backendKey] || null;
  };

  const BoxPlot = ({ data, title, darkMode }) => {
    if (!data) return null;

    const { addicted, notAddicted } = data;

    const chartData = [
      {
        group: "Addicted",
        min: addicted.min,
        q1: addicted.q1,
        median: addicted.median,
        q3: addicted.q3,
        max: addicted.max,
        mean: addicted.mean,
        color: "#ef4444",
      },
      {
        group: "Not Addicted",
        min: notAddicted.min,
        q1: notAddicted.q1,
        median: notAddicted.median,
        q3: notAddicted.q3,
        max: notAddicted.max,
        mean: notAddicted.mean,
        color: "#10b981",
      },
    ];

    const CustomBoxPlot = ({ x, y, width, height, index, payload }) => {
      const boxWidth = 60;
      const centerX = x + width / 2;
      const color = payload.color;

      const yScale = (value) => {
        const allValues = [
          ...chartData.map((d) => d.min),
          ...chartData.map((d) => d.max),
        ];
        const minVal = Math.min(...allValues);
        const maxVal = Math.max(...allValues);
        const range = maxVal - minVal;
        return y + height - ((value - minVal) / range) * height;
      };

      const minY = yScale(payload.min);
      const q1Y = yScale(payload.q1);
      const medianY = yScale(payload.median);
      const q3Y = yScale(payload.q3);
      const maxY = yScale(payload.max);
      const meanY = yScale(payload.mean);

      return (
        <g>
          {/* Whisker line (min to max) */}
          <line
            x1={centerX}
            y1={minY}
            x2={centerX}
            y2={maxY}
            stroke={color}
            strokeWidth={2}
          />

          {/* Min cap */}
          <line
            x1={centerX - boxWidth / 4}
            y1={minY}
            x2={centerX + boxWidth / 4}
            y2={minY}
            stroke={color}
            strokeWidth={2}
          />

          {/* Max cap */}
          <line
            x1={centerX - boxWidth / 4}
            y1={maxY}
            x2={centerX + boxWidth / 4}
            y2={maxY}
            stroke={color}
            strokeWidth={2}
          />

          {/* Box (Q1 to Q3) */}
          <rect
            x={centerX - boxWidth / 2}
            y={q3Y}
            width={boxWidth}
            height={q1Y - q3Y}
            fill={color}
            fillOpacity={0.3}
            stroke={color}
            strokeWidth={2}
          />

          {/* Median line */}
          <line
            x1={centerX - boxWidth / 2}
            y1={medianY}
            x2={centerX + boxWidth / 2}
            y2={medianY}
            stroke={color}
            strokeWidth={3}
          />

          {/* Mean point */}
          <circle
            cx={centerX}
            cy={meanY}
            r={4}
            fill="white"
            stroke={color}
            strokeWidth={2}
          />
        </g>
      );
    };

    return (
      <div className="bg-white/95 rounded-xl p-6">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" tick={{ fill: "#374151" }} />
            <YAxis
              label={{
                value: title,
                angle: -90,
                position: "insideLeft",
                fill: "#374151",
              }}
              tick={{ fill: "#374151" }}
              domain={["dataMin - 5", "dataMax + 5"]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0) {
                  const data = payload[0].payload;
                  return (
                    <div
                      className="bg-white p-4 border-2 rounded-lg shadow-lg"
                      style={{ borderColor: data.color }}
                    >
                      <p className="font-semibold text-gray-800 mb-2">
                        {data.group}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Min:</span>{" "}
                          {data.min.toFixed(2)}
                        </p>
                        <p>
                          <span className="font-medium">Q1:</span>{" "}
                          {data.q1.toFixed(2)}
                        </p>
                        <p>
                          <span className="font-medium">Median:</span>{" "}
                          {data.median.toFixed(2)}
                        </p>
                        <p>
                          <span className="font-medium">Q3:</span>{" "}
                          {data.q3.toFixed(2)}
                        </p>
                        <p>
                          <span className="font-medium">Max:</span>{" "}
                          {data.max.toFixed(2)}
                        </p>
                        <p className="pt-1 border-t">
                          <span className="font-medium">Mean:</span>{" "}
                          {data.mean.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="max" shape={<CustomBoxPlot />} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const categoricalVariables = [
    { value: "gender", label: "Gender" },
    { value: "employmentStatus", label: "Employment Status" },
    { value: "alcohol", label: "Alcohol Use" },
    { value: "smoking", label: "Smoking" },
    { value: "depression", label: "Depression" },
    { value: "anxiety", label: "Anxiety" },
    { value: "sleeplessness", label: "Sleeplessness" },
    { value: "feverish", label: "Feverish" },
    { value: "prescriptionDrug", label: "Prescription Drug" },
  ];

  const numericVariables = [
    { value: "age", label: "Age" },
    { value: "prescriptionDuration", label: "Prescription Duration" },
    { value: "daysSinceFirstUse", label: "Days Since First Use" },
  ];

  const currentLoading =
    visualizationType === "categorical" ? dataLoading : boxplotLoading;
  const currentError =
    visualizationType === "categorical" ? dataError : boxplotError;

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <header className="bg-gradient-to-r from-blue-400 via-purple-350 to-purple-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-700 to-purple-600 rounded-lg"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent">
              SureScreen Diagnostics
            </span>
          </div>
          <nav className="flex items-center gap-8">
            <button
              onClick={() => setCurrentPage("visuals")}
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-yellow-400"
                  : "text-gray-700 hover:text-yellow-600"
              } transition-colors`}
            >
              Analytics
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-yellow-400"
                  : "text-gray-700 hover:text-yellow-600"
              } transition-colors`}
            >
              About Us
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-yellow-400"
                  : "text-gray-700 hover:text-yellow-600"
              } transition-colors`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-colors`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="bg-gradient-to-r from-cyan-800 via-teal-700 to-blue-900 rounded-3xl overflow-hidden relative">
          <div className="p-12">
            <div className="text-white z-10 mb-8">
              <h1 className="text-6xl font-bold mb-6">Analytics Dashboard</h1>
              <p className="text-xl mb-2">Data-Driven Insights</p>
              <p className="text-lg opacity-90">
                Explore opioid addiction patterns through interactive
                visualizations. Select different variables to understand risk
                factors and trends.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setVisualizationType("categorical");
                    setSelectedNumericVariable("");
                  }}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
                    visualizationType === "categorical"
                      ? "bg-white text-teal-700 shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <BarChart3 className="inline-block mr-2" size={20} />
                  Categorical Variables
                </button>
                <button
                  onClick={() => {
                    setVisualizationType("numeric");
                    setSelectedVariable("");
                  }}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
                    visualizationType === "numeric"
                      ? "bg-white text-teal-700 shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <TrendingUp className="inline-block mr-2" size={20} />
                  Numeric Variables (Boxplots)
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-teal-400/30">
              {visualizationType === "categorical" ? (
                <>
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-white mb-3">
                      Select Categorical Variable
                    </label>
                    <select
                      value={selectedVariable}
                      onChange={(e) => setSelectedVariable(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 text-white rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent backdrop-blur-sm"
                    >
                      <option value="" className="text-gray-900">
                        Choose a variable...
                      </option>
                      {categoricalVariables.map((variable) => (
                        <option
                          key={variable.value}
                          value={variable.value}
                          className="text-gray-900"
                        >
                          {variable.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {!currentLoading && !currentError && selectedVariable && (
                    <div className="mt-8">
                      <h3 className="text-2xl font-semibold mb-6 text-white">
                        Addiction Rates by{" "}
                        {
                          categoricalVariables.find(
                            (v) => v.value === selectedVariable
                          )?.label
                        }
                      </h3>
                      <div className="bg-white/95 rounded-xl p-6">
                        <ResponsiveContainer width="100%" height={400}>
                          <BarChart
                            data={getVisualizationData(selectedVariable)}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="category"
                              tick={{ fill: "#374151" }}
                            />
                            <YAxis
                              label={{
                                value: "Percentage (%)",
                                angle: -90,
                                position: "insideLeft",
                                fill: "#374151",
                              }}
                              tick={{ fill: "#374151" }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #0e7490",
                                borderRadius: "8px",
                              }}
                              labelStyle={{ color: "#111827" }}
                            />
                            <Legend />
                            <Bar
                              dataKey="addicted"
                              fill="#ef4444"
                              name="Addicted (%)"
                            />
                            <Bar
                              dataKey="notAddicted"
                              fill="#10b981"
                              name="Not Addicted (%)"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-6 p-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/20">
                        <p className="text-sm text-white">
                          <strong>Note:</strong> This visualization shows the
                          percentage distribution of individuals with opioid
                          addiction versus those without, categorized by the
                          selected variable.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-white mb-3">
                      Select Numeric Variable
                    </label>
                    <select
                      value={selectedNumericVariable}
                      onChange={(e) =>
                        setSelectedNumericVariable(e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 text-white rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent backdrop-blur-sm"
                    >
                      <option value="" className="text-gray-900">
                        Choose a variable...
                      </option>
                      {numericVariables.map((variable) => (
                        <option
                          key={variable.value}
                          value={variable.value}
                          className="text-gray-900"
                        >
                          {variable.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {!currentLoading &&
                    !currentError &&
                    selectedNumericVariable && (
                      <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-6 text-white">
                          Distribution of{" "}
                          {
                            numericVariables.find(
                              (v) => v.value === selectedNumericVariable
                            )?.label
                          }{" "}
                          by Addiction Status
                        </h3>

                        {(() => {
                          const data = getBoxplotData(selectedNumericVariable);
                          return (
                            data && (
                              <>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                  <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                                    <h4 className="text-lg font-semibold text-red-200 mb-3">
                                      Addicted Group
                                    </h4>
                                    <div className="space-y-2 text-sm text-white">
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Minimum:
                                        </span>
                                        <strong>
                                          {data.addicted.min.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Q1 (25th percentile):
                                        </span>
                                        <strong>
                                          {data.addicted.q1.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Median (50th percentile):
                                        </span>
                                        <strong>
                                          {data.addicted.median.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Q3 (75th percentile):
                                        </span>
                                        <strong>
                                          {data.addicted.q3.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Maximum:
                                        </span>
                                        <strong>
                                          {data.addicted.max.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between pt-2 border-t border-red-400/30">
                                        <span className="opacity-75">
                                          Mean:
                                        </span>
                                        <strong>
                                          {data.addicted.mean.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Count:
                                        </span>
                                        <strong>{data.addicted.count}</strong>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-400/30">
                                    <h4 className="text-lg font-semibold text-green-200 mb-3">
                                      Not Addicted Group
                                    </h4>
                                    <div className="space-y-2 text-sm text-white">
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Minimum:
                                        </span>
                                        <strong>
                                          {data.notAddicted.min.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Q1 (25th percentile):
                                        </span>
                                        <strong>
                                          {data.notAddicted.q1.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Median (50th percentile):
                                        </span>
                                        <strong>
                                          {data.notAddicted.median.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Q3 (75th percentile):
                                        </span>
                                        <strong>
                                          {data.notAddicted.q3.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Maximum:
                                        </span>
                                        <strong>
                                          {data.notAddicted.max.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between pt-2 border-t border-green-400/30">
                                        <span className="opacity-75">
                                          Mean:
                                        </span>
                                        <strong>
                                          {data.notAddicted.mean.toFixed(2)}
                                        </strong>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="opacity-75">
                                          Count:
                                        </span>
                                        <strong>
                                          {data.notAddicted.count}
                                        </strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <BoxPlot
                                  data={data}
                                  title={
                                    numericVariables.find(
                                      (v) => v.value === selectedNumericVariable
                                    )?.label
                                  }
                                  darkMode={darkMode}
                                />
                              </>
                            )
                          );
                        })()}

                        <div className="mt-6 p-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/20">
                          <p className="text-sm text-white">
                            <strong>Note:</strong> This boxplot shows the
                            distribution of{" "}
                            {
                              numericVariables.find(
                                (v) => v.value === selectedNumericVariable
                              )?.label
                            }{" "}
                            separated by addiction status. The box represents
                            the interquartile range (Q1-Q3), the line inside
                            shows the median, the circle shows the mean, and the
                            whiskers extend to the minimum and maximum values.
                            Compare the distributions to identify differences
                            between the two groups.
                          </p>
                        </div>
                      </div>
                    )}
                </>
              )}

              {currentLoading && (
                <div className="text-center py-12 text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading data...</p>
                </div>
              )}

              {currentError && !currentLoading && (
                <div className="text-center py-12 text-red-300 bg-red-900/30 rounded-lg">
                  <p className="font-semibold mb-2">Error loading data</p>
                  <p className="text-sm">{currentError}</p>
                </div>
              )}

              {!currentLoading &&
                !currentError &&
                !selectedVariable &&
                !selectedNumericVariable && (
                  <div className="text-center py-16 text-white/70">
                    {visualizationType === "categorical" ? (
                      <>
                        <BarChart3
                          size={64}
                          className="mx-auto mb-4 opacity-50"
                        />
                        <p className="text-xl">
                          Select a categorical variable to view the
                          visualization
                        </p>
                        <p className="text-sm mt-2 opacity-75">
                          Choose from the dropdown above to explore addiction
                          patterns
                        </p>
                      </>
                    ) : (
                      <>
                        <TrendingUp
                          size={64}
                          className="mx-auto mb-4 opacity-50"
                        />
                        <p className="text-xl">
                          Select a numeric variable to view the boxplot
                        </p>
                        <p className="text-sm mt-2 opacity-75">
                          Choose from the dropdown above to explore
                          distributions
                        </p>
                      </>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-6 px-6 pb-16">
        <div className="text-center">
          <button
            onClick={() => setCurrentPage("home")}
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
