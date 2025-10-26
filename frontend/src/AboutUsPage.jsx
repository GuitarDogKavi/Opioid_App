import React from 'react';
import { Moon, Sun, CheckCircle } from 'lucide-react';
import teamImage from './images/istockphoto-2094337676-1024x1024.jpg';
import AIImage from './images/istockphoto-2170346048-1024x1024.jpg';


export default function AboutUsPage({ darkMode, setDarkMode, setCurrentPage }) {
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <header className="bg-gradient-to-r from-blue-400 via-purple-350 to-purple-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-700 to-purple-600 rounded-lg"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent">
              SureScreen Diagnostics
            </span>
          </div>
          <nav className="flex items-center gap-8">
            <button onClick={() => setCurrentPage('visuals')} className={`${darkMode ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-700 hover:text-yellow-600'}`}
                >Analytics</button>
            <button onClick={() => setCurrentPage('about')} className={`${darkMode ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-700 hover:text-yellow-600'}`}
                >About Us</button>
            <button onClick={() => setCurrentPage('contact')} className={`${darkMode ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-700 hover:text-yellow-600'}`}
                > Contact Us </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
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
        <div className="bg-gradient-to-r from-cyan-800 via-teal-700 to-blue-900 rounded-3xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-12">
                        <div className="text-white z-10">
                            <h1 className="text-6xl font-bold mb-6">Detect With Us</h1>
                            <p className="text-xl mb-2">Empowering prevention through data</p>
                            <p className="text-lg mb-8 opacity-90">
                            Partner with us to build a safer, more resilient future. Our opioid detection
                            and prevention systems combine predictive analytics with real-world awareness
                            to help organizations act early — before harm occurs.
                            </p>

                    <div className="bg-gradient-to-br from-cyan-900/60 to-blue-900/50 backdrop-blur-sm rounded-2xl p-6 border border-teal-400/30">
                    <div className="flex items-start gap-4 mb-6">
                            <div className="flex-1">
                                <h3 className="text-2xl font-semibold mb-3">Why Work With Us</h3>
                                <p className="text-sm leading-relaxed opacity-90 mb-4">
                                    We are a research-driven initiative focused on intelligent opioid risk
                                    detection and prevention. Our solutions leverage predictive modeling,
                                    behavioral insights, and responsible data use to identify risks and
                                    promote early intervention.
                                </p>
                                <p className="text-sm leading-relaxed opacity-90">
                                    Beyond detection, we are committed to awareness and education — helping
                                    organizations create healthier workplaces and stronger communities.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                                        <CheckCircle size={24} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                            <div className="bg-white/10 rounded-lg p-3">
                                <p className="text-2xl font-bold mb-1">95%</p>
                                <p className="text-xs opacity-80">Accuracy in pilot detection models</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3">
                                <p className="text-2xl font-bold mb-1">50+</p>
                                <p className="text-xs opacity-80">Organizations collaborating</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3">
                                <p className="text-2xl font-bold mb-1">100K+</p>
                                <p className="text-xs opacity-80">Screenings processed securely</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3">
                                <p className="text-2xl font-bold mb-1">24/7</p>
                                <p className="text-xs opacity-80">Support & monitoring network</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col gap-12">
                    <div className="w-full h-[320px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-dashed border-white/30 overflow-hidden">
                        <img
                            src={AIImage}
                            alt="Team or Illustration"
                            className="w-full h-full object-cover rounded-2xl shadow-2xl"
                        />
                    </div>
                    <div className="w-full h-[320px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-dashed border-white/30 overflow-hidden">
                        <img
                            src={teamImage}
                            alt="Team or Illustration 2"
                            className="w-full h-full object-cover rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>


      <div className="max-w-5xl mx-auto pt-6 px-6">
        <h1 className="text-5xl font-bold mb-6 text-center text-purple-600"></h1>
        <p className="text-lg leading-relaxed text-center mb-12">
          SureScreen Diagnostics is dedicated to providing early detection solutions 
          to help prevent opioid misuse and improve public health outcomes. 
          Our mission is to combine cutting-edge technology with compassionate care 
          to improve lives and empower communities.
        </p>

        <div className="text-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
