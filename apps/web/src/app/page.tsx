import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Fortuno</h1>
          <nav>
            <a href="/login" className="text-white hover:underline px-4">
              Login
            </a>
            <a href="/signup" className="text-white hover:underline px-4">
              Sign Up
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mt-10">Welcome to Fortuno</h2>
        <p className="text-lg text-gray-700 mt-4">
          Manage your finances effortlessly and stay on top of your goals.
        </p>
        <div className="mt-8">
          <a
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </main>
      <footer className="w-full bg-gray-800 text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Fortuno. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;