import React, { useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { RootState, resetPasswordAsync } from "../redux/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { isPasswordValid } from "../utils/utils";
import Loader from "../components/Loader";

const ResetPasswordForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth.auth);
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const isPassword: boolean = isPasswordValid(newPassword);

    if (!isPassword) {
      return toast.error(
        "Password must be alphanumeric and have a minimum length of 8 characters, including at least one special character"
      );
    }

    // Send a request to the server to reset the password
    // using the provided email and new password
    // You can use Axios or any other HTTP library to make the request
    // Example:

    try {
      const response = await dispatch(
        resetPasswordAsync({ newPassword, resetToken })
      );
      console.log(response);
      if (response && response.payload) {
        toast.success("Password reset successful");
        return navigate("/login");
      } else {
        return toast.error(response.error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      {isLoading && <Loader />}
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
            value={newPassword}
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
