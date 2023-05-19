import React, { useState } from "react";

import { toast } from "react-toastify";

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    // Send a request to the server to reset the password
    // using the provided email and new password
    // You can use Axios or any other HTTP library to make the request
    // Example:
    // axios.post("/api/reset-password", { email, password })
    //   .then(response => {
    //     // Handle success
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="max-w-xs mx-auto p-6 bg-white rounded-md shadow-lg flex flex-col items-center"
      >
        <div className="w-40 h-40 bg-gray-500 rounded-full mb-4">
          <img
            src="https://media.giphy.com/media/KMHaS7N7b7r42nPNys/giphy.gif"
            alt="Loading"
            draggable={false}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <label className="block mb-2  font-bold text-gray-700">
          New Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your new password"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </label>
        <label className="block mb-2  font-bold text-gray-700">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your new password"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="block w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
