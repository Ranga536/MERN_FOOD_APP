const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-xl text-center">
        <img
          src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
          alt="404 not found"
          className="w-64 mx-auto mb-8 rounded-md"
        />
        <h1 className="text-6xl font-extrabold text-purple-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:bg-purple-700 transition-all duration-300"
        >
          ⬅ Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
