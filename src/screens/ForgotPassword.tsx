import React, { useState } from "react";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send a request to the server to initiate the password reset process
    // using the provided email address
    // You can use Axios or any other HTTP library to make the request
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-8">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Email:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </label>
      <button
        type="submit"
        className="block w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
