import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchChatsAsync } from "../../redux/chatSlice";
import { useDispatch } from "react-redux";

const MyChats: React.FC = () => {
  const [chats, setChats] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await dispatch(fetchChatsAsync());
        if (response && response.payload) {
          setChats(response.data);
        } else {
          toast.error(response.error.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchChats();
  }, []);

  return <div>MyChats</div>;
};

export default MyChats;
