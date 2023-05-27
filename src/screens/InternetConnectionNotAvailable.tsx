import React from "react";
import noInternetImg from "../assets/noInternet.gif";

const InternetConnectionNotAvailable: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Internet Connection Not Available
      </h1>
      <img
        src={noInternetImg}
        alt="Internet Connection Not Available"
        draggable={false}
      />
      <p className="text-gray-600 mt-5">
        Please check your network connection and try again.
      </p>
    </div>
  );
};

export default InternetConnectionNotAvailable;
