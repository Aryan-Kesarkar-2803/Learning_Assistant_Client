import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-16 py-12 md:py-20 bg-gradient-to-r from-blue-100 to-indigo-200 text-gray-900">
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-900">
            Learn Smarter, Achieve More 📚
          </h2>
          <p className="mb-6 text-base md:text-lg text-gray-700">
             Learning Assitant helps students personalize their learning journey with AI-powered tools, interactive modules, and real-time progress tracking.
          </p>
        </div>
      <img
  src="learningImage.png"
  alt="Smart Learning"
  className="rounded-xl mt-8 w-full md:w-1/3 h-auto max-h-80 shadow-lg object-contain"
/>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-16">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-blue-800">Why Choose Learning Assistant?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg text-center">
            <h4 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Personalized Learning Paths</h4>
            <p className="text-sm md:text-base text-gray-600">
              AI adapts to your strengths and weaknesses, creating a study plan tailored just for you.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg text-center">
            <h4 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Interactive Modules</h4>
            <p className="text-sm md:text-base text-gray-600">
              Learn through quizzes, flashcards, and simulations that make studying engaging and effective.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg text-center">
            <h4 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Progress Tracking</h4>
            <p className="text-sm md:text-base text-gray-600">
              Monitor your growth with detailed analytics and insights to stay motivated and on track.
            </p>
          </div>
        </div>
      </section>

      {/* Example Use Case */}
      <section className="px-6 md:px-12 py-16 bg-gray-100 ">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-blue-800">How It Works?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
            <span className="text-3xl">📝</span>
            <h4 className="text-lg font-semibold mt-3 mb-2 text-gray-900">Set Your Goals</h4>
            <p className="text-sm text-gray-600">Define what you want to achieve — exams, skills, or career growth.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
            <span className="text-3xl">⚡</span>
            <h4 className="text-lg font-semibold mt-3 mb-2 text-gray-900">Get Smart Recommendations</h4>
            <p className="text-sm text-gray-600">Receive AI-powered study plans, resources, and practice exercises.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
            <span className="text-3xl">🚀</span>
            <h4 className="text-lg font-semibold mt-3 mb-2 text-gray-900">Track & Improve</h4>
            <p className="text-sm text-gray-600">Measure progress, refine your approach, and achieve your learning goals.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-16 text-center bg-gradient-to-r from-indigo-200 to-blue-200 text-gray-900">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900">Start Your Smart Learning Journey ✨</h3>
        <p className="mb-6 text-base md:text-lg text-gray-700">Register today and unlock personalized learning experiences powered by AI.</p>
        <button 
          // onClick={()=>{navigate('/plan-event')}} 
          className="bg-blue-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-600 w-full md:w-auto"
        >
          Get Started
        </button>
      </section>
    </div>
  )
}

export default HomePage