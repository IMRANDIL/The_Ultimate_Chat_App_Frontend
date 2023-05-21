import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fallbackImg from "../assets/fallback.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState, registerAsync } from "../redux/authSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  const dispatch: any = useDispatch();

  const { isLoading } = useSelector((state: RootState) => state.auth.auth);

  const navigate = useNavigate();
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    // Validate file type (JPEG, JPG, PNG)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(selectedFile && selectedFile.type)) {
      toast.error("Only JPEG, JPG, and PNG files are allowed");
      return;
    }

    // Validate file size (5MB limit)
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds the limit of 5MB");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !username || !file) {
      toast.error("Please fill in all the fields");
      return;
    }

    // Handle form submission logic
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "chat_upload");
      data.append("cloud_name", "dme2ftycw");
      setIsUploading(true);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dme2ftycw/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      if (!response.ok) {
        toast.error("Error uploading file");
        setIsUploading(false);
        return;
      }

      const result = await response.json();
      const imageUrl = result.url.toString();
      setIsUploading(false);
      const registerPayload = {
        email,
        password,
        username,
        file: imageUrl,
      };

      const responseRegister = await dispatch(registerAsync(registerPayload));
      if (responseRegister && responseRegister.payload) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error(responseRegister.error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full sm:max-w-md bg-white p-6 rounded-md shadow">
        <div className="relative flex flex-col items-center mb-4">
          <img
            src="https://media.giphy.com/media/Ssqi3AKAsgRNKIoTQp/giphy.gif"
            alt="Logo"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-300"
            draggable={false}
            onError={(e) => {
              e.currentTarget.src = `${fallbackImg}`; // Replace with the fallback image URL
            }}
          />
          <h1 className="text-2xl font-bold mt-2">Register</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-bold mb-2"
            >
              Profile Pic
            </label>
            <input
              type="file"
              id="file"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={handleFileChange}
              multiple={false}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-4"
            disabled={!email || !password || !username || !file}
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </div>
      </div>
      {(isUploading || isLoading) && <Loader />}{" "}
      {/* Display the loader while isUploading is true */}
    </div>
  );
};

export default RegisterScreen;
