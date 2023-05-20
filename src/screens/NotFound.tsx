import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
        <div className="rounded-full overflow-hidden w-40 h-40 mx-auto">
          <img
            src="https://media.giphy.com/media/kF0ngyP7S1DfmzKqiN/giphy-downsized-large.gif"
            width="100%"
            height="100%"
            draggable={false}
          />
        </div>
        <p className="text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Go to known universe
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
