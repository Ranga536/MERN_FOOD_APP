import React from 'react';

const UnauthPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-pink-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-xl text-center">
        <img
          src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
          alt="Access Denied"
          className="w-64 mx-auto mb-8"
        />
        <h1 className="text-4xl font-extrabold text-red-600 mb-3">Access Denied</h1>
        <p className="text-lg text-gray-700 mb-6">
          You don’t have permission to view this page.
        </p>
        <a
          href="/shop/home"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:bg-red-700 transition-all duration-300"
        >
           Go to Home
        </a>
      </div>
    </div>
  );
};

export default UnauthPage;
