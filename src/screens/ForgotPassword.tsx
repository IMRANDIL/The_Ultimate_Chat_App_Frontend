import React, { useState } from "react";
import { validateEmail } from "../utils/utils";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, forgotPasswordAsync } from "../redux/authSlice";
import Loader from "../components/Loader";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth.auth);
  const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      return toast.error("Please enter a valid email");
    }
    // Send a request to the server to initiate the password reset process
    // using the provided email address
    // You can use Axios or any other HTTP library to make the request
    try {
      const response = await dispatch(forgotPasswordAsync({ email }));
      if (response && response.payload) {
        toast.success("Reset link sent to your email");
        return navigate("/login");
      } else {
        toast.error(response.error.message);
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
        <div className="w-40 h-40 bg-gray-500 rounded-full  mb-4">
          <img
            src="https://media.giphy.com/media/2t9xUdD3SlWIjizUJ7/giphy-downsized-large.gif"
            alt="Loading"
            draggable={false}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <label className="block mb-2  font-bold text-gray-700">
          Email
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="block w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          disabled={!email}
        >
          Submit
        </button>
        <Link
          to="/login"
          className="mt-3 text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
