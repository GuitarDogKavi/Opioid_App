import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import AboutUsPage from "./AboutUsPage";
import ContactUsPage from "./ContactUsPage";
import VisualisationsPage from "./VisualisationsPage";
import IconImage from "./images/artificial-intelligence_4616790.png";
import teamImage from "./images/istockphoto-948020526-1024x1024.jpg";
import medImage from "./images/istockphoto-1181632124-1024x1024.jpg";

export default function OpioidDetectionPage() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showProductModal, setShowProductModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    employmentStatus: "",
    prescriptionDuration: "",
    prescriptionDrug: "",
    daysSinceFirstUse: "",
    alcohol: "",
    smoking: "",
    depression: "",
    anxiety: "",
    sleeplessness: "",
    feverish: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [csvData, setCsvData] = useState({});
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    setDataLoading(true);
    fetch("http://localhost:5000/data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data from Flask:", data);
        setCsvData(data);
        setDataLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching CSV data:", err);
        setDataError(err.message);
        setDataLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = () => {
    // Simulated prediction logic
    const riskFactors = [
      parseInt(formData.prescriptionDuration) > 90,
      parseInt(formData.daysSinceFirstUse) > 180,
      formData.alcohol === "yes",
      formData.smoking === "yes",
      formData.depression === "yes",
      formData.anxiety === "yes",
      formData.sleeplessness === "yes",
    ].filter(Boolean).length;

    const riskLevel =
      riskFactors >= 5
        ? "High Risk"
        : riskFactors >= 3
        ? "Moderate Risk"
        : "Low Risk";

    setPrediction({
      level: riskLevel,
      score: Math.min(95, riskFactors * 15 + Math.random() * 10),
    });
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

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      {currentPage === "home" ? (
        <>
          <div
            className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}
          >
            {/* Header */}
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
                    }`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => setCurrentPage("about")}
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-yellow-400"
                        : "text-gray-700 hover:text-yellow-600"
                    }`}
                  >
                    {" "}
                    About Us{" "}
                  </button>
                  <button
                    onClick={() => setCurrentPage("contact")}
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-yellow-400"
                        : "text-gray-700 hover:text-yellow-600"
                    }`}
                  >
                    {" "}
                    Contact Us{" "}
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

            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="bg-gradient-to-r from-orange-500 via-yello-400 to-orange-700 rounded-3xl overflow-hidden relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-12">
                  <div className="text-white z-10">
                    <h1 className="text-6xl font-bold mb-6">Detect</h1>
                    <p className="text-xl mb-2">For your business</p>
                    <p className="text-lg mb-8 opacity-90">
                      Protect your business, employees and customers with opioid
                      addiction screening to help ensure optimal workplace
                      welfare.
                    </p>

                    <div className="bg-gradient-to-br from-indigo-900/60 to-violet-900/50 backdrop-blur-sm rounded-2xl p-6 border border-indigo-400/30">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold mb-3">
                            Understanding Opioid Crisis
                          </h3>
                          <p className="text-sm leading-relaxed opacity-90 mb-4">
                            Opioid addiction affects millions worldwide,
                            impacting productivity, safety, and wellbeing in
                            workplaces. Early detection through reliable
                            screening helps create supportive environments and
                            connects individuals with life-saving resources.
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                              className="w-9 h-9 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-2xl font-bold mb-1">2.7M</p>
                          <p className="text-xs opacity-80">
                            People affected in US
                          </p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-2xl font-bold mb-1">$78.5B</p>
                          <p className="text-xs opacity-80">
                            Annual economic burden
                          </p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-2xl font-bold mb-1">75%</p>
                          <p className="text-xs opacity-80">
                            Start with prescription
                          </p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-2xl font-bold mb-1">24/7</p>
                          <p className="text-xs opacity-80">
                            Support available
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col gap-12">
                    <div className="w-full h-[320px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 overflow-hidden">
                      <img
                        src={medImage}
                        alt="Team or Illustration"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full h-[320px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 overflow-hidden">
                      <img
                        src={teamImage}
                        alt="Team or Illustration 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction */}
            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-400 rounded-3xl overflow-hidden relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-12">
                  <div className="text-white z-10">
                    <h1 className="text-6xl font-bold mb-4">
                      AI powered Detection
                    </h1>
                    <p className="text-xl mb-2">For a Healthier Lifestyle</p>
                    <p className="text-lg mb-8 opacity-90">
                      Protect your business, employees and customers with opioid
                      addiction screening with our AI powered solutions
                      guaranteed by professionals all over the world
                    </p>
                    <div className="flex flex-col mb-6 items-start">
                      <button
                        onClick={() => setShowProductModal(true)}
                        className="border-2 border-white rounded-full px-4 py-2 text-lg"
                      >
                        Take The Test
                      </button>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-400 rounded-full transform translate-x-32 translate-y-32"></div>
                    <div className="relative z-10 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                      <img
                        src={IconImage}
                        alt="SureScreen Detection Kit"
                        className="w-64 h-80 object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Modal (Risk Assessment) */}
            {showProductModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
                >
                  <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                      Opioid Addiction Risk Assessment
                    </h2>
                    <button
                      onClick={() => {
                        setShowProductModal(false);
                        setPrediction(null);
                      }}
                      className="text-white hover:text-gray-200 text-3xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Age
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="Enter age"
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Employment Status
                        </label>
                        <select
                          name="employmentStatus"
                          value={formData.employmentStatus}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                          <option value="">Select status</option>
                          <option value="employed">Employed</option>
                          <option value="unemployed">Unemployed</option>
                          <option value="retired">Retired</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Prescription Duration (days)
                        </label>
                        <input
                          type="number"
                          name="prescriptionDuration"
                          value={formData.prescriptionDuration}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="Enter duration"
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Prescription Drug Used
                        </label>
                        <select
                          name="prescriptionDrug"
                          value={formData.prescriptionDrug}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                          <option value="">Select Drug</option>
                          <option value="Codeine">Codeine</option>
                          <option value="Fentanyl">Fentanyl</option>
                          <option value="Hydrocodone">Hydrocodone</option>
                          <option value="Hydromorphone">Hydromorphone</option>
                          <option value="Meperidine">Meperidine</option>
                          <option value="Morphine">Morphine</option>
                          <option value="Oxycodone">Oxycodone</option>
                          <option value="Oxymorphone">Oxymorphone</option>
                          <option value="Tapentadol">Tapentadol</option>
                          <option value="Tramadol">Tramadol</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Days Since First Use
                        </label>
                        <input
                          type="number"
                          name="daysSinceFirstUse"
                          value={formData.daysSinceFirstUse}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="Enter days"
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Alcohol Use
                        </label>
                        <select
                          name="alcohol"
                          value={formData.alcohol}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Smoking
                        </label>
                        <select
                          name="smoking"
                          value={formData.smoking}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Depression
                        </label>
                        <select
                          name="depression"
                          value={formData.depression}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Anxiety
                        </label>
                        <select
                          name="anxiety"
                          value={formData.anxiety}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Sleeplessness
                        </label>
                        <select
                          name="sleeplessness"
                          value={formData.sleeplessness}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-2`}
                        >
                          Feverish
                        </label>
                        <select
                          name="feverish"
                          value={formData.feverish}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        >
                          <option value="">Select</option>
                          <option value="regularly">Regularly</option>
                          <option value="randomly">Randomly</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handlePredict}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all"
                    >
                      Assess Risk
                    </button>

                    {prediction && (
                      <div
                        className={`mt-6 p-6 rounded-lg ${
                          prediction.level === "High Risk"
                            ? "bg-red-100 border-2 border-red-500"
                            : prediction.level === "Moderate Risk"
                            ? "bg-yellow-100 border-2 border-yellow-500"
                            : "bg-green-100 border-2 border-green-500"
                        }`}
                      >
                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                          Assessment Result
                        </h3>
                        <p className="text-2xl font-bold mb-2 text-gray-900">
                          {prediction.level}
                        </p>
                        <p className="text-lg text-gray-900">
                          Risk Score: {prediction.score.toFixed(1)}%
                        </p>
                        <p className="mt-4 text-sm text-gray-700">
                          {prediction.level === "High Risk"
                            ? "Immediate professional consultation recommended."
                            : prediction.level === "Moderate Risk"
                            ? "Regular monitoring and support advised."
                            : "Continue regular wellness practices."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : currentPage === "about" ? (
        <AboutUsPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setCurrentPage={setCurrentPage}
        />
      ) : currentPage === "contact" ? (
        <ContactUsPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setCurrentPage={setCurrentPage}
        />
      ) : currentPage === "visuals" ? (
        <VisualisationsPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </div>
  );
}
