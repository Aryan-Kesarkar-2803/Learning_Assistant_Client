import React from "react";

const AboutPage = () => {
  return (
    <main className="bg-gradient-to-r from-indigo-50 to-blue-100 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="px-6 md:px-16 py-20 md:py-28 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900">
          About Smart Learning System
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
          Our Smart Learning System is an AI-powered platform that guides
          learners step by step — from choosing a topic to mastering it
          through curated resources, progress tracking, and evaluation quizzes.
        </p>
        <div className="mt-12 w-full h-1 rounded-full bg-gradient-to-r from-blue-300 via-indigo-400 to-blue-300 opacity-30" />
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-16 bg-gradient-to-r from-blue-100 to-indigo-200">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 text-center">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Personalized Roadmaps",
              desc: "Structured learning paths tailored to each topic and learner’s goals.",
            },
            {
              title: "Curated Video Lessons",
              desc: "Best-in-class YouTube tutorials selected for quality and relevance.",
            },
            {
              title: "Progress Tracking",
              desc: "Visual dashboards to monitor completed steps and overall advancement.",
            },
            {
              title: "Evaluation Quizzes",
              desc: "Topic-specific quizzes to validate understanding and reinforce knowledge.",
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Section */}
      <section className="px-6 md:px-16 py-20 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
          Empowering Smarter Learning
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          By combining AI-driven roadmaps, curated resources, and adaptive
          evaluation, our Smart Learning System transforms the way learners
          approach new skills. It’s not just about consuming content — it’s
          about structured growth, measurable progress, and lasting
          understanding.
        </p>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Learning Assistant. All rights reserved.
      </footer>
    </main>
  );
};

export default AboutPage;