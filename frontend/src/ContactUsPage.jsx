import React from "react";
import { Moon, Sun, Mail, Phone } from "lucide-react";
import backgroundImg from "./images/istockphoto-2213776181-1024x1024.jpg";

export default function ContactUsPage({
  darkMode,
  setDarkMode,
  setCurrentPage,
}) {
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
              About Us
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

      <div className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            filter: darkMode ? "brightness(0.4)" : "brightness(0.6)",
          }}
        >
          <div
            className={`absolute inset-0 ${
              darkMode ? "bg-gray-900/50" : "bg-white/30"
            }`}
          ></div>
        </div>

        {/* Contact Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-3xl p-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-12">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">
                  Contact <span className="text-pink-400">us</span>
                </h2>
                <p className="text-white/90 text-lg text-center mb-8 max-w-2xl mx-auto">
                  Have questions, feedback, or partnership inquiries? Reach out
                  to us — we'd love to hear from you!
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-all">
                    <Mail className="text-pink-400" size={20} />
                    <span className="text-white font-medium">
                      pizzahut@rpgglobal.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-all">
                    <Phone className="text-pink-400" size={20} />
                    <span className="text-white font-medium">
                      0112 729 729
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setCurrentPage("home")}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-semibold hover:scale-105 hover:shadow-xl transition-all"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
